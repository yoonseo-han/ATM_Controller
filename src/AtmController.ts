import { Account, Card } from "./types";

export class AtmController {
  private currentCard: Card | null;
  private selectedAccount: Account | null;
  
  insertCard(cardNumber: string): boolean {
    return true;
  }

  validatePIN(pinNumber: string): boolean {
    return true;
  }

  selectAccount(accountId: string): boolean {
    return true;
  }

  checkBalance(): number {
    return 0;
  }

  withdraw(amount: number) {

  }

  deposit(amount: number) {
    
  }
}