CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    title VARCHAR(20) NOT NULL,
    description  varchar(1000)
);

CREATE TABLE todo_list (
    id SERIAL PRIMARY KEY,
    userid VARCHAR(20) UNIQUE NOT NULL,
    task_id integer REFERENCES tasks(task_id)
)