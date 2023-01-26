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

EMAIL=
PASSWORD=

DEPLOY_URL=

```

In the `MONGO_URI` filed paste your mongodb uri.

Install the mongodb in your system locally

or

If you don't have mongodb account go and create an account in `mongodb atlas`.

### Need for Email and Password

This application need to send otp to user through the email provided by you.

In the place of password you need to give app password not the original password.

Refer this link https://support.google.com/mail/answer/185833?hl=en to generate the app password for your google account.

### Changing Admin credentials

Go to /server/data/adminData

```js
const adminData = {
  name: "admin",
  phone: "980980890",
  email: "admin@gmail.com",
  password: "admin@123",
  userType: "admin",
};
```

Don't change the userType

### Start server

Run `npm start` inside the `/server` folder

## 2. Client side

- Go to `/client`
- Run `npm i`

### Start Application

- Run `npm run dev` inside `/client`

Then open http://localhost:3000 on your system
