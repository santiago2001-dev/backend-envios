--***** CRUD USER *****--

-- CREATE USER



CREATE PROCEDURE CreateUser (
    IN p_username VARCHAR(50),
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255)
)
BEGIN
    DECLARE existing_username INT;
    DECLARE existing_email INT;

    -- Validar existencia del username
    SELECT COUNT(*) INTO existing_username FROM users WHERE username = p_username;

    -- Validar existencia del email
    SELECT COUNT(*) INTO existing_email FROM users WHERE email = p_email;

    IF existing_username > 0 THEN
        SELECT 'USERNAME_EXISTS' AS status;
    ELSEIF existing_email > 0 THEN
        SELECT 'EMAIL_EXISTS' AS status;
    ELSE
        INSERT INTO users (username, email, password)
        VALUES (p_username, p_email, p_password);
        SELECT 'SUCCESS' AS status;
    END IF;
END



-- Find user by email



CREATE PROCEDURE FindUserByEmail(IN emailParam VARCHAR(100))
BEGIN
    SELECT * FROM users WHERE email = emailParam;
END


-- Get all users
CREATE PROCEDURE GetAllUsers()
BEGIN
    SELECT * FROM users;
END



-- Get user by ID
CREATE PROCEDURE GetUserById(IN userId INT)
BEGIN
    SELECT * FROM users WHERE id = userId;
END


--- envios

CREATE PROCEDURE CotizarEnvio (
    IN origen_ VARCHAR(100),
    IN destino_ VARCHAR(100),
    IN peso DECIMAL(10,2),
    IN alto DECIMAL(10,2),
    IN ancho DECIMAL(10,2),
    IN largo DECIMAL(10,2)
)
BEGIN
    DECLARE peso_volumen DECIMAL(10,2);
    DECLARE peso_final DECIMAL(10,2);

    SET peso_volumen = CEIL((alto * ancho * largo) / 2500);
    SET peso_final = IF(peso_volumen > peso, peso_volumen, peso);

    SELECT valor 
    FROM tarifas 
    WHERE origen = origen_ AND destino = destino_
      AND peso_min <= peso_final AND peso_max >= peso_final
    LIMIT 1;
END




CREATE PROCEDURE CrearEnvio (
    IN usuario_id INT,
    IN origen_ VARCHAR(100),
    IN destino_ VARCHAR(100),
    IN peso DECIMAL(10,2),
    IN alto DECIMAL(10,2),
    IN ancho DECIMAL(10,2),
    IN largo DECIMAL(10,2),
    IN valor_cotizado DECIMAL(10,2)
)
BEGIN
    DECLARE peso_volumen DECIMAL(10,2);
    DECLARE peso_utilizado DECIMAL(10,2);
    DECLARE envio_id INT;

    SET peso_volumen = CEIL((alto * ancho * largo) / 2500);
    SET peso_utilizado = IF(peso_volumen > peso, peso_volumen, peso);

    INSERT INTO envios (usuario_id, origen, destino, peso, alto, ancho, largo, peso_utilizado, valor_cotizado)
    VALUES (usuario_id, origen_, destino_, peso, alto, ancho, largo, peso_utilizado, valor_cotizado);

    SET envio_id = LAST_INSERT_ID();

    INSERT INTO envio_estados (envio_id, estado)
    VALUES (envio_id, 'En espera');
END
