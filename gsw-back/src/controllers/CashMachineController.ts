import { IMongoDBService } from "../services/MongoService";

export function initCashMachineController(params: { mongo: IMongoDBService }) {
  const { mongo } = params;

  async function getOne(params: { bank: string }) {
    const { bank } = params;


    const cashMachine = await mongo.collections.cashMachine.findOne({
      bank,
    });

    return cashMachine;
  }

  async function updateMoneyNotes(params: {
    bank: string;
    moneyNotes: { "100": number; "50": number; "20": number; "10": number };
  }) {
    const { bank, moneyNotes } = params;

    const result = await mongo.collections.cashMachine.findOneAndUpdate(
      { bank },
      {
        $set: { moneyNotes },
      }
    );

    return { result: result.value, count: result.ok };
  }

  return {
    getOne,
    updateMoneyNotes,
  };
}
