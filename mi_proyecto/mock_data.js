const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27777/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const breedSchema = {
    name: String,
    lifespan: Number,
    size: String
};

const Breed = mongoose.model("Breed", breedSchema)

const breeds = [
    { name: 'Bulldog', size: 'medium', lifespan: 8 },
    { name: 'Poodle', size: 'small', lifespan: 14 },
    { name: 'German Shepherd', size: 'large', lifespan: 10 },
    { name: 'Border Collie', size: 'medium', lifespan: 14 },
    { name: 'Labrador Retriever', size: 'large', lifespan: 12 },
    { name: 'Chihuahua', size: 'small', lifespan: 18 },
    { name: 'Golden Retriever', size: 'large', lifespan: 12 },
    { name: 'Dachshund', size: 'small', lifespan: 14 },
    { name: 'Siberian Husky', size: 'medium', lifespan: 12 },
    { name: 'Shih Tzu', size: 'small', lifespan: 16 },
    { name: 'Rottweiler', size: 'large', lifespan: 9 },
    { name: 'Boston Terrier', size: 'small', lifespan: 15 },
    { name: 'Boxer', size: 'medium', lifespan: 10 },
    { name: 'Australian Shepherd', size: 'medium', lifespan: 13 },
    { name: 'Beagle', size: 'small', lifespan: 12 },
    { name: 'Great Dane', size: 'large', lifespan: 8 },
    { name: 'Corgi', size: 'small', lifespan: 12 },
    { name: 'Bernese Mountain Dog', size: 'large', lifespan: 7 },
    { name: 'Pomeranian', size: 'small', lifespan: 12 },
    { name: 'Schnauzer', size: 'small', lifespan: 15 },
    { name: 'Mastiff', size: 'large', lifespan: 8 },
    { name: 'Dalmatian', size: 'medium', lifespan: 13 }
  ];

Breed.insertMany(breeds)
  .then(() => {
    console.log('Breeds inserted successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(err);
    mongoose.connection.close();
  });