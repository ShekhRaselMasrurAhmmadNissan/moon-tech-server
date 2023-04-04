const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@moontech.db0boi4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

const run = async () => {
	try {
		const db = client.db('MoonTech');
		const ProductCollection = db.collection('Products');

		app.get('/products', async (req, res) => {
			const cursor = ProductCollection.find({});
			const product = await cursor.toArray();

			res.send({ status: true, data: product });
		});

		app.post('/product', async (req, res) => {
			const product = req.body;

			const result = await ProductCollection.insertOne(product);

			res.send(result);
		});

		app.delete('/product/:id', async (req, res) => {
			const id = req.params.id;

			const result = await ProductCollection.deleteOne({
				_id: new ObjectId(id),
			});
			res.send(result);
		});
	} finally {
	}
};

run().catch((err) => console.log(err));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`The app is running at port ${port}`);
});
