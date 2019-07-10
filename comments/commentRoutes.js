const express = require('express');
const db = require('../data/db')

const router = express.Router();

//GET

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

// POST

router.post('/:id/comments', (req,res) => {
    const newComment = req.body;

    if(!newComment.text){
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }else {
        db.insertComment({post_id: req.params.id, ...newComment})
            .then( comment => {
                res.status(201).json(comment);
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the comment to the database" })
            })
    }

})

module.exports = router;