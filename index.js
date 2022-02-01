
//the index of the project!
require('dotenv').config();
const server = require('./api/server.js');
const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
    console.log(` ===> Server Listening on port http://localhost:${PORT} <===`);
})
