class UserLogin {
  static enterCredentials() {
    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    return { username, password };
  }

  static handleLogin() {
    const { username, password } = UserLogin.enterCredentials();

    if (username === 'ad1000') {
      UserLogin.authenticate(password, '0000', 'admin.html', 'Admin');
    } else if (username === 'inv1100') {
      UserLogin.authenticate(password, '2000', 'invent.html', 'Inventory Manager');
    } else if (username === 'mnt1200') {
      UserLogin.authenticate(password, '5000', 'alertmaint.html', 'Maintenance');
    } else {
      alert('Unknown user. Please enter a valid username.');
    }
  }

 static authenticate(inputPassword, correctPassword, redirectURL, roleName) {
  if (inputPassword === correctPassword) {
    localStorage.setItem("userRole", roleName); 
    window.location.href = redirectURL;
  } else {
    alert(`Incorrect password for ${roleName}.`);
  }
}


  static handleForgotPassword() {
    alert("Please contact IT support at It_supdesk@ju.edu.jo to reset your password.");
  }
}
