const express = require('express');
const { Task, User } = require('../models');
const { ensureAuth } = require('../utils/authMiddleware');
const router = express.Router();
const moment = require('moment');

router.get('/', ensureAuth, async (req, res) => {
  const group = (await req.user.getGroups())[0];
  if (!group) return res.redirect('/group/join');
  const members = await group.getUsers();
  const tasks = await group.getTasks({ include: [{ model: User, as: 'starter' }] });
  const view = req.query.view || 'all';

  const assignments = tasks.map(task => {
    // next occurrence logic
    const today = moment();
    let nextDate = moment().day(task.dayOfWeek);
    if (nextDate.isBefore(today)) nextDate.add(1, 'weeks');

    // rotation based on starter
    const startIdx = members.findIndex(m => m.id === task.startUserId);
    const weeksSince = Math.floor(today.diff(moment(task.createdAt), 'weeks'));
    const assigned = members[(startIdx + weeksSince) % members.length];

    return { task, assigned, nextDate: nextDate.format('YYYY-MM-DD') };
  });

  const filtered = view === 'self'
    ? assignments.filter(a => a.assigned.id === req.user.id)
    : assignments;

  res.render('chores', { assignments: filtered, members, view });
});

router.post('/', ensureAuth, async (req, res) => {
  const { name, dayOfWeek, occurrencesPerWeek, startUserId } = req.body;
  const group = (await req.user.getGroups())[0];
  await Task.create({ name, dayOfWeek, occurrencesPerWeek, startUserId, GroupId: group.id });
  res.redirect('/chores');
});

module.exports = router;
