const departmentFilter = document.getElementById("departmentFilter");
const toolsFilter = document.getElementById("toolsFilter");
const statusFilter = document.getElementById("statusFilter");
const dateFilter = document.getElementById("dateFilter");
const userRows = document.querySelectorAll(".user-row");

const toolsMap = {
  "it & computers": ["Laptop", "Desktop Computer", "Printer", "Projector", "Router"],
  "office": ["Shredder", "Photocopier"],
  "workshop tools": ["Welding Machine", "Safety Gear", "Drills"],
  "teaching aids": ["Smartboards", "Sound Systems"]
};

function updateToolsFilter() {
  const selectedDepartment = departmentFilter.value.toLowerCase();
  const tools = toolsMap[selectedDepartment] || [];

  toolsFilter.innerHTML = '<option value="">All Tools</option>';

  tools.forEach(tool => {
    const option = document.createElement("option");
    option.value = tool;
    option.textContent = tool;
    toolsFilter.appendChild(option);
  });

  applyFilters();
}

function applyFilters() {
  const dep = departmentFilter.value.toLowerCase();
  const tool = toolsFilter.value.toLowerCase();
  const status = statusFilter.value.toLowerCase();
  const selectedDate = dateFilter.value;

  userRows.forEach(row => {
    const department = row.querySelector(".equipment-department p:nth-child(2)").textContent.toLowerCase();
    const equipment = row.querySelector(".equipment-department p:nth-child(1)").textContent.toLowerCase();
    const stat = row.querySelector(".status").textContent.toLowerCase();
    const returnDateRaw = row.querySelector(".return-date").textContent.trim();

    const returnDateFormatted = returnDateRaw.includes('.')
      ? new Date(returnDateRaw.split('.').reverse().join('-')).toISOString().split('T')[0]
      : returnDateRaw;

    const matchesDepartment = !dep || department.includes(dep);
    const matchesTool = !tool || equipment.includes(tool);
    const matchesStatus = !status || stat.includes(status);
    const matchesDate = !selectedDate || returnDateFormatted === selectedDate;

    row.style.display = (matchesDepartment && matchesTool && matchesStatus && matchesDate)
      ? "flex"
      : "none";
  });
}

departmentFilter.addEventListener("change", updateToolsFilter);
toolsFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);
dateFilter.addEventListener("change", applyFilters);

document.querySelectorAll(".nav a").forEach(link => {
  if (link.href === window.location.href) {
    link.parentElement.classList.add("active");
  }
});
