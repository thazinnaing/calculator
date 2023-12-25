import { useEffect, useReducer } from "react";
import "./App.css";
import OperationBtn from "./components/OperationBtn";
import DigitBtn from "./components/DigitBtn";
import { ACTIONS } from "./components/Action";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.INITIAL_VALUE: {
      return {
        previousOperand: null,
        currentOperand: null,
        operation: null,
      };
    }

    case ACTIONS.ADD_DIGIT: {
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    }

    case ACTIONS.CHOOSE_OPERATION: {
      if (state.currentOperand === null && state.previousOperand === null) {
        return state;
      }
      if (state.previousOperand !== null && state.currentOperand === null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand === null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    }

    case ACTIONS.CLEAR: {
      return {
        ...state,
        previousOperand: null,
        currentOperand: null,
        operation: null,
      };
    }

    case ACTIONS.DELETE_DIGIT: {
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
          previousOperand: null,
        };
      }
      if (state.currentOperand === null && state.previousOperand === null) {
        return {
          ...state,
        };
      }
      if (
        state.currentOperand === null &&
        state.previousOperand !== null &&
        state.operation !== null
      ) {
        return {
          ...state,
          operation: null,
          previousOperand: null,
          currentOperand: state.previousOperand,
        };
      }
      if (
        state.currentOperand === null &&
        state.previousOperand !== null &&
        state.previousOperand.length === 1
      ) {
        return {
          ...state,
          previousOperand: null,
        };
      }
      if (state.currentOperand === null && state.previousOperand !== null) {
        return {
          ...state,
          previousOperand: state.previousOperand.slice(0, -1),
        };
      }
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }
      if (state.currentOperand !== null) {
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1),
        };
      }
      break;
    }

    case ACTIONS.EVALUATE: {
      if (
        state.operation === null ||
        state.previousOperand === null ||
        state.currentOperand === null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
    }
  }
};

const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
    case "%":
      computation = prev / 100;
  }
  return computation.toString();
};

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

const formatOperand = (operand) => {
  if (operand === null || operand === undefined) return;

  const [integer, decimal] = operand.split(".");

  if (decimal === null || decimal === undefined)
    return INTEGER_FORMATTER.format(integer);

  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
};

const App = () => {
  const [{ previousOperand, currentOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  useEffect(() => {
    dispatch({ type: ACTIONS.INITIAL_VALUE });
  }, []);

  return (
    <div className="container">
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className="current-operand">{formatOperand(currentOperand)}</div>
        </div>

        <button
          className="span-two"
          onClick={() => {
            dispatch({
              type: ACTIONS.CLEAR,
            });
          }}
        >
          AC
        </button>

        <button
          onClick={() => {
            dispatch({
              type: ACTIONS.DELETE_DIGIT,
            });
          }}
        >
          DEL
        </button>

        <OperationBtn operation="/" dispatch={dispatch} />
        <DigitBtn digit={"7"} dispatch={dispatch} />
        <DigitBtn digit={"8"} dispatch={dispatch} />
        <DigitBtn digit={"9"} dispatch={dispatch} />
        <OperationBtn operation={"*"} dispatch={dispatch} />
        <DigitBtn digit={"4"} dispatch={dispatch} />
        <DigitBtn digit={"5"} dispatch={dispatch} />
        <DigitBtn digit={"6"} dispatch={dispatch} />
        <OperationBtn operation={"+"} dispatch={dispatch} />
        <DigitBtn digit={"1"} dispatch={dispatch} />
        <DigitBtn digit={"2"} dispatch={dispatch} />
        <DigitBtn digit={"3"} dispatch={dispatch} />
        <OperationBtn operation={"-"} dispatch={dispatch} />
        <DigitBtn digit={"0"} dispatch={dispatch} />
        <DigitBtn digit={"."} dispatch={dispatch} />
        <button
          className="span-two"
          onClick={() => {
            dispatch({
              type: ACTIONS.EVALUATE,
            });
          }}
        >
          =
        </button>
      </div>
    </div>
  );
};

export default App;
