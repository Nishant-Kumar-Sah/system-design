const BaseOperation = require("./baseOperation")

class ModulusStrategy extends BaseOperation {
    execute(operands) {
        if(operands.length != 2) {
            throw new Error("Only two operands are allowed for Modulus Operation")
        } 
        const remainder = operands[0] % operands[1];
        return remainder
    }
}

module.exports = ModulusStrategy