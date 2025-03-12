const WebSocket = require('ws')
const server = new WebSocket.Server({port: 3001})

const clients = new Set()


server.on('connection' , ws => { 
    clients.add(ws)
    ws.on('message', message => { 
        msg = message.toString()
        obj = JSON.parse(msg)
        console.log(obj)
        clients.forEach(client => { 
            if(client !== ws && client.readyState === WebSocket.OPEN) client.send(JSON.stringify(obj))
        })
    })  

    ws.on('close', ()=> { 
        clients.delete(ws)
    })
})

console.log("ws started on ws://localhost:3001")