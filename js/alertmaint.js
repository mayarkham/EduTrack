class RepairAlerts {
  static init() {
    this.dateInput = document.getElementById("dateFilter");
    this.alertBoxes = document.querySelectorAll(".alert-box");

    this.dateInput.addEventListener("change", () => this.filterByDate());
  }

  static filterByDate() {
    const selectedDate = this.dateInput.value;

    this.alertBoxes.forEach(box => {
      const alertDate = box.getAttribute("data-date");
      const shouldShow = selectedDate === alertDate || selectedDate === "";
      box.style.display = shouldShow ? "block" : "none";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  RepairAlerts.init();
});
