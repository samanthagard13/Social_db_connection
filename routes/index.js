const router = require('express').Router();
const userRoutes = require('./api/users')

router.use('/', userRoutes);