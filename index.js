const express = require('express');
const cors = require('cors');
const products = require('./Data/products.json');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send(products);
});

app.listen(port, () => {
	console.log(`The app is running at port ${port}`);
});
