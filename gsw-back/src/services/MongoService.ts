import { Collection, MongoClient } from "mongodb";

export interface IAccount {
  name: string;
  registerId: string;
  bank: string;
  balance: string;
}

export interface ICashMachine {
  bank: string;
  moneyNotes: {
    "100": number;
    "50": number;
    "20": number;
    "10": number;
  };
}

export interface IMongoCollections {
  accounts: Collection<IAccount>;
  cashMachine: Collection<ICashMachine>;
}

export interface MongoDBService {
  collections: IMongoCollections;
  rawClient: MongoClient;
}

export const mongoDBName = "gsw-bank";

export async function initMongoDBService(localhost?: boolean) {
  const mongoURI = localhost
    ? "mongodb://localhost:27017/myApp"
    : "mongodb://mongo:27017/myApp";

  console.log("initMongoDBService", mongoURI);

  const mongoClient = new MongoClient(mongoURI);
  await mongoClient.connect();
  const db = mongoClient.db(mongoDBName);

  const collections: IMongoCollections = {
    accounts: db.collection<IAccount>("accounts"),
    cashMachine: db.collection<ICashMachine>("cashMachine"),
  };

  const initializedMongoService = {
    collections,
    rawClient: mongoClient,
  };

  return initializedMongoService;
}

export type IMongoDBService = Awaited<ReturnType<typeof initMongoDBService>>;
