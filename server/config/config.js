
var env=process.env.NODE_ENV || 'development';
if(env === 'test')
{
    process.env.PORT=80;
    process.env.MONGODB_URI='mongodb://localhost:27017/BlogTestApp'
}else if(env === 'development')
{
    process.env.PORT=80;
    process.env.MONGODB_URI='mongodb://localhost:27017/BlogApp'
}