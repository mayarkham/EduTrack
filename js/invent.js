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
      const department = row.querySelector(".equipment-department p:nth-child(2)").textContent.toLowerCase();
      const equipment = row.querySelector(".equipment-department p:nth-child(1)").textContent.toLowerCase();
      const status = row.querySelector(".status").textContent.toLowerCase();
      const returnDate = row.querySelector(".return-date").textContent;

      const matchDept = !selectedDept || department.includes(selectedDept);
      const matchTool = !selectedTool || equipment.includes(selectedTool);
      const matchStatus = !selectedStatus || status.includes(selectedStatus);
      const matchDate = !selectedDate || returnDate === selectedDate;

      row.style.display = (matchDept && matchTool && matchStatus && matchDate) ? "flex" : "none";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  InventoryDashboard.init();
});
