import { AtmController } from "../src/AtmController";

describe ('ATM Controller', () => {
  let atm: AtmController;
  
  beforeEach(() => {
    atm = new AtmController();
  });

  test('Should handle card insertion and verify card', () => {
    expect(atm.insertCard('1234-5678')).toBe(true);
    expect(atm.insertCard('Not a card')).toBe(true);
  });

  test('Should verify PIN input', () => {
    atm.insertCard('1234-5678');
    expect(atm.validatePin('1234')).toBe(true);
    expect(atm.validatePin('1111')).toBe(false);
  });

  test('Should handle account selection', () => {
    atm.insertCard('1234-5678');
    atm.validatePin('1234');

    expect(atm.selectAccount('1')).toBe(true);
    expect(atm.selectAccount('Invalid Account')).toBe(false);
  });

  test('Should perform balance check correctly', async () => {
    atm.insertCard('1234-5678');
    atm.validatePin('1234');
    atm.selectAccount('1');
    
    expect(atm.checkBalance()).toBe(500);
  });

  test('Should perform withdrawal correctly', async () => {
    atm.insertCard('1234-5678');
    atm.validatePin('1234');
    atm.selectAccount('1');
    
    expect(atm.withdraw(500)).toBe(true);
    expect(atm.checkBalance()).toBe(0);
  });

  test('Should perform deposit correctly', async () => {
    atm.insertCard('1234-5678');
    atm.validatePin('1234');
    atm.selectAccount('1');
    
    expect(atm.deposit(500)).toBe(true);
    expect(atm.checkBalance()).toBe(1000);
  });
});