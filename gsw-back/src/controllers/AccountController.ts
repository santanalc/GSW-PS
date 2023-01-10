import { IMongoDBService } from "../services/MongoService";

export function initAccountController(params: { mongo: IMongoDBService }) {
  const { mongo } = params;

  async function getOne(params: { registerId: string }) {
    const { registerId } = params;

    const account = await mongo.collections.accounts.findOne({
      registerId,
    });

    return account;
  }

  async function updateBalance(params: {
    registerId: string;
    balance: string;
  }) {
    const { registerId, balance } = params;

    const result = await mongo.collections.accounts.findOneAndUpdate(
      { registerId },
      {
        $set: { balance },
      }
    );

    return { result: result.value, count: result.ok };
  }

  return {
    getOne,
    updateBalance,
  };
}
