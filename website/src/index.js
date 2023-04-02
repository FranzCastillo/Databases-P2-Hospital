const express = require('express');
const morgan = require('morgan');
const tableRoutes = require('./routes/table.routes');

const app = express();
const port = 4000;

app.use(morgan('dev'));
app.use(express.json());

app.use(tableRoutes);

// Middleware to handle errors clientside
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: 'Something went wrong'});
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});