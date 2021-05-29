import React, { useRef, useEffect } from 'react';

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement|null>(null);
    const contextRef = useRef<CanvasRenderingContext2D|null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas !== null) {
            const ctx = canvas.getContext('2d');
            contextRef.current = ctx;
        }
    
   },[])

    return (
        <canvas ref={canvasRef}>
          
        </canvas>
    )
}

export {Canvas}
