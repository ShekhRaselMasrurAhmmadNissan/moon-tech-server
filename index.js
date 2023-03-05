const express = require('express');
const cors = require('cors');
const products = require('./Data/products.json');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@moontech.db0boi4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

app.get('/products', (req, res) => {
	res.send(products);
});

app.listen(port, () => {
	console.log(`The app is running at port ${port}`);
});
