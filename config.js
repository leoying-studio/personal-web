module.exports={
    "ip":"localhost",
    "db":"blog",
    "port":27017,
    "session": {
        secret: 'myblog',
        key: 'myblog',
        maxAge: 720000
    },
    mongodb: 'mongodb://localhost:27017/blog',
    baseUrl: 'http://localhost:80'
};