const router = require('express').Router();
const userRoutes = require('./users');
const thoughtRoutes = require('./thoughts')

router.use('/api', userRoutes);
router.use('/api', thoughtRoutes);

module.exports = router;