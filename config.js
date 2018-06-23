module.exports={
    "ip":"127.0.0.1",
    "db":"blog",
    "port":12345,
    "session": {
        secret: 'myblog',
        key: 'myblog',
        maxAge: 720000
    },
    nodePort: 3002,
    mongodb: 'mongodb://127.0.0.1:12345/blog',
    baseUrl: 'http://localhost:3002'
};