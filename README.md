# ATM_Controller

## Project description

ATM Controller implemented which conducts the following features

#### 1. Card & PIN Management
- Each card has an associated PIN number automatcially allocated by bank
- PIN validation for security

#### 2. Account Access
- One card can access multiple bank accounts

#### 3. Account operations
- Check balance: Current amount of money available in account
- Deposit: Adding money to the account (increase balance)
- Withdraw: Taking money away from the account (decrease balance)

#### 4. Transaction history retrieval

- Account being able to store all of the previous transaction records
- Account being able to retrieve all of the previous transaction records

## Overall Architecture
![image](https://github.com/user-attachments/assets/4a251370-0e9e-4675-9f05-9af4e6356297)


- ATM Controller acts as an **interface** for the client request
- **Information storage** and **Main operation (Card verification, Account balance transaction)** is done in Bank for centralized opertion

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yoonseo-han/ATM_Controller
```

2. Install dependencies
```bash
npm install
```

3. Running tests
```bash
npm run test
```

## Project Structure

```
atm-controller/
├── src/
│   ├── models/
│   │   ├── Account.ts
│   │   ├── Card.ts
│   │   └── Transaction.ts
│   ├── service/
│   │   └── BankService.ts
│   └── AtmController.ts
├── tests/
│   └── AtmController.test.ts
├── package.json
└── jest.config.json
```

## Git strategy

### Branch strategy

Branch types

- `main`: Production code
- `feature`: New features
- `test`: test codes added

(Did not include dev since there is no actual serving of code hence minimized branch for simplicity)

### Commit message stratecy

Message types

- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring
- `test`: Adding tests
- `env`: Environment setup and maintenance tasks
- `docs`: Documentation update

### Checking development history

Based on git branch strategy, I have made Pull Requests and documented the main changes within each PR.

#### Detailed procedure is written within each [PR](https://github.com/yoonseo-han/ATM_Controller/pulls?q=is%3Apr+is%3Aclosed)
