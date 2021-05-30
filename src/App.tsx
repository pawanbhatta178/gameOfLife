import React from 'react';
import { Grid, RowData } from './Containers/Grid';




let Data: RowData[] = [
  {
    id:"0",
    payload: [
      { col: 0, row: 0, alive: true },
      { row: 0, col: 1, alive: false }
    ]
  },
  {
    id:"1",
    payload: [
      { row: 1, col: 0, alive: true },
      { row: 1, col: 1, alive: false }
    ]
  }
]

function App() {
  return (
    <div className="">
      <Grid payload={Data} numRows={9} numCols={9 }/>
    </div>
  );
}

export default App;
