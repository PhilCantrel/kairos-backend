import request from 'supertest'
import {app} from '../app.mjs'

import {dbConnect, dbDisconnect, dbDrop} from './mmsdb.mjs'



// Handles database connection, erasure and disconnection
beforeAll(async () => await dbConnect())
afterAll(async () => await dbDisconnect())

describe("Sign up testing", () => {
    test("POST request with duplicate email should return status 400 & error message", done => {
        request(app)
            .post('/sign_up')
            .send({
                email: 'test@test.com',
                password: 'test123'
            })
            .then(() => {
                request(app)          
                .post('/sign_up')
                .send({
                    email: 'test@test.com',
                    password: 'test123'
                })
                .expect(400)
                .end(done)
            })
            
    })
    test("Multiple account creations with unique emails should return 201 status", done => {
        request(app)
            .post('/sign_up')
            .send({
                email: 'test@test.com',
                password: 'test123'
            })
            .then(() => {
                request(app)          
                .post('/sign_up')
                .send({
                    email: 'test@test2.com',
                    password: 'test123'
                })
                .expect(201)
                .end(done)
            })
            
    })
})



describe("Sign Up Testing - Needs dbClearing", () => {
    beforeEach(async () => await dbDrop())

    test("POST request with valid email & password should return JWT token & 200 status", done => {
        request(app)
            .post('/sign_up')
            .send({
                email: 'test@test.com',
                password: 'test123'
            })
            .expect(201)
            .then((res) => {
                try {
                    expect(res.body.jwt).toBeDefined()
                    done()
                } catch (e) {
                    done(e)
                }
            })
    })

    test("POST request with missing email should return status 400 & error message", done => {
        request(app)
            .post('/sign_up')
            .send({
                password: 'test123'
            })
            .expect(400)
            .then((res) => {
                try {
                    expect(res.body.error).toBe('User validation failed: email: Path `email` is required.')
                    done()
                } catch (e) {
                    done(e)
                }
            })
    })

    test("POST request with missing password should return status 400 & error message", done => {
        request(app)
            .post('/sign_up')
            .send({
                email: 'test@test.com'
            })
            .expect(400)
            
            .then((res) => {
                try {
                    expect(res.body.error).toBe('Account Creation Failed: Password field required')
                    done()
                } catch(e) {
                    done(e)
                }
            })
            
    })
})

describe("Sign in testing", () => {
    test("Signing in should with correct details should return a JWT token", done => {
        request(app)
            .post('/sign_up')
            .send({
                email: 'test@test.com',
                password: 'test123'
            })
            .then(() => {
                try {
                    request(app)
                        .post('/sign_in')
                        .send({
                            email: 'test@test.com',
                            password: 'test123'
                        })
                        .then((res) => {
                            expect(res.body.jwt).toBeDefined()
                            done()
                        })
                } catch (e) {
                    done(e)
                }
            })
    })
})


