// assets/js/login.js

document.addEventListener('DOMContentLoaded', function() {
    // Manejar el formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simulación de autenticación (en un sistema real sería una petición al servidor)
            const users = {
                'admin': { password: 'admin123', role: 'admin', name: 'Administrador' },
                'profesor1': { password: 'prof123', role: 'teacher', name: 'Profesor García' },
                'alumno1': { password: 'alum123', role: 'student', name: 'Juan Pérez' }
            };
            
            if (users[username] && users[username].password === password) {
                // Guardar usuario en localStorage (simulación)
                localStorage.setItem('currentUser', JSON.stringify({
                    username: username,
                    role: users[username].role,
                    name: users[username].name
                }));
                
                // Redirigir según el rol
                switch(users[username].role) {
                    case 'admin':
                        window.location.href = '../../pages/admin/dashboard.html';
                        break;
                    case 'teacher':
                        window.location.href = '../../pages/teacher/dashboard.html';
                        break;
                    default:
                        window.location.href = '../../pages/student/dashboard.html';
                }
            } else {
                document.getElementById('loginError').style.display = 'block';
            }
        });
    }
    
    // Manejar el formulario de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Validar contraseñas
            if (password !== confirmPassword) {
                document.getElementById('registerError').textContent = 'Las contraseñas no coinciden';
                document.getElementById('registerError').style.display = 'block';
                return;
            }
            
            if (password.length < 8) {
                document.getElementById('registerError').textContent = 'La contraseña debe tener al menos 8 caracteres';
                document.getElementById('registerError').style.display = 'block';
                return;
            }
            
            // Simulación de registro exitoso
            alert('Registro exitoso! Serás redirigido para iniciar sesión');
            window.location.href = 'login.html';
        });
    }
    
    // Verificar si hay sesión activa al cargar páginas protegidas
    const protectedPages = ['dashboard.html', 'editar.html', 'calificaciones.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage)) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            window.location.href = '../../pages/auth/login.html';
        }
    }
});