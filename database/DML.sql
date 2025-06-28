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



