
import request from 'supertest'
import {app} from '../../app.mjs'

import {dbConnect, dbDisconnect, dbDrop} from '../mmsdb.mjs'

// theQuestion = toBe || !toBe; – Coco Apr 2 '19 at 15:15 


// Handles database connection, erasure and disconnection
export function setAndUnsetDb(){
    beforeAll(async () => await dbConnect())
    afterEach(async () => await dbDrop())
    afterAll(async () => await dbDisconnect())
}
// can't get this working :(
export function loginBeforeEach(done){
    request(app)
        .post('/sign_up')
        .send({
            email: 'test@test.com',
            password: 'test123'
        })
        .end((err, res)=>{
            var token = res.body.jwt
            done()
            return token
        })
        // console.log(token)
}

export function makeRequest(reqType,path, authToken, reqData = null, expectStatus){
        
    const makeGet = (path) => {
        return request(app)
            .get(path)
            .set('Authorization', `bearer ${authToken}`)
            .expect(expectStatus)
    }
    const makePost =(path) => {
        return request(app)
            .post(path)
            .set('Authorization', `bearer ${authToken}`)
            .send(reqData)
            .expect(expectStatus)
    }
    const makePut = (path) => {
        return request(app)
            .put(path)
            .set('Authorization', `bearer ${authToken}`)
            .send(reqData)
            .expect(expectStatus)
    }
    const makeDelete = (path) => {
        return request(app)
            .delete(path)
            .set('Authorization', `bearer ${authToken}`)
            .expect(expectStatus)
    }
    
    switch (reqType) {
        case 'post':
            return makePost(path)
        case 'get':
            return makeGet(path)
        case 'put':
            return makePut(path)
        case 'delete':
            return makeDelete(path)
        default:
            return `${reqType} request not understood.`;
    }
}