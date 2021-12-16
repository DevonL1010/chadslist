const express = require('express');
const { claim, unclaim } = require('../controllers/claim.js');
const updatePrice = require('../controllers/updatePrice.js');
const router = express.Router();

router.post('/', claim);
router.delete('/', unclaim);
router.put('/', updatePrice);

module.exports = router;