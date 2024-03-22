interface ProfileProps {
	user: any;
}
const Profile = (props: ProfileProps) => {
	const { user } = props;
	return (
		<>
			<img
				className="rounded-circle border"
				src={user.picture}
				alt={user.name + user.email}
				style={{ height: "40px" }}
			/>
		</>
	);
};

export default Profile;
