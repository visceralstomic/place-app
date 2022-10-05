const UserModel = require('../models/userModel');
const crypt = require('bcryptjs');


const register = (req, res) => {
    const user = new UserModel(req.body);
    user
     .save()
     .then(savedUser => {
        res.redirect('/login-page')
     })
     .catch(errors => {


        let errorMsg = '';

        if (errors.name === 'ValidationError') {
            errorMsg = Object.values(errors.errors).map(item => item.message).join(',\n');
        }

        if (errors.code && errors.code === 11000) {
            errorMsg = `Value of filed(s) ${Object.keys(errors.keyValue)} already in use`
        }

        
        req.flash('regErrors', errorMsg);
        req.session.save(function () {
            res.redirect('/places')
        })
        
     }); 
}


const login =  (req, res) => {
    const user = req.body;

    UserModel
        .findOne({username: user.username})
        .then(dbUser => {
            if(dbUser && crypt.compareSync(user.password, dbUser.password)){
                req.session.regenerate(function(err) {
                    if (err) next(err);
                    const userObj = {
                        id: dbUser._id,
                        username: dbUser.username
                    };
                    req.session.user = userObj;
            
                    req.session.save(function(err) {
                        if (err) next(err);
                        res.redirect('/places')
                    })
                })
            } else {
               req.flash('errors', 'Wrong credentials');
               req.session.save(function() {
                res.redirect('/login-page')   
               })             
            }
        })
        .catch(error => {
            console.log(error)
        });

}

const logout = async (req, res) => {
    req.session.destroy(function (){
        res.redirect('/places');
    })
}


module.exports = {
    register, 
    login,
    logout
}