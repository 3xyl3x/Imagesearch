import axios from "axios";

const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY || "GOOGLE-API-KEY";
const googleCX = import.meta.env.VITE_GOOGLE_CX || "GOOGLE-CX";

const searchImages = async (searchTerm: string) => {
	try {
		const response = await axios.get(
			`https://www.googleapis.com/customsearch/v1?q=${searchTerm}&key=${googleApiKey}&cx=${googleCX}&searchType=image`
		);

		return response;
	} catch (error) {
		console.error("Error searching images");
	}
};

export default searchImages;
