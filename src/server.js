import Hapi from '@hapi/hapi'
import routes from './routes'
import { db } from './database'

const start = async () => {
    const server = Hapi.server({
        port: 8010,
        host: "localhost",
    })

    routes.forEach(route => server.route(route))

    await server.start();
    console.log(`Server is listening on ${server.info.uri}`)
}

process.on('unhandledRejection', err => {
    console.log(err)
    process.exit(1)
})

start()