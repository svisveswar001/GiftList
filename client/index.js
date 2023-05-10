const readline = require('readline');
const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const getProof = (name) => {
  const merkleTree = new MerkleTree(niceList);
  const index = niceList.findIndex((n) => n === name);

  return merkleTree.getProof(index);
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  rl.question(`Give me your name to check the list: `, async (name) => {
    const proof = getProof(name);
    const body = { proof, name };

    const { data: gift } = await axios.post(`${serverUrl}/gift`, body);

    console.log(`\n${gift}`);
    rl.close();
  });

  rl.on('close', () => {
    console.log('\nSee you next time !!!');
    process.exit(0);
  });
})();