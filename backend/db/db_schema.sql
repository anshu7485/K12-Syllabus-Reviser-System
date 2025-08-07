-- ========================== USERS TABLE ==========================
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('student','teacher','admin') NOT NULL,
    student_class VARCHAR(50) DEFAULT NULL
);

-- ========================== QUESTIONS TABLE ==========================
CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(20),
    subject VARCHAR(100),
    topic VARCHAR(100),
    type VARCHAR(50),
    question TEXT,
    options TEXT,
    option1 VARCHAR(255),
    option2 VARCHAR(255),
    option3 VARCHAR(255),
    option4 VARCHAR(255),
    correct_answer TEXT,
    correct_ans TEXT,
    topic_id INT,
    uploaded_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================== SUBJECTS TABLE ==========================
CREATE TABLE IF NOT EXISTS subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    class_name VARCHAR(50) NOT NULL
);

-- ========================== PERFORMANCE SUMMARY ==========================
CREATE TABLE IF NOT EXISTS performance_summary (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    subject_name VARCHAR(100),
    topic_name VARCHAR(100),
    accuracy DECIMAL(5,2),
    time_spent VARCHAR(50),
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);
