// JEST tests for all tests that require authentication

import request from 'supertest'
import {app} from '../app.mjs'

import {dbConnect, dbDisconnect, dbDrop} from './mmsdb.mjs'

// theQuestion = toBe || !toBe; – Coco Apr 2 '19 at 15:15 


// Handles database connection, erasure and disconnection
beforeAll(async () => await dbConnect())
afterEach(async () => await dbDrop())
afterAll(async () => await dbDisconnect())

// Generates fresh user and JWT for each test
let loggedInToken = ''

beforeEach((done)=>{
    request(app)
        .post('/sign_up')
        .send({
        email: 'test@test.com',
        password: 'test123'
        })
        .end((err, res)=>{
        loggedInToken = res.body.jwt
        done()
        })
})

// All lifetime goals related testing
describe("Test the lifetime goals path", () => {

    const sampleRequiredGoal = {
        "type": "Artistic",
        "description": "Play smoke on the water with one eye closed"
    }

    // Start of lifetime goal test cases

    test("There should be a response (200 Status) to the GET method", done => {
        request(app)
            .get('/ltgoals')
            .set('Authorization', 'bearer ' + loggedInToken)
            .expect(200)
            .end(done)
    })

    test("A POST request w/ all required fields should respond with status 200 and return type & description", done => {
        request(app)    
            .post('/ltgoals')
            .set('Authorization', 'bearer ' + loggedInToken)
            .send(sampleRequiredGoal)
            .expect(200)
            .then((res) => {
                try {
                    expect(res.body.type).toBe("Artistic")
                    expect(res.body.description).toBe("Play smoke on the water with one eye closed")
                    done()
                } catch (e) {
                    done(e)
                }
            })
    })
    test("Database should automatically create id, userId, createdAt and editedAt entries", done => {
        request(app)    
            .post('/ltgoals')
            .set('Authorization', 'bearer ' + loggedInToken)
            .send(sampleRequiredGoal)
            .expect(200)
            .then((res) => {
                try {
                    expect(res.body.id).toBeDefined()
                    expect(res.body.userId).toBeDefined()
                    expect(res.body.createdAt).toBeDefined()
                    expect(res.body.editedAt).toBeDefined()
                    done()
                } catch (e) {
                    done(e)
                }
            })
    })

    test("Should be able to GET request /ltgoals/:id, receive 200 status & json data", done => {
        request(app)    
            .post('/ltgoals')
            .set('Authorization', 'bearer ' + loggedInToken)
            .send(sampleRequiredGoal)
            .expect(200)
            .then((res) => {
                try {
                    request(app)
                        .get(`/ltgoals/${res.body.id}`)
                        .set('Authorization', 'bearer ' + loggedInToken)
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .end(done)
                } catch (e) {
                    done(e)
                }
            })

    })

    test("Invalid id should respond with 404 status", done => {
        request(app)    
            .post('/ltgoals')
            .set('Authorization', 'bearer ' + loggedInToken)
            .send(sampleRequiredGoal)
            .expect(200)
            .then((res) => {
                try {
                    request(app)
                        .get(`/ltgoals/1`)
                        .set('Authorization', 'bearer ' + loggedInToken)
                        .expect(404)
                        .end(done)
                } catch (e) {
                    done(e)
                }
            })

    })

    test("Should delete single lt goal (204 res) then GET /ltgoals/[deleted lt goal id] should respond 404", done => {
        request(app)    
            .post('/ltgoals')
            .set('Authorization', 'bearer ' + loggedInToken)
            .send(sampleRequiredGoal)
            .expect(200)
            .then((res) => {
                try {
                    var resid = `${res.body.id}`
                    request(app)
                        .delete(`/ltgoals/${resid}`)
                        .set('Authorization', 'bearer ' + loggedInToken)
                        .expect(204)
                        .then((res) => {
                            try {
                                request(app)
                                .get(`/ltgoals/${resid}`)
                                .set('Authorization', 'bearer ' + loggedInToken)
                                .expect(404)
                                .end(done)
                            } catch (e) {
                                done(e)
                            }
                        })
                } catch (e) {
                    done(e)
                }
            })

    })

    test("Should get 404 when trying to delete lifetime goal with invalid id", done => {
        request(app)    
            .post('/ltgoals')
            .set('Authorization', 'bearer ' + loggedInToken)
            .send(sampleRequiredGoal)
            .expect(200)
            .then((res) => {
                try {
                    request(app)
                        .delete(`/ltgoals/${res.body.id}`)
                        .set('Authorization', 'bearer ' + loggedInToken)
                        .expect(204)
                        .end(done)
                } catch (e) {
                    done(e)
                }
            })

    })

    test("PUT request to ltgoals/:id should update existing lifetime goal", done => {
        request(app)    
            .post('/ltgoals')
            .set('Authorization', 'bearer ' + loggedInToken)
            .send(sampleRequiredGoal)
            .expect(200)
            .then((res) => {
                try {
                    request(app)
                        .put(`/ltgoals/${res.body.id}`)
                        .set('Authorization', 'bearer ' + loggedInToken)
                        .send({type: "Career"})
                        .expect(200)
                        .then((res) => {
                            try {
                                expect(res.body.type).toBe("Career")
                                expect(res.body.description).toBe("Play smoke on the water with one eye closed")
                                done()
                            } catch (e) {
                                done(e)
                            }
                        })
                } catch (e) {
                    done(e)
                }
            })
    })
})
