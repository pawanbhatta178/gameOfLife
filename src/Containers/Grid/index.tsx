import React, { useRef } from 'react';


export interface CellData{
    col: number;
    row: number;
    alive: boolean;
    
}

export interface RowData{
    id: string;
    payload: CellData[]
}
  



export interface GridProps{
    className?: string;
    numCols: number;
    numRows: number;
    payload: RowData[]
}




const Grid:React.FC<GridProps> = ({className, payload, numCols, numRows}) => {
    const tableRef = useRef<HTMLTableElement|null>(null);


    return (
        <table ref={tableRef}>
            <tbody>
                {
                    payload?.map((item, index) => <GridRow key={`${item.id}` } {...item}/>)
              }
          </tbody>
        </table>
    )
}

const GridRow: React.FC<RowData> = ({id,payload}) => {
    return <tr id={`${id}`} >
        {payload.map((item, index) => <GridCell key={`${item.row}-${item.col}` } {...item}/>)}
    </tr>
}


const GridCellStyle = `w-4 h-4 border border-purple-300 `;
const GridCellAliveStyle = `w-4 h-4 border bg-purple-600 border-purple-300 `;




const GridCell: React.FC<CellData> = ({row, col,alive}) => {
    return <td onClick={()=>console.log(`clicked ${row}`) } className={alive?GridCellAliveStyle:GridCellStyle } id={row + "-" + col} ></td>
}


export {Grid}
