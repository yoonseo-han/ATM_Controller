import { Account } from "./models/Account";
import { Card } from "./models/Card";

export class AtmController {
  private currentCard: Card | null;
  private selectedAccount: Account | null;
  private isPinValidated: boolean | null;

  private readonly TEST_CARDS: Card[] = [
    new Card('1234-5678', '1234', [
        new Account('1', 500),
        new Account('2', 1000)
    ])
  ];
  
  insertCard(cardNumber: string): boolean {
    const card = this.TEST_CARDS.find(curCard => curCard.getCardNumber() === cardNumber);

    if(card) {
      this.currentCard = card;
      return true;
    }

    return false;
  }

  validatePIN(pinNumber: string): boolean {
    if (!this.currentCard) {
      throw new Error('No card inserted');
    }

    this.isPinValidated = this.currentCard.validatePin(pinNumber);
    return this.isPinValidated;
  }

  selectAccount(accountId: string): boolean {
    if (!this.currentCard || !this.isPinValidated) {
      throw new Error('Card not inserted or PIN not validated');
    }

    const account = this.currentCard.getAccount(accountId);
    if (account) {
      this.selectedAccount = account;
      return true;
    }
    return false;
  }

  checkBalance(): number {
    if(!this.selectedAccount) {
      throw new Error('No account selected');
    }
    return this.selectedAccount.getBalance();
  }

  withdraw(amount: number) {
    if(!this.selectedAccount) {
      throw new Error('No account selected');
    }
    return this.selectedAccount.withdraw(amount);
  }

  deposit(amount: number) {
    if(!this.selectedAccount) {
      throw new Error('No account selected');
    }
    return this.selectedAccount.deposit(amount);
  }
}