const express = require('express');
const logger = require('morgan');
const cors = require('cors');
// const { tryWrapper } = require("./helpers");
const auth = require('./middleware/auth');
const { errorHandler, tryWrapper } = require('./helpers');

// const contactsRouter = require('./routes/contacts');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products')
const dietRouter = require('./routes/diet');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const dailyRouter = require('./routes/dailyproducts');


const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';



app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/users', usersRouter);
app.use('/api/products', tryWrapper(auth), productsRouter);
app.use('/api/diet', dietRouter);
app.use('/api/daily',tryWrapper(auth), dailyRouter);



// app.use('/api/contacts', tryWrapper(auth), contactsRouter);
app.use((req, res) => {
  res.status(404).json({ message: 'Routs not found' });
});

app.use(errorHandler);

module.exports = app;
