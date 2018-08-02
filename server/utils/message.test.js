var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', ()=>{
    it('should generate correct message object', ()=>{
        var text = "Test case 1";
        var from = "Test user";
        var res = generateMessage(from, text);
        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({from, text});
    })
})