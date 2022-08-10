import "./styles.css";
import SyntaxTree from "./JSSyntaxTree/SyntaxTree";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <SyntaxTree phrase={"[S [NP jsSyntaxTree][VP [V creates] NP nice syntax trees ->#1]]]"} />
    </div>
  );
}
