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

-- ========================== SAMPLE DATA ==========================

-- Insert sample subjects for different classes
INSERT IGNORE INTO subjects (name, class_name) VALUES
('Math', '1'),
('English', '1'),
('EVS', '1'),
('Math', '2'),
('English', '2'),
('EVS', '2'),
('Math', '3'),
('English', '3'),
('Science', '3'),
('Hindi', '3'),
('Math', '4'),
('English', '4'),
('Science', '4'),
('Hindi', '4'),
('Social Science', '4'),
('Math', '5'),
('English', '5'),
('Science', '5'),
('Hindi', '5'),
('Social Science', '5'),
('Math', '6'),
('English', '6'),
('Science', '6'),
('Hindi', '6'),
('Social Science', '6'),
('Math', '7'),
('English', '7'),
('Science', '7'),
('Hindi', '7'),
('Social Science', '7'),
('Math', '8'),
('English', '8'),
('Science', '8'),
('Hindi', '8'),
('Social Science', '8'),
('Math', '9'),
('English', '9'),
('Science', '9'),
('Hindi', '9'),
('Social Science', '9'),
('Math', '10'),
('English', '10'),
('Science', '10'),
('Hindi', '10'),
('Social Science', '10'),
('Computer', '10'),
('Math', '11'),
('English', '11'),
('Physics', '11'),
('Chemistry', '11'),
('Biology', '11'),
('Computer Science', '11'),
('Math', '12'),
('English', '12'),
('Physics', '12'),
('Chemistry', '12'),
('Biology', '12'),
('Computer Science', '12');

-- Insert sample questions for different classes
INSERT IGNORE INTO questions (class_name, subject, topic, type, question, option1, option2, option3, option4, correct_answer, uploaded_by) VALUES
('1', 'Math', 'Numbers', 'mcq', 'What comes after 5?', '4', '6', '7', '8', '6', 1),
('1', 'Math', 'Addition', 'mcq', 'What is 2 + 3?', '4', '5', '6', '7', '5', 1),
('2', 'Math', 'Multiplication', 'mcq', 'What is 2 × 3?', '5', '6', '7', '8', '6', 1),
('3', 'Science', 'Plants', 'mcq', 'Which part of plant makes food?', 'Root', 'Stem', 'Leaf', 'Flower', 'Leaf', 1),
('10', 'Math', 'Real Numbers', 'mcq', 'What is the HCF of 12 and 18?', '2', '3', '6', '9', '6', 1),
('10', 'Science', 'Light', 'mcq', 'What type of lens is used in magnifying glass?', 'Concave', 'Convex', 'Plane', 'Cylindrical', 'Convex', 1);
