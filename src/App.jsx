import "./App.css";
import { useState } from "react";

const App = () => {
  const [display, setDisplay] = useState("0");

  const [firstNumber, setFirstNumber] = useState(null);

  const [operator, setOperator] = useState(null);

  const [waiting, setWaiting] = useState(false);

  function calculate(a, b, op) {
    let result = 0;
    if (op === "+") result = a + b;
    if (op === "-") result = a - b;
    if (op === "x") result = a * b;
    if (op === "÷") {
      if (b === 0) return "Error";
      result = a / b;
    }
    return parseFloat(result.toFixed(10));
  }

  function handleNumber(num) {
    if (waiting || display === "0" || display === "Error") {
      setDisplay(num);
      setWaiting(false);
    } else if (display.length < 12) {
      setDisplay(display + num);
    }
  }

  function handleClear() {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setWaiting(false);
  }

  function handleDot() {
    if (waiting || display === "Error") {
      setDisplay("0.");
      setWaiting(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }

  function handleSign() {
    if (display === "0") return;
    setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);
  }

  function handlePercent() {
    setDisplay(String(parseFloat(display) / 100));
  }

  function handleOperator(op) {
    const current = parseFloat(display);

    if (firstNumber !== null && operator && !waiting) {
      const result = calculate(firstNumber, current, operator);
      setDisplay(String(result));
      setFirstNumber(result === "Error" ? null : result);
    } else {
      setFirstNumber(current);
    }
    setOperator(op);
    setWaiting(true);
  }

  function handleEquals() {
    if (operator === null || waiting || display === "Error") return;
    const current = parseFloat(display);
    const result = calculate(firstNumber, current, operator);
    setDisplay(String(result));
    setFirstNumber(null);
    setOperator(null);
    setWaiting(true);
  }

  return (
    <div className="page">
      <div className="calculator">
        <div className="screen">{display}</div>
        <div className="keys">
          <button className="btn gray" onClick={handleClear}>
            AC
          </button>
          <button className="btn gray" onClick={handleSign}>
            ±
          </button>
          <button className="btn gray" onClick={handlePercent}>
            %
          </button>
          <button className="btn orange" onClick={() => handleOperator("÷")}>
            ÷
          </button>

          <button className="btn number" onClick={() => handleNumber("7")}>
            7
          </button>
          <button className="btn number" onClick={() => handleNumber("8")}>
            8
          </button>
          <button className="btn number" onClick={() => handleNumber("9")}>
            9
          </button>
          <button className="btn orange" onClick={() => handleOperator("x")}>
            x
          </button>

          <button className="btn number" onClick={() => handleNumber("4")}>
            4
          </button>
          <button className="btn number" onClick={() => handleNumber("5")}>
            5
          </button>
          <button className="btn number" onClick={() => handleNumber("6")}>
            6
          </button>
          <button className="btn orange" onClick={() => handleOperator("-")}>
            -
          </button>

          <button className="btn number" onClick={() => handleNumber("1")}>
            1
          </button>
          <button className="btn number" onClick={() => handleNumber("2")}>
            2
          </button>
          <button className="btn number" onClick={() => handleNumber("3")}>
            3
          </button>
          <button className="btn orange" onClick={() => handleOperator("+")}>
            +
          </button>

          <button className="btn number zero" onClick={() => handleNumber("0")}>
            0
          </button>
          <button className="btn number" onClick={handleDot}>
            .
          </button>
          <button className="btn orange" onClick={handleEquals}>
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
