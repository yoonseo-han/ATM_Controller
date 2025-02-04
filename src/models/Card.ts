export class Card {
  constructor(
    private readonly cardNumber: string,
    private readonly pin: string
  ) {}

  getCardNumber(): string {
    return this.cardNumber;
  }

  validatePin(inputPin: string): boolean {
    return this.pin === inputPin;
  }
}