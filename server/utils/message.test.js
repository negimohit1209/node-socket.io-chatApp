var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
    it('should generate correct message object', ()=>{
        var text = "Test case 1";
        var from = "Test user";
        var res = generateMessage(from, text);
        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({from, text});
    });
});

describe('generateLocationMessage', ()=>{
    it('should generate correct location object', ()=> {
        var lat = 10;
        var long = 10;
        var from = "Test User";
        var url = "https://www.google.com/maps?q=10,10";
        var res = generateLocationMessage(from, lat,long);
        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({from,url});
    });
});