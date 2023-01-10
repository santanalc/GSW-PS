import { initializeControllers } from "../src";
import { initMongoDBService } from "../src/services/MongoService";

describe("testing account", () => {
  test("Exists bank cash machine", async () => {
    const mongo = await initMongoDBService(true);
    const controllers = initializeControllers({ mongo });

    const account = await controllers.cashMachine.getOne({
      bank: "teste",
    });

    expect(account).toHaveProperty("_id");
  });

  test("It doesn't exist  bank cash machine", async () => {
    const mongo = await initMongoDBService(true);
    const controllers = initializeControllers({ mongo });

    const account = await controllers.cashMachine.getOne({
      bank: "caixa",
    });

    expect(account).toBe(null);
  });

  test("Update moneyNotes", async () => {
    const mongo = await initMongoDBService(true);
    const controllers = initializeControllers({ mongo });

    const account = await controllers.cashMachine.updateMoneyNotes({
      bank: "teste",
      moneyNotes: {
        "100": 20,
        "50": 20,
        "20": 20,
        "10": 20,
      },
    });

    expect(account.result).toHaveProperty("_id");
    expect(account.count).toBe(1);
  });

  test("Error update moneyNotes", async () => {
    const mongo = await initMongoDBService(true);
    const controllers = initializeControllers({ mongo });

    const account = await controllers.cashMachine.updateMoneyNotes({
      bank: "caixa",
      moneyNotes: {
        "100": 20,
        "50": 20,
        "20": 20,
        "10": 20,
      },
    });

    expect(account.result).toBe(null);
    expect(account.count).toBe(1);
  });
});
