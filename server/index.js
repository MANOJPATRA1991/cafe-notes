const express = require('express');
const nedb = require('nedb');
const rest = require('express-nedb-rest');
const cors = require('cors');

// Setup express app
const app = express();

// Create  NEDB datastore
const datastore = new nedb({ 
    filename: "coffees.db",  
    autoload: true 
});

// Create rest api router and connect it to datastore  
let restApi = rest();
restApi.addDatastore('coffees', datastore);

// Allow Cross Origin Resource Sharing
app.use(cors());

// Setup express server to serve rest service
app.use('/', restApi);

app.get('/push', (req, res) => {
    res.send({
        push: "Get push notification"
    });
})

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});