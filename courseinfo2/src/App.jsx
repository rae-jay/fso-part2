import Course from "./components/Course";

const App = () => {
	const makePart = (name, exercises, parentArray) => {
		const part = {
			name: name,
			exercises: exercises,
			id: parentArray.length,
		};
		parentArray.push(part);
	};

	const courses = [
		{
			id: 1,
			name: "Half Stack application development",
			parts: [],
		},
		{
			id: 2,
			name: "Nose.js",
			parts: [],
		},
	];

	let tCourse = courses[0];
	makePart("Fundamentals of React", 10, tCourse.parts);
	makePart("Using props to pass data", 7, tCourse.parts);
	makePart("State of a component", 14, tCourse.parts);
	makePart("Redux", 11, tCourse.parts);
	tCourse = courses[1];
	makePart("Routing", 3, tCourse.parts);
	makePart("Middlewares", 7, tCourse.parts);

	//
	return (
		<div>
			<h1>Curiculum n' Stuff</h1>
			{courses.map((course) => {
				return <Course key={course.id} course={course} />;
			})}
		</div>
	);
};

export default App;
