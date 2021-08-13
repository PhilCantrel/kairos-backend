// JEST tests for all tests that require authentication

import request from 'supertest'
import {app} from '../app.mjs'
import { makeRequest } from './test-utils/test-utils'

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

// All goals related testing
describe("Test the goals path", () => {

    // defines the test goals data

    const sampleCompletedAt = 1649544800000
    const sampleEventStart = 1649744800000
    const sampleEventEnd = 1649944800000
    const sampleTimeFrame = "1 week"

    const sampleRequiredGoal = {
        "title": "My New Goal",
        "description": "Test description",
        "timeframe": sampleTimeFrame
    }

    const sampleOptionalGoal = {
        "title": "My New Goal",
        "description": "Test description",
        "timeframe": sampleTimeFrame,
        "completedAt": sampleCompletedAt
    }

    // Start of goal test cases

    test("There should be a response (200 Status) to the GET method", done => {
        request(app)
            .get('/goals')
            .set('Authorization', 'bearer ' + loggedInToken)
            .expect(200)
            .end(done)
    })
    test("A POST request without all required fields should be rejected with status 500", done => {
        request(app)
            .post('/goals')
            .set('Authorization', 'bearer ' + loggedInToken)
            .send({})
            .expect(500)
            .end(done)
    })
    test("A POST request w/ all required fields should respond with status 200 and return title, description, timeframe & endDate", done => {
        request(app)    
            .post('/goals')
            .set('Authorization', 'bearer ' + loggedInToken)
            .send(sampleRequiredGoal)
            .expect(200)
            .then((res) => {
                try {
                    expect(res.body.title).toBe("My New Goal")
                    expect(res.body.description).toBe("Test description")
                    expect(res.body.timeframe).toBe(sampleTimeFrame)
                    expect(res.body.endDate).toBeDefined()
                    done()
                } catch (e) {
                    done(e)
                }
            })
    })
    test("Database should automatically create id, userId, createdAt and editedAt entries", done => {
        request(app)    
            .post('/goals')
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

    test("Should be able to POST optional and required field and have them returned", done => {
        makeRequest('post', '/ltgoals', loggedInToken, {
            "type": "My New Goal",
            "description": "Test description"
        }, 200)
        .then(res => {
            try {
                let ltgid = res.body.id
                makeRequest('post', '/goals', loggedInToken, {
                    "title": "My New Goal",
                    "description": "Test description",
                    "timeframe": sampleTimeFrame,
                    "completedAt": sampleCompletedAt,
                    "lTGoalsId": ltgid
                }, 200)
                .then((res) => {
                        expect(new Date(res.body.completedAt)).toStrictEqual(new Date(sampleCompletedAt))
                        expect(res.body.lTGoalsId[0].id).toStrictEqual(ltgid)
                        makeRequest('post', '/events', loggedInToken, {
                            "title": "My new Event",
                            "description": "Test description",
                            "eventStart": sampleEventStart,
                            "eventEnd": sampleEventEnd
                        }, 200).then((res) => {
                            let eid = res.body.id
                            makeRequest('post', '/goals', loggedInToken, {
                                "title": "My New Goal",
                                "description": "Test description",
                                "timeframe": sampleTimeFrame,
                                "completedAt": sampleCompletedAt,
                                "eventsId": eid
                            }, 200).then((res) => {
                                expect(res.body.eventsId[0]).toStrictEqual(eid)
                            })
                        })
                        done()
                    
                })
        } catch (e) {
            done(e)
        }
        })     
    })

    test("Should be able to GET request /goals/:id, receive 200 status & json data", done => {
        request(app)    
            .post('/goals')
            .set('Authorization', 'bearer ' + loggedInToken)
            .send(sampleRequiredGoal)
            .expect(200)
            .then((res) => {
                try {
                    request(app)
                        .get(`/goals/${res.body.id}`)
                        .set('Authorization', 'bearer ' + loggedInToken)
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .end(done)
                } catch (e) {
                    done(e)
                }
            })

    })

    test("Invalid goal id should respond with 404 status", done => {
        request(app)    
            .post('/goals')
            .set('Authorization', 'bearer ' + loggedInToken)
            .send(sampleRequiredGoal)
            .expect(200)
            .then((res) => {
                try {
                    request(app)
                        .get(`/goals/1`)
                        .set('Authorization', 'bearer ' + loggedInToken)
                        .expect(404)
                        .end(done)
                } catch (e) {
                    done(e)
                }
            })

    })

    test("Should delete single goal (204 res) then GET /goals/[deleted goal id] should respond 404", done => {
        request(app)    
            .post('/goals')
            .set('Authorization', 'bearer ' + loggedInToken)
            .send(sampleRequiredGoal)
            .expect(200)
            .then((res) => {
                try {
                    var resid = `${res.body.id}`
                    request(app)
                        .delete(`/goals/${resid}`)
                        .set('Authorization', 'bearer ' + loggedInToken)
                        .expect(204)
                        .then((res) => {
                            try {
                                request(app)
                                .get(`/goals/${resid}`)
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

    test("Should get 404 when trying to delete goal with invalid id", done => {
        request(app)    
            .post('/goals')
            .set('Authorization', 'bearer ' + loggedInToken)
            .send(sampleRequiredGoal)
            .expect(200)
            .then((res) => {
                try {
                    request(app)
                        .delete(`/goals/${res.body.id}`)
                        .set('Authorization', 'bearer ' + loggedInToken)
                        .expect(204)
                        .end(done)
                } catch (e) {
                    done(e)
                }
            })

    })

    test("PUT request to goals/:id should update existing goal", done => {
        makeRequest('post', '/goals', loggedInToken, {
            "title": "My New Goal",
            "description": "Test description",
            "timeframe": sampleTimeFrame
        }, 200)
            .then((res) => {
                try {
                    makeRequest('put', '/goals/id', loggedInToken,
                    {"title": "The Title Should Now Be Updated", "id": res.body.id}, 200).then((res) => {
                            expect(res.body.title).toBe("The Title Should Now Be Updated")
                            expect(res.body.description).toBe("Test description")
                            done()

                        })
                } catch (e) {
                    done(e)
                }
            })
    })
})
