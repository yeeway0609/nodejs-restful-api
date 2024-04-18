// https://github.com/mbilab/Web-tutorial/tree/master/unit/http
// https://www.cythilya.tw/2015/08/16/node-form-handling-and-file-uploads/
// https://www.kindsonthegenius.com/nodejs/rest-api/

const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 4444;

// 讓 express 能夠解析 post request的 body 裡的 json 資料
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Server Started. Listening http://localhost:${port}`);
});

// 查詢所有學生
app.get('/students', (req, res) => {
  fs.readFile('./students.json', 'utf8', (err, data) => {
    const studentsData = JSON.parse(data);
    res.json(studentsData);
  });
});

// 查詢特定學生
app.get('/students/:id', (req, res) => {
  fs.readFile('./students.json', 'utf8', (err, data) => {
    const studentsData = JSON.parse(data);
    res.json(studentsData[req.params.id]);
  });
});

// 新增學生
app.post('/students', (req, res) => {
  const { studentId, studentName } = req.body;

  fs.readFile('./students.json', 'utf8', (err, data) => {
    data = JSON.parse(data);
    data[studentId] = studentName;

    fs.writeFile('./students.json', JSON.stringify(data), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Internal Server Error');
      }

      res.status(200).json({ message: 'Student added successfully' });
    });
  });
});

// 刪除學生
app.delete('/students/:id', (req, res) => {

  fs.readFile('./students.json', 'utf8', (err, data) => {
    data = JSON.parse(data);
    delete data[req.params.id];

    fs.writeFile('./students.json', JSON.stringify(data), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Internal Server Error');
      }

      res.status(200).json({ message: 'Student deleted successfully' });
    });
  });
});
