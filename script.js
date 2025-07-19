function addRow() {
  const tableBody = document.getElementById('tableBody');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input type="text" placeholder="e.g. EGC1" /></td>
    <td>
      <div class="date-pairs">
        <div class="pair">
          <input type="date" />
          <input type="date" />
        </div>
      </div>
    </td>
    <td>
      <input type="color" value="#00ADB5" />
      <button onclick="addDatePair(this)">+ Period</button>
      <button onclick="removeRow(this)">🗑️</button>
    </td>
  `;
  tableBody.appendChild(row);
}

function addDatePair(button) {
  const td = button.parentNode;
  const datePairsDiv = td.parentNode.querySelector('.date-pairs');
  const pair = document.createElement('div');
  pair.className = 'pair';
  pair.innerHTML = `
    <input type="date" />
    <input type="date" />
  `;
  datePairsDiv.appendChild(pair);
}

function removeRow(button) {
  button.closest('tr').remove();
}

function generateChart() {
  const rows = document.querySelectorAll('#tableBody tr');
  const data = [];

  rows.forEach(row => {
    const name = row.cells[0].querySelector('input').value;
    const color = row.cells[2].querySelector('input[type=color]').value;
    const datePairs = row.querySelectorAll('.pair');

    datePairs.forEach(pair => {
      const dates = pair.querySelectorAll('input[type=date]');
      const startDate = dates[0].value;
      const endDate = dates[1].value;

      if (startDate && endDate) {
        data.push({
          x: [startDate, endDate],
          y: [name, name],
          type: 'scatter',
          mode: 'lines',
          line: {
            color: color,
            width: 20,
            shape: 'hv'
          },
          hovertemplate: `<b>${name}</b><br>Start: ${startDate}<br>End: ${endDate}<extra></extra>`
        });
      }
    });
  });

  const layout = {
    title: {
      text: 'Equipment Replacement Timeline',
      font: { color: '#00ADB5' }
    },
    xaxis: {
      title: 'Date',
      showgrid: true,
      gridcolor: '#444',
      tickformat: "%Y-%m-%d",
      tickangle: -45
    },
    yaxis: {
      title: 'Equipment',
      showgrid: true,
      gridcolor: '#444'
    },
    plot_bgcolor: "#1A1A1A",
    paper_bgcolor: "#1A1A1A",
    font: { color: "#E0E0E0" },
    hovermode: 'x',
    shapes: [
      {
        type: 'line',
        x0: 0, x1: 0,
        y0: 0, y1: 1,
        xref: 'x', yref: 'paper',
        line: { color: '#888', width: 1, dash: 'dot' }
      }
    ]
  };

  Plotly.newPlot('chart', data, layout);
}

