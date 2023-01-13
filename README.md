# How to run this application?

### Requiremens

- Node.js
- Mongodb

The above two needs to be installed on your system

## 1. Server Side

- Go to `/server` folder
- run `npm i`
- create a file with name `.env`

Here is the content of `.env` file

```
PORT=8000
MONGO_URI=mongodb://localhost:27017
JWT_SECRET=$2b$16$epjMdbNSpBmfDATeAwiuz.0pGwdrMb/Vr.H9ypyT1ULIRXeBx5SeG

```

In the `MONGO_URI` filed paste your mongodb uri.

Install the mongodb in your system locally

or

If you don't have mongodb account go and create an account in `mongodb atlas`.

### Start server

Run `npm start` inside the `/server` folder

## 2. Client side

- Go to `/client`
- Run `npm i`

### Start Application

- Run `npm run dev` inside `/client`

Then open http://localhost:3000 on your system
