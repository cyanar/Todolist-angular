var express = require("express");
var app = express();
var formidable = require("formidable");
var mongoose = require("mongoose");
var Todo = require("./models/Todo.js");
mongoose.connect("mongodb://localhost/ngdata",{useMongoClient:true});

app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.send("ok");
});
app.get("/all",(req,res)=>{
     Todo.find({},(err,docs)=>{
          res.json({"result":docs});
     });
});

app.post("/message",(req,res)=>{
     var form = new formidable.IncomingForm();
     form.parse(req,(err,fields)=>{
         var content = fields.content;
         var done = false;
         var s = new Todo({
            'content' : content,
            'done' :done
         });
         s.save((err,data)=>{
             if(!err){
                 res.json({'result':data});
             }
         })
     });
});

app.post("/changeContent/:id",(req,res)=>{
    var _id = req.params.id;
     var form = new formidable.IncomingForm();
     form.parse(req,(err,fields)=>{
         var content = fields.content;
         Todo.find({"_id":_id},(err,docs)=>{
              var s = docs[0];
              s.content = content;
              s.save((err)=>{
                 if(!err){
                     res.json({'result':1});
                 }
              })
         })
     });
})
app.post('/changeDone/:id',(req,res)=>{
      var id = req.params.id;
       var form = new formidable.IncomingForm();
       form.parse(req,(err,fields)=>{
            var done = fields.done;
            Todo.find({'_id':id},(err,docs)=>{
                 var s = docs[0];
                 s.done = done;
                 s.save((err)=>{
                     res.json({'result':1});
                 })
            })
       });
});
app.delete('/delete/:id',(req,res)=>{
    var id = req.params.id;
    Todo.remove({"_id":id},(err)=>{
         if(!err){
            res.json({'result':1});
         }
    })
})

app.listen(3000,(err)=>{
      if(!err){
         console.log("success:3000");
      }
})