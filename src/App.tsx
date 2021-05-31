import React, {useReducer, useState} from 'react';
import { Grid, RowData  } from './Containers/Grid';
import * as _ from "lodash";


 type Action =
   | { type: 'toggle_cell', col: number, row: number }
   | { type: 'kill' }
   | { type: 'born' }


let Data: RowData[] = [
  {
    id:"0",
    payload: [
      { col: 0, row: 0, alive: true },
      { row: 0, col: 1, alive: false },
      { row: 0, col: 2, alive: false },
      { row: 0, col: 3, alive: false },
      { row: 0, col: 4, alive: false }

    ]
  },
  {
    id:"1",
    payload: [
      { row: 1, col: 0, alive: true },
      { row: 1, col: 1, alive: false },
      { row: 1, col: 2, alive: false },
      { row: 1, col: 3, alive: false },
      { row: 1, col: 4, alive: false }


    ]
  },
  {
    id:"2",
    payload: [
      { row: 2, col: 0, alive: true },
      { row: 2, col: 1, alive: false },
      { row: 2, col: 2, alive: false },
      { row: 2, col: 3, alive: false },
      { row: 2, col: 4, alive: false }


    ]
  },
  {
    id:"3",
    payload: [
      { row: 3, col: 0, alive: true },
      { row: 3, col: 1, alive: false },
      { row: 3, col: 2, alive: false },
      { row: 3, col: 3, alive: false },
      { row: 3, col: 4, alive: false }


    ]
  }
  ,
  {
    id:"4",
    payload: [
      { row: 4, col: 0, alive: true },
      { row: 4, col: 1, alive: false },
      { row: 4, col: 2, alive: false },
      { row: 4, col: 3, alive: false },
      { row: 4, col: 4, alive: false }


    ]
  }
]






 const gridReducer=(state: typeof Data, action: Action): typeof Data =>{
  switch (action.type) {
    case "toggle_cell":
      let newState = [...state];
      let rowToUpdate = newState[action.row];
      let colToUpdate = rowToUpdate.payload[action.col];
      colToUpdate.alive = !colToUpdate.alive;
      return newState;
    case "kill":
      console.log("Before state changing",state);
     
     const newState1 = _.cloneDeep(state);
      state.forEach((rowItem, index1) => {
        rowItem.payload.forEach((colItem, index2) => {
          //born logic
          if (!colItem.alive) {
            console.log(`It is dead: (${index1},${index2})`);
            let neighbor1Row = state[index1 - 1];
            let neighbor1 = neighbor1Row?.payload[index2 - 1];
            
            let neighbor2Row = state[index1 - 1];
            let neighbor2 = neighbor2Row?.payload[index2 ];
            
            let neighbor3Row = state[index1 - 1];
            let neighbor3= neighbor3Row?.payload[index2 + 1];
            
            let neighbor4Row = state[index1 ];
            let neighbor4 = neighbor4Row?.payload[index2 - 1];
            
            let neighbor5Row = state[index1 ];
            let neighbor5 = neighbor5Row?.payload[index2+1];
            
            let neighbor6Row = state[index1 + 1];
            let neighbor6= neighbor6Row?.payload[index2 - 1];
            
            let neighbor7Row = state[index1 + 1];
            let neighbor7 = neighbor7Row?.payload[index2];
  
            let neighbor8Row = state[index1 + 1];
            let neighbor8 = neighbor8Row?.payload[index2 + 1];
            

            let aliveNeighbors:number = 0;

          if (neighbor1?.alive) {
            aliveNeighbors++;
          }
          if (neighbor2?.alive) {
            aliveNeighbors++;
          }
          if (neighbor3?.alive) {
            aliveNeighbors++;
          }
          if (neighbor4?.alive) {
            aliveNeighbors++;
          }
          if (neighbor5?.alive) {
            aliveNeighbors++;
          }
          if (neighbor6?.alive) {
            aliveNeighbors++;
          }
          if (neighbor7?.alive) {
            aliveNeighbors++;
          }
          if (neighbor8?.alive) {
            aliveNeighbors++;
          }
            console.log("Total Alive Neighbors:",aliveNeighbors)
          if (aliveNeighbors ===3) { //birth
            let rowToUpdate = newState1[index1];
            let colToUpdate = rowToUpdate.payload[index2];
            colToUpdate.alive = true;
           }
           
          }
          else {
            let neighbor1Row = state[index1 - 1];
            let neighbor1 = neighbor1Row?.payload[index2 - 1];
            
            let neighbor2Row = state[index1 - 1];
            let neighbor2 = neighbor2Row?.payload[index2 ];
            
            let neighbor3Row = state[index1 - 1];
            let neighbor3= neighbor3Row?.payload[index2 + 1];
            
            let neighbor4Row = state[index1 ];
            let neighbor4 = neighbor4Row?.payload[index2 - 1];
            
            let neighbor5Row = state[index1 ];
            let neighbor5 = neighbor5Row?.payload[index2+1];
            
            let neighbor6Row = state[index1 + 1];
            let neighbor6= neighbor6Row?.payload[index2 - 1];
            
            let neighbor7Row = state[index1 + 1];
            let neighbor7 = neighbor7Row?.payload[index2];
  
            let neighbor8Row = state[index1 + 1];
            let neighbor8 = neighbor8Row?.payload[index2 + 1];
            
            let aliveNeighbors:number = 0;
  
            if (neighbor1?.alive) {
              aliveNeighbors++;
            }
            if (neighbor2?.alive) {
              aliveNeighbors++;
            }
            if (neighbor3?.alive) {
              aliveNeighbors++;
            }
            if (neighbor4?.alive) {
            aliveNeighbors++;
          }
          if (neighbor5?.alive) {
            aliveNeighbors++;
          }
          if (neighbor6?.alive) {
            aliveNeighbors++;
          }
          if (neighbor7?.alive) {
            aliveNeighbors++;
          }
          if (neighbor8?.alive) {
            aliveNeighbors++;
          }
            
             
          if (aliveNeighbors < 2 || aliveNeighbors > 3) { //underpop and overpop
            let rowToUpdate = newState1[index1];
            let colToUpdate = rowToUpdate.payload[index2];
            colToUpdate.alive = false;
           }
          }
         
        })
      })
      console.log("New State to return",newState1);

      return newState1;
    default:
      return state;
      

  }
}




function App() {
  const [data, dispatch] = useReducer(gridReducer, Data);
  


  const toggleCell = (rows:number,cols:number) => {
    dispatch({type:"toggle_cell", row:rows, col:cols});
  }
  
  const getNextGeneration = () => {
    dispatch({ type: "kill" });
  }


  return (
    <>
      <div className="">
        {console.log(data)}
      <Grid payload={data} toggleCell={toggleCell}  numRows={9} numCols={9} />
    </div>
      <button onClick={()=>getNextGeneration()}>Next Generation</button>
      </>
  );
}

export default App;
