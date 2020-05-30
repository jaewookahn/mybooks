import React from 'react';
import './App.css';
import DataReader from "./DataReader";
import Papa from "papaparse"

function App() {

  var reader = new DataReader('http://localhost:3000')
  reader.getCSVData('test.csv').then((response) => {
    var data = Papa.parse(response)
  })
  .catch((e) => {
      console.log('Error', e)
  })
  
  return (
    <div className="App">
      <header className="App-header">
        MyBooks
      </header>
    </div>
  );
}

export default App;
