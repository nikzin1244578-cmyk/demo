 // Store users in memory
  let users = [];
  let currentUser = null;

  // Get DOM elements
  const emptyState = document.getElementById('emptyState');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const navLoginBtn = document.getElementById('navLoginBtn');
  const navRegisterBtn = document.getElementById('navRegisterBtn');
  const navLogoutBtn = document.getElementById('navLogoutBtn');

  // Show/hide functions
  function showEmpty() {
    emptyState.style.display = 'block';
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    updateNavButtons('empty');
    clearMessages();
  }

  function showLogin() {
    loginForm.style.display = 'block';
    emptyState.style.display = 'none';
    registerForm.style.display = 'none';
    updateNavButtons('login');
    clearMessages();
  }

  function showRegister() {
    registerForm.style.display = 'block';
    emptyState.style.display = 'none';
    loginForm.style.display = 'none';
    updateNavButtons('register');
    clearMessages();
  }

  function updateNavButtons(page) {
    navLoginBtn.classList.remove('hidden');
    navRegisterBtn.classList.remove('hidden');
    navLogoutBtn.classList.add('hidden');
  }

  function clearMessages() {
    document.getElementById('loginMessage').className = 'message hidden';
    document.getElementById('registerMessage').className = 'message hidden';
  }

  function showMessage(elementId, text, type) {
    const msgElement = document.getElementById(elementId);
    msgElement.textContent = text;
    msgElement.className = `message ${type}`;
  }

  // Event listeners for navigation
  navLoginBtn.addEventListener('click', showLogin);
  navRegisterBtn.addEventListener('click', showRegister);
  navLogoutBtn.addEventListener('click', logout);
  document.getElementById('switchToRegister').addEventListener('click', showRegister);
  document.getElementById('switchToLogin').addEventListener('click', showLogin);

  // Register form submission
  document.getElementById('registerFormElement').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim().toLowerCase();
    const pass = document.getElementById('registerPassword').value;
    const confirm = document.getElementById('registerConfirmPassword').value;

    // Validation
    if (pass !== confirm) {
      showMessage('registerMessage', 'Passwords do not match!', 'error');
      return;
    }

    if (pass.length < 6) {
      showMessage('registerMessage', 'Password must be at least 6 characters!', 'error');
      return;
    }

    // Check if email already exists
    if (users.find(u => u.email === email)) {
      showMessage('registerMessage', 'Email already registered!', 'error');
      return;
    }

    // Create user
    const newUser = {
      name,
      email,
      pass,
      date: new Date().toLocaleDateString()
    };

    users.push(newUser);
    showMessage('registerMessage', 'Registration successful! Redirecting to login...', 'success');

    // Clear form and redirect to login after 1.5 seconds
    setTimeout(() => {
      document.getElementById('registerFormElement').reset();
      showLogin();
      showMessage('loginMessage', 'Registration successful! Please login.', 'success');
    }, 1500);
  });

  // Login form submission
  document.getElementById('loginFormElement').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const pass = document.getElementById('loginPassword').value;

    // Find user
    const user = users.find(u => u.email === email && u.pass === pass);

    if (!user) {
      showMessage('loginMessage', 'Invalid email or password!', 'error');
      return;
    }

    // Login successful
    currentUser = user;
    
    // Show success message and redirect
    showMessage('loginMessage', 'Login successful! Redirecting...', 'success');
    
    // Redirect to news page after 1 second
    setTimeout(() => {
      window.location.href = './/HTML/news.html';
    }, 1000);assets
  });

  // Logout function
  function logout() {
    currentUser = null;
    showEmpty();
  }

  // Initialize - show empty state
  showEmpty();