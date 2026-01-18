const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const DATA_FILE = './data/reminders.json';

// Home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Add reminder
app.post('/add', (req, res) => {
  const reminder = req.body.reminder;
  let reminders = [];

  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    reminders = data ? JSON.parse(data) : [];
  }

  reminders.push(reminder);
  fs.writeFileSync(DATA_FILE, JSON.stringify(reminders, null, 2));
  res.redirect('/');
});

// Delete reminder
app.get('/delete/:id', (req, res) => {
  let reminders = [];

  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    reminders = data ? JSON.parse(data) : [];
  }

  reminders.splice(req.params.id, 1);
  fs.writeFileSync(DATA_FILE, JSON.stringify(reminders, null, 2));
  res.redirect('/');
});

// List reminders (API)
app.get('/list', (req, res) => {
  let reminders = [];

  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    reminders = data ? JSON.parse(data) : [];
  }

  res.json(reminders);
});

// Start server
app.listen(3000, () => {
  console.log('Reminder app running on port 3000');
});
