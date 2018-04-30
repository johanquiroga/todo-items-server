# Todo Items - Server
## Instalación

Para instalar el servidor clona este proyecto con el comando `git clone https://github.com/johanquiroga/todo-items-server.git`. Una vez descargado se deben instalar las dependencias ejecutando en la carpeta del proyecto `npm install`.

Además, se debe instalar MongoDB: para esto puede seguir las [instrucciones oficiales](https://docs.mongodb.com/manual/administration/install-community/). Se debe asegurar que esta dependecia quede correctamente instalada y configurada. Siga detenidamente los tutoriales de acuerdo a su sistema operativo.

## Configuración

Antes de ejecutar el proyecto debe definir unas variables de entorno necesarias en un archivo llamado `.env`. En el proyecto se encuentra un archivo de ejemplo (`.env.example`) de como se deben definir.

* `MONGO_URL=mongodb://username:password@host:port/database`. Dirección de conexión a base de datos.
* `WHITELIST=host1,host2`. Lista de hosts que van a ser permitidos en la configuración de CORS
* `JWT_SECRET_KEY=YOUR_SECRET_KEY`. Clave secreta para la generación de tokens de autenticación

## Ejecución
Antes de ejecutar el proyecto se debe asegurar que el demonio de base de datos de MongoDB se haya [iniciado correctamente](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#verify-that-mongodb-has-started-successfully).

Para ejecutar el servidor solo debe ejecutar en la carpeta del mismo el comando `npm start`.

Una vez inicie el servidor se debe mostrar un mensaje de conexión correcta con la base de datos, si este no aparece significa que el proyecto no quedó bien configurado y/o se presentó algún error.

Ahora puedes instalar y ejecutar el [cliente](https://github.com/johanquiroga/todo-items-ui) y empezar a interactuar con el servidor.

## Problemas
Si descubres algún bug, error o problema de seguridad házmelo saber enviándome un correo a johan.c.quiroga@gmail.com, o abre un issue describiendo el flujo de acciones para replicar el problema.


