const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    },
]

app.get('/', (request, response) => {
    response.send('<h1>This is working</h1>');
});

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        response.json(person);
    }
    else {
        response.status(404).end();
    }

    response.json(person);
})

app.get('/info', (request, response) => {
    response.send(`
        Phonebook has info for ${persons.length} people
        <br>
        <br>
        ${Date()}
    `);
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
})

const generateID = () => {
    const randomID = Math.floor(Math.random() * 20000);
    return randomID;
}

app.post('/api/persons', (request, response) => {
    const body = request.body;
    const found = persons.find(person => person.name.toLowerCase().trim() === body.name.toLowerCase().trim());

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or number is missing'
        })
    }
    else if (found) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateID(),
    }

    persons = persons.concat(person);

    response.json(person);
})

const port = 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});