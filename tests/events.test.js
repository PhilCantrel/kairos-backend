// for tests requiring authentication

import request from 'supertest'
import { makeRequest } from './test-utils/test-utils'
import { app } from '../app.mjs'
import {dbConnect, dbDisconnect, dbDrop} from './mmsdb.mjs'

// dB connection, erasure & disconnection
beforeAll(async () => await dbConnect())
afterEach(async () => await dbDrop())
afterAll(async () => await dbDisconnect())

// generate fresh user & JWT for each test
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
// can't get this helper function working :(
// beforeEach((done)=>{
//     loggedInToken = loginBeforeEach(done)
// })
    
describe("Test events path", () => {
    //define test event data

    const sampleEventStart = 1649512800000
    const sampleEventEnd = 1649521800000
    const sampleCompleted = true
    const sampleGoalsId = ["61025508432c4c28734a321c"]
    const sampleHabitId = "61050487cc48c02c70fe466b"
    const sampleLocation = '123 mockary rd, testville'
    const sampleURL = 'gopher://gopherpedia.com'
    const sampleChecklist = ['item1', 'item2', 'item3']

    const sampleRequiredEvent = {
        "title": "My new Event",
        "description": "Test description",
        "eventStart": sampleEventStart,
        "eventEnd":   sampleEventEnd
    }
    
    const sampleOptionalEvent = {
        "title": "My new Event",
        "description": "Test Description",
        "eventStart":  sampleEventStart,
        "eventEnd":    sampleEventEnd,
        "completed": sampleCompleted,
        "goalsId": sampleGoalsId,
        "habitId": sampleHabitId,
        "location": sampleLocation,
        "url": sampleURL,
        "checklist": sampleChecklist
    }
    // event tests

    test("There should be a response (200 status) to the GET method", done => {
        request(app)
            .get('/events')
            .set('Authorization', 'bearer ' + loggedInToken)
            .expect(200)
            .end(done)
    })
    test("post without required fields should be rejected with status 500", done =>{
        request(app)
            .post('/events')
            .set('Authorization', 'bearer ' + loggedInToken)
            .send({})
            .expect(500)
            .end(done)
    })
    test("a POST request with all required fields should respond with status 200, returning title, description, eventStart and eventEnd", done =>{
        request(app)
            .post('/events')
            .set('Authorization', 'bearer ' + loggedInToken)
            .send(sampleRequiredEvent)
            .expect(200)
            .then( res =>{
                try{
                    expect(res.body.title).toBe("My new Event")
                    expect(res.body.description).toBe("Test description")
                    expect(new Date(res.body.eventStart)).toStrictEqual(new Date(sampleEventStart))
                    expect(new Date(res.body.eventEnd)).toStrictEqual(new Date(sampleEventEnd))
                    done()
                } catch(e){
                    done(e)
                }
            })
    })
    test("Database automatically creates id, userId, createdAt and editedAt entries", done =>{
        request(app)
            .post('/events')
            .set('Authorization', 'bearer ' + loggedInToken)
            .send(sampleRequiredEvent)
            .expect(200)
            .then(res => {
                try{
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

    test("should POST both optional and required fields and have them returned", done => {
        request(app)
            .post('/events')
            .set('Authorization', 'bearer ' + loggedInToken)
            .send(sampleOptionalEvent)
            .expect(200)
            .then(res => {
                try{
                    expect(res.body.completed).toStrictEqual(sampleCompleted)
                    expect(res.body.goalsId).toStrictEqual(sampleGoalsId)
                    expect(res.body.habitId).toStrictEqual(sampleHabitId)
                    expect(res.body.location).toStrictEqual(sampleLocation)
                    expect(res.body.url).toStrictEqual(sampleURL)
                    expect(res.body.checklist).toStrictEqual(sampleChecklist)
                    done()
                } catch(e){
                    done(e)
                }
            })
    })
    test("Should Get request /events/:id, recieve 200 status & json data", done =>{

        makeRequest('post', '/events', loggedInToken, sampleRequiredEvent, 200)
            .then( res =>{
                try{
                    request(app)
                    .get(`/events/${res.body.id}`)
                    .set('Authorization', `bearer ${loggedInToken}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end(done)
                } catch(e) {
                    done(e)
                }
            })
    })

    test("Invalid event id should respond with 404 status", done =>{
        makeRequest('post','/events', loggedInToken,sampleRequiredEvent, 200)
            .then(() =>{
                try{
                    makeRequest('get', '/events/1', loggedInToken,'', 404)
                        .end(done)
                } catch (e){
                    done(e)
                }
            })
    })

    // deleting event
    test("Should delete single event (204 res) then GET /event/[deleted event id] should respond 404", done =>{
        makeRequest('post','/events', loggedInToken, sampleRequiredEvent, 200)
            .then( res => {
                try {
                    var resid = `${res.body.id}`
                    console.log('resid:', resid)
                    makeRequest('delete', `/events/${resid}`, loggedInToken, sampleRequiredEvent, 204)
                        .then (res => {
                            try {
                                makeRequest('get', `/events/${resid}`, loggedInToken, '', 404)
                                    .end(done)
                            } catch(e){
                                done(e)
                            }
                        })
                } catch(e){
                    done(e)
                }
            })
    })

    test("Should get 404 when trying to delete goal with invalid id", done => {
        makeRequest('post', '/events', loggedInToken, sampleRequiredEvent, 200)
            .then( res => {
                try {
                    makeRequest('delete', '/events/1',loggedInToken, undefined, 404)
                        .end(done)
                }catch(e){
                    done(e)
                }
            })
    })
    //PUT functionality
    test("PUT to events/:id should update existing event", done => {
        makeRequest('post', '/events', loggedInToken, sampleRequiredEvent, 200)
            .then( res => {
                try{
                    // makeRequest('put', `/events/${res.body.id}`, loggedInToken, {"title": "Updated title"}, 200)
                    return request(app)
                    .put(`/events/${res.body.id}`)
                    .set('Authorization', `bearer ${loggedInToken}`)
                    .send({
                        "title": "A completely different title"
                    })
                    .expect(200)
                        .then( res =>{
                            try{
                                expect(res.body.title).not.toBe(sampleRequiredEvent.title)
                                expect(res.body.description).toBe(sampleRequiredEvent.description)
                                done()
                            }catch(e){
                                done(e)
                            }
                        })
                }catch(e){
                    done(e)
                }
            })
    })
})