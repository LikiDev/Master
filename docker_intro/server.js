// import express from 'express';
// import { connect, Schema, model } from 'mongoose';
// require('dotenv').config();

// Creamos la aplicación express
const app = express();
const port = process.env.PORT || 3000;

// ... y nos conectamos a la base de datos
connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Crearemos razas de perro, que tendrán nombre, tamaño y esperanza de vida
const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true, // para que el campo 'name' sea clave
      },
    size: {
      type: String,
      enum: ['pequeño', 'mediano', 'grande'],
      required: true,
    },
    lifespan: {
      type: Number,
      required: true,
    },
  });
  const Breed = model('Breed', schema);

// Ruta para devolver todos los documentos
app.get('/api/documents', async (req, res) => {
  const documents = await Model.find();
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
app.delete('/breeds/:name', async (req, res) => {
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
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
//Reemplazar los comentarios // definir los campos del documento con los campos necesarios para el modelo de datos.

//Ejecutar el servidor con el comando node server.js.

//Ahora la API estará disponible en la URL http://localhost:3000/api/documents y las rutas definidas en el archivo server.js estarán disponibles en http://localhost:3000/api/documents, `http://localhost:3000






