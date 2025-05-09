CREATE TABLE user_profile (
    id           UUID PRIMARY KEY,
    email        VARCHAR(255) NOT NULL UNIQUE,
    name        VARCHAR(255) NOT NULL,
    role         VARCHAR(255) NOT NULL,
    total_score  INT DEFAULT 0,
    rev_count    INT DEFAULT 0,
    balance      INT DEFAULT 0,
    expire_date  DATE NULL
);


CREATE TABLE enum_service_type (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);


CREATE TABLE enum_service_sub_type (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    service_type_id INTEGER NOT NULL,
    FOREIGN KEY (service_type_id) REFERENCES enum_service_type(id)
);


CREATE TABLE ticket_status (
    code  VARCHAR(255) PRIMARY KEY,
    value VARCHAR(255) NOT NULL
);


CREATE TABLE ticket (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description         VARCHAR(500),
    status_code         VARCHAR(255) NOT NULL,
    author_id           UUID NOT NULL,
    service_sub_type_id INTEGER NOT NULL,
    budget              FLOAT,
    finish_date    TIMESTAMP NOT NULL,
    creation_date  TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    location           VARCHAR(255) NOT NULL,
    last_notification_date DATE NULL,
    tasker_id           UUID NULL,
    FOREIGN KEY (author_id) REFERENCES user_profile(id),
    FOREIGN KEY (tasker_id) REFERENCES user_profile(id),
    FOREIGN KEY (status_code) REFERENCES ticket_status(code),
    FOREIGN KEY (service_sub_type_id) REFERENCES enum_service_sub_type(id)
);


CREATE TABLE qualification (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_type_id INTEGER NOT NULL,
    user_id         UUID NOT NULL,
    FOREIGN KEY (service_type_id) REFERENCES enum_service_type(id),
    FOREIGN KEY (user_id) REFERENCES user_profile(id)
);


CREATE TABLE response_status (
    code  VARCHAR(255) PRIMARY KEY,
    value VARCHAR(255) NOT NULL
);


CREATE TABLE response (
    id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tasker_id              UUID NOT NULL,
    ticket_id              UUID NOT NULL,
    budget                 INT NOT NULL,
    description            VARCHAR(500),
    finish_date       TIMESTAMP NOT NULL,
    update_date       TIMESTAMP NULL,
    response_status_code   VARCHAR(255) NOT NULL,
    FOREIGN KEY (tasker_id) REFERENCES user_profile(id),
    FOREIGN KEY (ticket_id) REFERENCES ticket(id),
    FOREIGN KEY (response_status_code) REFERENCES response_status(code)
);


CREATE TABLE packages (
    type        VARCHAR(255) PRIMARY KEY NOT NULL,
    value       FLOAT NOT NULL,
    active_per  INT NOT NULL,
    price       FLOAT NOT NULL
);

INSERT INTO ticket_status (code, value)
VALUES ('O', 'Open'),
       ('P', 'In progress'),
       ('C', 'Close');

INSERT INTO response_status (code, value)
VALUES ('O', 'Open'),
       ('A', 'Accepted'),
       ('D', 'Denied'),
       ('F', 'Finished');

INSERT INTO enum_service_type (id, name)
VALUES (1, 'Moving'),
       (2, 'Cleaning'),
       (3, 'Outdoor Help');

INSERT INTO enum_service_sub_type (id, name, service_type_id)
VALUES (1, 'Trash &amp; Furniture Removal', 1),
       (2, 'Heavy Lifting &amp; Loading', 1),
       (3, 'Apartment Move In/Out', 1),
       (4, 'Party Clean Up', 2),
       (5, 'Deep clean', 2),
       (6, 'Garage Cleaning', 2),
       (7, 'Yard Work', 3),
       (8, 'Landscaping Help', 3),
       (9, 'Gardening', 3);

INSERT INTO packages(type, value, active_per, price)
VALUES ('small', 100.0, 1, 2.99),
       ('middle', 300, 3, 7.99),
       ('big', 1200.0, 12, 21.99);