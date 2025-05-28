class ReservationForm {
  constructor() {
    this.departmentSelect = document.getElementById("department");
    this.toolSelect = document.getElementById("tool");

    this.toolsByDepartment = {
      "IT & Computers": ["Laptop", "Desktop Computer", "Printer", "Projector", "Router"],
      "Office": ["Shredder", "Photocopier"],
      "Workshop Tools": ["Welding Machine", "Safety Gear", "Drills"],
      "Teaching Aids": ["Smartboards", "Sound Systems"]
    };

    this.initEventListeners();
  }

  initEventListeners() {
    this.departmentSelect.addEventListener("change", () => this.updateToolOptions());
  }

  updateToolOptions() {
    const selectedDept = this.departmentSelect.value;
    this.toolSelect.innerHTML = '<option value="">Select Tool</option>';

    if (this.toolsByDepartment[selectedDept]) {
      this.toolsByDepartment[selectedDept].forEach(tool => {
        const option = document.createElement("option");
        option.value = tool;
        option.textContent = tool;
        this.toolSelect.appendChild(option);
      });
    }
  }

  static handleSubmit(event) {
    event.preventDefault();
    const form = event.target;

    if (form.checkValidity()) {
      alert("Reservation submitted successfully!");
      window.location.href = "admin.html"; 
    } else {
      form.reportValidity();
    }
  }

  static handleCancel() {
    window.location.href = "admin.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const reservationForm = new ReservationForm();
  window.handleReservation = ReservationForm.handleSubmit;
});
