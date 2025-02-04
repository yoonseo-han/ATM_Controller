import { BankService } from "./service/BankService";
import { Account } from "./models/Account";
import { Card } from "./models/Card";

export class AtmController {
  private currentCard: Card | null;
  private selectedAccount: Account | null;
  private isPinValidated: boolean | null;

  constructor(
    private bankService: BankService,
  ) {}
  
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

    this.isPinValidated = this.bankService.validatePin(pinNumber);
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

  withdraw(amount: number): boolean {
    if(!this.selectedAccount) {
      throw new Error('No account selected');
    }
    return this.selectedAccount.withdraw(amount);
  }

  deposit(amount: number): boolean {
    if(!this.selectedAccount) {
      throw new Error('No account selected');
    }
    return this.selectedAccount.deposit(amount);
  }

  ejectCard() {
    this.currentCard = null;
    this.selectedAccount = null;
    this.isPinValidated = false;
  }
}