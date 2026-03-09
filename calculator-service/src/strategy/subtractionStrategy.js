const BaseOperation = require("./baseOperation")

class SubtractionStrategy extends BaseOperation {
    execute(operands) {
        let difference = operands[0];
        for (let i = 1 ; i < operands.length; i++) {
            difference = difference - operands[i]
        }
        return difference
    }
}


module.exports = SubtractionStrategy