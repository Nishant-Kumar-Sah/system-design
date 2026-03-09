const BaseOperation = require("./baseOperation")

class DivisionStrategy extends BaseOperation {
    execute(operands) {
        if(operands.length != 2) {
            throw new Error("Only two operands are allowed for Division Operation")
        } 
        if(operands[1] == 0) {
            throw new Error("Denominator Cannot be zero")
        }
        const quotient = operands[0] / operands[1];
        return quotient
    }
}

module.exports = DivisionStrategy;