const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const pry = require('pryjs')

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the homepage with text', done => {
    chai.request(server)
    .get('/')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.html;
      response.res.text.should.equal('Hello, Dolly');
      done();
    });
  });
  it('should return a 404 for a route that does not exist', done => {
    chai.request(server)
    .get('/sad')
    .end((err, response) => {
      response.should.have.status(404);
      done();
    });
  });
});

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  })
  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });
  describe('GET /api/v1/foods', () => {
    it('should return all of the foods', done => {
      chai.request(server)
        .get('/api/v1/foods')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(3);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('Banana');
          response.body[0].should.have.property('calories');
          response.body[0].calories.should.equal(150);
          done();
        })
    });
  });
  describe('GET /api/v1/foods/:id', () => {
    it('should return one food', done => {
      chai.request(server)
        .get('/api/v1/foods/1')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('name');
          response.body.name.should.equal('Banana');
          response.body.should.have.property('calories');
          response.body.calories.should.equal(150);
          done();
        })
    });
    it('should return a 404 if food is not found', done => {
      chai.request(server)
      .get('/api/v1/foods/5')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });
  describe('POST /api/v1/foods', () => {
    it('should create a new food', done => {
      chai.request(server)
        .post('/api/v1/foods')
        .send({
          id: 4,
          name: 'Gum',
          calories: 50
        })
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(4);
          response.body.should.have.property('name');
          response.body.name.should.equal('Gum');
          response.body.should.have.property('calories');
          response.body.calories.should.equal(50);
          done();
        })
    })
    it('should return an error message if required parameters are not included', done => {
      chai.request(server)
        .post('/api/v1/foods')
        .send({
          id: 6,
          name: 'Avocado'
        })
        .end((err, response) => {
          response.should.have.status(422);
          done();
        });
    })
  });
  describe('PATCH /api/v1/foods/4', () => {
    it('should update an existing food', done => {
      chai.request(server)
        .patch('/api/v1/foods/4')
        .send({
          id: 4,
          name: 'Gum',
          calories: 60
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.message.should.equal( `Food with id: 4 was successfully updated` );
          done();
        })
    })
  });
  describe('DELETE /api/v1/foods/4', () => {
    it('should delete an existing food', done => {
      chai.request(server)
        .delete('/api/v1/foods/4')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.message.should.equal( `Food with id: 4 was successfully deleted` );
          done();
        })
    })
  });
})
