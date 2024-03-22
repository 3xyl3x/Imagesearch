import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import Search from "./components/Search";
import Profile from "./components/Profile";
import LogoutButton from "./components/LogoutButton";
import { useEffect, useState } from "react";
import Favorites from "./components/Favorites";
import {
	loadImagesFromServer,
	removeImageFromServer,
	saveImageToServer,
} from "./service";

function App() {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const [savedImages, setSavedImages] = useState<string[]>([]);

	const saveImage = (url: string): (() => void) => {
		try {
			if (savedImages.includes(url)) {
				removeImageFromServer(user?.email ?? "", url)
					.then((response) => {
						if (response) {
							setSavedImages(
								savedImages.filter((imageUrl) => imageUrl !== url)
							);
						}
					})
					.catch((error) => console.error("Error:", error));
			} else {
				saveImageToServer(user?.email ?? "", url)
					.then((response) => {
						if (response) {
							setSavedImages([...savedImages, url]);
						}
					})
					.catch((error) => console.error("Error:", error));
			}
		} catch (error) {
			console.error("Error:", error);
		}
		return () => {};
	};

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const images = await loadImagesFromServer(user?.email ?? "");
				setSavedImages(images);
			} catch (error) {
				console.error("Error fetching images:", error);
			}
		};

		if (isAuthenticated) {
			fetchImages();
		}
	}, [isAuthenticated]);

	return isAuthenticated ? (
		<>
			<div className="mx-auto mt-4 col-md-8 card text-center">
				<div className="card-header d-flex justify-content-between">
					<span className="h4">ImageSearcher</span>
					<div className="d-flex">
						<Profile user={user} />
						<LogoutButton />
					</div>
				</div>
				<div className="card-body row">
					<div className="col-md-8">
						<span className="h5">Search</span>
						<hr />
						<Search saveImage={saveImage} savedImages={savedImages} />
					</div>
					<div className="col-md-4">
						<span className="h5">Favorites</span>
						<hr />
						<Favorites saveImage={saveImage} savedImages={savedImages} />
					</div>
				</div>
			</div>
		</>
	) : isLoading ? (
		<>Loading status</>
	) : (
		<>
			<LoginButton />
		</>
	);
}

export default App;
