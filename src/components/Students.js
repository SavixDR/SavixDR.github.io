import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button } from "@mui/material";

export default function BasicTextFields() {
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [students, setStudents] = useState([]);
    const [update, setUpdate] = useState(false);

	const handleClick = (e) => {
		e.preventDefault();
		const student = { name, address };
		fetch("http://localhost:8080/api/v1/student/addStudent", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(student),
		}).then(() => {
			console.log("New Student Added from Frontend");
            setUpdate(!update);
		});
	};

	useEffect(() => {
		fetch("http://localhost:8080/api/v1/student/getAllStudents")
			.then((response) => response.json())
			.then((data) => setStudents(data));
	},[update]);

	return (
		<Box
			component="form"
			sx={{
				"& > :not(style)": { m: 1 },
			}}
			noValidate
			autoComplete="off"
		>
			<Container>
				<Paper
					className="paperStyle"
					elevation={3}
				>
					<h1 style={{ color: "blue" }}>
						{" "}
						<u>Add Student</u>
					</h1>
					<TextField
						id="outlined-basic"
						label="Name"
						variant="outlined"
						fullWidth
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<p></p>
					<TextField
						id="outlined-basic"
						label="Address"
						variant="outlined"
						fullWidth
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<p></p>
					<Button
						variant="contained"
						color="success"
						style={{ marginBottom: "10px" }}
						onClick={handleClick}
					>
						Submit
					</Button>
				</Paper>
				<h1>Students</h1>

				{students.map((student) => (
					<Paper
						elevation={6}
						className="paperStyle"
						style={{ textAlign: "left" }}
						key={student.id}
					>
						Id: {student.id} <br />
						Name: {student.name} <br />
						Address: {student.address}
					</Paper>
				))}
			</Container>
		</Box>
	);
}
