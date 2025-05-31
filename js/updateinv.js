class UpdateInventory {
  static toolData = {
    "P-1023": { name: "Projector", department: "IT & Computers" },
    "S-2089": { name: "Shredder", department: "Office" },
    "L-7790": { name: "Laptop", department: "IT & Computers" },
    "W-3321": { name: "Welding Machine", department: "Workshop Tools" },
    "SB-1147": { name: "Smartboards", department: "Teaching Aids" }
  };

  static init() {
    document.addEventListener("DOMContentLoaded", () => {
      const form = document.querySelector("form");
      const cancelButton = document.querySelector(".cancel-btn");
      const selectTool = document.getElementById("selectTool");

      form.addEventListener("submit", UpdateInventory.handleUpdate);
      cancelButton.addEventListener("click", UpdateInventory.handleCancel);
      selectTool.addEventListener("change", UpdateInventory.selectToolDetails);
    });
  }

  static handleUpdate(event) {
    event.preventDefault();
    const form = event.target;

    if (form.checkValidity()) {
      alert("Tool updated successfully!");
    } else {
      form.reportValidity();
    }
  }

  static handleCancel() {
    const confirmCancel = confirm("Are you sure you want to cancel the update?");
    if (confirmCancel) {
      window.location.href = "invent.html";
    }
  }

  static selectOnlyThis(checkbox) {
    const checkboxes = document.getElementsByName("delivered");
    checkboxes.forEach(cb => {
      if (cb !== checkbox) cb.checked = false;
    });
  }

  static selectToolDetails() {
    const selectedId = document.getElementById("selectTool").value;
    const tool = UpdateInventory.toolData[selectedId] || { name: "", department: "" };

    document.getElementById("toolId").value = selectedId || "";
    document.getElementById("toolName").value = tool.name;
    document.getElementById("department").value = tool.department;
  }
}
UpdateInventory.init();
