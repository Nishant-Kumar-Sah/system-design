# Calculator Service

A Node.js REST API that provides a credit-based calculator service. Users register, receive 100 credits, and spend credits to perform arithmetic operations.

---

## Features

- User registration with 100 credits on signup
- Arithmetic operations: `+`, `-`, `*`, `/`, `%`
- Credit deduction per operation
- Operation history tracking
- Strategy + Factory design pattern for operations
- In-memory data store (no database required)

---

## Project Structure

```
calculator-service/
├── app.js                  # Entry point
├── constants.js            # Valid operators & credit charges
├── data/
│   └── store.js            # In-memory users & transactions store
├── controller/
│   ├── index.js            # Route definitions
│   ├── userController.js   # Register & Login handlers
│   └── operationController.js  # Operation handler
└── strategy/
    ├── baseOperation.js        # Base class for all strategies
    ├── addStrategy.js
    ├── subtractionStrategy.js
    ├── multiplicationStrategy.js
    ├── divisionStrategy.js
    ├── modulusStrategy.js
    └── operationFactory.js     # Factory to resolve strategy by operator
```

---

## Getting Started

### Prerequisites
- Node.js v14+
- npm

### Installation

```bash
git clone <your-repo-url>
cd calculator-service
npm install
```

### Run the server

```bash
node app.js
```

Server runs at: `http://localhost:3005`

---

## API Endpoints

### Health Check
```
GET /health
```
**Response:**
```json
{ "status": "service is up and running" }
```

---

### Register User
```
POST /calculator-service/user/register
```
**Request Body:**
```json
{
  "username": "john",
  "password": "pass123"
}
```
**Response:**
```json
{ "message": "User Registered Successfully" }
```

---

### Login
```
POST /calculator-service/user/login
```
**Request Body:**
```json
{
  "username": "john",
  "password": "pass123"
}
```
**Response:**
```json
{ "message": "User Logged in Successfully" }
```

---

### Perform Operation
```
POST /calculator-service/api/operation
```
**Request Body:**
```json
{
  "username": "john",
  "operator": "+",
  "operands": [5, 3]
}
```
**Response:**
```json
{
  "message": "Operation Successfull",
  "Result": 8,
  "Credits Remaining": 99
}
```

---

## Credit System

Each operation deducts credits from the user's balance:

| Operation | Symbol | Credit Cost |
|-----------|--------|-------------|
| Addition       | `+` | 1 |
| Subtraction    | `-` | 2 |
| Multiplication | `*` | 3 |
| Division       | `/` | 4 |
| Modulus        | `%` | 5 |

If a user has insufficient credits, the operation is rejected with a `403` error.

---

## Design Patterns Used

### Strategy Pattern
Each arithmetic operation is implemented as a separate class extending `BaseOperation`. This keeps business logic isolated and makes it easy to add new operations without modifying existing code.

### Factory Pattern
`operationFactory.js` resolves the correct strategy class based on the operator string, so the controller never needs to know which class to instantiate.

### Open/Closed Principle
To add a new operation (e.g., `^` for power):
1. Add charge to `constants.js`
2. Create `powerStrategy.js`
3. Register it in `operationFactory.js`

No other files need to change.

---

## Error Handling

| Status | Meaning |
|--------|---------|
| `400` | Missing or invalid request fields |
| `401` | Invalid credentials or user not found |
| `403` | Insufficient credits |
| `500` | Unexpected server error |

---

## Notes

- Data is stored **in-memory** — all data resets on server restart
- Passwords are stored as plain text (not suitable for production)
- No authentication middleware — username is passed in the request body
