import {connect, disconnect, erase} from './mmsdb'


// Handles database connection, erasure and disconnection
beforeAll(async () => await connect())
afterEach(async () => await erase())
afterAll(async () => await disconnect())

// ref https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
