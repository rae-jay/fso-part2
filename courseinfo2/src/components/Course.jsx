const Course = (props) => {
	const course = props.course;

	const sumExercises = (total, part) => {
		return total + part.exercises;
	};

	return (
		<div>
			<h2>{course.name}</h2>
			{course.parts.map((part) => {
				return (
					<p key={part.id}>
						{part.name}: {part.exercises}
					</p>
				);
			})}
			<h4>Total of exercises: {course.parts.reduce(sumExercises, 0)}</h4>
		</div>
	);
};

export default Course;
