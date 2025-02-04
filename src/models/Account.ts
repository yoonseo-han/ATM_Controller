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
}