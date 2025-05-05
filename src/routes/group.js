const express = require('express');
const { Group, GroupUser } = require('../models');
const { ensureAuth } = require('../utils/authMiddleware');
const crypto = require('crypto');
const router = express.Router();

router.get('/join', ensureAuth, (req, res) => res.render('join_group'));

router.post('/join', ensureAuth, async (req, res) => {
  const { code } = req.body;
  const group = await Group.findOne({ where: { code } });
  if (!group) return res.send('Group not found');
  await GroupUser.findOrCreate({ where: { GroupId: group.id, UserId: req.user.id } });
  res.redirect('/dashboard');
});

router.post('/create', ensureAuth, async (req, res) => {
  const code = crypto.randomBytes(5).toString('hex');
  const group = await Group.create({ name: req.body.name || 'My Group', code });
  await GroupUser.create({ GroupId: group.id, UserId: req.user.id });
  res.send(`Group created. Code: ${code}. <a href="/dashboard">Go to Dashboard</a>`);
});

module.exports = router;
