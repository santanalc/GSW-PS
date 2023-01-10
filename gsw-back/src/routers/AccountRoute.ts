import { FastifyApp } from "..";
import { IControllers } from "../controllers/controllers";
import { getNotes } from "../utils/getNotes";

export async function initAccountRoutes(params: {
  app: FastifyApp;
  controllers: IControllers;
}) {
  const { app, controllers } = params;

  app.get<{ Params: { registerId: string } }>(
    "/account/:registerId",
    {
      schema: {
        params: {
          type: "object",
          properties: { registerId: { type: "string" } },
          required: ["registerId"],
        },
      },
    },
    async (req, res) => {
      const { registerId } = req.params;

      try {
        const account = await controllers.account.getOne({ registerId });

        if (!account) {
          res.status(500).send({
            msg: "Account not found",
          });
        } else {
          res.status(200).send(account);
        }
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
      }
    }
  );

  app.post<{ Body: { registerId: string; moneyWithdrawal: number } }>(
    "/account",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            registerId: { type: "string" },
            moneyWithdrawal: { type: "number" },
          },
          required: ["registerId", "moneyWithdrawal"],
        },
      },
    },
    async (req, res) => {
      const { registerId, moneyWithdrawal } = req.body;

      try {
        const account = await controllers.account.getOne({ registerId });

        if (!account) {
          res.status(500).send({
            msg: "Account not found",
          });

          return;
        }

        const cashMachine = await controllers.cashMachine.getOne({
          bank: account.bank,
        });

        if (!cashMachine) {
          res.status(500).send({
            msg: "Cash Machine not found",
          });

          return;
        }

        const notesInfo = getNotes(moneyWithdrawal, cashMachine.moneyNotes);

        const newBalance = Number(account.balance) - notesInfo.total;

        await controllers.account.updateBalance({
          registerId: account.registerId,
          balance: newBalance.toString(),
        });

        await controllers.cashMachine.updateMoneyNotes({
          bank: account.bank,
          moneyNotes: notesInfo.availableNotes,
        });

        res.status(200).send(notesInfo);
        // return notesInfo;÷
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
      }
    }
  );

  console.log(`Initialized /account routes`);
}
