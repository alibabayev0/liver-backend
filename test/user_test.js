let server = require("../index");
let chai = require("chai");
let chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe('User Route',() => {
    describe('Test Get Route: api/users/',() => {
        it("It should return all users",(done)=>{
            chai.request(server)
                .get("/users")
                .end((err,response)=>{
                    response.should.have.status(200);
                    response.body.length.should.not.be.eq(0);
                    done();
                });
        })
    });

});
