const validateToken = require('../utils').validateToken;
const controller = require('../controllers/index');

module.exports = (router) => {
    router.route('/')
    .get(validateToken, controller.renderIndex);
    return router;
}
