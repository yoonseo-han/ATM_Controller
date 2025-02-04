import { AtmController } from "../src/AtmController";
import { BankService } from "../src/service/BankService";

describe('ATM Controller', () => {
  let atm: AtmController;
  let bankService: BankService;
  
  beforeEach(() => {
    bankService = new BankService();
    atm = new AtmController(bankService);
  });

  describe('Card Insertion', () => {
    test('Should accept valid card', () => {
      expect(atm.insertCard('1234-5678')).toBe(true);
    });

    test('Should reject invalid card', () => {
      expect(atm.insertCard('invalid-card')).toBe(false);
    });

    test('Should reject empty card number', () => {
      expect(atm.insertCard('')).toBe(false);
    });

    test('Should reject multiple card insertions', () => {
      expect(atm.insertCard('1234-5678')).toBe(true);
      expect(() => atm.insertCard('8765-4321')).toThrow('Card already inserted. Please remove card first..');
    });
  });

  describe('PIN Validation', () => {
    beforeEach(() => {
      atm.insertCard('1234-5678');
    });

    test('Should accept correct PIN', () => {
      expect(atm.validatePIN('1234')).toBe(true);
    });

    test('Should reject incorrect PIN', () => {
      expect(atm.validatePIN('1111')).toBe(false);
    });

    test('Should reject empty PIN', () => {
      expect(atm.validatePIN('')).toBe(false);
    });

    test('Should handle PIN validation before card insertion', () => {
      const newAtm = new AtmController(bankService);
      expect(newAtm.validatePIN('1234')).toBe(false);
    });
  });

  describe('Account Operations', () => {
    beforeEach(() => {
      atm.insertCard('1234-5678');
      atm.validatePIN('1234');
    });

    test('Should retrieve correct account information', () => {
      const accounts = atm.getAccounts();
      expect(accounts).toHaveLength(1);
      expect(accounts[0]).toEqual({
        id: '1',
        balance: 500
      });
    });

    test('Should handle account selection correctly', () => {
      expect(atm.selectAccount('1')).toBe(true);
      expect(atm.selectAccount('non-existent')).toBe(false);
    });

    test('Should not allow account operations without PIN validation', () => {
      const newAtm = new AtmController(bankService);
      newAtm.insertCard('1234-5678');
      expect(() => newAtm.getAccounts()).toThrow();
    });
  });

  describe('Balance Operations', () => {
    beforeEach(() => {
      atm.insertCard('1234-5678');
      atm.validatePIN('1234');
      atm.selectAccount('1');
    });

    test('Should show correct initial balance', () => {
      expect(atm.checkBalance()).toBe(500);
    });

    test('Should not show balance without account selection', () => {
      const newAtm = new AtmController(bankService);
      newAtm.insertCard('1234-5678');
      newAtm.validatePIN('1234');
      expect(() => newAtm.checkBalance()).toThrow();
    });
  });

  describe('Withdrawal Operations', () => {
    beforeEach(() => {
      atm.insertCard('1234-5678');
      atm.validatePIN('1234');
      atm.selectAccount('1');
    });

    test('Should allow valid withdrawal', () => {
      expect(atm.withdraw(300)).toBe(true);
      expect(atm.checkBalance()).toBe(200);
    });

    test('Should reject withdrawal exceeding balance', () => {
      expect(atm.withdraw(600)).toBe(false);
      expect(atm.checkBalance()).toBe(500);
    });

    test('Should reject negative withdrawal amount', () => {
      expect(atm.withdraw(-100)).toBe(false);
      expect(atm.checkBalance()).toBe(500);
    });

    test('Should handle multiple withdrawals', () => {
      expect(atm.withdraw(200)).toBe(true);
      expect(atm.withdraw(200)).toBe(true);
      expect(atm.withdraw(200)).toBe(false);
      expect(atm.checkBalance()).toBe(100);
    });
  });

  describe('Deposit Operations', () => {
    beforeEach(() => {
      atm.insertCard('1234-5678');
      atm.validatePIN('1234');
      atm.selectAccount('1');
    });

    test('Should allow valid deposit', () => {
      expect(atm.deposit(300)).toBe(true);
      expect(atm.checkBalance()).toBe(800);
    });

    test('Should reject negative deposit amount', () => {
      expect(atm.deposit(-100)).toBe(false);
      expect(atm.checkBalance()).toBe(500);
    });

    test('Should handle multiple deposits', () => {
      expect(atm.deposit(200)).toBe(true);
      expect(atm.deposit(300)).toBe(true);
      expect(atm.checkBalance()).toBe(1000);
    });

    test('Should handle zero deposit amount', () => {
      expect(atm.deposit(0)).toBe(false);
      expect(atm.checkBalance()).toBe(500);
    });
  });

  describe('Transaction Flow', () => {
    beforeEach(() => {
      atm.insertCard('1234-5678');
      atm.validatePIN('1234');
      atm.selectAccount('1');
    });

    test('Should handle mixed transactions correctly', () => {
      expect(atm.deposit(500)).toBe(true);  // Balance: 1000
      expect(atm.withdraw(300)).toBe(true); // Balance: 700
      expect(atm.deposit(200)).toBe(true);  // Balance: 900
      expect(atm.withdraw(900)).toBe(true); // Balance: 0
      expect(atm.withdraw(100)).toBe(false); // Insufficient funds
      expect(atm.checkBalance()).toBe(0);
    });
  });
});