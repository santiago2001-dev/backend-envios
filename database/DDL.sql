CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE tarifas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    origen VARCHAR(100),
    destino VARCHAR(100),
    peso_min INT,
    peso_max INT,
    valor DECIMAL(10,2)
);


CREATE TABLE envio_estados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    envio_id INT,
    estado VARCHAR(50),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- envios.envios definition

CREATE TABLE `envios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `origen` varchar(100) DEFAULT NULL,
  `destino` varchar(100) DEFAULT NULL,
  `peso` decimal(10,2) DEFAULT NULL,
  `alto` decimal(10,2) DEFAULT NULL,
  `ancho` decimal(10,2) DEFAULT NULL,
  `largo` decimal(10,2) DEFAULT NULL,
  `peso_utilizado` decimal(10,2) DEFAULT NULL,
  `valor_cotizado` decimal(10,2) DEFAULT NULL,
  `estado` varchar(50) DEFAULT 'En espera',
  `creado_en` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


