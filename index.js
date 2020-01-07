const express = require('express')
const cors = require('cors')
const crate = require('node-crate');
const app = express()
const port = 3000

app.use(cors())

crate.connect('localhost', 4200);

app.get('/', (request, response) => {
  response.send('Hello from Express!')
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

app.get('/tables', (req, response) => {
  crate.execute("SHOW TABLES")
  .then((res) => {
    // console.log('Success', res.json, res.duration, res.rowcount, res.cols, res.rows)
    response.status(200).json(res.json);
  })
  .catch((e) => {
    throw e
  })
});


module.exports = crate;
