let _get = require('lodash.get');
let promisify = require("promisify-node");
let upsAPI = require('shipping-ups');

let trackingNumber = process.argv[2];

let ups = promisify(new upsAPI({
  environment: 'live',
  username: 'nickgchristensen',
  password: process.env.UPS_PASSWORD,
  access_key: process.env.UPS_TOKEN,
  imperial: true
}));

let isDelivered = activity => {
  let status = _get(activity, 'Status.StatusType.Description');
  return status.toLowerCase() === 'delivered';
};

let getActivityDate = activity => {
  let { Date: date, Time: time } = activity;
  let [dateString, year, month, day] = date.match(/(.{4})(.{2})(.{2})/);
  return new Date(year, (month - 1), day);
}

module.exports = trackingNumber => {
  return ups.track(trackingNumber, { latest: true }).then(result => {
    let activity = _get(result, 'Shipment.Package.Activity');
    let delivered = isDelivered(activity);
    return {
      trackingNumber,
      delivered,
      date: delivered ? getActivityDate(activity) : null
    };
  })
};