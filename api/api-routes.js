import { Router } from 'express';
import instance from './app.js';

const router = Router();

//let info  = " ";

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/create', async(req, res) => {
    const data = req.body;
    if (data && data.inputMsg) {
        //info = data.inputMsg;
        const txn = await instance.store(data.inputMsg)
        console.log(txn)
        res.status(201).json({"Success": txn});
    } else {
        res.status(400).json({"error": "Invalid request payload"});
    }
});

router.get('/read', async (req, res) => {
    const result = await instance.retrieve()
    res.json(result);
});

export default router;
