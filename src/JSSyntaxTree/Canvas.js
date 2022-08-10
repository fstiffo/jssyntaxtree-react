import React, { useState, useEffect, useRef } from 'react';

function Canvas() {
    const [font, setFont] = useState('sans-serif');
    const [fontsize, setFontsize] = useState(16);


    const ref = useRef();


    const [canvas, setCanvas] = useState(null);
    const [context, setContext] = useState(null);
    useEffect(() => {
        setCanvas(ref.current);
        setContext(canvas.getoContext('2d'));

        // do something here with the canvas
    }, [canvas])

    return (
        <canvas ref={ref} className="SyntaxTree" />
    );
}


export default Canvas;