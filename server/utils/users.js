class Users {
    constructor () {
        this.users = [];
    }
    addUser(id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        var removedUser = this.users.filter((user) => user.id === id);
        if(removedUser){
            this.users = this.users.filter((user)=> user.id !== id);
        }
        return removedUser;
    }
    getUser(id){
        var getUser = this.users.filter((user) => user.id === id);
        return getUser;
    }
    getUserList (room){
        var users = this.users.filter((user)=> user.room === room);
        var namesArray = users.map((user) => user.name);
        return namesArray
    }
}

// var user = new Users();
// user.users = [{
//     id: "1",
//     name: "mohit",
//     room: "1"
// },{
//     id: '2',
//     name: "mit",
//     room: "2"
// },{
//     id: '3',
//     name: "ohit",
//     room: "1"
// }];

// var arr = user.removeUser("1");
// console.log(arr);


module.exports = {Users};



// class Person {
//     constructor (name, age){
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription(){
//         return `${this.name} is ${this.age} year(s) old.`
//     }
// }

// var me = new Person('Andrew', 25);
// console.log(me.getUserDescription());