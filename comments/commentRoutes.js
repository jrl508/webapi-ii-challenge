const express = require('express');
const db = require('../data/db')

const router = express.Router();


router.get('/:id/comments', (req,res)=>{
    const {id} = req.params;
    db.findPostComments(id)
        .then( comments => {
            if(comments && comments.length){
                res.status(200).json(comments)
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }

        })
        .catch(err =>{
            res.status(500).json({error: "The comments information could not be retrieved."})
        })

})

module.exports = router;