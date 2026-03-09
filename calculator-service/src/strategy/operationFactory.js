const AdditionStrategy = require("./addStrategy");
const DivisionStrategy = require("./divisionStrategy");
const ModulusStrategy = require("./modulusStrategy");
const MultiplicationStrategy = require("./multiplicationStrategy");
const SubtractionStrategy = require("./subtractionStrategy");




const OperationFactory = function(operation) {
    if(operation == "+") return new AdditionStrategy();
    else if(operation == "-") return new SubtractionStrategy();
    else if(operation == "*") return new MultiplicationStrategy();
    else if(operation == "/") return new DivisionStrategy();
    else if(operation == "%") return new ModulusStrategy();
    else {
        throw new Error("Invalid Operation")
    }
}

module.exports = OperationFactory;