const express =  require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const PdfParse = require('pdf-parse')

const router = express.Router();
const app = express();
app.use(cors());
const port = 4000;

// Middleware
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(fileUpload());

router.post('/extract-text', (req, res) => {
  if(!req.files) {
    res.status(404);
    res.end();
  }
  PdfParse(req.files.pdfFile).then(result => {
    res.send(result.text)
  })
})

router.get('/', cors(), (req, res) => {
  res.json(
      [
          {
              'id': '001',
              'name': 'Smith',
              'email': 'smith@gmail.com'
          },
          {
              'id': '002',
              'name': 'Sam',
              'email': 'sam@gmail.com'
          },
          {
              'id': '003',
              'name': 'lily',
              'email': 'lily@gmail.com'
          }
      ]
  )
})

app.use('/', router);
module.exports.handler = serverless(app);