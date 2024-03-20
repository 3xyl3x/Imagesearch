interface ImageProps {
	url: string;
}
const Image = (props: ImageProps) => {
	const { url } = props;
	return (
		<div>
			<img
				src={url}
				style={{
					maxWidth: "300px",
					maxHeight: "300px",
					border: "2px solid black",
					margin: "10px",
				}}
			/>
		</div>
	);
};

export default Image;
