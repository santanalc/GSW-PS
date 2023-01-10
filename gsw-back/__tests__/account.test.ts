import { initializeControllers } from "../src";
import { initMongoDBService } from "../src/services/MongoService";

describe("testing account", () => {
  test("Exists account", async () => {
    const mongo = await initMongoDBService(true);
    const controllers = initializeControllers({ mongo });

    const account = await controllers.account.getOne({
      registerId: "12345",
    });

    expect(account).toHaveProperty("_id");
    expect(account).toHaveProperty("name");
  });

  test("It doesn't exist account", async () => {
    const mongo = await initMongoDBService(true);
    const controllers = initializeControllers({ mongo });

    const account = await controllers.account.getOne({
      registerId: "11111",
    });

    expect(account).toBe(null);
  });

  test("Update balance", async () => {
    const mongo = await initMongoDBService(true);
    const controllers = initializeControllers({ mongo });

    const account = await controllers.account.updateBalance({
      registerId: "12345",
      balance: "15000",
    });

    expect(account.result).toHaveProperty("_id");
    expect(account.count).toBe(1);
  });

  test("Error Update balance", async () => {
    const mongo = await initMongoDBService(true);
    const controllers = initializeControllers({ mongo });

    const account = await controllers.account.updateBalance({
      registerId: "1111",
      balance: "10000",
    });

    expect(account.result).toBe(null);
    expect(account.count).toBe(1);
  });
});
