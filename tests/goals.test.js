import request from 'supertest'
import {app} from '../app.mjs'
import {dbConnect, dbDisconnect} from './mmsdb.mjs'


// Handles database connection, erasure and disconnection
beforeAll(async () => await dbConnect())
afterAll(async () => await dbDisconnect())

describe("Test the root path", () => {
    test("There should be a response to the GET method", done => {
        request(app)
            .get('/')
            .expect(200)
            .end(done)
    })
})

describe("Test the goals path", () => {
    test("There should be a response to the GET method", done => {
        request(app)
            .get('/goals')
            .expect(200)
            .end(done)
    })
})
