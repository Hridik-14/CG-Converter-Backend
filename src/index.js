const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const PdfParse = require('pdf-parse')

const app = express();
app.use(cors());
const port = 4000;

// Middleware
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(fileUpload());

app.get('/', (req, res) => {
  res.send({message: 'Running'});
})

app.post('/extract-text', (req, res) => {
  if(!req.files) {
    res.status(404);
    res.end();
  }
  PdfParse(req.files.pdfFile).then(result => {
    res.send(result.text)
  })
})

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
