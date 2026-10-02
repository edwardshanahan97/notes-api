INSERT INTO users (name, email, password_hash) 
VALUES 
    ('dummy_user_1', 'dummy_email@email.com', 'dummy_hash'),
    ('dummy_user_2', 'dummy_email_2@email.com', 'dummy_hash');

INSERT INTO notes (content, user_id)
VALUES
    ('# PostgreSQL

Today I learned about **foreign keys**.', 1),

    ('# JavaScript

I need to practise **async/await**.', 1),

    ('# Backend

Things I want to learn:

- Authentication
- Testing
- Deployment', 2),

    ('Remember to buy bread and milk.', 2);

INSERT INTO tags (name) 
VALUES 
('sql'), ('javascript'), ('backend'), ('personal');

INSERT INTO note_tags (note_id, tag_id) 
VALUES 
    (1, 1),
    (1, 3),
    (2, 2),
    (3, 3),
    (4, 4);