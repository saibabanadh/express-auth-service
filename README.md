# express-auth-service
Express Authentication Service using Express MongoDB JWT Swagger Docker

## Features
    - User Registration 
    - MongoDB Integration with Authentication
    - Authentication using JWT
        - Password Hashing before storing in DB
        - Generate <JWT-token> with expiration(60min)
        - Required <JWT-token> to access protected routes
    - Protected routes
    - Swagger Documentation
    - Logging 
    - Security with Helmet, Cors
    - Containarized using Docker

## Installation Steps
    - Edit mongodb configuration in config/config.js
    - npm install
    - npm start
