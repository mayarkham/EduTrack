const departmentFilter = document.getElementById("departmentFilter");
const equipmentFilter = document.getElementById("equipmentFilter");
const maintenanceDate = document.getElementById("maintenanceDate");

const toolsByDepartment = {
  "IT & Computers": ["Laptop", "Desktop Computer", "Printer", "Projector", "Router"],
  "Office": ["Shredder", "Photocopier"],
  "Workshop Tools": ["Welding Machine", "Safety Gear", "Drills"],
  "Teaching Aids": ["Smartboards", "Sound Systems"]
};

departmentFilter.addEventListener("change", () => {
  const selectedDept = departmentFilter.value;
  equipmentFilter.innerHTML = '<option value="">All Equipment</option>';

  if (toolsByDepartment[selectedDept]) {
    toolsByDepartment[selectedDept].forEach(tool => {
      const opt = document.createElement("option");
      opt.value = tool;
      opt.textContent = tool;
      equipmentFilter.appendChild(opt);
    });
  }

  applyFilters();
});

equipmentFilter.addEventListener("change", applyFilters);
maintenanceDate.addEventListener("change", applyFilters);

function applyFilters() {
  const selectedEquip = equipmentFilter.value.toLowerCase();
  const selectedDate = maintenanceDate.value;

  document.querySelectorAll(".user-row").forEach(row => {
    const equipText = row.querySelector(".equipment-department").textContent.toLowerCase();
    const dateText = row.querySelector(".return-date").textContent;

    const matchesEquip = !selectedEquip || equipText.includes(selectedEquip);
    const matchesDate = !selectedDate || dateText === selectedDate;

    row.style.display = matchesEquip && matchesDate ? "flex" : "none";
  });
}

function openScheduleForm() {
  document.getElementById("scheduleModal").style.display = "flex";
}

function closeScheduleForm() {
  document.getElementById("scheduleModal").style.display = "none";
}
function addSchedule() {
  const equipment = document.getElementById("equipmentInput").value.trim();
  const equipmentType = document.getElementById("equipmentTypeInput").value.trim();
  const department = departmentFilter.value.trim();
  const date = document.getElementById("dateInput").value;
  const issue = document.getElementById("issueInput").value.trim();

  if (!equipment || !equipmentType || !date || !issue) {
    alert("Please fill in all fields.");
    return;
  }

  const list = document.getElementById("scheduleList");

  const newRow = document.createElement("div");
  newRow.className = "user-row";
  newRow.innerHTML = `
    <div class="equipment-department">
      <p><strong>Equipment:</strong> ${equipment}</p>
      <p><strong>Type:</strong> ${equipmentType}</p>
      <p><strong>Department:</strong> ${department || 'N/A'}</p>
      <p><strong>Issue:</strong> ${issue}</p>
    </div>
    <div class="term">Scheduled: <span class="return-date">${date}</span></div>
    <div class="status maintenance">Pending</div>
  `;
  list.appendChild(newRow);

  closeScheduleForm();

  document.getElementById("equipmentInput").value = "";
  document.getElementById("equipmentTypeInput").value = "";
  document.getElementById("dateInput").value = "";
  document.getElementById("issueInput").value = "";
}
