class ScheduleMaintenance {
  static toolsByDepartment = {
    "IT & Computers": ["Laptop", "Desktop Computer", "Printer", "Projector", "Router"],
    "Office": ["Shredder", "Photocopier"],
    "Workshop Tools": ["Welding Machine", "Safety Gear", "Drills"],
    "Teaching Aids": ["Smartboards", "Sound Systems"]
  };

  static init() {
    this.departmentFilter = document.getElementById("departmentFilter");
    this.equipmentFilter = document.getElementById("equipmentFilter");
    this.maintenanceDate = document.getElementById("maintenanceDate");
    this.scheduleList = document.getElementById("scheduleList");

    this.addListeners();
  }

  static addListeners() {
    this.departmentFilter.addEventListener("change", () => this.updateEquipmentFilter());
    this.equipmentFilter.addEventListener("change", () => this.applyFilters());
    this.maintenanceDate.addEventListener("change", () => this.applyFilters());
  }

  static updateEquipmentFilter() {
    const selectedDept = this.departmentFilter.value;
    this.equipmentFilter.innerHTML = '<option value="">All Equipment</option>';

    const tools = this.toolsByDepartment[selectedDept] || [];
    tools.forEach(tool => {
      const opt = document.createElement("option");
      opt.value = tool;
      opt.textContent = tool;
      this.equipmentFilter.appendChild(opt);
    });

    this.applyFilters();
  }

  static applyFilters() {
    const selectedEquip = this.equipmentFilter.value.toLowerCase();
    const selectedDate = this.maintenanceDate.value;

    document.querySelectorAll(".user-row").forEach(row => {
      const equipText = row.querySelector(".equipment-department").textContent.toLowerCase();
      const dateText = row.querySelector(".return-date").textContent;

      const matchesEquip = !selectedEquip || equipText.includes(selectedEquip);
      const matchesDate = !selectedDate || dateText === selectedDate;

      row.style.display = (matchesEquip && matchesDate) ? "flex" : "none";
    });
  }

  static openForm() {
    document.getElementById("scheduleModal").style.display = "flex";
  }

  static closeForm() {
    document.getElementById("scheduleModal").style.display = "none";
  }

  static addSchedule() {
    const equipment = document.getElementById("equipmentInput").value.trim();
    const equipmentType = document.getElementById("equipmentTypeInput").value.trim();
    const department = this.departmentFilter.value.trim();
    const date = document.getElementById("dateInput").value;
    const issue = document.getElementById("issueInput").value.trim();

    if (!equipment || !equipmentType || !date || !issue) {
      alert("Please fill in all fields.");
      return;
    }

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
    this.scheduleList.appendChild(newRow);
    this.closeForm();
    this.clearFormFields();
  }

  static clearFormFields() {
    document.getElementById("equipmentInput").value = "";
    document.getElementById("equipmentTypeInput").value = "";
    document.getElementById("dateInput").value = "";
    document.getElementById("issueInput").value = "";
  }
}


function openScheduleForm() {
  ScheduleMaintenance.openForm();
}

function closeScheduleForm() {
  ScheduleMaintenance.closeForm();
}

function addSchedule() {
  ScheduleMaintenance.addSchedule();
}

document.addEventListener("DOMContentLoaded", () => {
  ScheduleMaintenance.init();
});
