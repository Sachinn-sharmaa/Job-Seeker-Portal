export default class UsersModel{
    constructor(id, name, email, password){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static add(name, email, password){
        const id = 'U' + Date.now();
        const newuser = new UsersModel(id, name, email, password);
        users.push(newuser); 
    }

    static authenticate(email, password) {
        return users.find((user) => user.email === email && user.password === password);
    }
}


var users = [
    new UsersModel('U1', 'John Doe', 'john@gmail.com', 'pass'),
    new UsersModel('U2', 'Debasish Halder', 'hdebasish@gmail.com', '12345')

]