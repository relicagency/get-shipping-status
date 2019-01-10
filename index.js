let { promisify } = require('util');
let axios = require('axios');
let _get = require('lodash.get');
let tracker = require('delivery-tracker');
let usps = tracker.courier('usps');
let trackUsps = promisify(usps.trace);

let autopilot = axios.create({
  headers: {
    autopilotapikey: process.env.AUTOPILOT_KEY
  },
  baseURL: 'https://api2.autopilothq.com/v1'
});

let smartSegmentId = 'sseg1543466966223-25F295F0-F392-11E8-ACAB-43D448F6C875';

let getCustomField = (contact, name) =>
  _get(
    _get(contact, 'custom_fields').find(field => field.kind === name),
    'value'
  );

let addTrackingFields = contact => {
  let trackingNumber = getCustomField(contact, 'Package Tracking #');
  let delivered = getCustomField(contact, 'Package Delivered');
  return Object.assign(contact, { trackingNumber, delivered });
};

let pluckFields = contact => {
  let { Email, trackingNumber, delivered } = contact;
  return { Email, trackingNumber, delivered };
};

let setCustomFields = contact => {
  return {
    Email: contact.Email,
    custom: {
      'boolean--Package--Delivered': contact.delivered,
      'date--Package--Delivery--Date': contact.date
    }
  };
};

let filterContactsAndFields = autoPilotResponse =>
  _get(autoPilotResponse, 'data.contacts')
    .map(addTrackingFields)
    .filter(contact => contact.trackingNumber && !contact.delivered)
    .map(pluckFields);

let isDelivered = checkpoint => checkpoint.status.toLowerCase() === 'delivered';

let getShippingStatus = trackingNumber => {
  return trackUsps(trackingNumber).then(trackingInfo => {
    let delivered = isDelivered(trackingInfo);
    return {
      trackingNumber,
      delivered,
      date: delivered ? trackingInfo.checkpoints.find(isDelivered).time : null
    };
  });
};

let addShippingStatusesToContacts = contacts => {
  let statuses = contacts
    .map(contact => contact.trackingNumber)
    .map(getShippingStatus);
  return Promise.all(statuses)
    .then(statuses => {
      return contacts.map(contact => {
        let status = statuses.find(
          status => status.trackingNumber === contact.trackingNumber
        );
        return Object.assign({}, { Email: contact.Email }, status);
      });
    })
    .catch(error => console.error(error));
};

let postUpdatedContacts = contacts => {
  let updates = contacts
    .filter(contact => contact.delivered)
    .map(setCustomFields)
    .map(contact => autopilot.post('/contact', { contact }));
  return Promise.all(updates);
};

autopilot
  .get(`/smart_segments/contactlist_${smartSegmentId}/contacts/`)
  .then(filterContactsAndFields)
  .then(addShippingStatusesToContacts)
  .then(postUpdatedContacts)
  .catch(error => console.error(error.response.status));
