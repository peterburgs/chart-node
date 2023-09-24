import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
// import { kpis, products, transactions } from "./data/data.js";
// import KPI from "./models/KPI.js";
// import Product from "./models/Product.js";
// import Transaction from "./models/Transaction.js";
import kpiRoute from "./routes/kpi.js";
import productRoute from "./routes/product.js";
import transactionRoute from "./routes/transaction.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(
	helmet.crossOriginResourcePolicy({
		policy: "cross-origin",
	}),
);
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false,
	}),
);
app.use(cors());

app.use("/kpi", kpiRoute);
app.use("/product", productRoute);
app.use("/transaction", transactionRoute);

const PORT = process.env.PORT || 4000;

mongoose
	.connect(process.env.MONGODB_URI)
	.then(async () => {
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT} 🚀🚀🚀`);
		});

		// await mongoose.connection.db.dropDatabase();
		// await KPI.insertMany(kpis);
		// await Product.insertMany(products);
		// await Transaction.insertMany(transactions);
	})
	.catch((error) => console.log(error));
