require("dotenv").config();
const cors = require("cors");
const express = require("express");
const axios = require("axios");
const { searchSchema } = require("./schemas/search.schema.js");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;
const googleApiKey = process.env.GOOGLE_API_KEY || "GOOGLE-API-KEY";
const googleCX = process.env.GOOGLE_CX || "GOOGLE-CX";

app.post("/search-images", async (req, res) => {
	const searchTerm = req.body.searchTerm;
	console.log(`Searching for ${searchTerm}`);

	// Validate the serachterm against the schema
	const { error } = searchSchema.validate({ search: searchTerm });

	// If validation fail, send error
	if (error) {
		return res
			.status(400)
			.json({ success: false, error: error.details[0].message });
	}

	// Try contacting google search with the searchterm
	console.log(
		`https://www.googleapis.com/customsearch/v1?q=${searchTerm}&key=${googleApiKey}&cx=${googleCX}&searchType=image`
	);
	try {
		const response = await axios.get(
			`https://www.googleapis.com/customsearch/v1?q=${searchTerm}&key=${googleApiKey}&cx=${googleCX}&searchType=image`
		);

		const images = response.data.items;
		res.status(200).json({ success: true, images });
	} catch (error) {
		console.error("Error searching images: ", error.message);
		res.status(500).json({ success: false, error: "Internal Server Error" });
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
