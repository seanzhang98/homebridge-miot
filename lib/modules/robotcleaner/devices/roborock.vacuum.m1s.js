const RobotCleanerDevice = require('../RobotCleanerDevice.js');
const Properties = require('../../../constants/Properties.js');
const Actions = require('../../../constants/Actions.js');
const Constants = require('../../../constants/Constants.js');
const PropFormat = require('../../../constants/PropFormat.js');
const PropUnit = require('../../../constants/PropUnit.js');
const PropAccess = require('../../../constants/PropAccess.js');


class RoborockVacuumM1S extends RobotCleanerDevice {
  constructor(model, deviceId, name, logger) {
    super(model, deviceId, name, logger);
  }


  /*----------========== DEVICE INFO ==========----------*/

  static getDeviceModel() {
    return "roborock.vacuum.m1s";
  }

  getDeviceName() {
    return "Xiaomi Mi Robot 1S";
  }

  getDeviceMiotSpec() {
    return "http://miot-spec.org/miot-spec-v2/instance?type=urn:miot-spec-v2:device:vacuum:0000A006:roborock-m1s:2";
  }

  requiresMiCloud() {
    return true;
  }


  /*----------========== INIT ==========----------*/

  initDeviceProperties() {
    // READ/WRITE
    this.addProperty(Properties.MODE, 2, 1, PropFormat.UINT8, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE, [], [{
        "value": 1,
        "description": "Silent"
      },
      {
        "value": 2,
        "description": "Basic"
      },
      {
        "value": 3,
        "description": "Strong"
      },
      {
        "value": 4,
        "description": "Full Speed"
      }
    ]);

    // READ ONLY
    this.addProperty(Properties.STATUS, 2, 3, PropFormat.UINT8, PropAccess.READ_NOTIFY, PropUnit.NONE, [], [{
        "value": 2,
        "description": "Sleep"
      },
      {
        "value": 3,
        "description": "Idle"
      },
      {
        "value": 5,
        "description": "Sweeping"
      },
      {
        "value": 6,
        "description": "Go Charging"
      },
      {
        "value": 7,
        "description": "Remote Control"
      },
      {
        "value": 8,
        "description": "Charging"
      },
      {
        "value": 9,
        "description": "Charging Error"
      },
      {
        "value": 10,
        "description": "Paused"
      },
      {
        "value": 11,
        "description": "Part Sweeping"
      },
      {
        "value": 12,
        "description": "Error"
      },
      {
        "value": 14,
        "description": "Update"
      },
      {
        "value": 15,
        "description": "Rub Back"
      },
      {
        "value": 16,
        "description": "Go Where"
      },
      {
        "value": 17,
        "description": "Zone Sweeping"
      },
      {
        "value": 18,
        "description": "Select Sweeping"
      }
    ]);
    this.addProperty(Properties.BATTERY_LEVEL, 4, 1, PropFormat.UINT8, PropAccess.READ_NOTIFY, PropUnit.PERCENTAGE, [0, 100, 1]);
  }

  initDeviceActions() {
    this.addAction(Actions.START_SWEEP, 2, 1, []);
    this.addAction(Actions.STOP_SWEEP, 2, 2, []);
    this.addAction(Actions.START_ROOM_SWEEP, 2, 3, [2]);
    this.addAction(Actions.LOCATE_ROBOT, 3, 1, []);
    this.addAction(Actions.START_CHARGE, 4, 1, []);
  }


  /*----------========== CONFIG ==========----------*/

  hasBuiltInBattery() {
    return true;
  }

  statusSweepingValue() {
    return 5;
  }

  statusIdleValue() {
    return 3;
  }

  statusPausedValue() {
    return 10;
  }

  statusErrorValue() {
    return 12;
  }

  statusGoChargingValue() {
    return 6;
  }

  statusChargingValue() {
    return 8;
  }


}

module.exports = RoborockVacuumM1S;
