import { IAccount } from "../App";
import fetch from "isomorphic-fetch";

interface IMoneyWithdraw {
  total: number;
  rest: number;
  availableNotes: {
    "100": number;
    "50": number;
    "20": number;
    "10": number;
  };
  notes: {
    "100": number;
    "50": number;
    "20": number;
    "10": number;
  };
}

export function accountAPI() {
  async function getAccount(registerId: number) {
    const response = await fetch(`http://localhost:8082/account/${registerId}`);

    if (response.status === 200) {
      const data = await response.json();

      return data as IAccount;
    } else return null;
  }

  async function moneyWithdraw(registerId: string, value: number) {
    const response = await fetch(`http://localhost:8082/account`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        registerId: registerId,
        moneyWithdrawal: value,
      }),
    });

    if (response.status === 200) {
      const data = await response.json();

      return data as IMoneyWithdraw;
    } else return null;
  }

  return {
    getAccount,
    moneyWithdraw,
  };
}
