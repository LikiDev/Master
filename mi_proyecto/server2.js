
const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require("mongoose");
const url = 'mongodb://127.0.0.1:27777/mydatabase';

mongoose.connect(url, {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

// Crearemos razas de perro, que tendrán nombre, tamaño y esperanza de vida
const breedSchema = {
    name: String,
    lifespan: Number,
    size: String
};

app.use(cors({
    origin: '*'
}));

const Breed = mongoose.model("Breed", breedSchema)

// Ruta para devolver todos los documentos
app.get('/api/documents', async (req, res) => {
  const documents = await Breed.find();
  res.json(documents);
});

// Ahora definiré un par de rutas : una para devolver las razas de un tamaño concreto
app.get('/api/documents/size/:size', async (req, res) => {
    const size = req.params.size;
    const result = await Breed.find({ size });
    res.status(200).json(result);
  });

  //... y aqui otra que me devuelva aquél o aquellos elementos que sean de una raza concreta
  app.get('/api/documents/name/:name', async (req, res) => {
    const name = req.params.name;
    const result = await Breed.find({ name });
    res.status(200).json(result);
  });

// Ruta del método PUT para modificar un documento:
app.put('/api/documents/:name', async (req, res) => {
    const name = req.params.name;
    const breed = await Breed.findOne({ name: name });
    
    if (!breed) {
      const newBreed = new Breed(req.body);
      await newBreed.save();
      res.status(201).json(newBreed); //201 CREATED
    } else {
      const { size, lifespan } = req.body;
      
      if (size) breed.size = size;
      if (lifespan) breed.lifespan = lifespan;
      
      await breed.save();
      res.status(200).json(breed); //200 OK
    }
  });

// Ruta para eliminar una raza concreta
app.delete('/api/documents/:name', async (req, res) => {
    const { name } = req.params;
  
    try {
    // aunque usamos .deleteMany, al ser 'name' un campo clave sólo va a borrar uno o ninguno
      const result = await Breed.deleteMany({ name });
      if (result.deletedCount === 0) {
        return res.status(204).end();  //204 No Content
      }
      return res.status(200).json({ message: `raza ${ name } borrada.` }); //200 OK
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error interno servidor' });
    }
  });

// Iniciar el servidor
app.listen(3000, () => {
  console.log(`Servidor iniciado en el puerto 3000`);
});






