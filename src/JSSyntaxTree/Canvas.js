import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Canvas = ({ draw, height, width }) => {
    const canvas = useRef();

    useEffect(() => {
        const context = canvas.current.getContext("2d");
        draw(context);
    });

    return <canvas ref={canvas} height={height} width={width} />;
};

Canvas.propTypes = {
    draw: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
};

export default Canvas;
