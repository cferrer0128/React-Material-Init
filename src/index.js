import React from "react";
import ReactDOM from "react-dom";
import SPForm from "./spform"

import './spform.css';
import 'core-js/es6/map';
import 'core-js/es6/set';
import $ from 'jquery'


//#2e7565

const Index = () => {
  return <div> 
   
    <SPForm />
   
    
</div>
};

ReactDOM.render(<Index />, document.getElementById("index"));
