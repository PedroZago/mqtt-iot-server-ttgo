const animals = require("./animals.data");

const devices = {
  Gateway1: {
    id: "a1d7f7bc-3c64-4421-9b43-6eab123f3901",
    serialNumber: "GW-001",
    status: "active",
    model: "T-Beam V1.1",
    batteryLevel: 85,
    type: "gateway",
    activationDate: new Date("2024-01-15"),
  },
  Node1: {
    id: "b4d5f8bc-2a78-4422-8a9b-d7d40f18fd35",
    serialNumber: "ND-001",
    status: "active",
    model: "TTGO Node V2",
    batteryLevel: 75,
    type: "node",
    gatewayId: null,
    animalId: null,
    activationDate: new Date("2024-02-01"),
  },
  Node2: {
    id: "e6a23dbc-47a4-4b4b-855f-112f31fd2182",
    serialNumber: "ND-002",
    status: "maintenance",
    model: "TTGO Node V2",
    batteryLevel: 50,
    type: "node",
    gatewayId: null,
    animalId: null,
    activationDate: new Date("2024-03-10"),
  },
  Gateway2: {
    id: "f8b24d90-0dcb-44b9-bcae-4929a70b31d3",
    serialNumber: "GW-002",
    status: "inactive",
    model: "T-Beam V1.1",
    batteryLevel: 0,
    type: "gateway",
    activationDate: new Date("2023-12-20"),
  },
  Node3: {
    id: "d2e80f5c-7c8a-47a4-9f6b-3b2d627c41e4",
    serialNumber: "ND-003",
    status: "active",
    model: "TTGO Node V2",
    batteryLevel: 90,
    type: "node",
    gatewayId: null,
    animalId: null,
    activationDate: new Date("2024-05-05"),
  },
};

devices.Node1.gatewayId = devices.Gateway1.id;
devices.Node1.animalId = animals.BoiBravo.id;

devices.Node2.gatewayId = devices.Gateway1.id;
devices.Node2.animalId = animals.VacaMimosa.id;

devices.Node3.gatewayId = devices.Gateway2.id;
devices.Node3.animalId = animals.BufaloForte.id;

module.exports = devices;
