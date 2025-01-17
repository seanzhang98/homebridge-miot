const CurtainDevice = require('../CurtainDevice.js');
const Properties = require('../../../constants/Properties.js');
const Actions = require('../../../constants/Actions.js');
const Constants = require('../../../constants/Constants.js');
const PropFormat = require('../../../constants/PropFormat.js');
const PropUnit = require('../../../constants/PropUnit.js');
const PropAccess = require('../../../constants/PropAccess.js');


class DooyaCurtainM2 extends CurtainDevice {
  constructor(model, deviceId, name, logger) {
    super(model, deviceId, name, logger);
  }


  /*----------========== DEVICE INFO ==========----------*/

  static getDeviceModel() {
    return "dooya.curtain.m2";
  }

  getDeviceName() {
    return "Dooya Curtain";
  }

  getDeviceMiotSpec() {
    return "http://miot-spec.org/miot-spec-v2/instance?type=urn:miot-spec-v2:device:curtain:0000A00C:dooya-m2:1";
  }


  /*----------========== INIT ==========----------*/

  initDeviceProperties() {
    // READ/WRITE
    this.addProperty(Properties.TARGET_POSITION, 2, 7, PropFormat.UINT8, PropAccess.READ_WRITE_NOTIFY, PropUnit.PERCENTAGE, [0, 100, 1]);
    this.addProperty(Properties.MOTOR_REVERSE, 2, 8, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE);

    // WRITE ONLY
    this.addProperty(Properties.MOTOR_CONTROL, 2, 2, PropFormat.UINT8, PropAccess.WRITE, PropUnit.NONE, [], [{
        "value": 0,
        "description": "Close"
      },
      {
        "value": 1,
        "description": "Pause"
      },
      {
        "value": 2,
        "description": "Open"
      }
    ]);

    // READ ONLY
    this.addProperty(Properties.DEVICE_FAULT, 2, 1, PropFormat.UINT8, PropAccess.READ_NOTIFY, PropUnit.NONE, [], [{
      "value": 0,
      "description": "No Faults"
    }]);
    this.addProperty(Properties.STATUS, 2, 4, PropFormat.UINT8, PropAccess.READ_NOTIFY, PropUnit.NONE, [], [{
        "value": 0,
        "description": "Closing"
      },
      {
        "value": 1,
        "description": "Stop"
      },
      {
        "value": 2,
        "description": "Opening"
      }
    ]);
    this.addProperty(Properties.CURRENT_POSITION, 2, 6, PropFormat.UINT8, PropAccess.READ_NOTIFY, PropUnit.PERCENTAGE, [0, 100, 1]);
  }

  initDeviceActions() {
    //none
  }


  /*----------========== CONFIG ==========----------*/

  statusClosingValue() {
    return 0;
  }

  statusStopValue() {
    return 1;
  }

  statusOpeningValue() {
    return 2;
  }


}

module.exports = DooyaCurtainM2;
