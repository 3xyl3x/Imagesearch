import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import Search from "./components/Search";
import Profile from "./components/profile";
import LogoutButton from "./components/LogoutButton";

function App() {
	const { user, isAuthenticated, isLoading } = useAuth0();

	return isAuthenticated ? (
		<>
			<Profile user={user} />
			<Search />
			<LogoutButton />
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
