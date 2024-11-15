const devices = require("./devices.data");

const telemetries = {
  Telemetry1: {
    id: "c6d0aeb8-d8d0-4b68-8c7f-394b812bd758",
    topic: "device/ND-001/telemetry",
    message: JSON.stringify({
      temperature: 36.5,
      heartRate: 72,
      behavior: "grazing",
      latitude: -23.5505,
      longitude: -46.6333,
      altitude: 800,
      speed: 0,
    }),
    deviceId: devices.Node1.id,
  },
  Telemetry2: {
    id: "b7a78cfc-4017-43fc-a6f6-59a907e58cb1",
    topic: "device/ND-002/telemetry",
    message: JSON.stringify({
      temperature: 37.0,
      heartRate: 80,
      behavior: "resting",
      latitude: -23.5525,
      longitude: -46.6355,
      altitude: 805,
      speed: 0,
    }),
    deviceId: devices.Node2.id,
  },
  Telemetry3: {
    id: "d4b9c839-5389-43a9-b6cc-3ab4a7501f52",
    topic: "device/GW-001/telemetry",
    message: JSON.stringify({
      temperature: 35.8,
      heartRate: 60,
      behavior: "walking",
      latitude: -23.5535,
      longitude: -46.6344,
      altitude: 790,
      speed: 1.2,
    }),
    deviceId: devices.Node3.id,
  },
  Telemetry4: {
    id: "f7c98c2c-d8a2-42fa-8241-c11b8b120dfd",
    topic: "device/ND-003/telemetry",
    message: JSON.stringify({
      temperature: 36.2,
      heartRate: 78,
      behavior: "running",
      latitude: -23.5545,
      longitude: -46.6322,
      altitude: 810,
      speed: 3.5,
    }),
    deviceId: devices.Node1.id,
  },
  Telemetry5: {
    id: "e8f4bc87-b5d1-4658-9261-09c1e88e6a4f",
    topic: "device/GW-002/telemetry",
    message: JSON.stringify({
      temperature: 36.0,
      heartRate: 65,
      behavior: "grazing",
      latitude: -23.5555,
      longitude: -46.6311,
      altitude: 795,
      speed: 0,
    }),
    deviceId: devices.Node2.id,
  },
};

module.exports = telemetries;
