import { BankService } from "./service/BankService";
import { Account } from "./models/Account";
import { Card } from "./models/Card";

export class AtmController {
  private currentCard: Card | null;
  private isPinValidated: boolean | null;
  private availableAccounts: Account[] = [];
  private selectedAccount: Account | null;
  private isCardInserted: boolean = false;

  constructor(
    private bankService: BankService,
  ) {}
  
  insertCard(cardNumber: string): boolean {
    if(this.isCardInserted) {
      throw new Error('Card already inserted. Please remove card first..');
    }

    const card = this.bankService.validateCard(cardNumber);

    if(card) {
      this.isCardInserted = true;
      this.currentCard = card;
      return true;
    }

    return false;
  }

  validatePIN(pinNumber: string): boolean {
    if (!this.currentCard) {
      throw new Error('No card inserted');
    }

    const isValid = this.bankService.validatePin(this.currentCard.cardNumber, pinNumber);
    if (isValid) {
        this.currentCard.pin = pinNumber;
        this.isPinValidated = true;
        this.availableAccounts = this.bankService.getAccounts(this.currentCard.cardNumber);
        return true;
    }
    return false;
  }

  getAccounts(): Account[] {
    if (!this.currentCard || !this.isPinValidated) {
        throw new Error('Card not inserted or PIN not validated');
    }
    return this.availableAccounts;
}

  selectAccount(accountId: string): boolean {
    if (!this.currentCard || !this.isPinValidated) {
      throw new Error('Card not inserted or PIN not validated');
    }

    const account = this.availableAccounts.find(acc => acc.id === accountId);
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
    return this.bankService.getAccountBalance(this.selectedAccount.id);
  }

  withdraw(amount: number): boolean {
    if(!this.selectedAccount) {
      throw new Error('No account selected');
    }
    return this.bankService.withdraw(this.selectedAccount.id, amount);
  }

  deposit(amount: number): boolean {
    if(!this.selectedAccount) {
      throw new Error('No account selected');
    }
    return this.bankService.deposit(this.selectedAccount.id, amount);
  }

  ejectCard() {
    this.currentCard = null;
    this.selectedAccount = null;
    this.isPinValidated = false;
    this.availableAccounts = [];
    this.isCardInserted = false;
  }
}