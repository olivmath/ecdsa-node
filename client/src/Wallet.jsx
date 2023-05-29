import { useState } from "react";
import server from "./server";
import { ethers } from "ethers";



function Wallet({ setWallet }) {
    const [balance, setBalance] = useState(0);
    const [privateKey, setPrivateKey] = useState("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
    const [address, setAddress] = useState("")

    const createWallet = async () => {
        const wallet = new ethers.Wallet(privateKey);
        setAddress(wallet.address);
        setWallet(wallet)
        await getBalance()
    }

    const onPrivateKeyChange = (evt) => {
        setPrivateKey(evt.target.value);
    }

    const onAddressChange = (evt) => {
        setAddress(evt.target.value);
    }

    const getBalance = async () => {
        if (address) {
            try {
                const {
                    data: { balance },
                } = await server.get(`balance/${address}`);
                setBalance(balance);
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
    }

    return (
        <div className="container wallet">
            <h1>Your Wallet</h1>

            <label>
                Private Key
                <input placeholder="Type an private key with 32 bytes" value={privateKey} onChange={onPrivateKeyChange}></input>
                <button className="button" onClick={createWallet}>Create Wallet</button>
            </label>

            <label>
                Wallet Address
                <input placeholder="Type an address, for example: 0x1" value={address} onChange={onAddressChange}></input>
                <button className="button" onClick={getBalance}>Get Balance</button>
            </label>

            <div className="balance">Balance: {balance}</div>
        </div>
    );
}

export default Wallet;
