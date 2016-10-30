var validate = function() {
    this.makeTrusted = function(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/\r?\n/g, '<br />');
    }
    this.checkData = function(req, res, next) {

        var patternName = /^[a-zA-Z\s]{3,50}$/;
        var patternPsw = /^.{6,16}$/;
        var patternEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+){0,50}$/;

        if (patternName.test(req.body.fullName) && patternPsw.test(req.body.password) && patternEmail.test(req.body.email)) {
            next();
        } else {
            return res.status(406).send({
                message: 'Invalid data'
            });
        }
    }
};

module.exports = validate;
