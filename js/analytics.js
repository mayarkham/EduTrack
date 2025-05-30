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

 
}

document.addEventListener("DOMContentLoaded", () => {
  EquipmentAnalytics.init();
});
