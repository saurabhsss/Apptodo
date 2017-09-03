var express = require('express');
var bodyparser = require("body-parser");
var urlencoded = bodyparser.urlencoded({extended:false});

var todo_db =require('./seed.js');
var app = express();
app.use('/',express.static(__dirname+"/public"));
app.get('/api/todos',function (req,res) {
    res.json(todo_db.Todos);
});
app.use('/',urlencoded);

app.delete("/api/todos/:id",function (req,res) {

    var id_to_bedeleted = req.params.id;
    var todo = todo_db.Todos[id_to_bedeleted];
    if(!todo){
        res.status(400).json({err:"todo does't exist",});
    }
    else {
        todo.status = todo_db.StatusENUMS.DELETE;
        res.json(todo_db.Todos);
    }
})
app.put("/api/todos/:id",function (req,res) {

    var mod_id = req.params.id;
    var todo = todo_db.Todos[mod_id];
    if(!todo){
        res.status(400).json({err:"cant modify a todo that doest exist"});
    }
    else {
        var todo_title = req.body.todo_title;
        if(todo_title && todo_title!="" &&todo_title.trim()!=""){
            todo.title = todo_title;
        }
        var todo_status = req.body.todo_status;
        if(todo_status&&(todo_status==todo_db.StatusENUMS.ACTIVE||todo_status==todo_db.StatusENUMS.COMPLETE||todo_status==todo_db.StatusENUMS.DELETE))
        {
            todo.status = todo_status;
        }
        res.json(todo_db.Todos);
    }
});
app.post("/api/todos",function (req,res) {
    var todo = req.body.todo_title;
    if((!todo) || todo == "" || todo.trim() == ""){
        res.status(400).json({error:"Todo title can't be added"});
    }
    else{
        var new_todo_object = {
            title : req.body.todo_title,
            status: todo_db.StatusENUMS.ACTIVE
        }
        todo_db.Todos[todo_db.next_todo_id] = new_todo_object;
        todo_db.next_todo_id = todo_db.next_todo_id+1;
        res.json(todo_db.Todos);
    }
})
app.get('/api/todos/active',function (req,res) {
    var active = {};
    var count = 1;
    for(var i = 1;i<todo_db.next_todo_id;i++){
        if(todo_db.Todos[i].status == todo_db.StatusENUMS.ACTIVE)
        {

            active[count++] =todo_db.Todos[i];

        }
    }
    res.json(active);
});
app.get('/api/todos/complete',function (req,res) {
    var complete = {};
    var count = 1;
    for(var i = 1;i<todo_db.next_todo_id;i++){
        if(todo_db.Todos[i].status == todo_db.StatusENUMS.COMPLETE)
        {

            complete[count++] =todo_db.Todos[i];

        }
    }
    res.json(complete);
});
app.get('/api/todos/delete',function (req,res) {
    var delet = {};
    var count = 1;
    for(var i = 1;i<todo_db.next_todo_id;i++){
        if(todo_db.Todos[i].status == todo_db.StatusENUMS.DELETE)
        {

            delet[count++] =todo_db.Todos[i];

        }
    }
    res.json(delet);
});
app.put('/api/todos/complete/:id',function (req,res) {
   var id = req.params.id;
   var todo = todo_db.Todos[id];
    if(!todo){
        res.status(400).json({err:"cant modify a todo that doest exist"});
    }
    else{
        todo.status = todo_db.StatusENUMS.COMPLETE;
    }
    res.json(todo_db.Todos);
});
app.put('/api/todos/active:id',function (req,res) {
    var id = req.params.id;
    var todo = todo_db.Todos[id];
    if(!todo){
        res.status(400).json({err:"cant modify a todo that doest exist"});
    }
    else{
        todo.status = todo_db.StatusENUMS.DELETE;
    }
    res.json(todo_db.Todos);
});
app.listen(4010,'127.0.0.1');