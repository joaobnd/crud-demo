require('dotenv').config();
const app = require("../server/app")

const { PORT } = process.env

const onListening = () => console.log(`Server is running on port ${PORT}`)

const server = app.listen(PORT, onListening)
