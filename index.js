const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let pets = [
	{ id: 1, name: "devarsh", type: "dog", age: 20 },
	{ id: 2, name: "alex", type: "cat", age: 24 },
];

app.get("/", (req, res) => {
	res.send(
		`<html>
			<head>
				<title>Adopt-a-Pet</title>
			</head>
			<body>
				<h1>Hello, World!</h1>
				<p>Welcome to my server.</p>
			</body>
		</html>`
	);
});

app.get("/hello-world", (req, res) => {
	res.send("Hello World!");
});

app.get("/hello-pet", (req, res) => {
	res.send("Hello Pet!");
});

app.get("/pets", (req, res) => {
	res.json(pets);
});

app.get("/pets/:petId", (req, res) => {
	const petId = parseInt(req.params.petId);
	const pet = pets.find((pet) => pet.id === petId);

	if (pet) {
		res.json(pet);
	} else {
		res.status(404).send("Pet not found");
	}
});

app.post("/pets", (req, res) => {
	const { name, type, age } = req.body;

	const newPet = {
		id: pets.length + 1,
		name: name,
		type: type,
		age: age,
	};

	if (newPet) {
		pets.push(newPet);
		res.status(201).json(newPet);
	}
});

app.put("/pets/:petId", (req, res) => {
	const petId = parseInt(req.params.petId);
	const petIndex = pets.findIndex((pet) => pet.id === parseInt(petId));

	if (petIndex !== -1) {
		const updatedPetInfo = req.body;
		pets[petIndex] = { ...pets[petIndex], ...updatedPetInfo };
		res.json(pets[petIndex]);
	} else {
		res.status(404).send("Pet not found");
	}
});

app.delete("/pets/:petId", (req, res) => {
	const petId = parseInt(req.params.petId);
	const length = pets.length;
	pets = pets.filter((pet) => pet.id !== petId);

	if (pets.length < length) {
		res.status(204).send("Pet deleted");
	} else {
		res.status(404).send("Pet not found");
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
