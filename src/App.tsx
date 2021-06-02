import React, {useReducer, useState, useEffect} from 'react';
import { Grid, RowData  } from './Containers/Grid';
import * as _ from "lodash";
import {Icon } from "./Components/Icons";
import { Logo, logoTypes} from "./Components/Logo";
import ReactTooltip from "react-tooltip";
import Dropdown from 'react-dropdown';
import './styles/dropdown.css';

 type Action =
   | { type: 'toggle_cell', col: number, row: number }
   | { type: 'next_generation' }
   | {type:"alter_grid", col:number, row:number}
   | {type:"clear_grid"}

   const speedOptions:string[] = [
    '1x', '2x', '3x'
  ];

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
    case "clear_grid":
      let row = state.length;
      let col = state[0].payload.length;
      let newEmptyState = generateEmptyGrid({col, row});
      return newEmptyState;
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
  const [rowSize, setRowSize] = useState(40);
  const [colSize, setColSize] = useState(30);
  const [play, setPlay] = useState(0);
  const [playSpeed, setPlaySpeed] = useState(1);

  const [data, dispatch] = useReducer(gridReducer, generateEmptyGrid({row:rowSize, col:colSize}));


useEffect(() => {
  if (play === 0) {
    return;
  }
  const interval = setInterval(() => {
    dispatch({ type: "next_generation" });
  }, 1000/playSpeed);
  return () => clearInterval(interval);
},[play, playSpeed])


  const toggleCell = (rows:number,cols:number) => {
    dispatch({type:"toggle_cell", row:rows, col:cols});
  }
  
  const getNextGeneration = () => {
    dispatch({ type: "next_generation" });
  }

  const handleRowSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(Number(e.target.value))) {
      return;
    }
    if (Number(e.target.value) > 100) {
      return;
    }
    setRowSize((currentValue) => Number(e.target.value));
  }

  const handleColSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(Number(e.target.value))) {
      return;
    }
    if (Number(e.target.value) > 100) {
      return;
    }
    setColSize((currentValue) => Number(e.target.value));
}

  const updateGridSize = () => {
    if (data.length === rowSize && data[0].payload.length === colSize) {
      return;
     }
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

  const onGridClear = () => {
    dispatch({ type: "clear_grid" });
  }

  const onSpeedChange = (e:any) => {
    switch (e.label) {
      case "1x":
        setPlaySpeed(1);
        return;
      case "2x":
        setPlaySpeed(2);
        return;
      case "3x":
        setPlaySpeed(3);
        return;
      default:
        return;
   }
  }

  return (
    <div className="w-screen h-screen relative flex-col">
        <div className="h-12 flex items-center justify-center border">
        <Logo type={logoTypes.SM }/>
        </div>
      <div className="flex-1 flex  h-full justify-center">
        <Grid payload={data} toggleCell={toggleCell} numRows={9} numCols={9} />
      </div>
      <div className="absolute bottom-0  h-12 w-full border shadow-sm bg-white">
        <div className="flex h-full justify-around items-center">
         {/* <input placeholder="# Rows" value={rowSize} onChange={handleRowSizeChange}></input>
         <input placeholder="# Cols" value={colSize} onChange={handleColSizeChange}></input> */}
         {/* <button onClick={updateGridSize} data-tip data-for="changeGridTip"><Icon name={"resize"}/></button> */}
         <button onClick={onPlayToggle} data-tip data-for="playTip">{play === 0 ? < Icon name={ "play"} />:<Icon name="pause"/> }</button>
          <button onClick={getNextGeneration} data-tip data-for="nextGenTip"><Icon name="repeat" /></button>
          <button onClick={onGridClear} data-tip data-for="clearTip"><Icon name="clear" /></button>

          <ReactTooltip id="clearTip" place="top" effect="solid">
           Wipes out all the living cells
          </ReactTooltip>
          <ReactTooltip id="nextGenTip" place="top" effect="solid">
           Next Generation
          </ReactTooltip>
          <ReactTooltip id="playTip" place="top" effect="solid">
           Start/Pause
          </ReactTooltip>
          <ReactTooltip id="changeGridTip" place="top" effect="solid">
           Alter Grid
          </ReactTooltip>
          <Dropdown options={speedOptions} value={speedOptions[0]} onChange={ onSpeedChange} />
        </div>

      </div>
     
    </div>
  );
}

export default App;
