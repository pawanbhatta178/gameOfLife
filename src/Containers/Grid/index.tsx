import React, { useRef, useEffect } from 'react';


export interface CellData{
    col: number;
    row: number;
    color: string;
    
}


export interface GridProps{
    className?: string;
     gridData?: [CellData]
}



const Grid:React.FC<GridProps> = ({className, gridData}) => {
    const tableRef = useRef<HTMLTableElement|null>(null);

    useEffect(() => {
       
    
   },[])

    return (
        <table ref={tableRef}>
            <tbody>
                {
                    gridData?.map((cell, index) => {
                        return <tr key={cell.row+"-"+cell.col}>hey</tr>
                    })
              }


          </tbody>
        </table>
    )
}

export {Grid}
