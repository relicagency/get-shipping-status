let axios = require('axios');
let _get = require('lodash.get');
let request = require('request');
let ups = require('./ups');

let autopilot = axios.create({
  headers: {
    autopilotapikey: process.env.AUTOPILOT_KEY
  },
  baseURL: 'https://api2.autopilothq.com/v1'
});

let smartSegmentId = 'sseg1500260355710-EB3B59E0-6A9B-11E7-AC90-818F9772CFB6';

let getCustomField = (contact, name) =>
  _get(
    _get(contact, 'custom_fields').find(field => field.kind === name),
    'value'
  );

let addTrackingFields = contact => {
  let trackingNumber = getCustomField(contact, 'Tracking #');
  let delivered = getCustomField(contact, 'Delivered');
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
      'boolean--Delivered': contact.delivered,
      'date--Delivery--Date': contact.date
    }
  };
};

let filterContactsAndFields = autoPilotResponse => {
  let contacts = _get(autoPilotResponse, 'data.contacts');
  return contacts
    .map(addTrackingFields)
    .filter(contact => contact.trackingNumber && !contact.delivered)
    .map(pluckFields);
};

let getShippingStatus = contacts => {
  let statuses = contacts.map(contact => contact.trackingNumber).map(ups);
  // It's dumb that I wait for all to resolve
  // I should just post back to autopilot as soon as UPS responds
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

let sendUpdates = contacts => {
  let updates = contacts
    .filter(contact => contact.delivered)
    .map(setCustomFields)
    .map(contact => autopilot.post('/contact', { contact }));
  return Promise.all(updates);
};

autopilot
  .get(`/smart_segments/contactlist_${smartSegmentId}/contacts/`)
  .then(filterContactsAndFields)
  .then(getShippingStatus)
  .then(sendUpdates)
  .catch(error => console.error(error.response.status));
