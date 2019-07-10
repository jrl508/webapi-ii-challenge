const express = require('express');
const db = require('../data/db')
const router = express.Router();

router.use(express.json());


// GET

router.get('/', (req,res)=> {
    db.find()
        .then( posts => {
            res.status(200).json(posts);
        })
        .catch(err =>{
            res.status(500).json({ error: "The posts could not be retrieved." })
        });
})

router.get('/:id', (req,res) => {
    const { id } = req.params;
    db.findById(id)
        .then( post => {
            if(post){
                res.status(200).json(post);
            } else{
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err =>{
            res.status(500).json({ error: "The post information could not be retrieved." })
        });
});


// POST

router.post('/', (req,res) => {
    const newPost = req.body;
    
    if(newPost.title && newPost.contents){
        db.insert(newPost)
            .then( post => {
                res.status(201).json(post);
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    } else{
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }

})

// DELETE

router.delete('/:id', (req,res) => {
    const { id } = req.params;
    db.remove(id)
        .then( deleted => {
            if(deleted){
                res.status(204).end();
            } else{
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err =>{
            res.status(500).json(err)
        });
});



// PUT

router.put('/:id', (req,res) => {
    const { id } = req.params;
    const changes = req.body;

    if(changes.title && changes.contents){
        db.update(id, changes)
            .then( updated => {
                if(updated){
                    res.status(200).json(updated);
                } else{
                    res.status(404).json({message: "The post with the specified ID does not exist."})
                }
            })
            .catch(err =>{
                res.status(500).json({ error: "The post information could not be modified." })
            });
    } else{
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
});


module.exports = router;