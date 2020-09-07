import React from 'react';
import './App.css';
import DataReader from "./DataReader";
import Papa from "papaparse"
import ReactDataGrid from 'react-data-grid'

const generalCellFormatter = ({ value }) => {
  return <div className='cell'>{value}</div>;
};

const sortRows = (sortColumn, sortDirection, rows, initial_rows) => {  
  const comparer = (a, b) => {
    if (sortDirection === "ASC") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else if (sortDirection === "DESC") {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  };
  console.log([...rows].sort(comparer))
  return sortDirection === "NONE" ? initial_rows : [...rows].sort(comparer);
};

const defaultColumnProperties = {
  sortable: true,
  width: 250,
  editable: true,
  resizable: true,
  formatter: generalCellFormatter
};

const columns = [
  { key: "title", name: "Title" },
  { key: "author", name: "Author"},
  { key: "publisher", name: "Publisher"},
  { key: "source", name: "Source"},
  { key: "filename", name: "Filename"},
].map(c => ({ ...c, ...defaultColumnProperties }));


class App extends React.Component {

  state = { rows: [] }

  constructor() {
    
    super()

    var reader = new DataReader('http://localhost:3000')
    reader.getCSVData('list-all-epubs.csv').then((response) => {
      var data = Papa.parse(response, {header: true})
      this.state.rows = data.data;
      this.initial_rows = data.data;
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
            onGridSort={(sortColumn, sortDirection) => 
              this.setState({
                  rows: sortRows(sortColumn, sortDirection, this.state.rows, this.initial_rows)
                })
            }
        />
  
      </div>
    );  
  }
}

export default App;
