import 'dotenv/config';
import * as users from './optimum_model.mjs';
import express from 'express';
import asyncHandler from 'express-async-handler';


//const PORT = process.env.PORT;
const PORT = 3000

const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// add a body validation function here

// add a date validation function here

// home page
app.get('/', (req, res) => {
    res.render('landing_page_index.ejs')
})

app.get('/signupform', (req, res) => {
    try{
        res.render('user_creation_index.ejs')
    }
    catch{
        error => console.error(error)
    }
})

app.get('/signup_send', (req, res) => {
    res.send('/home-page/index.html')
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});