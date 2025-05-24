const allRepairs = [
  { id: "L-7790", date: "2025-01-15", status: "In Use" },
  { id: "L-7790", date: "2024-12-03", status: "In Inspection" },
  { id: "L-7790", date: "2024-05-15", status: "In Maintenance" },
  { id: "L-7790", date: "2023-12-05", status: "In Inspection" },
  { id: "P-1023", date: "2024-11-10", status: "Repaired" },
  { id: "S-2089", date: "2024-06-22", status: "Repaired" }
];

const statusClasses = {
  "In Use": "in-use",
  "In Inspection": "inspection",
  "In Maintenance": "maintenance",
  "Repaired": "repaired"
};

const table = document.querySelector(".history-table");
const filterInput = document.getElementById("filterDate");

function renderRows(data) {
  table.innerHTML = "";
  if (data.length === 0) {
    table.innerHTML = "<p style='color: gray;'>No repair records match the selected date.</p>";
    return;
  }

  data.forEach(entry => {
    const div = document.createElement("div");
    div.className = "history-entry";
    div.innerHTML = `
      <span>Repair Date: ${entry.date} | ID: ${entry.id}</span>
      <span class="status-label ${statusClasses[entry.status]}">${entry.status}</span>
    `;
    table.appendChild(div);
  });
}

function clearFilter() {
  filterInput.value = "";
  renderRows(allRepairs);
}

filterInput.addEventListener("change", () => {
  const selectedDate = filterInput.value;
  const filtered = allRepairs.filter(entry => entry.date === selectedDate);
  renderRows(filtered);
});

renderRows(allRepairs);
