function addRow() {
  const tableBody = document.getElementById('tableBody');
  const row = document.createElement('tr');

  row.innerHTML = `
    <td><input type="text" placeholder="e.g. FF2" /></td>
    <td><input type="date" class="initial-start" /></td>
    <td class="end-dates">
      <input type="date" />
    </td>
    <td>
      <button onclick="addEndDate(this)">+ Replacement</button>
      <button onclick="removeRow(this)">🗑️</button>
    </td>
  `;

  tableBody.appendChild(row);
}

function addEndDate(btn) {
  const container = btn.closest('tr').querySelector('.end-dates');
  const endInput = document.createElement('input');
  endInput.type = 'date';
  container.appendChild(endInput);
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
    const startInput = row.querySelector('.initial-start');
    const endInputs = row.querySelectorAll('.end-dates input');

    if (!equipmentName || !startInput.value || endInputs.length === 0) return;

    let currentStart = startInput.value;

    endInputs.forEach(endInput => {
      const end = endInput.value;
      if (currentStart && end) {
        data.push({
          x: [currentStart, end],
          y: [equipmentName, equipmentName],
          type: 'scatter',
          mode: 'lines',
          line: { width: 20 },
          name: equipmentName,
          hoverinfo: 'x+y+name'
        });

        // Set the end of this segment as the start of the next one
        currentStart = end;
      }
    });
  });

  if (data.length === 0) {
    alert("Please fill in at least one valid entry.");
    return;
  }

  Plotly.newPlot('chart', data, {
    title: 'Equipment Lifecycle Gantt Chart',
    xaxis: { type: 'date', title: 'Date' },
    yaxis: { title: 'Equipment', automargin: true }
  });
}

