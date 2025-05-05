const express = require('express');
const { Transaction, Payment, User } = require('../models');
const { ensureAuth } = require('../utils/authMiddleware');
const router = express.Router();

router.get('/', ensureAuth, async (req, res) => {
  const groups = await req.user.getGroups();
  if (!groups.length) return res.redirect('/group/join');
  const group = groups[0];
  const members = await group.getUsers();

  // Expenses
  const transactions = await group.getTransactions({ include: [{ model: User, as: 'payer' }] });
  let balances = {};
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  const share = total / members.length;
  members.forEach(m => balances[m.id] = -share);
  transactions.forEach(t => balances[t.payer.id] += t.amount);

  // Payments
  const payments = await group.getPayments({ include: [
    { model: User, as: 'payer' },
    { model: User, as: 'payee' }
  ]});
  payments.forEach(p => {
    balances[p.payer.id] -= p.amount;
    balances[p.payee.id] += p.amount;
  });

  // Prepare display
  const displayBalances = members.map(m => ({
    email: m.email,
    bal: balances[m.id] || 0
  }));

  res.render('bills', { transactions, payments, displayBalances, members, user: req.user });
});

router.post('/', ensureAuth, async (req, res) => {
  const { description, amount } = req.body;
  const group = (await req.user.getGroups())[0];
  await Transaction.create({ description, amount, GroupId: group.id, payerId: req.user.id });
  res.redirect('/bills');
});

router.post('/payment', ensureAuth, async (req, res) => {
  const { payeeId, amount } = req.body;  
  const group = (await req.user.getGroups())[0];
  await Payment.create({ amount, GroupId: group.id, payerId: req.user.id, payeeId });
  res.redirect('/bills');
});

module.exports = router;
