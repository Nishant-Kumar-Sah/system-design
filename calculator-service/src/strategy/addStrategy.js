const BaseOperation = require("./baseOperation")

class AdditionStrategy extends BaseOperation {
    execute(operands) {
        let sum = 0;
        for (let i = 0 ; i < operands.length; i++) {
            sum = sum + operands[i]
        }
        return sum
    }
}

module.exports = AdditionStrategy