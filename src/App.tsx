import React from 'react';
import { Grid, CellData } from './Containers/Grid';



const Data: CellData[] = [
  {row:0,col:0,alive:true},
  {row:0,col:1, alive:false}
]

function App() {
  return (
    <div className="">
      <Grid gridData={Data} numRows={9} numCols={9 }/>
    </div>
  );
}

export default App;
