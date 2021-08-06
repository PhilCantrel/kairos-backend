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
    
describe("Test habits path", () => {
    //define test habit data

    const sampleHabitStart = 1649512800000
    const sampleHabitEnd = 1649521800000
    const sampleEventsId = ["61025508432c4c28734a321c"]
    const sampleDWMY = "4 weeks"

    const sampleRequiredHabit = {
        "title": "My new Habit",
        "description": "Test description",
        "startDate": sampleHabitStart,
        "endDate": sampleHabitEnd,
        "DWMY": sampleDWMY,
        "EventsId": sampleEventsId
    }

    // habit tests

    test("There should be a response (200 status) to the GET method", done => {
        makeRequest('get', '/habits', loggedInToken,undefined,200)
            .end(done)
    })
    test("post without required fields should be rejected with status 500", done =>{
        makeRequest('post', '/habits', loggedInToken, {}, 500)
            .end(done)
    })
    test("a POST request with all required fields should respond with status 200, returning title, description, habitStart and habitEnd", done =>{
        makeRequest('post', '/habits', loggedInToken, sampleRequiredHabit, 200 )
            .then( res =>{
                try{
                    expect(res.body.title).toBe("My new Habit")
                    expect(res.body.description).toBe("Test description")
                    expect(new Date(res.body.startDate)).toStrictEqual(new Date(sampleHabitStart))
                    expect(new Date(res.body.endDate)).toStrictEqual(new Date(sampleHabitEnd))
                    done()
                } catch(e){
                    done(e)
                }
            })
    })
    test("Database automatically creates id, userId, createdAt and editedAt entries", done =>{
        makeRequest('post', '/habits', loggedInToken, sampleRequiredHabit, 200)
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

    test("Get request /habits/:id, should recieve 200 status & json data", done =>{

        makeRequest('post', '/habits', loggedInToken, sampleRequiredHabit, 200)
            .then( res =>{
                try{
                    makeRequest('get', `/habits/${res.body.id}`, loggedInToken, undefined, 200)
                    .expect('Content-Type', /json/)
                    .end(done)
                } catch(e) {
                    done(e)
                }
            })
    })

    test("Invalid habit id should respond with 404 status", done =>{
        makeRequest('post','/habits', loggedInToken,sampleRequiredHabit, 200)
            .then(() =>{
                try{
                    makeRequest('get', '/habits/1', loggedInToken,'', 404)
                        .end(done)
                } catch (e){
                    done(e)
                }
            })
    })

    // deleting habit
    test("Should delete single habit (204 res) then GET /habit/[deleted habit id] should respond 404", done =>{
        makeRequest('post','/habits', loggedInToken, sampleRequiredHabit, 200)
            .then( res => {
                try {
                    var resid = `${res.body.id}`
                    console.log('resid:', resid)
                    makeRequest('delete', `/habits/${resid}`, loggedInToken, sampleRequiredHabit, 204)
                        .then (res => {
                            try {
                                makeRequest('get', `/habits/${resid}`, loggedInToken, '', 404)
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
        makeRequest('post', '/habits', loggedInToken, sampleRequiredHabit, 200)
            .then( res => {
                try {
                    makeRequest('delete', '/habits/1',loggedInToken, undefined, 404)
                        .end(done)
                }catch(e){
                    done(e)
                }
            })
    })
    //PUT functionality
    test("PUT to habits/:id should update existing habit", done => {
        makeRequest('post', '/habits', loggedInToken, sampleRequiredHabit, 200)
            .then( res => {
                try{
                    // makeRequest('put', `/habits/${res.body.id}`, loggedInToken, {"title": "Updated title"}, 200)
                    return request(app)
                    .put(`/habits/${res.body.id}`)
                    .set('Authorization', `bearer ${loggedInToken}`)
                    .send({
                        "title": "A completely different title"
                    })
                    .expect(200)
                        .then( res =>{
                            try{
                                expect(res.body.title).not.toBe(sampleRequiredHabit.title)
                                expect(res.body.description).toBe(sampleRequiredHabit.description)
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