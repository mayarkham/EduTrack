class RepairHistory {
  static allRepairs = [
    { id: "L-7790", date: "2025-01-15", status: "In Use" },
    { id: "L-7790", date: "2024-12-03", status: "In Inspection" },
    { id: "L-7790", date: "2024-05-15", status: "In Maintenance" },
    { id: "L-7790", date: "2023-12-05", status: "In Inspection" },
    { id: "P-1023", date: "2024-11-10", status: "Repaired" },
    { id: "S-2089", date: "2024-06-22", status: "Repaired" }
  ];

  static statusClasses = {
    "In Use": "in-use",
    "In Inspection": "inspection",
    "In Maintenance": "maintenance",
    "Repaired": "repaired"
  };

  static init() {
    this.buildSidebar();
    this.table = document.querySelector(".history-table");
    this.filterInput = document.getElementById("filterDate");

    this.filterInput.addEventListener("change", () => this.applyFilter());
    this.renderRows(this.allRepairs);
  }

  static renderRows(data) {
    this.table.innerHTML = "";

    if (data.length === 0) {
      this.table.innerHTML = "<p style='color: gray;'>No repair records match the selected date.</p>";
      return;
    }

    data.forEach(entry => {
      const div = document.createElement("div");
      div.className = "history-entry";
      div.innerHTML = `
        <span>Repair Date: ${entry.date} | ID: ${entry.id}</span>
        <span class="status-label ${this.statusClasses[entry.status]}">${entry.status}</span>
      `;
      this.table.appendChild(div);
    });
  }

  static applyFilter() {
    const selectedDate = this.filterInput.value;
    const filtered = this.allRepairs.filter(entry => entry.date === selectedDate);
    this.renderRows(filtered);
  }

  static clearFilter() {
    this.filterInput.value = "";
    this.renderRows(this.allRepairs);
  }

  static goBack() {
    const role = localStorage.getItem("userRole");
    if (role === "Maintenance") {
      window.location.href = "alertmaint.html";
    } else {
      window.location.href = "admin.html";
    }
  }

  static buildSidebar() {
    const role = localStorage.getItem("userRole") || "Admin";
    const sidebar = document.getElementById("sidebar");

    let navHtml = "";
    let footerHtml = "";

    if (role === "Maintenance") {
      navHtml = `
        <ul class="nav">
          <li class="active"><a href="repairhistory.html">Repair History</a></li>
          <li><a href="alertmaint.html">Repair Alerts</a></li>
        </ul>
      `;
      footerHtml = `
        <div class="user-footer">
          <div class="user-details">
            <p>Maintenance Technician</p>
            <small>maintenance@ju.edu.jo</small>
          </div>
          <a href="login.html" title="Logout">
            <img src="../pictures/logout.png" alt="Logout Icon" style="width: 20px; height: 20px; cursor: pointer;">
          </a>
        </div>
      `;
    } else {
      navHtml = `
        <ul class="nav">
          <li><a href="lifecyclealert.html">Lifecycle Alerts</a></li>
          <li><a href="schmaint.html">Schedule Maintenance</a></li>
          <li><a href="analytics.html">Equipment Analytics</a></li>
          <li class="active"><a href="repairhistory.html">Repair History</a></li>
          <li><a href="admin.html">Dashboard</a></li>
        </ul>
      `;
      footerHtml = `
        <div class="user-footer">
          <div class="user-details">
            <p>Admin</p>
            <small>admin@ju.edu.jo</small>
          </div>
          <a href="login.html" title="Logout">
            <img src="../pictures/logout.png" alt="Logout Icon" style="width: 20px; height: 20px; cursor: pointer;">
          </a>
        </div>
      `;
    }

    sidebar.innerHTML = `
      <div class="logo">EduTrack</div>
      ${navHtml}
      ${footerHtml}
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  RepairHistory.init();
});
