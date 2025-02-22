# Chat Application

This is a real-time chat application built with Django, Django Channels, Websocket, Redis, and Next, designed to be easily deployed using Docker.

## Prerequisites
- Docker and Docker Compose installed

## Setup and Run

1. **Clone the repository:**
   ```bash
   https://github.com/syedaakash/chat-app.git
   cd chat-app

2. **Build and start the Docker containers:**
   ```bash
   docker compose up -d --build

3. **Apply database migrations:**
   ```bash
   docker compose exec backend python manage.py migrate

4. **Create a superuser (optional):**
   ```bash
   docker compose exec backend python manage.py createsuperuser

5. **Access the app:**

   Frontend: http://localhost:3000
   
   Django Admin: http://localhost:8000/admin

# Environment Variables
Make sure to configure the .env file with the required environment variables for the database and Redis using `.sample.env`.

# Docker Services
- backend: Django backend server with WebSockets
- frontend: React client app
- postgres: PostgreSQL database
- redis: Redis server for WebSockets and message broadcasting

# Stop the Application
To stop and remove the containers, run:
``` bash
docker compose down


