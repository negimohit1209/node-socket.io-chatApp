const path = require('path');
const express = require('express');


const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.port || 3000;

app.use(express.static(publicPath));

app.listen(port, () => console.log(`app running on port ${port}`));