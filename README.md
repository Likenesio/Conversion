## Back-end conversor
###Instalación

Para el funcionamiento de la aplicación, es necesario tener instalado los siguientes programas:
- [Node.js](https://nodejs.org/es "Node.js")
- [Servidor Mongodb](https://www.mongodb.com/try/download/community "Servidor Mongodb")
- [Git ](https://git-scm.com/downloads "Git ")


#### Proceso de instalación
- Primero se debe tener instalado el servidor local de mongodb, si tiene un servidor de mongodb externo, puede omitir la instalación.

- Después debe tener instalado Git para poder clonar el repositorio. Para realizar la clonación del repositorio, hay que ejecutar el siguiente comando:

```bash
git clone https://github.com/Likenesio/Conversion.git
```
Una vez clonado el proyecto, desde la terminal debe ir al directorio donde están los archivos del proyecto, usando el comando:

```bash
cd conversion
```

- Finalmente debe tener instalado node.js para ejecutar el proyecto. Si ya instaló node.js, ahora debe instalar las dependencias del proyecto usando el siguiente comando:

```bash
npm install
```
Una vez teniendo instalado las dependencias, debe crear un archivo .env en la carpeta del proyecto para que tome los parámetros de conexión con MongoDB:

El archivo .env debe contener lo siguiente:

    DB_HOST=usuarioMongo:contraseniaMongos@hostMongo
    DB_PORT=27017
    HOST=http://localhost
    PORT=3000
    DB_NAME=test

En **DB_HOST** si no tiene usuario ni contraseña, puede colocar la url del servidor directamente.
En** DB_PORT** va el puerto que utiliza mongo
En** HOST** va la url del backend
En **PORT** va el puerto en que se ejecutará el backend
En **DB_NAME** va el nombre de la base de datos de mongo, si no sabe o no tiene, puede dejar este apartado en blanco.

Ya teniendo todo esto listo, ahora podemos ejecutar el proyecto de forma local con el siguiente comando:

    node app.js

Con esto ya tendremos el proyecto funcionando correctamente, la url en donde se está ejecutando el proyecto normalmente es en:  http://localhost:3000/

Las rutas de las API son:

[POST] localhost:3000/api/conversion : Para insertar una conversión hecha. Los datos que recibe en el body son:
- valor_moneda: tipo Number, es el valor de moneda tomado en el momento de la consulta.
- monto_origen: tipo Number, es el monto ingresado por el usuario al momento de la consulta.
- monto_conversion: tipo Number, es el resultado de la operación valor_moneda * monto_origen.
- fecha_actividad: tipo Date, es la fecha y hora del momento de que el usuario realiza la consulta 
- fecha_conversion: tipo Date, es la fecha de referencia de conversión que seleccionó el usuario.
- usuario: tipo String, es la id del usuario registrado en la base de datos que ha iniciado sesión en la aplicación.

[GET] localhost:3000/api/conversiones : Consulta el historial de las conversiones hechas.
