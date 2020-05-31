import React from 'react';
import './App.css';
import DataReader from "./DataReader";
import Papa from "papaparse"
import ReactDataGrid from 'react-data-grid'

const columns = [
  { key: "a", name: "Column A", editable: true, width: 200, resizable: true },
  { key: "b", name: "Column B", editable: true, width: 250, resizable: true  },
];

class App extends React.Component {

  state = { rows: [] }

  constructor() {
    
    super()

    var reader = new DataReader('http://localhost:3000')
    reader.getCSVData('test.csv').then((response) => {
      var data = Papa.parse(response)
      var rows = []

      data.data.forEach(r => {
        rows.push({'a':r[0], 'b':r[1]})
      })

      this.state.rows = rows
    })
    .catch((e) => {
        console.log('Error', e)
    })  
  }

  render() {
    return (

      <div className="App">
        <header className="App-header">
          MyBooks
        </header>
  
        <ReactDataGrid
            columns={columns}
            rowGetter={i => this.state.rows[i] }
            rowsCount={20}
            onGridRowsUpdated={this.onGridRowsUpdated}
            enableCellSelect={true}
        />
      </div>
    );  
  }
}

export default App;
