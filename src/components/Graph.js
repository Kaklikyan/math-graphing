import React, { PureComponent } from 'react'

export default class Graph extends PureComponent {
    canvasRef = React.createRef();
    minVal = -10;
    maxVal = 10;

    componentDidMount() {
        this.draw();
    }

    draw = () => {
        const canvas = this.canvasRef.current;
        if (null == canvas || !canvas.getContext) return;

        let axes = {};
        const ctx = canvas.getContext("2d");

        axes.x0 = .5 + .5*canvas.width;  // x0 pixels from left to x=0
        axes.y0 = .5 + .5*canvas.height; // y0 pixels from top to y=0
        axes.scale = 10;                 // 40 pixels from x=0 to x=1
        axes.doNegativeX = true;

        this.showAxes(ctx, axes);
        this.funGraph(ctx, axes, "rgb(11, 153, 11)"); 
    }

    funGraph = (ctx, axes, color) => {
        const { x0, y0 } = axes;
        let xx,
            yy,
            dx = 5;
            
        ctx.beginPath();
        ctx.strokeStyle = color;

        for (let i = this.minVal; i <= this.maxVal; i++) {
            const val = this.props.expressionFunc(i);
            xx = dx * i;
            yy = dx * val;
            i === this.minVal ? ctx.moveTo(x0 + xx , y0 - yy) : ctx.lineTo(x0 + xx, y0 - yy);
        }
        ctx.stroke();
    }

    showAxes = (ctx, axes) => {
        const x0 = axes.x0;
        const y0 = axes.y0;
        const w = ctx.canvas.width;
        const h = ctx.canvas.height
        const xmin = axes.doNegativeX ? 0 : x0;
        ctx.beginPath();
        ctx.strokeStyle = "rgb(128, 128, 128)"; 
        ctx.moveTo(xmin, y0); 
        ctx.lineTo(w, y0);  // X axis
        ctx.moveTo(x0, 0);   
        ctx.lineTo(x0, h);  // Y axis 
        ctx.stroke();
    }

    render() {
        return <canvas ref={this.canvasRef} width="400" height="400"></canvas>;
    }
}
