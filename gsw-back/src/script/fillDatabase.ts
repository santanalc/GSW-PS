import { initMongoDBService } from "../services/MongoService";

async function fillDatabase() {
  const mongo = await initMongoDBService(true);

  await mongo.collections.accounts.insertMany([
    {
      name: "Lucas Santana",
      registerId: "499273229",
      bank: "gsw",
      balance: "10000",
    },
    {
      name: "Fulano",
      registerId: "12345",
      bank: "teste",
      balance: "10000",
    },
  ]);

  await mongo.collections.cashMachine.insertMany([
    {
      bank: "gsw",
      moneyNotes: {
        "100": 80,
        "50": 40,
        "20": 40,
        "10": 40,
      },
    },
    {
      bank: "teste",
      moneyNotes: {
        "100": 10,
        "50": 10,
        "20": 10,
        "10": 10,
      },
    },
  ]);

  console.log("DB Filled");
}

fillDatabase();
