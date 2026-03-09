class BaseOperation {
    execute(operands){
        throw new Error("execute() must be implemented")
    }
}

module.exports = BaseOperation;