const Claim = require('../db/models/Claim.js');
const claim = async (req, res) => {
  const claimerId = req.body.claimantId;
  const itemId = req.body.itemId;
  const status = 'Ongoing';
  const UserId = req.body.UserId;
  const claim = await Claim.create({ claimerId, itemId, status, UserId })
    .catch(err => console.log(err));
  res.status(201).end();
};

module.exports = {
  claim,
};