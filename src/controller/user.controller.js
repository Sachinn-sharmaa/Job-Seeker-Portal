import UsersModel from "../models/users.models.js";

export default class UserController {

    postLogin(req, res) {

        const { email, password } = req.body;

        if (UsersModel.authenticate(email, password)) {

            req.session.userEmail = email;
            
            res.redirect('/jobs');


        } else {
            console.log("Login failed");
            res.redirect('/');
        }

    }

    postRegister(req, res){
       
        const {name, email, password} = req.body;
        UsersModel.add(name, email, password);
        req.session.userEmail = email;
        res.render('home', { user: req.session.userEmail  } );
    }

    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
              console.error('Error destroying session:', err);
            } else {
              res.redirect('/'); 
            }
        })   
    }



}