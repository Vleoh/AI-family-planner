const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Family = require('../models/Family');
const User = require('../models/User');

// @route     POST api/family
// @desc      Create a family
// @access    Private
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    try {
      const newFamily = new Family({
        name,
        members: [req.user.id]
      });

      const family = await newFamily.save();

      await User.findByIdAndUpdate(req.user.id, { familyId: family._id });

      res.json(family);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     GET api/family
// @desc      Get user's family
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.familyId) {
      return res.status(400).json({ msg: 'User is not part of a family' });
    }

    const family = await Family.findById(user.familyId).populate('members', ['name', 'email']);
    res.json(family);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add more routes for tasks, events, etc.

module.exports = router;