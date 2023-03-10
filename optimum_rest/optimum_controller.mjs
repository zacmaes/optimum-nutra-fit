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
const isBodyValid = (name, weight, height, login_username, login_password) => {
    if (name === undefined || weight === undefined || height === undefined || login_username === undefined || login_password === undefined){
        // console.log("missing property")
        return false;
    } else if (name === null || name.trim() === "") {
        // console.log("empty or null string name")
        return false;
    } else if (typeof weight !== "number" || weight <= 0) {
        // console.log("reps NaN or less than 0")
        return false;
    } else if (typeof height !== "number" || height <= 0) {
        // console.log("weight NaN or less than 0")
        return false;
    } else if (login_username === null || login_username.trim() === "") {
        // console.log("unit not kgs or lbs")
        return false;
    } else if (login_password === null || login_password.trim() === "") {
        // console.log("invalid date")
        return false;
    }
    // console.log("EVERYTHING WORKS...")
    return true;
}


// add a date validation function here

// -----------EJS VIEW Routes-------------------
// home page
app.get('/', (req, res) => {
    res.render('landing_page_index.ejs')
});

app.get('/login', (req, res) => {
    res.render('login_index.ejs')
});

app.get('/signupform', (req, res) => {
    res.render('user_creation_index.ejs')
});

app.get('/edituser', (req, res) => {
    res.render('user_edit_form_index.ejs')
});

app.get('/home', (req, res) => {
    res.render('user_homepage.ejs')
});

// --------------Mongo routes-------------------------------
/**
 * Create a new exercise with the name, reps, weight, unit, and date provided in the body
 */
app.post('/users', asyncHandler(async (req, res) => {
    // if (isBodyValid(req.body.name, req.body.weight, req.body.height, req.body.login_username, req.body.login_password)){
        try {
            const user = await users.createUser(req.body.name, req.body.weight, req.body.height, req.body.login_username, req.body.login_password);
            // res.set('Content-Type', 'application/json');
            // res.status(201).json(user);
            res.redirect('/home');
            
        } catch (error) {
            // request error (from A7)
            console.error(error);
            res.status(400).json({ Error: 'Request Failed' });
        }
    // } else {
    //     // Body invalid if isBodyValid() returns False
    //     res.set('Content-Type', 'application/json');
    //     res.status(400).json({ Error: 'Invalid request' });
    // }
    
        
    
    // res.status(501).send({ Error: "Not implemented yet || app.post('/exercises'" });
}));



/**
 * Retrieve All users. 
 */
app.get('/users', asyncHandler(async (req, res) => {
    try {
        const filter = {};
        const result = await users.findUsers(filter);
        res.set('Content-Type', 'application/json');
        res.status(200).json(result);
        
    } catch (error) {
        console.error(error);
        res.status(400).json({ Error: 'Request failed' });
    }
    // res.status(501).send({ Error: "Not implemented yet || app.get('/exercises'" });
}));

/**
 * Retrive one exercise corresponding to the ID provided in the URL.
 */
app.get('/users/:_id', asyncHandler(async (req, res) => {
    try {
        const filter = { _id: req.params._id };
        const result = await users.findUsers(filter);
        // result[0] != null -- checks for undefined as well... might cause issue later??
        if (result[0] != null) {
            res.set('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        } else {
            res.set('Content-Type', 'application/json');
            res.status(404).json({ Error: 'Not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ Error: 'Request failed' });
    }
    // res.status(501).send({ Error: "Not implemented yet || app.get('/exercises/:_id'" });
}));

app.post('/login', asyncHandler(async (req, res) => {
    try {
        const username = req.body.login_username;

        // res.set('Content-Type', 'application/json');
        // res.status(201).json(user);
        // users.verifyUser(username)


        const filter = req.body;
        const result = await users.findUsers(filter);
        console.log(result)
        if (result[0] != null) {
            res.set('Content-Type', 'application/json');
            res.status(200).json(result);
            
        } else {
            res.set('Content-Type', 'application/json');
            res.status(404).json({ Error: 'Not found' });
        }
        //=====
        // result[0] != null -- checks for undefined as well... might cause issue later??
        // if (result[0] != null) {
        //     res.set('Content-Type', 'application/json');
        //     res.status(200).json(result[0]);
        // } else {
        //     res.set('Content-Type', 'application/json');
        //     res.status(404).json({ Error: 'Not found' });
        // }
        
        
    } catch (error) {
        // request error (from A7)
        console.error(error);
        res.status(400).json({ Error: 'Request Failed' });
    }
}));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});