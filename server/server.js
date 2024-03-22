require("dotenv").config();
const cors = require("cors");
const express = require("express");
const fs = require("fs").promises;
const md5 = require("md5");
const { saveImageSchema, removeImageSchema } = require("./schemas.js");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

app.get("/", async (req, res) => {
	return res.json({ response: "Server is running" });
});

app.get("/images/:userEmail", async (req, res) => {
	const { userEmail } = req.params;
	const filePath = `savedImagesLists/${md5(userEmail)}.json`;
	try {
		const images = await fs.readFile(filePath, "utf8").then(JSON.parse);
		return res.json(images);
	} catch (error) {
		return res.json([]);
	}
});

app.post("/images/:userEmail/save", async (req, res) => {
	try {
		const { userEmail } = req.params;
		const { imageUrl } = req.body;
		saveImageSchema.validate({ userEmail, imageUrl });

		const filePath = `savedImagesLists/${md5(userEmail)}.json`;
		let images = [];
		try {
			images = JSON.parse(await fs.readFile(filePath, "utf8"));
		} catch (error) {}

		images.push(imageUrl);
		await fs.writeFile(filePath, JSON.stringify(images));
		return res.json({ success: true, message: "Image saved successfully" });
	} catch (error) {
		return res.status(400).json({ success: false, error: error.message });
	}
});

app.post("/images/:userEmail/remove", async (req, res) => {
	try {
		const { userEmail } = req.params;
		const { imageUrl } = req.body;
		removeImageSchema.validate({ userEmail, imageUrl });

		const filePath = `savedImagesLists/${md5(userEmail)}.json`;
		let images = [];
		try {
			images = JSON.parse(await fs.readFile(filePath, "utf8"));
			images = images.filter((image) => image !== imageUrl);
			await fs.writeFile(filePath, JSON.stringify(images));
		} catch (error) {}

		return res.json({ success: true, message: "Image removed successfully" });
	} catch (error) {
		return res.status(400).json({ success: false, error: error.message });
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
