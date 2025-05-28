class AdminPanel {
  static init() {
    AdminPanel.highlightActiveNav();
    AdminPanel.updateToolsFilter();
  }

  static toolsMap = {
    "it & computers": ["Laptop", "Desktop Computer", "Printer", "Projector", "Router"],
    "office": ["Shredder", "Photocopier"],
    "workshop tools": ["Welding Machine", "Safety Gear", "Drills"],
    "teaching aids": ["Smartboards", "Sound Systems"]
  };

  static updateToolsFilter() {
    const departmentFilter = document.getElementById("departmentFilter");
    const toolsFilter = document.getElementById("toolsFilter");
    const selectedDepartment = departmentFilter.value.toLowerCase();
    const tools = AdminPanel.toolsMap[selectedDepartment] || [];

    toolsFilter.innerHTML = '<option value="">All Tools</option>';
    tools.forEach(tool => {
      const option = document.createElement("option");
      option.value = tool;
      option.textContent = tool;
      toolsFilter.appendChild(option);
    });

    AdminPanel.monitorStatus();
  }

  static monitorStatus() {
    const dep = document.getElementById("departmentFilter").value.toLowerCase();
    const tool = document.getElementById("toolsFilter").value.toLowerCase();
    const status = document.getElementById("statusFilter").value.toLowerCase();
    const selectedDate = document.getElementById("dateFilter").value;
    const userRows = document.querySelectorAll(".user-row");

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

      row.style.display = (matchesDepartment && matchesTool && matchesStatus && matchesDate) ? "flex" : "none";
    });
  }

  static openReservationForm() {
    window.location.href = "reserve.html";
  }

  static highlightActiveNav() {
    document.querySelectorAll(".nav a").forEach(link => {
      if (link.href === window.location.href) {
        link.parentElement.classList.add("active");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => AdminPanel.init());
