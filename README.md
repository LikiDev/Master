# Bootcamp del Master en Full Stack Web Development de ThreePoints

He seguido el guion propuesto en el README y le he añadido lo que creo que puede ser relevante

## Descripción de contenidos

## CREACIÓN DE DOCKER CON PERSISTENCIA:

docker pull mongo

docker run -d -p 27777:27777 --name test-mongo mongo:latest

// el puerto usado en docker ha sido el 27777 ya que el desarrollo lo hice en local en el 27017 y ha sido al dockerizar q ha dejado de funcionar

## CREACIÓN DE UNA API SENCILLA:
localhost:27017/api/documents   <=devuelve todos los documentos

localhost:27017/api/documents/size/:size   <=devuelve los documentos que cumplan un tamaño

localhost:27017/api/documents/name/:name   <=devuelve los documentos que tengan un nombre

localhost:27017/api/documents/:name   <=PULL para modificar segun nombre

localhost:27017/api/documents/:name   <=DELETE para borrar segun nombre

## DOCKERIZAR LA API:

docker build -t mi_api .

docker run -d -p 3000:3000 mi_api
