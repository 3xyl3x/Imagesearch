import { useState } from "react";

import searchImages from "../service";
import Image from "./Image";

const Search = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [images, setImages] = useState([]);

	const handleSearch = async () => {
		try {
			const response = await searchImages(searchTerm);

			console.log(response);
			setImages(response);
		} catch (error) {
			console.error("Error searching images:", error);
		}
	};

	return (
		<div>
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<button onClick={handleSearch}>Search</button>

			<div>
				{images.map((image, index) => (
					<Image key={index} url={image.link} />
				))}
			</div>
		</div>
	);
};

export default Search;
