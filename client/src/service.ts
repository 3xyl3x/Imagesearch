import axios from "axios";

const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY || "GOOGLE-API-KEY";
const googleCX = import.meta.env.VITE_GOOGLE_CX || "GOOGLE-CX";

export const searchImages = async (searchTerm: string) => {
	try {
		const response = await axios.get(
			`https://www.googleapis.com/customsearch/v1?q=${searchTerm}&key=${googleApiKey}&cx=${googleCX}&searchType=image`
		);
		return response;
	} catch (error) {
		console.error("Error searching images:", error);
		throw error;
	}
};

export const loadImagesFromServer = async (userEmail: string) => {
	try {
		const response = await axios.get(
			`http://localhost:3001/images/${userEmail}`
		);
		return response.data;
	} catch (error) {
		console.error("Error loading images from server:", error);
		throw error;
	}
};

export const saveImageToServer = async (
	userEmail: string,
	imageUrl: string
) => {
	try {
		const response = await axios.post(
			`http://localhost:3001/images/${userEmail}/save`,
			{
				imageUrl,
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error saving image to server:", error);
		throw error;
	}
};

export const removeImageFromServer = async (
	userEmail: string,
	imageUrl: string
) => {
	try {
		const response = await axios.post(
			`http://localhost:3001/images/${userEmail}/remove`,
			{
				imageUrl,
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error removing image from server:", error);
		throw error;
	}
};
