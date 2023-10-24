module.exports = {
    fs: require("fs"),
    path: require("path"),

    morgan: require(`morgan`),
    bodyParser: require(`body-parser`),
    kleur: require(`kleur`),
    createHttpError: require(`http-errors`),
    bcrypt: require(`bcrypt`),
    multer: require(`multer`),
    mongoose: require(`mongoose`),
    jsonwebtoken: require(`jsonwebtoken`),
    expressValidator: require(`express-validator`),
    uuid: require(`uuid`),
};
