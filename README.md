# viptutors-tms

VIP Tutors Task Management System (TMS) backend and frontend.

---

## 📚 Backend Documentation

You can find the full API documentation here:  
[Postman Workspace](https://web.postman.co/workspace/My-Workspace~97e04c83-634f-4683-8cc7-7cf61a5d161e/collection/38781653-b2e81f8c-cff5-427a-b37e-0fb9b59ea68e?action=share&source=copy-link&creator=38781653)

---

## ⚙ Backend Setup

1. Clone the repository and install dependencies:

```bash
composer install
Copy the example environment file:

cp .env.example .env
Update .env with your local environment:


APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173
SANCTUM_STATEFUL_DOMAINS=localhost:5173,localhost:8000
Generate the application key:
php artisan key:generate

Run migrations and seed the database (includes test user and admin):
php artisan migrate
php artisan db:seed

Start the Laravel development server:
php artisan serve
Run the scheduler for scheduled tasks (e.g., task pruning):
php artisan schedule:run

```


## 🖥 Frontend Setup
Navigate to the frontend folder and install dependencies:

```bash
npm install
Copy the .env file:

cp .env.example .env
Update your .env with the backend URL:
VITE_BACKEND_URL=http://localhost:8000
Start the frontend development server:

npm run dev
```