const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://jackc099:${password}@reactcourse-3jqzj.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

if (process.argv.length < 4) {
    Phonebook.find({}).then(result => {
        console.log('Phonebook: ');
        result.forEach(person => {
            console.log(person.name, person.number);
        })
        mongoose.connection.close()
    })
}
else {
    const input = new Phonebook({
        name: process.argv[3],
        number: process.argv[4],
    })

    input.save().then(result => {
        console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
        mongoose.connection.close()
    })
}

