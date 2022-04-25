const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

function verifyIfAccountExists(req, res, next) {
  const { cpf } = req.headers;
  const customer = customers.find((customer) => customer.cpf === cpf);

  req.customer = customer;
  if (!customer) {
    return res.status(400).json({ error: 'Customer not found' });
  } else {
    return next();
  }
}
function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === 'credit') {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);
  return balance;
}
const customers = [];

app.post('/account', (req, res) => {
  const { cpf, name } = req.body;
  const customerAlredyExists = customers.some(
    (customer) => customer.cpf === cpf,
  );

  if (customerAlredyExists) {
    return res.status(400).json({ error: 'customer alredy exists' });
  } else {
    customers.push({
      id: uuidv4(),
      name,
      cpf,
      statement: [],
    });
    return res.status(201).send();
  }
});

app.use(verifyIfAccountExists);

app.get('/statement', (req, res) => {
  const { customer } = req;
  return res.json(customer.statement);
});

app.post('/deposit', (req, res) => {
  const { customer } = req;
  const { description, amount } = req.body;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit',
  };

  customer.statement.push(statementOperation);
  return res.status(201).send();
});

app.post('/withdraw', (req, res) => {
  const { amount } = req.body;
  const { customer } = req;

  const balance = getBalance(customer.statement);
  if (balance < amount) {
    return res.status(400).json({ error: 'Insufficient Funds' });
  } else {
    const statementOperation = {
      amount,
      created_at: new Date(),
      type: 'debit',
    };
    customer.statement.push(statementOperation);
    return res.status(201).send();
  }
});

app.get('/statement/date', (req, res) => {
  const { customer } = req;
  const { date } = req.query;
  const dateFormat = new Date(date + ' 00:00');
  const statement = customer.statement.filter(
    (statement) =>
      statement.created_at.toDateString() ===
      new Date(dateFormat).toDateString(),
  );

  return res.json(statement);
});

app.put('/account', (req, res) => {
  const { name } = req.body;
  const { customer } = req;

  customer.name = name;
  return res.status(201).send();
});

app.get('/account', (req, res) => {
  const { customer } = req;
  return res.json(customer);
});

app.delete('/account', (req, res) => {
  const { customer } = req;
  customers.splice(customer, 1);
  return res.status(200).json(customers);
});

app.get('/balance', (req, res) => {
  const { customer } = req;
  const balance = getBalance(customer.statement);
  return res.json(balance);
});

app.listen(3000);
