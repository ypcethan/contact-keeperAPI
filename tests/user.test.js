const request = require('supertest')
const app = require('../server')
const User = require('../resources/user/user.model')

beforeEach(async () => {
    await User.deleteMany()
});

describe('User routes', () => {
    const userDoc = {
        name: "Ethan",
        password: 'qwerqwer',
        email: "sadfewr@gmail"
    }
    const routePath = '/api/users'
    describe('register', () => {

        test('can register a new user', async () => {
            await request(app)
                .post(routePath)
                .send(userDoc)
                .expect(201)
            // const user = await User.findOne({ email: userDoc.email })

            // expect(userDoc).toMatchObject(user)
        })
    })
    describe('fail to register', () => {
        test('name is required', async () => {
            await request(app)
                .post(routePath)
                .send({ ...userDoc, name: "" })
                .expect(400)
        })
        test('email is required', async () => {
            await request(app)
                .post(routePath)
                .send({ ...userDoc, email: "" })
                .expect(400)
        })
    })
})