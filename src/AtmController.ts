import { Account } from "./models/Account";
import { Card } from "./models/Card";

export class AtmController {
  private currentCard: Card | null;
  private selectedAccount: Account | null;

  private readonly TEST_CARDS: Card[] = [
    new Card('1234-5678', '1234', [
        new Account('1', 500),
        new Account('2', 1000)
    ])
  ];
  
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