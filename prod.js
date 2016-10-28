'use strict';

const express = require('express');
const path = require('path');

const port = process.env.PORT || 7001;
const staticDir = path.join(__dirname, 'dist');
const staticIndex = path.join(staticDir, 'index.html');
const app = express();

app.use(express.static(staticDir));
app.use((req, res) => {
  res.sendFile(staticIndex);
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Listening on port ${port}`);
  }
});
