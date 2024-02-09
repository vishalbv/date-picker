import logo from "./logo.svg";
import "./App.css";
import { DatePicker } from "./DatePicker/DatePicker";
import { Home } from "./Home/home";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => console.log(json));
  });
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

let a = `1`;
const S = "23";
var m = "33";

// object array if else looping

// vehicle number KA  MU KL

const checkEvenOrOdd = (num) => {
  if (num % 2 == 0) {
    return "even";
  } else {
    return "odd";
  }
};

const checkEvenOrOddArr = (array) => {
  // for (let i = 0; i < array.length; i++) {
  //   let k = checkEvenOrOdd(array[i]);
  //   finalArray.push(k);
  // }

  let finalArray = array.map((item) => {
    return checkEvenOrOdd(item);
  });

  return finalArray;
};

// console.log("aa", checkEvenOrOddArr([4, 5, 6, 7]));
console.log("aa", checkEvenOrOddArr([4, 5, 6, 7, 3, 4, 5]));
