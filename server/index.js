const express = require('express');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

const MERKLE_ROOT = new MerkleTree(niceList).getRoot();

app.post('/gift', (req, res) => {
  const { proof, name } = req.body;

  if (verifyProof(proof, name, MERKLE_ROOT)) {
    res.send(`Hey ${name}, you got a toy robot!`);
  } else {
    res.send(`${name}, you aren't on the list :(`);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
