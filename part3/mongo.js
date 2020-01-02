const mongoose = require('mongoose');

if ( process.argv.length<3 ) {
    console.log('give password as argument')
    process.exit(1)
  }
  
  const password = process.argv[2]
  
  const url =
    `mongodb+srv://jackc099:${password}@reactcourse-3jqzj.mongodb.net/note-app?retryWrites=true&w=majority`
  
  mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
  
  const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
  })
  
  const Note = mongoose.model('Note', noteSchema)
  
  const note = new Note({
    content: 'Note 2 Test',
    date: new Date(),
    important: true,
  })
  
  note.save().then(result => {
    console.log("Result saved");
    mongoose.connection.close();
  })