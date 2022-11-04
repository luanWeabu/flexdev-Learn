/**
 * Configuring environment variable
 */
const dotenv = require('dotenv')
const envName = "development";
const jwt = require('jsonwebtoken')
dotenv.config({ path: `src/env/${envName}.env` });
const bcrypt = require('bcrypt')
const {config} = require("dotenv");
const verifyToken = require('./src/middleware/verify')
// const cookieParse = require('cookie-parser')
/**
 * Express setup
 */
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
// app.use(cookieParse)
var cors = require("cors");
app.use(cors());
/**
 * Initializing database
 */
const { sequelize } = require("./src/config/database");
// Enable this to sync the database
sequelize.sync({ force: false });

/**
 *  API routing
 */
const checkAdminRole = require("./src/middleware/checkAdminRole");

app.use('/api/userRole', verifyToken,require("./src/routes/authorization/role.route"));
app.use("/api/quizType", verifyToken, require("./src/routes/resource/quizType.route"));
app.use('/api/topic', verifyToken,require('./src/routes/resource/topic.route'))
app.use("/api/quiz", verifyToken,require("./src/routes/resource/quiz.route"));
app.use("/api/question" , verifyToken,require('./src/routes/resource/question.route'));
app.use("/api/answer", verifyToken,require('./src/routes/resource/answer.route'));
app.use("/api/quizQuestion", verifyToken,require('./src/routes/resource/quizQuestion.route'));
app.use("/api/topicQuestion",verifyToken, require('./src/routes/resource/topicQuestion.route'));
app.use('/api/role', verifyToken,require("./src/routes/authorization/role.route"));
app.use('/api/user', verifyToken, require("./src/routes/authorization/user.route"));

app.post('/api/login', require('./src/routes/authorization/auth.route'))


/**
 * API SERVER
 */
const port = process.env.API_PORT;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});