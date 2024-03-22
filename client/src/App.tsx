import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import Search from "./components/Search";
import Profile from "./components/Profile";
import LogoutButton from "./components/LogoutButton";
import { useState } from "react";
import Favorites from "./components/Favorites";

function App() {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const [savedImages, setSavedImages] = useState<string[]>([]);

	const saveImage = (url: string) => {
		if (savedImages.includes(url)) {
			setSavedImages(savedImages.filter((imageUrl) => imageUrl !== url));
		} else {
			setSavedImages([...savedImages, url]);
		}
	};
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
