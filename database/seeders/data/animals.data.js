const breeds = require("./breeds.data");
const species = require("./species.data");

const animals = {
  BoiBravo: {
    id: "e1a23bfc-6a74-4df4-b93d-7c86c5e87401",
    name: "Boi Bravo",
    specieId: species.BosIndicus.id,
    breedId: breeds.Nelore.id,
    sex: "male",
    birthDate: new Date("2021-05-10"),
    weight: 450.5,
  },
  VacaMimosa: {
    id: "e1a23bfc-6a74-4df4-b93d-7c86c5e87402",
    name: "Vaca Mimosa",
    specieId: species.BosTaurus.id,
    breedId: breeds.Holandesa.id,
    sex: "female",
    birthDate: new Date("2020-03-15"),
    weight: 600.0,
  },
  BufaloForte: {
    id: "e1a23bfc-6a74-4df4-b93d-7c86c5e87403",
    name: "Búfalo Forte",
    specieId: species.BubalusBubalis.id,
    breedId: breeds.Murrah?.id,
    sex: "male",
    birthDate: new Date("2019-08-25"),
    weight: 800.0,
  },
  BezerraBela: {
    id: "e1a23bfc-6a74-4df4-b93d-7c86c5e87404",
    name: "Bezerra Bela",
    specieId: species.BosTaurus.id,
    breedId: breeds.Jersey.id,
    sex: "female",
    birthDate: new Date("2023-01-10"),
    weight: 150.0,
  },
};

module.exports = animals;
