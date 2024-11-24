const Notification = (props) => {
	const info = props.info;

	if (!info) {
		return null;
	}

	const message = info.message;
	const isError = info.isError;

	const notifStyle = {
		borderStyle: "solid",
		borderRadius: 7,
		padding: 10,

		backgroundColor: "beige",
		fontSize: 20,
	};

	if (isError) {
		notifStyle.color = "red";
	} else {
		notifStyle.color = "green";
	}

	return <div style={notifStyle}>{message}</div>;
};

export default Notification;
