import React from 'react';
import calendar from '../scripts/CalendarFunctions';

export default class CalnedarCanvas extends React.Component {
    constructor({ bdate, edate }) {
        super();
        this.bdate = bdate;
        this.edate = edate;
    }

    componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.font = 'bold 14px sans-serif';
        const bdate = new Date(this.bdate),
              date = new Date(this.bdate);
        let y = 0;
        while (!(date.getFullYear() === this.edate.getFullYear() && date.getMonth() === this.edate.getMonth()+1)) {
            let m = date.getMonth();
            y = calendar(ctx, bdate, date, y);
            date.setMonth(m + 1);
            date.setDate(1);
        }
    }

    render() {
        return (
            <canvas id="calendar" ref="canvas" width="280" height="560"></canvas>
        )
    }
}