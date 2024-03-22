import { useState } from "react";

import { searchImages } from "../service";
import Image from "./Image";

interface ImageType {
	link: string;
}

interface SearchProps {
	saveImage(url: string): () => void;
	savedImages: string[];
}
const Search = (props: SearchProps) => {
	const { saveImage, savedImages } = props;
	const [searchTerm, setSearchTerm] = useState("");
	const [correctedSearchTerm, setCorrectedSearchTerm] = useState("");
	const [searchDuration, setSearchDuration] = useState("");
	const [images, setImages] = useState<ImageType[]>([]);

	const handleSearch = async (term: string) => {
		setSearchDuration("");
		setCorrectedSearchTerm("");
		setImages([]);
		try {
			const response = await searchImages(term);

			if (response) {
				setSearchDuration(response.data.searchInformation.formattedSearchTime);
				setImages(response.data.items);
				if (response.data.spelling?.correctedQuery) {
					setCorrectedSearchTerm(response.data.spelling.correctedQuery);
				}
			}
		} catch (error) {
			console.error("Error searching images:", error);
		}
	};
	const handleCorrectedSpellingSearch = () => {
		setSearchTerm(correctedSearchTerm);
		handleSearch(correctedSearchTerm);
	};

	return (
		<>
			<div className="input-group">
				<input
					type="text"
					className="form-control"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<button
					className="btn btn-outline-success"
					onClick={() => handleSearch(searchTerm)}
				>
					Search
				</button>
			</div>
			<div className={correctedSearchTerm ? "d-inline" : "d-none"}>
				Did you mean
				<span
					role="button"
					className="fw-bold mx-1"
					onClick={handleCorrectedSpellingSearch}
				>
					{correctedSearchTerm}?
				</span>
			</div>
			<div className={searchDuration ? "d-inline" : "d-none"}>
				Search took {searchDuration} seconds
			</div>

			<div className="row">
				{images.map((image, index) => (
					<div
						key={index}
						className="col-6 col-sm-3 col-md-6 col-lg-4  position-relative"
					>
						<Image
							url={image.link}
							saveImage={saveImage}
							saved={savedImages.includes(image.link)}
						/>
					</div>
				))}
			</div>
		</>
	);
};

export default Search;
