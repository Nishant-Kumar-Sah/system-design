const {users, transactions} = require("../data/store")
const { VALID_OPERATORS, OPERATION_CHARGES } = require("../constants")
const OperationFactory = require("../strategy/operationFactory")



const operation = async (req, res) => {
    if(!req.body.username || !req.body.operator || !req.body.operands){
        res.status(400).json({"error": "Bad Request Username, Operator, Operand is required"})
        return
    }
    let username = req.body.username
    let operator = req.body.operator
    let operands = req.body.operands
    
    if (!users[username]) {
        res.status(401).json({"error": "Username doesn't exist"})
        return
    }
    if(!isValidOperator(operator)){
        res.status(400).json({"error": "invalid Operator"})
        return
    }
    if(!isValidOperands(operands)){
        res.status(400).json({"error": "invalid Operands, should be an integer"})
        return
    }

    let current_credit = users[username].credits 
    if(!isEligibleCreditsForOperation(current_credit, operator)) {
        res.status(403).json({"error": "Too low Credits"})
        return
    }

    //Create Object based on the Operation Strategy Using Operation Factory
    const strategyObject = OperationFactory(operator)
    try {
        let result = strategyObject.execute(operands);
        console.log("Executing operation based on the strategy")
        
        let credit_remainig_after_performing_operation = current_credit - OPERATION_CHARGES[operator]
        users[username].credits  = credit_remainig_after_performing_operation
        res.status(200).json({
            "message": "Operation Successfull", 
            "Result" : result,
            "Credits Remaining" : credit_remainig_after_performing_operation
        })
        transactions.push({
            "username": username,
            "operator": operator,
            "operands": operands,
            "result": result,
            "credits_deducted": OPERATION_CHARGES[operator],
            "remaining_credits": credit_remainig_after_performing_operation, 
            "timestamp" : new Date().toISOString()

        })

    }catch (e) {
        console.error("Something went wrong while performing Operation" , e)
        res.status(500).json({"error": e.message})
    }
}

function isValidOperator(operator) {
    return VALID_OPERATORS.includes(operator);
}

function isValidOperands(operands) {
    return operands.every(operand => Number.isInteger(operand))
}
function isEligibleCreditsForOperation(credits, operation) {
    return credits >= OPERATION_CHARGES[operation]
}

module.exports = operation;