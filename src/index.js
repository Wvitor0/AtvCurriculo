const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./routes/queries')
const port = 3001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'API feita com node, express e postegresql' })
})

app.get('/curriculo', db.getCurriculo)
app.get('/curriculo/:id', db.getCurriculoById)
app.post('/curriculo', db.createCurriculo)
app.put('/curriculo/:id', db.updateCurriculo)
app.delete('/curriculo/:id', db.deleteCurriculo)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
