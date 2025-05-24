const total = 154;
const inUse = 86;
const maintenance = 23;
const available = 45;


const barCtx = document.getElementById("barChart").getContext("2d");
new Chart(barCtx, {
  type: "bar",
  data: {
    labels: ["In Use", "Maintenance", "Available"],
    datasets: [{
      label: "Equipment Count",
      data: [inUse, maintenance, available],
     backgroundColor: ["#4B00E0", "#6C757D", "#3AAFA9	 "]

    }]
  },
  options: {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Equipment Status Distribution" }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


const pieCtx = document.getElementById("pieChart").getContext("2d");
new Chart(pieCtx, {
  type: "pie",
  data: {
    labels: ["In Use", "Maintenance", "Available"],
    datasets: [{
      data: [inUse, maintenance, available],
     backgroundColor: ["#4B00E0", "#6C757D", "#3AAFA9	"]

    }]
  },
  options: {
    responsive: false,
    maintainAspectRatio: false,
   plugins: {
  legend: {
    position: 'top',
    labels: {
      boxWidth: 20,
      padding: 15,
      usePointStyle: false 
    }
  },
  title: {
    display: true,
    text: "Equipment Usage Share"
  }
}
,
    layout: {
      padding: 10
    }
  }
});
