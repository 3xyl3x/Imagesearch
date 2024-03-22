interface ImageProps {
	url: string;
	saved: boolean;
	saveImage(url: string): () => void;
}
const Image = (props: ImageProps) => {
	const { url, saveImage, saved } = props;
	return (
		<>
			<span
				role="button"
				onClick={() => saveImage(url)}
				className="position-absolute end-0 mt-3 me-2"
			>
				<img
					src={
						saved
							? "src/assets/heart-filled.png"
							: "src/assets/heart-outline.png"
					}
					style={{
						width: "30px",
					}}
				/>
			</span>
			<img
				src={url}
				style={{
					border: "2px solid black",
					margin: "10px",
				}}
				className="img-fluid"
			/>
		</>
	);
};

export default Image;
