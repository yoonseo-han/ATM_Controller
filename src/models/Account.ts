export class Account {
  constructor(
    private readonly id: string,
    private balance: number
  ) {}

  getId(): string {
    return this.id;
  }

  getBalance(): number {
    return this.balance;
  }

  withdraw(amount: number): boolean {
    if (amount <= 0) {
      throw new Error('Invalid amount');
    }
    if (this.balance < amount) {
      return false;
    }
    this.balance -= amount;
    return true;
  }

  deposit(amount: number): boolean { 
    return true;
  }
}