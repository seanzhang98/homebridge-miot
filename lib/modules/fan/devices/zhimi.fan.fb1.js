const FanDevice = require('../FanDevice.js');
const Properties = require('../../../constants/Properties.js');
const Actions = require('../../../constants/Actions.js');
const Constants = require('../../../constants/Constants.js');
const PropFormat = require('../../../constants/PropFormat.js');
const PropUnit = require('../../../constants/PropUnit.js');
const PropAccess = require('../../../constants/PropAccess.js');


class ZhimiFanFb1 extends FanDevice {
  constructor(model, deviceId, name, logger) {
    super(model, deviceId, name, logger);
  }


  /*----------========== DEVICE INFO ==========----------*/

  static getDeviceModel() {
    return "zhimi.fan.fb1";
  }

  getDeviceName() {
    return "Mi Smart Air Circulator Fan";
  }

  getDeviceMiotSpec() {
    return "http://miot-spec.org/miot-spec-v2/instance?type=urn:miot-spec-v2:device:fan:0000A005:zhimi-fb1:1";
  }


  /*----------========== INIT ==========----------*/

  initDeviceProperties() {
    // READ/WRITE
    this.addProperty(Properties.POWER, 2, 1, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE);
    this.addProperty(Properties.FAN_LEVEL, 2, 2, PropFormat.UINT8, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE, [1, 5, 1]); //TODO: handle value range fan levels!
    this.addProperty(Properties.HORIZONTAL_SWING, 2, 3, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE);
    this.addProperty(Properties.HORIZONTAL_SWING_ANGLE, 2, 5, PropFormat.UINT16, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE, [0, 120, 1]);
    this.addProperty(Properties.VERTICAL_SWING, 2, 4, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE);
    this.addProperty(Properties.VERTICAL_SWING_ANGLE, 2, 6, PropFormat.UINT16, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE, [0, 90, 1]);
    this.addProperty(Properties.MODE, 2, 7, PropFormat.UINT8, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE, [], [{
        "value": 0,
        "description": "Natural Wind"
      },
      {
        "value": 1,
        "description": "Straight Wind"
      }
    ]);
    this.addProperty(Properties.POWER_OFF_TIME, 5, 2, PropFormat.UINT32, PropAccess.READ_WRITE_NOTIFY, PropUnit.HOURS, [0, 8, 1]);
    this.addProperty(Properties.CHILD_LOCK, 6, 1, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE);
    this.addProperty(Properties.LED, 2, 10, PropFormat.UINT8, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE, [0, 1, 1]);
    this.addProperty(Properties.ALARM, 2, 11, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE);
    this.addProperty(Properties.FAN_SPEED, 5, 10, PropFormat.UINT8, PropAccess.READ_WRITE_NOTIFY, PropUnit.PERCENTAGE, [1, 100, 1]);

    // WRITE ONLY
    this.addProperty(Properties.HORIZONTAL_MOVE, 5, 6, PropFormat.STRING, PropAccess.WRITE, PropUnit.NONE);
    this.addProperty(Properties.VERTICAL_MOVE, 5, 7, PropFormat.STRING, PropAccess.WRITE, PropUnit.NONE);

    // READ ONLY
    this.addProperty(Properties.STATUS, 2, 8, PropFormat.UINT8, PropAccess.READ_NOTIFY, PropUnit.NONE, [], [{
        "value": 1,
        "description": "Idle"
      },
      {
        "value": 2,
        "description": "Busy"
      }
    ]);
    this.addProperty(Properties.DEVICE_FAULT, 2, 9, PropFormat.UINT8, PropAccess.READ_NOTIFY, PropUnit.NONE, [], [{
        "value": 0,
        "description": "Nofaults"
      },
      {
        "value": 1,
        "description": "Stuck"
      },
      {
        "value": 2,
        "description": "2"
      }
    ]);
  }

  initDeviceActions() {
    this.addAction(Actions.TOGGLE_POWER, 7, 1, [1]);
    this.addAction(Actions.TOGGLE_MODE, 7, 2, [1]);
    this.addAction(Actions.TOGGLE_LEVEL, 7, 3, [1]);
  }


  /*----------========== CONFIG ==========----------*/

  straightWindModeValue() {
    return 1;
  }

  naturalModeValue() {
    return 2;
  }

  hasBuiltInBattery() {
    return true;
  }


}

module.exports = ZhimiFanFb1;
