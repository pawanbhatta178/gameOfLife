import React, { useRef } from 'react';


export interface CellData{
    col: number;
    row: number;
    alive: boolean;
    
}


export interface GridProps{
    className?: string;
    numCols: number;
    numRows: number;
     gridData?: CellData[]
}




const Grid:React.FC<GridProps> = ({className, gridData, numCols, numRows}) => {
    const tableRef = useRef<HTMLTableElement|null>(null);


    return (
        <table ref={tableRef}>
            <tbody>
                {
                    gridData?.map(item => <GridCell row={item.row} col={item.col} alive={ item.alive}/>)
              }
          </tbody>
        </table>
    )
}


const GridCell: React.FC<CellData> = ({row, col,alive}) => {
    return <td  id={row + "-" + col} ></td>
}


export {Grid}
