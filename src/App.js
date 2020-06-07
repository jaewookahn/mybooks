import React from 'react';
import './App.css';
import DataReader from "./DataReader";
import Papa from "papaparse"
import ReactDataGrid from 'react-data-grid'

const generalCellFormatter = ({ value }) => {
  return <div className='cell'>{value}</div>;
};

const columns = [
  { key: "title", name: "Title", editable: true, width: 200, resizable: true, formatter: generalCellFormatter },
  { key: "author", name: "Author", editable: true, width: 250, resizable: true, formatter: generalCellFormatter   },
  { key: "publisher", name: "Publisher", editable: true, width: 250, resizable: true, formatter: generalCellFormatter   },
  { key: "source", name: "Source", editable: true, width: 250, resizable: true, formatter: generalCellFormatter   },
  { key: "filename", name: "Filename", editable: true, width: 250, resizable: true, formatter: generalCellFormatter   },

];

class App extends React.Component {

  state = { rows: [] }

  constructor() {
    
    super()

    var reader = new DataReader('http://localhost:3000')
    reader.getCSVData('list-all-epubs.csv').then((response) => {
      var data = Papa.parse(response, {header: true})
      this.state.rows = data.data;
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

        <div className='controls'>
          Search
        </div>
  
        <ReactDataGrid
            columns={columns}
            rowGetter={i => this.state.rows[i] }
            rowsCount={3000}
            onGridRowsUpdated={this.onGridRowsUpdated}
            enableCellSelect={true}
            minHeight={1000}
        />
  
      </div>
    );  
  }
}

export default App;
