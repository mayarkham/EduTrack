function handleLogin() {
  const usernameInput = document.getElementById('username').value.trim().toLowerCase();
  const password = document.getElementById('password').value;

  if (usernameInput === 'ad1000') {
    if (password === '0000') {
      window.location.href = 'admin.html';
    } else {
      alert('Incorrect password for Admin.');
    }
  } else if (usernameInput === 'inv1100') {
    if (password === '2000') {
      window.location.href = 'invent.html';
    } else {
      alert('Incorrect password for Inventory Manager.');
    }
  } else if (usernameInput === 'mnt1200') {
    if (password === '5000') {
      window.location.href = 'alertmaint.html';
    } else {
      alert('Incorrect password for Maintenance.');
    }
  } else {
    alert('Unknown user. Please enter a valid username.');
  }
}

function handleForgotPassword() {
  alert("Please contact IT support at It_supdesk@ju.edu.jo to reset your password.");
}
