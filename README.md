# JWT Authentication System

A lightweight, secure user authentication system built with Express.js and JWT (JSON Web Tokens).


## Features

- User registration with validation
- Secure login with JWT tokens
- Password hashing with bcrypt
- Token-based authentication
- Protected routes
- Clean and responsive UI

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, Bootstrap 5
- **Backend**: Node.js, Express.js
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: bcrypt password hashing
- **HTTP Client**: Axios


## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/jwt-auth-system.git
   cd jwt-auth-system
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3001
   JWT_SECRET=your_secure_secret_key
   ```

4. Start the server
   ```bash
   npm start
   ```

5. Access the application at [http://localhost:3001](http://localhost:3001)

## Usage

### Registration

1. Enter a username (min 6 characters)
2. Enter a password (min 8 characters)
3. Click "Sign Up"

### Login

1. Enter your username
2. Enter your password
3. Click "Sign In"

Once logged in, you'll see your user information displayed on the page.

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| GET | / | Serves the main HTML page | No |
| POST | /signup | Creates a new user account | No |
| POST | /signin | Authenticates a user and returns a JWT | No |
| GET | /me | Returns the authenticated user's information | Yes |

## Security Features

- Passwords are hashed with bcrypt before storage
- Authentication is handled via JWT with 24-hour expiration
- Input validation for username and password fields
- Secure HTTP-only cookies for token storage

## Deployment

This project can be easily deployed to services like:

- Heroku
- Vercel
- Netlify
- Railway

Follow the deployment instructions for your preferred platform, ensuring you set the environment variables.

## Future Enhancements

- Email verification
- Password reset functionality
- User profile management
- Role-based access control
- Database integration (MongoDB/PostgreSQL)
- Social authentication (Google, GitHub, etc.)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- [JSON Web Tokens](https://jwt.io/)
- [Express.js](https://expressjs.com/)
- [Bootstrap](https://getbootstrap.com/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) 