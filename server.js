// Import express and mysql
const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');


// connect to database
dotenv.config();
const database= mysql.createConnection({
    host: process.env.DB_HOST,  
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// testing connection
database.connect((err) => {
    if(err) {
        console.log("error connecting to Mysql",err);
    } else {
        console.log("Connected to database");
    }
})

// Questions
// 1. Retrieve all patients

app.get('/get/patients', (req, res) => {
    const getPatients = 'SELECT patient_id, first_name, last_name,date_of_birth FROM patients';

    database.query(getPatients, (err, result) => {
        if (err) {
            return res.status(500).send("failed to fetch patients");
        } else {
            res.status(200).send(result);
        }

    })


    
})

// 2. Retrieve all providers

app.get('/get/providers',(req,res) =>{
    const getProviders = 'SELECT first_name,last_name,provider_specialty FROM providers';
    database.query(getProviders, (err, result) => {
        if (err) {
            return res.status(500).send("failed to fetch providers");
        } else {
            res.status(200).send(result);
        }
    })
}
)

// 3. Retrieve all patients by their first name
app.get('/get/patients',(req,res) =>{
    const getPatients = 'SELECT first_name FROM patients';
    database.query (getPatients, (err, result) => {
        if (err) {
            return res.status(500).send("failed to fetch providers");
        } else {
            res.status(200).send(result);
        }
    })
}
)

// 4. Retrieve all providers by their specialty

app.get('/get/providers',(req,res) =>{
    const getProviders = 'SELECT * FROM providers';
    database.query(getProviders, (err, result) => {
        if (err) {
            return res.status(500).send("failed to fetch providers");
        } else {
            res.status(200).send(result);
        }
    })
}
)



// listen to server
const PORT = 3800;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})