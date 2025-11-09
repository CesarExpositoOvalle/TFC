-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS recetas_web CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE recetas_web;

-- =======================
-- TABLA: usuarios
-- =======================
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_usuario VARCHAR(50) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  contrasena VARCHAR(255) NOT NULL,
  edad INT,
  altura_cm INT,
  peso_kg DECIMAL(5,2),
  actividad ENUM('sedentario', 'ligero', 'moderado', 'intenso', 'muy_intenso'),
  objetivo ENUM('bajar_peso', 'mantener', 'ganar_musculo'),
  genero ENUM('male','female') DEFAULT 'male',
  rol ENUM('usuario', 'admin') DEFAULT 'usuario',
  calorias_diarias INT DEFAULT NULL,
  proteinas_diarias INT DEFAULT NULL,
  grasas_diarias INT DEFAULT NULL,
  carbohidratos_diarias INT DEFAULT NULL,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =======================
-- TABLA: recetas
-- =======================
CREATE TABLE IF NOT EXISTS recetas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  descripcion TEXT,
  imagen_url VARCHAR(255),
  calorias INT,
  proteinas DECIMAL(5,2),
  carbohidratos DECIMAL(5,2),
  grasas DECIMAL(5,2),
  tiempo_preparacion INT, -- minutos
  fuente ENUM('spoonacular', 'usuario') DEFAULT 'spoonacular',
  id_usuario INT, -- si fue creada por un usuario
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- =======================
-- TABLA: ingredientes
-- =======================
CREATE TABLE IF NOT EXISTS ingredientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

-- =======================
-- TABLA: receta_ingredientes
-- Relación muchos a muchos entre recetas e ingredientes
-- =======================
CREATE TABLE IF NOT EXISTS receta_ingredientes (
  id_receta INT,
  id_ingrediente INT,
  cantidad VARCHAR(50),
  PRIMARY KEY (id_receta, id_ingrediente),
  FOREIGN KEY (id_receta) REFERENCES recetas(id) ON DELETE CASCADE,
  FOREIGN KEY (id_ingrediente) REFERENCES ingredientes(id) ON DELETE CASCADE
);

-- =======================
-- TABLA: receta_pasos
-- Pasos dinámicos de preparación
-- =======================
CREATE TABLE IF NOT EXISTS receta_pasos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_receta INT NOT NULL,
  numero_paso INT NOT NULL,
  descripcion TEXT NOT NULL,
  FOREIGN KEY (id_receta) REFERENCES recetas(id) ON DELETE CASCADE
);

-- =======================
-- TABLA: favoritos
-- Recetas marcadas como favoritas por los usuarios
-- =======================
CREATE TABLE IF NOT EXISTS favoritos (
  id_usuario INT,
  id_receta INT,
  PRIMARY KEY (id_usuario, id_receta),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (id_receta) REFERENCES recetas(id) ON DELETE CASCADE
);

-- =======================
-- TABLA: menus
-- Menús creados por usuarios
-- =======================
CREATE TABLE IF NOT EXISTS menus (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- =======================
-- TABLA: menu_recetas
-- Relación entre menús y recetas (ej: desayuno, comida, cena, etc.)
-- =======================
CREATE TABLE IF NOT EXISTS menu_recetas (
  id_menu INT,
  id_receta INT,
  tipo_comida ENUM('desayuno', 'almuerzo', 'comida', 'merienda', 'cena'),
  PRIMARY KEY (id_menu, id_receta, tipo_comida),
  FOREIGN KEY (id_menu) REFERENCES menus(id) ON DELETE CASCADE,
  FOREIGN KEY (id_receta) REFERENCES recetas(id) ON DELETE CASCADE
);

-- =======================
-- CREAR ADMIN (contraseña: abc123)
-- Aquí la contraseña se guarda como hash SHA-256 usando SHA2()
-- =======================

INSERT INTO usuarios (nombre_usuario, correo, contrasena, rol)
VALUES (
  'admin',
  'admin@recetas.com',
  SHA2('abc123', 256),
  'admin'
);
