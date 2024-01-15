const express = require("express");
const gateway = require('fast-gateway')
const Utils = require("./utils/Utils")


const server = gateway({
  routes: [
    {
    prefix: '/customer',
    target: 'http://localhost:8000',
    middlewares: [Utils.tokenVerify],

  },
  {
    prefix: '/product',
    target: 'http://localhost:9999',
    middlewares: [Utils.tokenVerify],

  }
]
})

// server.get('/api-service', (req, res) => res.send('Hello World!'))
server.start(4000).then(server=>{
    console.log("api-service runing",4000)
})

// app.listen(5000,()=>{
//     console.log("run server api-service")
// })