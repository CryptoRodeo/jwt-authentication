module.exports = {
    development: {
        port: process.env.PORT || 8080,
        saltingRounds: 10 //amount of times we want to salt the password
    }
}
