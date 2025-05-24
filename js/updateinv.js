function handleUpdate(event) {
  event.preventDefault();

  const form = event.target;

  if (form.checkValidity()) {
    alert("Tool updated successfully!");
  
  } else {
    form.reportValidity(); 
  }
}

function selectOnlyThis(checkbox) {
  const checkboxes = document.getElementsByName('delivered');
  checkboxes.forEach(cb => {
    if (cb !== checkbox) cb.checked = false;
  });
}

function populateToolDetails() {
  const selectedId = document.getElementById("selectTool").value;

  const data = {
    "P-1023": { name: "Projector", department: "IT & Computers" },
    "S-2089": { name: "Shredder", department: "Office" },
    "L-7790": { name: "Laptop", department: "IT & Computers" },
    "W-3321": { name: "Welding Machine", department: "Workshop Tools" },
    "SB-1147": { name: "Smartboards", department: "Teaching Aids" }
  };

  if (data[selectedId]) {
    document.getElementById("toolId").value = selectedId;
    document.getElementById("toolName").value = data[selectedId].name;
    document.getElementById("department").value = data[selectedId].department;
  } else {
    document.getElementById("toolId").value = "";
    document.getElementById("toolName").value = "";
    document.getElementById("department").value = "";
  }
}
