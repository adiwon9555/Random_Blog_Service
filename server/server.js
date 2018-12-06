const _=require('lodash');
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

require('./config/config.js')
const {mongoose}=require('./db/mongoose.js');
const {Blog}=require('./model/blog')

var app=express();
app.use(cors());
var port=process.env.PORT;
app.use(bodyParser.json());

app.post('/blog',(req,res)=>{
    var data=_.pick(req.body,['text']);
    data.createdAt=Date.now();
    var blog=new Blog(data)
    blog.save().then((blog)=>{
        res.send({blog});
    },(err)=>{
        res.status(400).send(err);
    })
})

app.get('/blogs',(req,res)=>{
    Blog.find().then(blogs=>{
        if(!blogs){
            return res.status(404).send();
        }
        res.send({blogs});
    },err=>{
        res.status(400).send(err);
    })
})

app.patch('/blog/:id',(req,res)=>{
    var id=req.params.id;
    Blog.findByIdAndUpdate(id,{$inc:{vote:1}},{new:true}).then(blog=>{
        if(!blog){
            return res.status(404).send();
        }
        res.send({blog});
    },err=>{
        res.status(400).send(err);
    })
})

app.listen(port,()=>{
    console.log(`Express started on port ${port}`);
})

module.exports={app};