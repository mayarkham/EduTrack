class InventoryDashboard {
  static toolsMap = {
    "IT & Computers": ["Laptop", "Desktop Computer", "Printer", "Projector", "Router"],
    "Office": ["Shredder", "Photocopier"],
    "Workshop Tools": ["Welding Machine", "Safety Gear", "Drills"],
    "Teaching Aids": ["Smartboards", "Sound Systems"]
  };

  static init() {
    this.departmentFilter = document.getElementById("departmentFilter");
    this.toolsFilter = document.getElementById("toolsFilter");
    this.statusFilter = document.getElementById("statusFilter");
    this.dateFilter = document.getElementById("dateFilter");

    this.departmentFilter.addEventListener("change", () => this.updateToolsFilter());
    this.toolsFilter.addEventListener("change", () => this.monitorStatus());
    this.statusFilter.addEventListener("change", () => this.monitorStatus());
    this.dateFilter.addEventListener("change", () => this.monitorStatus());

    this.updateToolsFilter();
  }

  static updateToolsFilter() {
    const selectedDept = this.departmentFilter.value;
    const tools = this.toolsMap[selectedDept] || [];

    this.toolsFilter.innerHTML = '<option value="">All Tools</option>';
    tools.forEach(tool => {
      const option = document.createElement("option");
      option.value = tool;
      option.textContent = tool;
      this.toolsFilter.appendChild(option);
    });

    this.monitorStatus();
  }

  static monitorStatus() {
    const selectedDept = this.departmentFilter.value.toLowerCase();
    const selectedTool = this.toolsFilter.value.toLowerCase();
    const selectedStatus = this.statusFilter.value.toLowerCase();
    const selectedDate = this.dateFilter.value;

    const rows = document.querySelectorAll(".user-row");
    rows.forEach(row => {
      const deptText = row.querySelector(".equipment-department").textContent.toLowerCase();
      const toolText = row.querySelector(".equipment-department").textContent.toLowerCase();
      const statusText = row.querySelector(".status").textContent.toLowerCase();
      const returnDateText = row.querySelector(".return-date").textContent;

      const matchesDept = !selectedDept || deptText.includes(selectedDept);
      const matchesTool = !selectedTool || toolText.includes(selectedTool);
      const matchesStatus = !selectedStatus || statusText.includes(selectedStatus);
      const matchesDate = !selectedDate || returnDateText === selectedDate;

      row.style.display = (matchesDept && matchesTool && matchesStatus && matchesDate) ? "flex" : "none";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  InventoryDashboard.init();
});
