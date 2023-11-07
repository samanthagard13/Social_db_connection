const router = require('express').Router();
const userRoutes = require('./users');
const thoughtRoutes = require('./thoughts')

// Ath this point "the route we are matching is '/api"
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes)

module.exports = router;