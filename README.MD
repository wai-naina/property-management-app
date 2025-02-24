Property Management Backend
Table of Contents
Introduction
Project Structure
Environment Setup
Dependencies
API Endpoints
Database Schema
Authentication and Authorization
Security
Testing
Deployment
Contributing
Contact
Introduction
This project is the backend for a property management system. It provides APIs for managing users, units, payments, complaints, and ratings. The backend is built using Node.js, Express, and MongoDB. It includes features like user authentication, role-based access control, and secure communication via HTTPS.
Project Structure
The project is organized into several directories and files:
Copy
project-root/
├── src/
│ ├── config/
│ ├── controllers/
│ │ ├── authController.js
│ │ ├── complaintController.js
│ │ ├── paymentController.js
│ │ ├── ratingController.js
│ │ └── unitController.js
│ ├── middleware/
│ │ ├── authMiddleware.js
│ │ └── validateRequest.js
│ ├── models/
│ │ ├── Complaint.js
│ │ ├── Payment.js
│ │ ├── Rating.js
│ │ ├── Unit.js
│ │ └── User.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── complaintRoutes.js
│ │ ├── paymentRoutes.js
│ │ ├── ratingRoutes.js
│ │ └── unitRoutes.js
│ ├── services/
│ │ └── mpesaService.js
│ ├── tests/
│ │ └── auth.test.js
│ ├── utils/
│ │ └── errors.js
│ ├── validators/
│ │ └── schema.js
│ ├── server.js
│ └── swagger.json
├── .env
└── README.md
Environment Setup
To set up the project, follow these steps:
Clone the Repository:
shCopy
git clone https://github.com/yourusername/property-management-backend.git
cd property-management-backend
Install Dependencies:
shCopy
npm install
Set Environment Variables:
Create a .env file in the root directory and add the following variables:
plaintextCopy
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
MONGO_URI=mongodb://username:password@host:port/dbname
MPESA_API_URL=https://api.safaricom.co.ke
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_PASSKEY=your_passkey
MPESA_SHORTCODE=your_shortcode
BASE_URL=https://yourdomain.com
PORT=5000
HTTPS_ENABLED=true
HTTPS_KEY_PATH=path/to/your/key.pem
HTTPS_CERT_PATH=path/to/your/cert.pem
Start the Server:
shCopy
npm start
Run Tests:
shCopy
npm test
Dependencies
The project uses the following main dependencies:
Express: For building the server and handling routes.
Mongoose: For MongoDB object modeling.
bcryptjs: For hashing passwords.
jsonwebtoken: For handling JWT authentication.
helmet: For securing Express apps.
cors: For enabling CORS.
swagger-ui-express: For API documentation.
API Endpoints
The API endpoints are documented using Swagger. You can access the documentation at:
http://localhost:5000/api-docs
Authentication
Register User: POST /api/auth/register
Login User: POST /api/auth/login
Refresh Token: POST /api/auth/refresh-token
Units
Get All Units: GET /api/units
Create Unit: POST /api/units
Update Unit: PUT /api/units/:id
Delete Unit: DELETE /api/units/:id
Payments
Get All Payments: GET /api/payments
Create Payment: POST /api/payments
M-Pesa Callback: POST /api/payments/mpesa-callback
Get Payments by Unit: GET /api/payments/:unitId
Complaints
Get All Complaints: GET /api/complaints
Create Complaint: POST /api/complaints
Update Complaint: PUT /api/complaints/:id
Ratings
Get All Ratings: GET /api/ratings
Create Rating: POST /api/ratings
Database Schema
The database schema consists of the following models:
User
name: String
email: String (unique)
password: String (hashed)
role: String (enum: 'tenant', 'landlord', 'admin')
phoneNumber: String
idNumber: String
Unit
unitName: String
landlordId: ObjectId (ref: 'User')
tenantId: ObjectId (ref: 'User')
rentAmount: Number
isOccupied: Boolean
paymentStatus: String (enum: 'paid', 'unpaid')
Payment
unitId: ObjectId (ref: 'Unit')
tenantId: ObjectId (ref: 'User')
amountPaid: Number
paymentDate: Date
month: String
Complaint
unitId: ObjectId (ref: 'Unit')
tenantId: ObjectId (ref: 'User')
description: String
status: String (enum: 'pending', 'in-progress', 'resolved')
Rating
unitId: ObjectId (ref: 'Unit')
tenantId: ObjectId (ref: 'User')
rating: Number (min: 1, max: 5)
review: String
RefreshToken
token: String
userId: ObjectId (ref: 'User')
createdAt: Date (expires: '7d')
Authentication and Authorization
The project uses JWT for authentication. Tokens are generated upon login and must be included in the Authorization header for protected routes. Role-based access control is implemented using middleware to ensure that only authorized users can access certain endpoints.
Security
Password Hashing: Passwords are hashed using bcryptjs.
Token Management: JWT tokens are used for authentication. Refresh tokens are stored in the database and have a longer expiration time.
HTTPS: The server can be configured to use HTTPS for secure communication.
Security Headers: The helmet middleware is used to set security headers.
Input Validation: Input validation is handled using zod.
Testing
Tests are written using supertest and jest. You can run the tests using:
shCopy
npm test
Deployment
To deploy the application, follow these steps:
Set up a production environment with the necessary dependencies.
Configure the .env file with production settings.
Start the server using npm start.
Contributing
Contributions are welcome! Please follow these guidelines:
Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and ensure tests pass.
Submit a pull request.
Contact
For any questions or issues, please contact your-njengabrian44@gmail.com.
