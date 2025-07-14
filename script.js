function addRow() {
  const table = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
  const row = table.insertRow();
  row.innerHTML = `
    <td><input type="text" placeholder="e.g. EGC2 Strainer" /></td>
    <td><input type="date" /></td>
    <td><input type="date" /></td>
    <td><button onclick="removeRow(this)">X</button></td>
  `;
}

function removeRow(btn) {
  const row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function generateChart() {
  const rows = document.querySelectorAll("#dataTable tbody tr");
  let data = [];

  rows.forEach(row => {
    const cells = row.querySelectorAll("td input");
    const equipment = cells[0].value;
    const start = cells[1].value;
    const end = cells[2].value;

    if (equipment && start && end) {
      data.push({
        x: [start, end],
        y: [equipment, equipment],
        type: 'scatter',
        mode: 'lines',
        line: { width: 20 },
        name: equipment,
        hoverinfo: 'x+y+name'
      });
    }
  });

  if (data.length === 0) {
    alert("Please enter at least one valid row.");
    return;
  }

  Plotly.newPlot('chart', data, {
    title: 'Equipment Replacement Gantt Chart',
    xaxis: { type: 'date', title: 'Timeline' },
    yaxis: { title: 'Equipment', automargin: true }
  });
}
