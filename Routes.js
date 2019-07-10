const express = require('express');
const db = require('./data/db')

const router = express.Router();
const postRoutes = require('./posts/postRoutes')
const commentRoutes = require('./comments/commentRoutes')



router.use('/posts', postRoutes)
router.use('/posts', commentRoutes)
 
module.exports = router;
