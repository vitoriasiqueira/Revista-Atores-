import { fastify } from 'fastify'
import {DatabaseMemory} from "./database-memory.js"

const server = fastify()
const database = new DatabaseMemory()

server.get('/', () => {
    return 'Revista VOGUE'
})

server.post('/ator', (request, reply) => {
    //const body = request.body//
   //console.log(body)//
   const {modelo, titulo, autor} = request.body
    database.create({
        modelo: modelo,
        titulo:  titulo,
        autor:  autor,
    })
    console.log(database.list())
    return reply.status(201).send()
})

server.get('/ator', (request) => {
    const search = request.query.search

    console.log(search)

    const atores = database.list(search)
    
    return atores
})

server.put("/ator/:id",(request, reply) => {

    const atorId = request.params.id 
    const {modelo, titulo, autor} = request.body
    const ator = database.update(atorId, {
        modelo,
        titulo,
        autor,
    })
    return reply.status(204).send()
})

server.delete("/ator/:id", (request, reply) => {
    const atorId = request.params.id 
  
    database.delete(atorId)

    return reply.status(204).send()
})



server.listen({
    port: 3333,
})