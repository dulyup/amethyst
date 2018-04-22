// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../src/routes/users');
//
// passport.use(new LocalStrategy(
//
//     /**
//      * @param username input by user
//      * @param password input by user
//      * @param done callback function after validation, called by passport
//      */
//     function (username, password, done) {
//         // 在编写 User.findUniqueUserByUsername 时，包含两个参数，一个是 username
//         // 一个是我们现在所传入的回调函数，我们将获取到的用户信息传递给我们的回调函数
//         User.findByUsername(username,  (err, user) => {
//             console.log(`Trying to verigy user, name:${username}, password:${user.password}`)
//             if (err) {
//                 console.log('Failed to verify user.');
//                 return done(err);
//             }
//             if (!user) {
//                 console.log('Invalid username.');
//                 return done(null, false, {message: 'Invalid username.'});
//             }
//             if (user.password !== password) {
//                 console.log('Invalid password.');
//                 return done(null, false, {message: 'Invalid password.'});
//             }
//             console.log('Successfully authenticated!');
//             return done(null, user);
//
//         });
//     }
// ));
//
// // serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中（在这里
// // 存到 session 中的是用户的 username）。在这里的 user 应为我们之前在 new
// // LocalStrategy (fution() { ... }) 中传递到回调函数 done 的参数 user 对象（从数据// 库中获取到的）
// passport.serializeUser((user, done) => {
//     done(null, user.username);
// });
//
// // deserializeUser 在每次请求的时候将会根据用户名读取 从 session 中读取用户的全部数据
// // 的对象，并将其封装到 req.user
// passport.deserializeUser((username, done) => {
//     User.findByUsername(username, function (err, user) {
//         if (err) {
//             return done(err);
//         }
//         done(null, user);
//     });
// });
//
// // 这是封装了一个中间件函数到 passport 中，可以在需要拦截未验证的用户的请求的时候调用
// passport.authenticateMiddleware = function authenticationMiddleware() {
//     return (req, res, next) => {
//         if (req.isAuthenticated()) {
//             console.log('login successfully');
//             return next();
//         }
//         //TODO: jump to login page not use redirect
//         // res.redirect('/login');
//     }
// };
//
// module.exports = passport;