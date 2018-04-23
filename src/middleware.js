function isLoggedIn(req, res, next){
    if(req.session.loginInfo){
        console.log('----middleware pass-----');
        return next();
    }
}

module.exports = isLoggedIn;