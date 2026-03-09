const BaseOperation = require("./baseOperation")

class MultiplicationStrategy extends BaseOperation {
    execute(operands) {
        let product = operands[0]
        for(let i = 1; i < operands.length; i++) {
            product = product * operands[i];
        }
        return product;
    }
}

module.exports = MultiplicationStrategy