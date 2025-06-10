import express from 'express';
import dotenv from 'dotenv';
import projectRoutes from "./projectRoutes.js";

dotenv.config();

const port = process.env.APP_PORT;
const app = express();
app.use(express.json());

app.get('/',  (req, res) => {
  res.send('hello from server')
})

app.use("/projects", projectRoutes);

app
	.listen(port, () => {
		console.info(`Server is listening on port ${port}`);
	})
	.on("error", (err) => {
		console.error("Error:", err.message);
	});