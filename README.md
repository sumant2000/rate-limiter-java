# Rate Limiter Service

A distributed rate limiter service with a modern web interface, built with Spring Boot and Next.js.

## Features

- Token Bucket and Sliding Window rate limiting algorithms
- Redis-based distributed rate limiting
- Real-time monitoring and statistics
- Modern web dashboard
- Prometheus metrics integration
- Swagger API documentation

## Prerequisites

- Java 17+
- Node.js 18+
- Redis
- Maven

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

The backend will start on http://localhost:8080

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will start on http://localhost:3000

## API Endpoints

- `POST /api/rate-limit/check` - Check if a request is allowed
- `POST /api/rate-limit/configure` - Configure rate limiting parameters
- `GET /api/rate-limit/config/{clientId}` - Get current configuration
- `GET /api/rate-limit/stats` - Get rate limiting statistics

## Monitoring

- Prometheus metrics are available at `/actuator/prometheus`
- Swagger UI is available at `/swagger-ui.html`
- API documentation is available at `/api-docs`

## Architecture

The service uses Redis for distributed rate limiting, allowing it to scale horizontally. The token bucket algorithm is implemented for rate limiting, with configurable parameters for maximum requests and time windows.

The frontend provides a real-time dashboard for monitoring and configuring the rate limiter, with statistics and visualizations of the current rate limiting state. 
