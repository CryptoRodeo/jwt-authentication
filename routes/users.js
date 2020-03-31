const controller = require('../controllers/users');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
    router.route('/users')
    .post(controller.add) // pass add controller to the router
    .get(validateToken,controller.getAll)

    router.route('/login')
    .get(controller.renderLogin)
    .post(controller.login);
};