var cleanDb = require("mongo-clean")
var mylist = require('../')
var URL = "mongodb://localhost:27017/test"
var expect = require("chai").expect

describe("salva", function(done) {
  var db;
  var instance;

  beforeEach(function(done) {
    cleanDb(URL, function(err, conn) {
      if (err) throw err;

      db = conn;
      instance = mylist(db)
      done();
    });
  });
  
   it("test di salvataggio", function(done) {
    instance.save({ name: "prova1" }, function(err, mylist) {
      expect(err).to.be.null;
      expect(mylist).to.have.property('_id');
      done()
    });
  });

  it("salvataggio", function(done) {
    var expected = {
	name: "prova1",
	items: [{name: "prova1"}]
    }
   
    instance.save(expected, function(err, mylist) {
      expect(err).to.be.null;
      expect(mylist).to.eql(expected);
      expected._id = mylist._id;
      expected.items[0].completed = false;
      done()
    })
    
  })
  
})

describe("carica", function(done) {
  var db;
  var instance;

  beforeEach(function(done) {
    cleanDb(URL, function(err, conn) {
      if (err) throw err;

      db = conn;
      instance = mylist(db)
      
      var myid = instance.save({ name: "prova1" }, function(err, mylist))
      done();
    });
  });

  it("test di caricamento", function(done) {
    instance.load(myid, function(err, mylist) {
      expect(err).to.be.null;
      expect(mylist).to.eql(myid);
      done()
    })    
  })
})