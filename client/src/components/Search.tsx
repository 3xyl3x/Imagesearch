import { useState } from "react";

import searchImages from "../service";

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
					<img
						key={index}
						src={image.link}
						alt={image.title}
						style={{
							maxWidth: "300px",
							maxHeight: "300px",
							border: "2px solid black",
							margin: "10px",
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default Search;
