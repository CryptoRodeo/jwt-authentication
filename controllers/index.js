const validateToken = require('../utils').validateToken;
module.exports = {
    renderIndex: (req,res) => {
        res.render("../views/index.ejs");
    }
}
