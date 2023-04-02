const express = require('express');
const morgan = require('morgan');
const tableRoutes = require('./routes/table.routes');

const app = express();
const port = 4000;

app.use(morgan('dev'));
app.use(express.json());

app.use(tableRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});