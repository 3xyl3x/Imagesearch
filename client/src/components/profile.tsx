import { useAuth0 } from "@auth0/auth0-react";

interface ProfileProps {
	user: any;
}
const Profile = (props: ProfileProps) => {
	const { user } = props;
	return (
		<div>
			<img src={user.picture} alt={user.name} />
			<h2>{user.name}</h2>
			<p>{user.email}</p>
		</div>
	);
};

export default Profile;
