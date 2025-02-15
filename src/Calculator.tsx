import { useState } from "react";
import Digit from "./Digit";
import Operator from "./Operator";

const Calculator = () => {
  const OPERATORS = "/*-+";
  const [val, setVal] = useState("0");
  const [nextVal, setNextVal] = useState(true);
  const [isDecimal, setIsDecimal] = useState(false);

  const onClear = () => {
    setNextVal(true);
    setIsDecimal(false);
    setVal("0");
  };

  const onDigitClick = (digit: string) => {
    if (nextVal && val === "0" && digit === "0") return;
    if (nextVal) setNextVal(false);
    // if (/[a-zA-Z]/.test(val)) onClear();
    val === "0" ? setVal(digit) : setVal(val + digit);
  };

  const onOperatorClick = (operator: string) => {
    setNextVal(true);
    setIsDecimal(false);
    // if (/[a-zA-Z]/.test(val)) onClear();
    if (!val || !OPERATORS.includes(val[val.length - 1])) {
      setVal(val + operator);
      return;
    }
    if (val.length > 1 && OPERATORS.includes(val[val.length - 2])) {
      setVal(val.slice(0, val.length - 2) + operator);
      return;
    }
    if (operator === "-") {
      setVal(val + operator);
    } else {
      setVal(val.slice(0, val.length - 1) + operator);
    }
  };

  const onEqualsClick = (val: string) => {
    setNextVal(true);
    setIsDecimal(false);
    let split = val.split(/([+-/*])/).filter((e) => e !== "");
    for (let i = 1; i < val.length; i++) {
      if (split[i] == "-" && OPERATORS.includes(split[i - 1])) {
        split[i] = "(-1)*";
      }
    }
    try {
      setVal(eval(split.join("")));
    } catch {
      setVal("NAN");
    }
  };

  const onDecimalClik = () => {
    if (isDecimal) return;
    setNextVal(false);
    setIsDecimal(true);
    setVal(val + ".");
  };

  return (
    <div className="container">
      <div className="calculator">
        <div id="display">{val}</div>
        <div className="first">
          <button onClick={() => onClear()} id="clear">
            AC
          </button>
          <Operator id="divide" operator="/" handleClick={onOperatorClick} />
          <Operator id="multiply" operator="*" handleClick={onOperatorClick} />
        </div>

        <div className="second">
          <Digit digit="7" id="seven" handleClick={onDigitClick} />
          <Digit digit="8" id="eight" handleClick={onDigitClick} />
          <Digit digit="9" id="nine" handleClick={onDigitClick} />
          <Operator id="subtract" operator="-" handleClick={onOperatorClick} />
        </div>

        <div className="third">
          <Digit digit="4" id="four" handleClick={onDigitClick} />
          <Digit digit="5" id="five" handleClick={onDigitClick} />
          <Digit digit="6" id="six" handleClick={onDigitClick} />
          <Operator id="add" operator="+" handleClick={onOperatorClick} />
        </div>

        <div className="fourth">
          <Digit digit="1" id="one" handleClick={onDigitClick} />
          <Digit digit="2" id="two" handleClick={onDigitClick} />
          <Digit digit="3" id="three" handleClick={onDigitClick} />
        </div>

        <div className="fifth">
          <Digit digit="0" id="zero" handleClick={onDigitClick} />
          <button id="decimal" onClick={() => onDecimalClik()}>
            .
          </button>
        </div>
        <button id="equals" onClick={() => onEqualsClick(val)}>
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
