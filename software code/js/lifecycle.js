class LifecycleAlerts {
  static init() {
    this.dateInput = document.getElementById("dateFilter");
    this.alertBoxes = document.querySelectorAll(".alert-box");

    this.dateInput.addEventListener("change", () => this.applyDateFilter());
  }

  static applyDateFilter() {
    const selectedDate = this.dateInput.value;

    this.alertBoxes.forEach(box => {
      const alertDate = box.getAttribute("data-date");
      const matches = selectedDate === alertDate || selectedDate === "";
      box.style.display = matches ? "block" : "none";
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  LifecycleAlerts.init();
});
