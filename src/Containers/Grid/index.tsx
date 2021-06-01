import React from 'react';


export interface CellData{
    col: number;
    row: number;
    alive: boolean;
    
}

export interface GridCellProps extends CellData{
    toggleCell: ( row:number,col:number) => void;
}



export interface RowData{
    id: string;
    payload: CellData[]
}

export interface GridRowProps extends RowData{
    toggleCell: (row:number,col:number ) => void;
}
  

export interface GridProps{
    className?: string;
    toggleCell: (row:number,col:number ) => void;
    numCols: number;
    numRows: number;
    payload: RowData[]
}




const Grid:React.FC<GridProps> = ({className, payload, numCols, numRows, toggleCell}) => {


    return (
       
        <table className="">
            <tbody>
                {
                    payload?.map((item, index) => <GridRow key={`${item.id}`} {...item} toggleCell={toggleCell }/>)
              }
          </tbody>
            </table>
  
    )
}

const GridRow: React.FC<GridRowProps> = ({id,payload, toggleCell}) => {
    return <tr id={`${id}`} >
        {payload?.map((item, index) => <GridCell key={`${item.row}-${item.col}`} toggleCell={toggleCell } {...item}/>) }
    </tr>
}


const GridCellStyle = `w-4 h-4   border border-purple-100 `;
const GridCellAliveStyle = `w-4 h-4  border bg-purple-600 border-purple-300 `;


const GridCell: React.FC<GridCellProps> = ({row, col,alive, toggleCell}) => {
    return <td onClick={(e)=>toggleCell(row,col) } className={alive?GridCellAliveStyle:GridCellStyle } id={row + "-" + col} ></td>
}


export {Grid}
