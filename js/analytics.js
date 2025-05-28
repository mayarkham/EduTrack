class EquipmentAnalytics {
  static totals = {
    total: 154,
    inUse: 86,
    maintenance: 23,
    available: 45
  };

  static init() {
    this.renderBarChart();
    this.renderPieChart();
    // Uncomment the line below if using dynamic sidebar
    // this.buildSidebar();
  }

  static renderBarChart() {
    const ctx = document.getElementById("barChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["In Use", "Maintenance", "Available"],
        datasets: [{
          label: "Equipment Count",
          data: [
            this.totals.inUse,
            this.totals.maintenance,
            this.totals.available
          ],
          backgroundColor: ["#4B00E0", "#6C757D", "#3AAFA9"]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "Equipment Status Distribution"
          }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  static renderPieChart() {
    const ctx = document.getElementById("pieChart").getContext("2d");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["In Use", "Maintenance", "Available"],
        datasets: [{
          data: [
            this.totals.inUse,
            this.totals.maintenance,
            this.totals.available
          ],
          backgroundColor: ["#4B00E0", "#6C757D", "#3AAFA9"]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 20,
              padding: 15
            }
          },
          title: {
            display: true,
            text: "Equipment Usage Share"
          }
        },
        layout: {
          padding: 10
        }
      }
    });
  }

  // Only use if sidebar is not hardcoded
  static buildSidebar() {
    const role = localStorage.getItem("userRole") || "Admin";
    const sidebar = document.getElementById("sidebar");

    const navItems = {
      Admin: [
        { name: "Lifecycle Alerts", href: "lifecyclealert.html" },
        { name: "Schedule Maintenance", href: "schmaint.html" },
        { name: "Equipment Analytics", href: "analytics.html", active: true },
        { name: "Repair History", href: "repairhistory.html" },
        { name: "Dashboard", href: "admin.html" }
      ],
      Maintenance: [
        { name: "Repair History", href: "repairhistory.html" },
        { name: "Repair Alerts", href: "alertmaint.html" }
      ]
    };

    const footerInfo = {
      Admin: {
        name: "Admin",
        email: "admin@ju.edu.jo"
      },
      Maintenance: {
        name: "Maintenance Technician",
        email: "maintenance@ju.edu.jo"
      }
    };

    const links = navItems[role] || navItems.Admin;
    const user = footerInfo[role] || footerInfo.Admin;

    sidebar.innerHTML = `
      <div class="logo">EduTrack</div>
      <ul class="nav">
        ${links.map(link => `
          <li class="${link.active ? "active" : ""}">
            <a href="${link.href}">${link.name}</a>
          </li>`).join("")}
      </ul>
      <div class="user-footer">
        <div class="user-details">
          <p>${user.name}</p>
          <small>${user.email}</small>
        </div>
        <a href="login.html" title="Logout">
          <img src="../pictures/logout.png" alt="Logout Icon" style="width: 20px; height: 20px; cursor: pointer;">
        </a>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  EquipmentAnalytics.init();
});
