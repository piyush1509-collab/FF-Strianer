fetch('/data')
    .then(response => response.json())
    .then(data => {
        let tasks = data.map(item => {
            return {
                x: [item.start, item.end],
                y: [item.equipment, item.equipment],
                type: 'scatter',
                mode: 'lines',
                line: { width: 20 },
                name: item.equipment,
                hoverinfo: 'x+y+name'
            };
        });

        Plotly.newPlot('chart', tasks, {
            title: 'Equipment Replacement Gantt Chart',
            xaxis: { type: 'date' },
            yaxis: { automargin: true }
        });
    });
