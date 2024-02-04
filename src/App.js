import logo from "./logo.svg";
import "./App.css";
import { DatePicker } from "./DatePicker/DatePicker";
import { Home } from "./Home/home";

function App() {
  const changeHandler = (data) => {
    console.log("changeHandler", data);
  };

  return (
    <div className="App">
      <DatePicker changeHandler={changeHandler} />
    </div>
  );
}

export default App;
