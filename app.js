const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect('mongodb://localhost:27017/patientDB', { useNewUrlParser: true, useUnifiedTopology: true });

const patientSchema = new mongoose.Schema( {
    name : String,
    history : String,
    phone : String,
    demographic : String,
    medicine: String
});


const Patient = mongoose.model('Patient', patientSchema)
app.use(bodyParser.urlencoded({ extended : true }));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
})

app.post('/addPatient', (req, res) => {
    const {name, history, phone, demographic, medicine} = req.body;
    const newPatient = new Patient({
        name,
        history,
        phone,
        demographic
    });

    // Save the patient to the database
    newPatient.save((err) => {
        if (err) {
            console.error(err);
            res.send('Error saving patient.');
        } else {
            res.redirect('/');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});