import { useState } from "react";
import server from "./server";

function Transfer({ wallet }) {
    const [sendAmount, setSendAmount] = useState("123");
    const [recipient, setRecipient] = useState("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");

    const setValue = (setter) => (evt) => setter(evt.target.value);

    async function transfer(evt) {
        evt.preventDefault();

        if (!wallet) {
            alert("First, create your wallet");
            return;
        }
        const payload = {
            sender: wallet.address,
            amount: parseInt(sendAmount),
            recipient,
            signature: await wallet.signMessage(sendAmount)
        }

        try {
            const {
                data: { balance },
            } = await server.post(`send`, payload);
        } catch (ex) {
            if (ex.response && ex.response.data) {
                alert(ex.response.data.message);
            } else {
                console.error(ex);
            }
        }
    }


    return (
        <form className="container transfer" onSubmit={transfer}>
            <h1>Send Transaction</h1>

            <label>
                Send Amount
                <input
                    placeholder="1, 2, 3..."
                    value={sendAmount}
                    onChange={setValue(setSendAmount)}
                ></input>
            </label>

            <label>
                Recipient
                <input
                    placeholder="Type an address, for example: 0x2"
                    value={recipient}
                    onChange={setValue(setRecipient)}
                ></input>
            </label>

            <button className="button" onClick={transfer}>Transfer</button>
        </form>
    );
}

export default Transfer;
