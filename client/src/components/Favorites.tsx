import Image from "./Image";

interface favoriteProps {
	savedImages: string[];
	saveImage(url: string): () => void;
}

const Favorites = (props: favoriteProps) => {
	const { savedImages, saveImage } = props;

	return (
		<div className="row">
			{savedImages.map((image, index) => (
				<div
					key={index}
					className="col-6 col-sm-3 col-md-12 col-lg-6 position-relative"
				>
					<Image url={image} saveImage={saveImage} saved={true} />
				</div>
			))}
		</div>
	);
};

export default Favorites;
