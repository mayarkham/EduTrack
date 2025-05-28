class AdminPanel {
  static init() {
    AdminPanel.highlightActiveNav();
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

    AdminPanel.applyFilters();
  }

  static applyFilters() {
    const departmentFilter = document.getElementById("departmentFilter");
    const toolsFilter = document.getElementById("toolsFilter");
    const statusFilter = document.getElementById("statusFilter");
    const dateFilter = document.getElementById("dateFilter");
    const userRows = document.querySelectorAll(".user-row");

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

  static openReservationForm() {
    window.location.href = "reserve.html";
  }

  static reserveTool(event) {
    event.preventDefault();

    const department = document.getElementById("department").value;
    const tool = document.getElementById("tool").value;

    if (department && tool) {
      alert(`Reservation confirmed for ${tool} in ${department}.`);
      window.location.href = "admin.html";
    } else {
      alert("Please select both department and tool.");
    }
  }

  static cancelReservation() {
    window.location.href = "admin.html";
  }

  static populateToolDropdown() {
    const toolsMap = {
      "IT & Computers": ["Laptop", "Desktop Computer", "Printer", "Projector", "Router"],
      "Office": ["Shredder", "Photocopier"],
      "Workshop Tools": ["Welding Machine", "Safety Gear", "Drills"],
      "Teaching Aids": ["Smartboards", "Sound Systems"]
    };

    const departmentSelect = document.getElementById("department");
    const toolSelect = document.getElementById("tool");

    departmentSelect.addEventListener("change", () => {
      const selectedDept = departmentSelect.value;
      const tools = toolsMap[selectedDept] || [];

      toolSelect.innerHTML = '<option value="">Select Tool</option>';
      tools.forEach(tool => {
        const option = document.createElement("option");
        option.value = tool;
        option.textContent = tool;
        toolSelect.appendChild(option);
      });
    });
  }

  static highlightActiveNav() {
    document.querySelectorAll(".nav a").forEach(link => {
      if (link.href === window.location.href) {
        link.parentElement.classList.add("active");
      }
    });
  }
}

AdminPanel.init();
