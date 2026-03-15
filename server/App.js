const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(mongoSanitize());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/experiences', require('./routes/experienceRoutes'));
app.use('/api/companies', require('./routes/companyRoutes'));
app.use('/api/resumes', require('./routes/resumeRoutes'));
app.use('/api/tests', require('./routes/testRoutes'));

app.use(notFound);
app.use(errorHandler);

module.exports = app;