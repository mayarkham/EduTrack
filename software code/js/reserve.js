const departmentSelect = document.getElementById("department");
const toolSelect = document.getElementById("tool");

const toolsByDepartment = {
  "IT & Computers": ["Laptop", "Desktop Computer", "Printer", "Projector", "Router"],
  "Office": ["Shredder", "Photocopier"],
  "Workshop Tools": ["Welding Machine", "Safety Gear", "Drills"],
  "Teaching Aids": ["Smartboards", "Sound Systems"]
};

departmentSelect.addEventListener("change", function () {
  const selectedDept = this.value;
  toolSelect.innerHTML = '<option value="">Select Tool</option>'; 

  if (toolsByDepartment[selectedDept]) {
    toolsByDepartment[selectedDept].forEach(tool => {
      const option = document.createElement("option");
      option.value = tool;
      option.textContent = tool;
      toolSelect.appendChild(option);
    });
  }

});
function handleReservation(event) {
  event.preventDefault();

  const form = event.target;

  if (form.checkValidity()) {
    alert("Reservation submitted successfully!");
  } else {
    form.reportValidity(); 
  }
}



