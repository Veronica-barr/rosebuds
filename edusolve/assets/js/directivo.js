// assets/js/directivo.js

document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación y rol
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'admin') {
        window.location.href = '../../pages/auth/login.html';
        return;
    }
    
    // Datos de ejemplo (simulación)
    const students = [
        { id: 1, name: 'Juan Pérez', grade: '3°A', math: 'Aprobado', language: 'Aprobado', attendance: '95%' },
        { id: 2, name: 'María Gómez', grade: '3°B', math: 'Desaprobado', language: 'Aprobado', attendance: '87%' },
        { id: 3, name: 'Carlos Ruiz', grade: '4°A', math: 'Aprobado', language: 'Aprobado', attendance: '92%' }
    ];
    
    // Cargar estadísticas
    loadAdminStats();
    
    // Cargar tabla de estudiantes
    if (document.getElementById('studentsTable')) {
        renderStudentsTable(students);
    }
    
    // Funciones
    function loadAdminStats() {
        // Simular datos estadísticos
        const stats = {
            totalStudents: 125,
            approvedPercentage: 78,
            averageGrade: 7.8,
            outstandingStudents: 15
        };
        
        document.getElementById('totalStudents').textContent = stats.totalStudents;
        document.getElementById('approvedPercentage').textContent = `${stats.approvedPercentage}%`;
        document.getElementById('averageGrade').textContent = stats.averageGrade;
        document.getElementById('outstandingStudents').textContent = stats.outstandingStudents;
    }
    
    function renderStudentsTable(students) {
        const tableBody = document.querySelector('#studentsTable tbody');
        tableBody.innerHTML = '';
        
        students.forEach(student => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.grade}</td>
                <td>
                    <select class="status-select" data-subject="math" data-student-id="${student.id}">
                        <option value="Aprobado" ${student.math === 'Aprobado' ? 'selected' : ''}>Aprobado</option>
                        <option value="Desaprobado" ${student.math === 'Desaprobado' ? 'selected' : ''}>Desaprobado</option>
                    </select>
                </td>
                <td>
                    <select class="status-select" data-subject="language" data-student-id="${student.id}">
                        <option value="Aprobado" ${student.language === 'Aprobado' ? 'selected' : ''}>Aprobado</option>
                        <option value="Desaprobado" ${student.language === 'Desaprobado' ? 'selected' : ''}>Desaprobado</option>
                    </select>
                </td>
                <td>${student.attendance}</td>
                <td>
                    <button class="button button-small button-edit" data-student-id="${student.id}">Editar</button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // Manejar cambios en los selects
        document.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', function() {
                const studentId = this.getAttribute('data-student-id');
                const subject = this.getAttribute('data-subject');
                const newStatus = this.value;
                
                // En un sistema real, aquí harías una petición al backend
                console.log(`Actualizando estudiante ${studentId}, materia ${subject} a ${newStatus}`);
                showAlert('Cambios guardados correctamente', 'success');
            });
        });
        
        // Botones de edición
        document.querySelectorAll('.button-edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const studentId = this.getAttribute('data-student-id');
                // Redirigir a página de edición con el ID
                window.location.href = `estudiantes/editar.html?id=${studentId}`;
            });
        });
    }
    
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        
        const container = document.querySelector('.admin-panel .container');
        container.prepend(alertDiv);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
    
    // Exportar datos
    const exportBtn = document.getElementById('exportData');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            // Simular exportación
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(students));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute('href', dataStr);
            downloadAnchor.setAttribute('download', 'estudiantes_edusolve.json');
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            document.body.removeChild(downloadAnchor);
            
            showAlert('Datos exportados correctamente', 'success');
        });
    }
});