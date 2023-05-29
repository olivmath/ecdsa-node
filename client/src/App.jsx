import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState, useEffect } from "react";
import server from "./server";


function App() {
    const [wallet, setWallet] = useState();
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        async function connect() {
            server.get("/").then(r => {
                setConnected(r.statusText === "OK");
            })
        }
        connect();
    }, []);

    return (
        <div className="app">
            {connected ?
                <>
                    <Wallet
                        wallet={wallet}
                        setWallet={setWallet}
                    />
                    <Transfer wallet={wallet} />
                </>
                :
                <h1 style={{ color: "#ffffff" }}>Start your server</h1>
            }
        </div>
    );
}

export default App;
