const express = require('express')
const cors = require("cors");
const app = express()
const port = 3000
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  res.send('Hello World!')
})

const router = require("./controllers");


// middlewares
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:4000",
    ],
  })
);
app.use(router);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})