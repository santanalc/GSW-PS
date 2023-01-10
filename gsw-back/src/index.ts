import cors from "@fastify/cors";
import fastify, {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyTypeProviderDefault
} from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import { initAccountController } from "./controllers/AccountController";
import { initCashMachineController } from "./controllers/CashMachineController";
import { IControllers } from "./controllers/controllers";
import { initAccountRoutes } from "./routers/AccountRoute";
import { initMongoDBService, MongoDBService } from "./services/MongoService";

export type FastifyApp = FastifyInstance<
  Server<typeof IncomingMessage, typeof ServerResponse>,
  IncomingMessage,
  ServerResponse<IncomingMessage>,
  FastifyBaseLogger,
  FastifyTypeProviderDefault
>;

async function run() {
  const app = fastify();

  app.register(cors, {
    origin: "*",
  });

  const mongo = await initMongoDBService();

  const controllers = initializeControllers({ mongo });

  initializeRouters({ app, controllers });

  await app.ready();

  // await app.listen({ port: 8082 });

  app.listen(8082, "0.0.0.0", (error) => {
    if (error) {
      process.exit(1);
    }
  });

  console.log("🚀 Initialize Fastify: ", 8082);
}

function initializeRouters(params: {
  app: FastifyApp;
  controllers: IControllers;
}) {
  const { app, controllers } = params;

  initAccountRoutes({
    app,
    controllers,
  });
}

export function initializeControllers(params: {
  mongo: MongoDBService;
}): IControllers {
  const { mongo } = params;

  return {
    account: initAccountController({
      mongo,
    }),
    cashMachine: initCashMachineController({
      mongo,
    }),
  } as IControllers;
}

run();
