const router = require('express').Router();
const userRoutes = require('./users');
const thoughtRoutes = require('./thoughts')

router.use('/api', userRoutes, thoughtRoutes);

module.exports = router;