DO $$ 
DECLARE
    dept_cardio_id BIGINT;
    dept_neuro_id BIGINT;
    dept_peds_id BIGINT;
    doc_alice_id BIGINT;
    doc_bob_id BIGINT;
    doc_carol_id BIGINT;
BEGIN
    INSERT INTO departments (name, head, description) VALUES ('Cardiology', 'Dr. Smith', 'Heart specialists') RETURNING id INTO dept_cardio_id;
    INSERT INTO departments (name, head, description) VALUES ('Neurology', 'Dr. Adams', 'Brain specialists') RETURNING id INTO dept_neuro_id;
    INSERT INTO departments (name, head, description) VALUES ('Pediatrics', 'Dr. Johnson', 'Children specialists') RETURNING id INTO dept_peds_id;

    INSERT INTO doctors (name, specialization, department_id, phone, email, available, working_days, start_time, end_time) 
    VALUES ('Dr. Alice Carter', 'Cardiologist', dept_cardio_id, '555-0101', 'alice@clinic.com', true, 'Mon-Fri', '09:00', '17:00') RETURNING id INTO doc_alice_id;
    
    INSERT INTO doctors (name, specialization, department_id, phone, email, available, working_days, start_time, end_time) 
    VALUES ('Dr. Bob Davis', 'Neurologist', dept_neuro_id, '555-0102', 'bob@clinic.com', true, 'Mon-Thu', '10:00', '18:00') RETURNING id INTO doc_bob_id;
    
    INSERT INTO doctors (name, specialization, department_id, phone, email, available, working_days, start_time, end_time) 
    VALUES ('Dr. Carol Evans', 'Pediatrician', dept_peds_id, '555-0103', 'carol@clinic.com', true, 'Tue-Sat', '08:00', '14:00') RETURNING id INTO doc_carol_id;

    INSERT INTO app_users (email, password_hash, role, name, profile_id) VALUES
    ('alice@clinic.com', '$2b$12$MQvArF5OtERwbfxMB1Ghre4uMHO.ou8ctw87Zw7PFjGD2hcpaXXVS', 'Doctor', 'Dr. Alice Carter', doc_alice_id),
    ('bob@clinic.com', '$2b$12$MQvArF5OtERwbfxMB1Ghre4uMHO.ou8ctw87Zw7PFjGD2hcpaXXVS', 'Doctor', 'Dr. Bob Davis', doc_bob_id),
    ('carol@clinic.com', '$2b$12$MQvArF5OtERwbfxMB1Ghre4uMHO.ou8ctw87Zw7PFjGD2hcpaXXVS', 'Doctor', 'Dr. Carol Evans', doc_carol_id);
END $$;
