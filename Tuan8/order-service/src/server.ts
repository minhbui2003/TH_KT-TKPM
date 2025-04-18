import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import orderRoutes from "./routes/orderRoute";

dotenv.config();
const app = express();

app.use(express.json()); // Middleware xử lý JSON


app.get("/ping", (req, res) => {
	res.json({
		errorCode: 200,
		errorMessage: "Pong",
		data: null,
	});
});

app.use("/", orderRoutes);
// Kết nối DB và chạy server
const PORT = process.env.PORT || 3007;
connectDB().then(() => {
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
