import React, {useState, useEffect, useRef} from 'react';


export interface CellData{
    col: number;
    row: number;
    alive: boolean;
    
}

export interface GridCellProps extends CellData{
    toggleCell: (row: number, col: number) => void;
    onMouseOver: (row: number, col: number) => void;
}



export interface RowData{
    id: string;
    payload: CellData[]
}

export interface GridRowProps extends RowData{
    toggleCell: (row: number, col: number) => void;
    onMouseOver: (row: number, col: number) => void;
}
  

export interface GridProps{
    className?: string;
    toggleCell: (row:number,col:number ) => void;
    numCols: number;
    numRows: number;
    payload: RowData[]
}




const Grid:React.FC<GridProps> = ({className, payload, numCols, numRows, toggleCell}) => {
    const tableRef = useRef<HTMLTableElement|null>(null);
    const [mousePressed, setMousePressed] = useState(false);
    

    const onMouseDown = (e:MouseEvent) => {
        setMousePressed(true);
   }
    
    const onMouseUp = (e:MouseEvent) => {
        setMousePressed(false);
    }

    const onTouchStart = (e:TouchEvent) => {
        setMousePressed(true);
   }
    
    const onTouchEnd = (e:TouchEvent) => {
        setMousePressed(false);
    }

    const onMouseOver = (row:number, col:number) => {
        if (!mousePressed) {
            return;
        }
        toggleCell(row, col);
    }


    useEffect(() => {
        if (!tableRef.current) {
            return;
        }
        tableRef.current.addEventListener("mousedown", onMouseDown)
        tableRef.current.addEventListener("mouseup", onMouseUp)
        tableRef.current.addEventListener("touchstart", onTouchStart)
        tableRef.current.addEventListener("touchend", onTouchEnd)
        return () => {
            tableRef.current?.removeEventListener("mousedown", onMouseDown);
            tableRef.current?.removeEventListener("mouseup", onMouseUp);
            tableRef.current?.removeEventListener("touchstart", onTouchStart)
            tableRef.current?.removeEventListener("touchend", onTouchEnd)
        }
    },[tableRef])

    return (
       
        <table ref={tableRef} className="">
            <tbody>
                {
                    payload?.map((item, index) => <GridRow key={`${item.id}`} {...item} toggleCell={toggleCell} onMouseOver={ onMouseOver}/>)
              }
          </tbody>
            </table>
  
    )
}

const GridRow: React.FC<GridRowProps> = ({id,payload, toggleCell, onMouseOver}) => {
    return <tr id={`${id}`} >
        {payload?.map((item, index) => <GridCell key={`${item.row}-${item.col}`} toggleCell={toggleCell} {...item} onMouseOver={ onMouseOver}/>) }
    </tr>
}


const GridCellStyle = `w-4 h-4   border border-purple-100 `;
const GridCellAliveStyle = `w-4 h-4  border bg-purple-600 border-purple-300 `;


const GridCell: React.FC<GridCellProps> = ({row, col,alive, toggleCell, onMouseOver}) => {
    return <td onMouseEnter={(e)=>onMouseOver(row,col)} onTouchMove={(e)=>onMouseOver(row,col)}  onClick={(e)=>toggleCell(row,col) } className={alive?GridCellAliveStyle:GridCellStyle } id={row + "-" + col} ></td>
}


export {Grid}
