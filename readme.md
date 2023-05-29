## 🏁 Your Goal: ECDSA

This project begins with a client that is allowed to transfer any funds from any account to another account. That's not very secure. By applying digital signatures we can require that only the user with the appropriate private key can create a signature that will allow them to move funds from one account to the other. Then, the server can verify the signature to move funds from one account to another.

- Incorporate Public Key Cryptography so transfers can only be completed with a valid signature
- The person sending the transaction should have to verify that they own the private key corresponding to the address that is sending funds

### DEMO

https://www.loom.com/share/d91a50611d8149ffb967da462e9f8d99
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 