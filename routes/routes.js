const express = require("express");
const router = express.Router();
const PostTodo = require("../models/todo");

//Get all todos
const getTodo = (req, res) => {
    PostTodo.find({})
    .then((data) => {
        console.log(data);
        res.status(200).json(data);
    })
    .catch ((error) => {
        res.status(404).json({message : error.message});
      } ) 
};

//Add a todo
const postTodo = (req, res) => {
    const name = req.body.name;
    const title = req.body.title;
    const date = req.body.date;
    const description = req.body.description;
    const completed = req.body.completed;


    // const todo = req.body;
    const newTodo = new PostTodo({
        name,
        title,
        date,
        description,
        completed
    });

    newTodo
    .save()
    .then(() => res.json("Todo added"))
    .catch((err) => res.status(400).json("error: " + err));
    
    // .save( (error) => {
    //     if (error) {
    //         res.status(500).json({message : error.message});
    //         return;
    //     }

    //     return res.json({
    //         message : 'Your data has been saved!!!!!!'
    //     });
    // })

  };

  //Get specific todo
  const getOneTodo = (req, res) => {
    PostTodo.findById(req.params.id)
    .then((todo) => res.json(todo))
    .catch((err) => res.status(400).json("error: " + err));
};

//Delete specific todo
const deleteTodo = (req, res) => {
    PostTodo.findByIdAndDelete(req.params.id)
      .then(() => res.json("Store deleted"))
      .catch((err) => res.status(400).json("error: " + err));
  };

//Update specific todo
const editTodo = (req, res) => {
    PostTodo.findById(req.params.id)
    .then(todo => {

     todo.name = req.body.name;
     todo.title = req.body.title;
     todo.date = req.body.date;
     todo.description = req.body.description;
     todo.completed = req.body.completed;

     todo.save()
     .then(() => res.json("todo update"))
     .catch((err) => res.status(400).json("error: " + err));
    })
    .catch((err) => res.status(400).json("error: " + err));
  };

//Routes
router.get("/", getTodo);
router.get("/:id", getOneTodo);
router.post("/", postTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id" , editTodo);

module.exports = router;
