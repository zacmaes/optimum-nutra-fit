import 'dotenv/config';
import * as users from './optimum_model.mjs';
import express from 'express';
import asyncHandler from 'express-async-handler';


const PORT = process.env.PORT;

const app = express();

app.use(express.json());

// add a body validation function here

// add a date validation function here

// hello world test
app.get('/', (req, res) => {
    res.send('Hello World!')
  })



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});