const EventEmitter = require('events')

const emitter = new EventEmitter()

// setInterval(()=> {
//     emitter.emit('timer', 'hi')
// }, 2000)

// emitter.on('timer', (msg)=> {
//     console.log(msg)
// })


emitter.on('greeting', (name)=> {
    console.log(`hello ${name}`)
})

emitter.emit('greeting', 'john')



