const expect = require('expect');
const request = require('supertest');
const {ObjectID}=require('mongodb');

const {app} = require('./../server');
const { Blog } = require('./../model/blog')
const {blogs,populateBlogs}=require('./seed/seed')

beforeEach(populateBlogs);

describe('POST /blog', () => {
    it('should create a new blog with created time', (done) => {
      var text = 'Test blog text';
  
      request(app)
        .post('/blog')
        .send({text})
        .expect(200)
        .expect((res) => {
          expect(res.body.blog.text).toBe(text);
          expect(typeof res.body.blog.createdAt).toBe('number');
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
  
          Blog.find({text}).then((blogs) => {
            expect(blogs.length).toBe(1);
            expect(blogs[0].text).toBe(text);
            expect(typeof blogs[0].createdAt).toBe('number');
            done();
          }).catch((e) => done(e));
        });
    }).timeout(4000);
    it('should not create new Blog with invalid body data',(done)=>{
      request(app)
      .post('/blog')
      .send({})
      .expect(400)
      
      .end((err, res) => {
        if (err) {
          return done(err);
        }
  
        Blog.find().then((blogs) => {
          expect(blogs.length).toBe(2);
          
          done();
        }).catch((e) => done(e));
      });
    })
    
  });

  describe('GET /blogs', () => {
    it('should return A list of Blogs', (done) => {
      
  
      request(app)
        .get('/blogs')
        .expect(200)
        .expect((res) => {
          expect(res.body.blogs[0].text).toBe(blogs[0].text);
        })
        .end((done));
    });

  });

  describe('PATCH /blog/:id', () => {
    it('should Update a single Blog and increament vote', (done) => {
      
      var id=blogs[0]._id.toHexString();
      request(app)
        .patch(`/blog/${id}`)
        .send()
        .expect(200)
        .expect((res) => {
          expect(res.body.blog._id).toBe(id);
          expect(res.body.blog.text).toBe(blogs[0].text);
          expect(res.body.blog.vote).toBe(3);
          //expect(res.body.todo.completedAt).toBeA('number');
        })
        .end((err, res) => {
            if (err) {
              return done(err);
            }
    
            Blog.findById(id).then((blog) => {
              expect(blog.text).toBe(blogs[0].text);
              expect(blog.vote).toBe(3);
              done();
            }).catch((e) => done(e));
          });
    });
    
    it('should return 404 if id not found', (done) => {
      
      var id=new ObjectID().toHexString();
      request(app)
        .patch(`/blogs/${id}`)
        .expect(404)
        .end((done));
    });
    it('should return 404 if id is invalid', (done) => {
      
      
      request(app)
        .patch(`/blogs/22312asfsa`)
        .expect(404)
        .end((done));
    });
    
    
  });