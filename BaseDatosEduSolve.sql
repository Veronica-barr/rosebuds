-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS edusolve;
USE edusolve;


-- Tabla de materias
CREATE TABLE materias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NULL,
    horas_semanales INT DEFAULT 0,
    año INT NOT NULL,
    INDEX idx_año (año)
);

-- Tabla de cursos
CREATE TABLE cursos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(10) NOT NULL,
    turno ENUM('mañana','tarde','noche') DEFAULT 'mañana',
    capacidad INT DEFAULT 30,
    INDEX idx_nombre (nombre)
);

-- Tabla de calificaciones
CREATE TABLE calificaciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    estudiante_id INT NOT NULL,
    materia_id INT NOT NULL,
    profesor_id INT NOT NULL,
    calificacion DECIMAL(4,2) CHECK (calificacion >= 0 AND calificacion <= 10),
    tipo_evaluacion VARCHAR(50) DEFAULT 'Parcial',
    fecha DATE NOT NULL,
    INDEX idx_estudiante_id (estudiante_id),
    INDEX idx_materia_id (materia_id),
    INDEX idx_profesor_id (profesor_id),
    INDEX idx_fecha (fecha),
    FOREIGN KEY (estudiante_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (materia_id) REFERENCES materias(id) ON DELETE CASCADE,
    FOREIGN KEY (profesor_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de asignación de profesores
CREATE TABLE asignacion_profesores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    profesor_id INT NOT NULL,
    materia_id INT NOT NULL,
    curso_id INT NOT NULL,
    horario VARCHAR(100) NOT NULL,
    INDEX idx_profesor_id (profesor_id),
    INDEX idx_materia_id (materia_id),
    INDEX idx_curso_id (curso_id),
    FOREIGN KEY (profesor_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (materia_id) REFERENCES materias(id) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
);

-- Tabla de inscripciones
CREATE TABLE inscripciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    estudiante_id INT NOT NULL,
    curso_id INT NOT NULL,
    año_lectivo YEAR NOT NULL,
    fecha_inscripcion DATE NOT NULL,
    INDEX idx_estudiante_id (estudiante_id),
    INDEX idx_curso_id (curso_id),
    INDEX idx_año_lectivo (año_lectivo),
    FOREIGN KEY (estudiante_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
);