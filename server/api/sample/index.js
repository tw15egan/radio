const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const currentShow = (req, res) => {
  const data = require('../../data/currentEpisode.json');
  return res.json(data);
};

router.get('/currentShow', currentShow);

module.exports = router;
