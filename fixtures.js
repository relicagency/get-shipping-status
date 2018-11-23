// 9274890223359000267183
let delivered = {
  "courier": {
    "code": "usps",
    "name": "USPS"
  },
  "status": "Delivered",
  "checkpoints": [
    {
      "courier": {
        "code": "usps",
        "name": "USPS"
      },
      "location": "ROUND ROCK, TX 78664",
      "message": "Delivered, In/At Mailbox - Your item was delivered in or at the mailbox at 11:29 am on August 28, 2018 in ROUND ROCK, TX 78664.",
      "status": "Delivered",
      "time": "2018-08-28T11:29"
    },
    {
      "courier": {
        "code": "usps",
        "name": "USPS"
      },
      "location": "ROUND ROCK, TX 78664",
      "message": "Arrived at Post Office",
      "status": "InTransit",
      "time": "2018-08-28T02:05"
    },
    {
      "courier": {
        "code": "usps",
        "name": "USPS"
      },
      "location": "ROUND ROCK, TX 78664",
      "message": "Accepted at USPS Destination Facility",
      "status": "InTransit",
      "time": "2018-08-28T00:50"
    },
    {
      "courier": {
        "code": "usps",
        "name": "USPS"
      },
      "location": "MEMPHIS, TN 38116",
      "message": "Departed Shipping Partner Facility, USPS Awaiting Item - Shipping Partner:  DHL ECOMMERCE",
      "status": "InTransit",
      "time": "2018-08-23T03:07"
    },
    {
      "courier": {
        "code": "usps",
        "name": "USPS"
      },
      "location": "MEMPHIS, TN 38116",
      "message": "Arrived Shipping Partner Facility, USPS Awaiting Item - Shipping Partner:  DHL ECOMMERCE",
      "status": "InTransit",
      "time": "2018-08-22T19:44"
    },
    {
      "courier": {
        "code": "usps",
        "name": "USPS"
      },
      "location": "MEMPHIS, TN 38141",
      "message": "Shipping Label Created, USPS Awaiting Item",
      "status": "InfoReceived",
      "time": "2018-08-22T12:08"
    }
  ]
};

// 9400110899698010467091
let InTransit = {
  "courier": {
    "code": "usps",
    "name": "USPS"
  },
  "number": "9400110899698010467091",
  "status": "InTransit",
  "checkpoints": [
    {
      "courier": {
        "code": "usps",
        "name": "USPS"
      },
      "location": "Your package is moving within the USPS network and is on track to be delivered by the expected delivery date. It is currently in transit to the next facility.",
      "message": "In Transit to Next Facility",
      "status": "InTransit",
      "time": "2018-11-22T00:00"
    },
    {
      "courier": {
        "code": "usps",
        "name": "USPS"
      },
      "location": "ATLANTA, GA 30354",
      "message": "Departed USPS Facility",
      "status": "InTransit",
      "time": "2018-11-21T06:32"
    },
    {
      "courier": {
        "code": "usps",
        "name": "USPS"
      },
      "location": "ATLANTA, GA 30354",
      "message": "Arrived at USPS Facility",
      "status": "InTransit",
      "time": "2018-11-21T05:32"
    },
    {
      "courier": {
        "code": "usps",
        "name": "USPS"
      },
      "location": "ATLANTA GA DISTRIBUTION CENTER",
      "message": "Departed USPS Regional Facility",
      "status": "InTransit",
      "time": "2018-11-21T04:59"
    },
    {
      "courier": {
        "code": "usps",
        "name": "USPS"
      },
      "location": "ATLANTA GA DISTRIBUTION CENTER",
      "message": "Arrived at USPS Regional Origin Facility",
      "status": "InTransit",
      "time": "2018-11-21T01:37"
    },
    {
      "courier": {
        "code": "usps",
        "name": "USPS"
      },
      "location": "ATLANTA, GA 30350",
      "message": "Accepted at USPS Origin Facility",
      "status": "InTransit",
      "time": "2018-11-21T00:22"
    },
    {
      "courier": {
        "code": "usps",
        "name": "USPS"
      },
      "location": "ATLANTA, GA 30350",
      "message": "Shipping Label Created, USPS Awaiting Item",
      "status": "InfoReceived",
      "time": "2018-11-19T15:56"
    }
  ]
};

export {
  delivered,
  InTransit
}