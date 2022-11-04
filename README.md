# DEVELOPMENT INSTRUCTION

## 1. Setup
### 1.1. Config environment
* Create a `development.env` file in `src/env` folder
* Copy this to `development.env`
```
DIALECT='mysql'
DATABASE=<database name>
DB_USERNAME=<database username>
DB_PASSWORD=<database user password>
HOST=<database host>
DB_PORT=<database port | default is 3306>
API_PORT=8080
JWT_KEY=<JWT Key>

ACCESS_TOKEN_SECRET=<access token key>
REFRESH_TOKEN_SECRET=<refresh token key>

```
### 1.3 Install the dependencies
Run the following command to install the dependencies:
```
npm install
```

## 2.Run the App
Run the following command to start the API server:
```
npm start
```

## 3. Resetting database
Before running, in ```server.js```, you should set ```force``` to ```true```
```
sequelize.sync({ force: true });
```