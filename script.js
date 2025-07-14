function addRow() {
  const tableBody = document.getElementById('tableBody');
  const row = document.createElement('tr');

  row.innerHTML = `
    <td><input type="text" placeholder="e.g. FF2" /></td>
    <td>
      <div class="date-pairs">
        <div class="pair">
          <input type="date" placeholder="Start Date" />
          <input type="date" placeholder="End Date" />
        </div>
      </div>
    </td>
    <td>
      <button onclick="addDatePair(this)">+ Period</button>
      <button onclick="removeRow(this)">🗑️</button>
    </td>
  `;

  tableBody.appendChild(row);
}

function removeRow(btn) {
  const row = btn.closest('tr');
  row.remove();
}

function addDatePair(btn) {
  const container = btn.closest('tr').querySelector('.date-pairs');
  const pair = document.createElement('div');
  pair.className = 'pair';
  pair.innerHTML = `
    <input type="date" placeholder="Start Date" />
    <input type="date" placeholder="End Date" />
  `;
  container.appendChild(pair);
}

function generateChart() {
  const rows = document.querySelectorAll("#tableBody tr");
  let data = [];

  rows.forEach(row => {
    const equipmentName = row.querySelector('td input[type="text"]').value;
    const datePairs = row.querySelectorAll('.pair');

    datePairs.forEach(pair => {
      const inputs = pair.querySelectorAll('input');
      const start = inputs[0].value;
      const end = inputs[1].value;

      if (equipmentName && start && end) {
        data.push({
          x: [start, end],
          y: [equipmentName, equipmentName],
          type: 'scatter',
          mode: 'lines',
          line: { width: 20 },
          name: equipmentName,
          hoverinfo: 'x+y+name'
        });
      }
    });
  });

  if (data.length === 0) {
    alert("Please fill in at least one valid entry.");
    return;
  }

  Plotly.newPlot('chart', data, {
    title: 'Equipment Gantt Chart with Multiple Time Periods',
    xaxis: { type: 'date', title: 'Date' },
    yaxis: { title: 'Equipment', automargin: true }
  });
}
