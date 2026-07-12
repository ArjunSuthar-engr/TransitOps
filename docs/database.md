# Database Schema & Conventions

## Tables

### `users`
* `id` INT AUTO_INCREMENT PRIMARY KEY
* `name` VARCHAR(255) NOT NULL
* `email` VARCHAR(255) UNIQUE NOT NULL
* `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP

## Relationships
* Users have a 1-to-many relationship with other entities (e.g., projects, posts).

## Naming Conventions
* **Tables**: plural, snake_case (e.g., `user_profiles`, `projects`).
* **Columns**: snake_case (e.g., `first_name`, `created_at`).
* **Foreign Keys**: `singular_table_name_id` (e.g., `user_id`).

## Migration Notes
* All changes to the database schema must be written in raw SQL files under `/database/migrations/`.
* Each filename must begin with a timestamp prefix (e.g., `YYYYMMDDHHMMSS_migration_name.sql`).
