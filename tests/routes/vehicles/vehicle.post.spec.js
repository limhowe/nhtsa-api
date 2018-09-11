import { expect } from 'chai';
import server from '../../utils/server.mock';
import Vehicle from '../../../app/models/nhtsa';

const ENDPOINT = '/vehicles';

const correctCase = {
  input : {
    modelYear: 2015,
    manufacturer: "Audi",
    model: "A3"
  },
  response : {
    Count: 4,
    Message: "Results returned successfully",
    Results: [
      {
        VehicleDescription: "2015 Audi A3 4 DR AWD",
        VehicleId: 9403
      },
      {
        VehicleDescription: "2015 Audi A3 4 DR FWD",
        VehicleId: 9408
      },
      {
        VehicleDescription: "2015 Audi A3 C AWD",
        VehicleId: 9405
      },
      {
        VehicleDescription: "2015 Audi A3 C FWD",
        VehicleId: 9406
      }
    ]
  }
};

const emptyCase = {
  input : {
    modelYear: 2013,
    manufacturer: "Ford",
    model: "Crown Victoria"
  },
  response : {
    Count: '0',
    Results: []
  }
};

describe(`POST ${ENDPOINT}`, () => {
  it('#200 - should return correct results for valid params', done => {
    const {input, response : {Count: expectCount, Results: expectResults}} = correctCase;

    server.post(ENDPOINT)
      .send(input)
      .end((err, res) => {
        const {body: {Count: outputCount, Results: outputResults}} = res;

        expect(res).to.have.status(200);
        expect(outputCount).to.be.equal(expectCount);
        expect(outputResults).to.eql(expectResults);
        done();
    });
  });

  it('#200 - should return empty results', done => {
    const {input, response : {Count: expectCount, Results: expectResults}} = emptyCase;

    server.post(ENDPOINT)
      .send(input)
      .end((err, res) => {
        const {body: {Count: outputCount, Results: outputResults}} = res;

        expect(res).to.have.status(200);
        expect(+outputCount).to.be.equal(+expectCount);
        expect(outputResults).to.eql(expectResults);
        done();
    });
  });

  it('#404 - return 404 if params do not exist', done => {
    server.get(`${ENDPOINT}/doesnotexist`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
