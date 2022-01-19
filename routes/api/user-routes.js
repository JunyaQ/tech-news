const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // the find all method 
    User.findAll()// SELECT* FROM users;
    .then(data => res.json(data))// if no error then respond with the data
    .catch(error=>{
        console.log(error);
        res.status(500).json(error);// if error console log error and respond error
    })
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    // find information about a specific id user
    User.findOne({
        where:{// SELECT* FROM users  WHERE  id =1
            id: req.params.id// find some user with the id is the requested id
        }
    })
    .then(data=>{
        if(!data){
            res.status(404).json({message: "no user found with this id"});
            return;// if no such an id then return 404 error with message
        }
        res.json(data);// if there is such a id, show the data
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json(error);// if an error occurs, show 500 error message
    })
});

// POST /api/users
router.post('/', (req, res) => {
    User.create({//INSERT INTO users(username, email, password) VALUES ("a","b","c")
        username:req.body.username,
        email:req.body.email,
        password:req.body.password// based on what need from model user
    })
    .then(data=>res.json(data))// if has data then respond the data 
    .catch(error=>{
        console.log(error);
        res.status(500).json(error);// catch if error occurs
    });
});

// PUT /api/users/1
router.put('/:id', (req, res) => {//req body is the new data
    User.update(req.body,{//we pass in req.body to provide the new data we want to use in the update and req.params.id to indicate where exactly we want that new data to be used
        // if req.body has exact key/value pairs to match the model, you can juust use req.body
    where:{// where id =1
        id:req.params.id//UPDATE users SET username="", email='' password='' WHERE id = 1
    }
    })
    .then(data=>{
        if(!data[0]){// id is the first element of the data array
            res.status(404).json({message: "No user found with this id"});
            return;
        }
        res.json(data);
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json(error);
    })
});


// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where:{
            id:req.params.id//DELETE User WHERE id =1
        }
    })
    .then(data=>{
        if(!data){
            res.status(404).json({message:"no such an id"});
            return;
        }
        res.json(data);
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json(error);
    })
});

module.exports = router;