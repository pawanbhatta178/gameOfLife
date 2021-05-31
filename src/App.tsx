import React, {useReducer, useState, useEffect} from 'react';
import { Grid, RowData  } from './Containers/Grid';
import * as _ from "lodash";


 type Action =
   | { type: 'toggle_cell', col: number, row: number }
   | { type: 'next_generation' }
   | {type:"alter_grid", col:number, row:number}


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


interface gridGeneratorArg{
  row: number;
  col:number
}

const generateEmptyGrid = ({ row, col }: gridGeneratorArg) => {
  const newGrid: typeof Data = [];
  for (let i = 0; i < row; i++){
    let rowData: RowData={id:`${i}`,payload:[]};
    for (let j = 0; j < col; j++){
      rowData.payload.push({
        row: i,
        col: j,
        alive:false
      });
    }
    newGrid.push(rowData);
  }
  return newGrid;
}



 const gridReducer=(state: typeof Data, action: Action): typeof Data =>{
  switch (action.type) {
    case "toggle_cell":
      let newState = [...state];
      let rowToUpdate = newState[action.row];
      let colToUpdate = rowToUpdate.payload[action.col];
      colToUpdate.alive = !colToUpdate.alive;
      return newState;
    case "alter_grid":
      let alteredState=  generateEmptyGrid({col:action.col, row:action.row});
      return alteredState;
    case "next_generation":     
     const newState1 = _.cloneDeep(state);
      state.forEach((rowItem, index1) => {
        rowItem.payload.forEach((colItem, index2) => {
          //born logic
          if (!colItem.alive) {
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
      return newState1;
    default:
      return state;
      

  }
}




function App() {
  const [rowSize, setRowSize] = useState(30);
  const [colSize, setColSize] = useState(30);
  const [play, setPlay] = useState(0);

  const [data, dispatch] = useReducer(gridReducer, generateEmptyGrid({row:rowSize, col:colSize}));



useEffect(() => {
  if (play === 0) {
    return;
  }
  const interval = setInterval(() => {
    dispatch({ type: "next_generation" });
    console.log('This will run every second!');
  }, 1000);
  return () => clearInterval(interval);

},[play])


  const toggleCell = (rows:number,cols:number) => {
    dispatch({type:"toggle_cell", row:rows, col:cols});
  }
  
  const getNextGeneration = () => {
    dispatch({ type: "next_generation" });
  }

  const handleRowSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowSize((currentValue)=>Number(e.target.value));
  }

  const handleColSizeChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setColSize((currentValue)=>Number(e.target.value));
  }

  const updateGridSize = () => {
    if (window.confirm("Are you sure you want to proceed? Current grid data will be lost.")) {
      dispatch({type:"alter_grid",col:colSize, row:rowSize})
    } 
  }
   
  const onPlayToggle = () => {
    setPlay(currentVal => {
      if (currentVal === 0) {
        return 1;
      }
      else {
        return 0;
     }
    });
  }


  return (
    <>
      <div className="">
      <Grid payload={data} toggleCell={toggleCell}  numRows={9} numCols={9} />
      </div>
      <input placeholder="# Rows" value={rowSize} onChange={handleRowSizeChange}></input>
      <input placeholder="# Cols" value={colSize} onChange={handleColSizeChange}></input>
      <button onClick={onPlayToggle}>{play===0?"Play":"Stop" }</button>
      <button onClick={()=>updateGridSize()}>Change Size</button>
      <button onClick={()=>getNextGeneration()}>Next Generation</button>
      </>
  );
}

export default App;
