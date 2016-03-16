const express = require('express');
import User from './user.model';
import jwt from 'jsonwebtoken';

const router = express.Router();

const auth = (req, res) => {
  User.findOne({
    email: req.body.email,
  }, (err, user) => {
    if (err) {
      throw err;
    }

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found',
      });
    } else if (user) {
      if (user.password !== req.body.password) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password',
        });
      } else {
        const token = jwt.sign(user, 'thecakeisalie', {
          expiresIn: 86400,
        });

        res.json({
          success: true,
          message: 'Tokens!',
          token,
        });
      }
    }
  });
};

const create = (req, res) => {
  console.log(req.body);

  User.create(req.body, (err) => {
    if (err) {
      return console.log(err);
    }

    return res.status(201).json({
      success: true,
    });
  });
};

router.post('/auth', auth);
router.post('/create', create);

module.exports = router;
