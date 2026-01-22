// Account management functionality

// Get current user from localStorage
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')) || null;
}

// Save current user to localStorage
function saveCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// Remove current user (logout)
function removeCurrentUser() {
    localStorage.removeItem('currentUser');
}

// Get all users from localStorage
function getAllUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Register new user
function registerUser(name, email, password) {
    const users = getAllUsers();
    
    // Check if email already exists
    if (users.find(user => user.email === email)) {
        return { success: false, message: 'Email already registered. Please sign in instead.' };
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password, // In production, this should be hashed
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    // Auto-login after registration
    saveCurrentUser({ name: newUser.name, email: newUser.email, id: newUser.id });
    
    return { success: true, message: 'Account created successfully!' };
}

// Login user
function loginUser(email, password) {
    const users = getAllUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        return { success: false, message: 'Invalid email or password.' };
    }
    
    // Save current user (without password)
    saveCurrentUser({ name: user.name, email: user.email, id: user.id });
    
    return { success: true, message: 'Login successful!' };
}

// Logout user
function logoutUser() {
    removeCurrentUser();
    window.location.href = 'account.html';
}

// Check if user is logged in
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Update account link in header
function updateAccountLink() {
    const accountLinks = document.querySelectorAll('.account-link');
    const currentUser = getCurrentUser();
    
    accountLinks.forEach(link => {
        const accountText = link.querySelector('#accountText') || link.querySelector('span');
        if (accountText) {
            if (currentUser) {
                accountText.textContent = currentUser.name || 'Account';
            } else {
                accountText.textContent = 'Account';
            }
        }
    });
}

// Initialize account page
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = getCurrentUser();
    
    // If on account page, show appropriate view
    if (window.location.pathname.includes('account.html')) {
        if (currentUser) {
            // Show dashboard
            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('registerContainer').style.display = 'none';
            document.getElementById('userDashboard').style.display = 'block';
            
            document.getElementById('userName').textContent = currentUser.name;
            document.getElementById('userEmail').textContent = currentUser.email;
            
            // Setup logout button
            document.getElementById('logoutBtn').addEventListener('click', () => {
                logoutUser();
            });
        } else {
            // Show login form
            setupAccountForms();
        }
    }
    
    // Update account link in header
    updateAccountLink();
});

// Setup account forms
function setupAccountForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    const showLoginBtn = document.getElementById('showLoginBtn');
    const loginContainer = document.getElementById('loginContainer');
    const registerContainer = document.getElementById('registerContainer');
    const loginMessage = document.getElementById('loginMessage');
    const registerMessage = document.getElementById('registerMessage');
    
    // Toggle between login and register
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', () => {
            loginContainer.style.display = 'none';
            registerContainer.style.display = 'block';
            loginMessage.style.display = 'none';
        });
    }
    
    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', () => {
            registerContainer.style.display = 'none';
            loginContainer.style.display = 'block';
            registerMessage.style.display = 'none';
        });
    }
    
    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            const result = loginUser(email, password);
            
            if (result.success) {
                loginMessage.className = 'form-message success';
                loginMessage.textContent = result.message;
                loginMessage.style.display = 'block';
                
                // Redirect after short delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                loginMessage.className = 'form-message error';
                loginMessage.textContent = result.message;
                loginMessage.style.display = 'block';
            }
        });
    }
    
    // Handle register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validate passwords match
            if (password !== confirmPassword) {
                registerMessage.className = 'form-message error';
                registerMessage.textContent = 'Passwords do not match.';
                registerMessage.style.display = 'block';
                return;
            }
            
            // Validate password length
            if (password.length < 6) {
                registerMessage.className = 'form-message error';
                registerMessage.textContent = 'Password must be at least 6 characters long.';
                registerMessage.style.display = 'block';
                return;
            }
            
            const result = registerUser(name, email, password);
            
            if (result.success) {
                registerMessage.className = 'form-message success';
                registerMessage.textContent = result.message;
                registerMessage.style.display = 'block';
                
                // Redirect after short delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                registerMessage.className = 'form-message error';
                registerMessage.textContent = result.message;
                registerMessage.style.display = 'block';
            }
        });
    }
}
