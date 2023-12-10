import express from 'express';
import cors from 'cors';
import apiroutes from './api-routes.js';
import { json } from 'express';
import logger from "morgan";

const listen_port = 8000;
const app = express();
app.use(cors({ origin: '*' }));

app.use(json());
app.use(logger("dev"));

app.use('/', apiroutes);


app.listen(listen_port, () => {
    console.log(`Listening to port ${listen_port}`);
});
