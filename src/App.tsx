import React from 'react';
import { Grid, CellData } from './Containers/Grid';



const gridData: [CellData] = [
  {
    col: 0,
    row: 0,
    color:"red"
  }
]


function App() {
  return (
    <div className="">
      <Grid gridData={gridData }/>
    </div>
  );
}

export default App;
