//mongodb+srv://FEDDY1919:<password>@cluster0.mmabkrz.mongodb.net/?retryWrites=true&w=majority
const mongoose = require('mongoose')


const password = process.argv[2]

const url = `mongodb+srv://FEDDY1919:${password}@cluster0.mmabkrz.mongodb.net/personApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)


mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')
    if(process.argv[3]){
        const person = new Person({
            name: process.argv[3],
            number: process.argv[4]
            })
        console.log('added ' + person.name + ' number ' + person.number + ' to phonebook')
        person.save().then(()=> mongoose.connection.close())
    }

    else{
        console.log("phonebook")
        Person.find({}).then(result => {
            result.forEach(person => {
              console.log(person.name+" "+person.number)
            })
          }).then(()=> mongoose.connection.close())

    }
  })
