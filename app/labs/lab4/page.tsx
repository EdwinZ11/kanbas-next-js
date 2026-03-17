"use client";
import Link from "next/link";
import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import StringStateVariables from "./StringStateVariables";
import UrlEncoding from "./query-parameters";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }
  return (
      <div id="wd-lab3" className="container">
        <h3>Lab 4 - States</h3>
        <Link href={"./lab4/redux"}> Redux Examples</Link> <hr />
        <Link href="./lab4/react-context">React Context Examples</Link> <hr />
        <Link href="./lab4/zustand">Zustand Examples</Link>
        <ClickEvent />
        <PassingDataOnEvent />
        <PassingFunctions theFunctionAction={sayHello} />
        <Counter />
        <BooleanStateVariables />
        <StringStateVariables />
        <DateStateVariable />
        <ObjectStateVariable />
        <ArrayStateVariable />
        <ParentStateComponent />
        <UrlEncoding />
      </div>
  );
}
