import React from "react";
import ReactDOM from "react-dom";
import PaymentSlider from "./components/PaymentSlider";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <p>
        Vas a comprar un test premium, se cargará [precio del tests] U$S a tu
        cuenta:
      </p>
      <PaymentSlider onComplete={() => console.log("purchased")} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
