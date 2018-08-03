const expect = require('expect');
var {Users} = require('./users');

describe('Users', ()=> {
    var users;

    beforeEach( ()=> {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'raj',
            room: '1'
        },
        {
            id: '2',
            name: 'rahul',
            room: '1'
        },{
            id: '3',
            name: 'mohit',
            room: '2'
        }];
    })

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '78',
            name: 'Mohit Negi',
            room: 'my room'
        };
        var res = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should remove a User', ()=>{
        var res = users.removeUser('1');
        expect(res[0]).toInclude({name: 'raj'});
    });

    it('should not remove the User', ()=>{
        var res = users.removeUser('6');
        expect(res.length).toBe(0);
    });

    it("should find user", ()=>{
        var res = users.getUser('1');
        expect(res[0]).toInclude({name: 'raj'});
    });

    it('should not remove the user', ()=>{
        var res = users.getUser('6');
        expect(res.length).toBe(0);
    });

    it('should return the user in "1"', ()=>{
        var userList = users.getUserList('1');
        expect(userList).toEqual(['raj', 'rahul'])
    });
    it('should return the user in "test room2"', ()=>{
        var userList = users.getUserList('2');
        expect(userList).toEqual(['mohit']);
    });
});