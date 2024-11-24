const InputField = (props) => {
	const label = props.label;
	const id = props.id;
	const value = props.value;
	const changeFunc = props.changeFunc;

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input id={id} type="text" value={value} onChange={changeFunc} />
		</div>
	);
};

export default InputField;
