// js hint eversion:6

const mongoose = require ('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB",  { useNewUrlParser: true, useUnifiedTopology:true });


const fruitSchema = new mongoose.Schema({
    // name:String,

    name : {
        type: String,
        required: [true, "Please check your data entry, no name specified"]
    },
    // rating:Number
    score: {
        type:Number,
        min:1,
        max:10,

    },
    review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit= new Fruit (
    {
    
    name : "banana",
    score: 3,
    review: "Great fruit",    
   }, 

{
  name : "orange",
score: 6,
  review: "kinda sour",
  },

{
  name : "apple",
  score: 9,
  review: "sweeet"

}
);

// fruit.save();

// const kiwi = new Fruit ({
//     name : "kiwi",
//     score: 9,
//     review: "Good"
// });
// const pineapple = new Fruit ({
//     name : "pineapple",
//     score: 9,
//     review: "ok ok"
// });

// Fruit.insertMany([kiwi, pineapple], function(err){
//     if (err)
//     {
//         console.log("Error");
//     }
//     else{
//         console.log("Successfully saved fruits");
//     }
// });

// Fruit.find(function(err, fruits) {
//     if(err)
//     {   
//         console.log(err);
//     }
//     else
//     {
 
//         mongoose.connection.close();
//         fruits.forEach(function(fruit) {
//             console.log(fruit.name);
//         })
//     }
// });

// Fruit.updateOne({_id:"609f8a3961f8513b64c605fe"}, {name: "Peach"}, function(err){
//     if(err)
//     {
//         console.log(err);
//     }
//     else{
//         console.log("Success upadted the document");
//     }
// });

// Fruit.deleteOne({name:"Peach"}, function(err){
//     if(err)
//     {
//         console.log(err);
//     }
//     else{
//         console.log("Succesfully deleted the document");
//     }
// });




const personSchema = new mongoose.Schema({
    name:String,
    age:Number,
    favouriteFruit: fruitSchema
});


const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit ({
    name: "Pineapple",
    score: 9,
    review: "Great Fruit"
});

pineapple.save();

const person = new Person ({
    name:"ammy",
    age : 2,
    favouriteFruit: pineapple,
});

// const person = new Person ({
//     name: "john",
//     age : 27
// });

person.save();

// Person.deleteMany({name:"john"}, function(err) {
//     if(err)
//     {
//         console.log(err);
//     }
//     else{
//         console.log("Succsefully deleted the document");
//     }
// });




  const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Find some documents
    collection.find({}).toArray(function(err, fruits) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(fruits);
      callback(fruits);
    });
}
