const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const ethers = require("ethers")

app.use(cors());
app.use(express.json());

const balances = {
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266": 10000,
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8": 7500,
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC": 3000,
};

// for check in front end
app.get("/", (req, res) => {
    res.send({});
});

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
    const { sender, recipient, amount, signature } = req.body;

    if (!validateSiganture(sender, amount, signature)) {
        return res.status(404).send({ message: "not auth" })
    }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }

  console.log("####################### +1 tx")
  console.table(balances)
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function validateSiganture(sender, amount, signature) {
    if (ethers.utils.verifyMessage(amount.toString(), signature) != sender) {
        return false
    } else {
        return true
    }
}
