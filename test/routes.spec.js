const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const pry = require('pryjs')

chai.use(chaiHttp);

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  it('Check Root', done => {
    chai.request(server)
    .get('/')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.html;
      response.res.text.should.equal('Hello, Dolly');
      done();
    });
  });

  it('GET /api/v1/meals', done => {
    chai.request(server)
    .get('/api/v1/meals')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.json; 
      done();
    })
  })
});
