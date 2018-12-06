const { ObjectID } = require('mongodb');

const { Blog } = require('./../../model/blog')



const blogs = [{
    _id: new ObjectID(),
    text: "1st text",
    vote: 2
},
{
    _id: new ObjectID(),
    text: '2nd text'
}]

var populateBlogs = (done) => {
    Blog.deleteMany({}).then(() => {
       return Blog.insertMany(blogs);
    }).then(() => done())
}


module.exports={blogs,populateBlogs};