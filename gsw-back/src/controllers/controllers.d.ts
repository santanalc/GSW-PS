import { initAccountController } from "./AccountController";
import { initCashMachineController } from "./CashMachineController";

export interface IControllers {
  account: Awaited<ReturnType<typeof initAccountController>>;
  cashMachine: Awaited<ReturnType<typeof initCashMachineController>>;
}
