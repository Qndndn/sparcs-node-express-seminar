const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors'); // Cross-Origin Resource Sharing  CORS란 자신이 속하지 않은 다른 도메인, 다른 프로토콜, 혹은 다른 포트에 있는 리소스를 요청하는 cross-origin HTTP 요청 방식
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const washing_machineRouter = require('./routes/washing_machine');
const accountRouter = require('./routes/account');

app.use(cors());
app.use(express.json());

const whitelist = ['http://localhost:8085', 'http://114.206.119.119:8085'];
const corsOptions = {
    origin: (origin, callback) => {
        console.log('[REQUEST-CORS] Request from origin: ', origin);
        if (!origin || whitelist.indexOf(origin) !== -1) callback(null, true)
        else callback(new Error('Not Allowed by CORS'));
    },
    credentials: true,
}

/* DO NOT REMOVE */
/* Configure Environment Variables */

if (process.env.ENVIRONMENT === "DEVELOPMENT") {
	dotenv.config({ path: ".env.development" })
} else {
	dotenv.config({ path: ".env.production" })
}

const port = process.env.EXPRESS_PORT;

app.use('/account', accountRouter);
app.use('/washing_machine', washing_machineRouter);

app.use(cors(corsOptions));

// Connect to MongoDB
const OMongooseOption = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.MONGO_URI, OMongooseOption).then(
    () => { console.log("[Mongoose] Connection Complete!") },
    (err) => { console.log(`[Mongoose] Connection Error: ${ err }`) }
);

app.listen(port, () => {
	console.log(`Express Listening @ http://localhost:${ port }`);
});