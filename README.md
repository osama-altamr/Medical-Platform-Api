# Medical Platform

- **Title:** Medical Platform
- **Author:** Osama Altamr
- **Date:** 2024-03-12

## Description

Medical Platform is a comprehensive solution designed to streamline medical services and patient management. Built with NestJS, it leverages modern technologies to provide a robust and scalable backend for healthcare applications.

## Features

- **Authentication and Authorization**: Secure user authentication and role-based access control.
- **Email Notifications**: Integrated email service for sending notifications and reminders.
- **MongoDB Integration**: Utilizes MongoDB for efficient data storage and retrieval.
- **Real-time Communication**: Supports real-time communication through WebSockets.
- **Payment Processing**: Integrated Stripe for secure payment processing.
- **API Documentation**: Swagger UI for easy API documentation and testing.

## Getting Started

1. **Prerequisites**: Ensure you have Node.js and npm installed.
2. **Clone the Repository**: Use `git clone` to clone the repository to your local machine.
3. **Install Dependencies**: Run `npm install` to install all necessary dependencies.
4. **Environment Setup**: Copy `.env.example` to `.env` and fill in the required environment variables.
5. **Start the Application**: Use `npm run start:dev` for development mode or `npm run start:prod` for production mode.

## Scripts

- `npm run build`: Builds the project.
- `npm run start`: Starts the application.
- `npm run start:dev`: Starts the application in development mode with hot-reloading.
- `npm run start:debug`: Starts the application in debug mode.
- `npm run start:prod`: Starts the application in production mode.
- `npm run lint`: Lints the project files.
- `npm run test`: Runs unit tests.
- `npm run test:watch`: Runs unit tests in watch mode.
- `npm run test:cov`: Generates a coverage report.
- `npm run test:debug`: Runs unit tests in debug mode.
- `npm run test:e2e`: Runs end-to-end tests.

## API Documentation

The Medical Platform project utilizes Swagger for API documentation. This allows developers to easily understand and interact with the API endpoints.

### Accessing the Swagger UI

To view the API documentation, navigate to the following URL in your web browser:

- `http://localhost:3000/api`

This will open the Swagger UI, where you can see all the available API endpoints, their descriptions, parameters, and responses. You can also try out the endpoints directly from the UI.

## User Roles

The Medical Platform project implements a role-based access control (RBAC) system to manage user permissions effectively. This system is designed to ensure that users can only access the features and data relevant to their roles, enhancing security and user experience.

#### Key Roles

- **Admin**: Has full access to all features and data within the platform. Admins can manage users, roles, and perform any administrative tasks.
- **Subadmin**: Acts as an intermediary between admins and other users. Subadmins can manage certain aspects of the platform, such as user accounts and basic settings, but with more limited permissions than admins.
- **Employee**: Represents healthcare providers within the platform. Employees can manage their profiles, view and update medical records, and perform other healthcare-related tasks.
- **Patient**: Represents patients within the platform. Patients can book appointments, view their medical records, and communicate with healthcare providers.
- **User**: A generic role that encompasses all users of the platform. Users can have different roles, such as Patient, Employee, or Admin, depending on their access level and responsibilities.

## Chat Message Functionality with WebSocket

The Medical Platform project leverages Socket.IO for real-time chat functionality, providing a seamless and interactive experience for users. This section outlines how to use the WebSocket gateway for sending and receiving chat messages.

#### Setting Up WebSocket Client

To interact with the chat functionality, you need to set up a WebSocket client. This can be done using the `socket.io-client` library in your frontend application.

1. **Install `socket.io-client`**:

- `bash npm install socket.io-client`

2. **Connect to the WebSocket Server**:

javascript import io from 'socket.io-client';
const socket = io('http://localhost:3000');

#### Sending a Chat Message

To send a chat message, emit a `message` event from the client to the server with the message data.

javascript socket.emit('message', { senderId: 'senderUserId', receiverId: 'receiverUserId', content: 'Hello, this is a message!' });

#### Receiving Chat Messages

To receive chat messages, listen for the `message` event on the client side.

javascript socket.on('message', (newMessage) => { console.log('New message received:', newMessage); });

#### Handling Online Users

The server emits an event `getOnlineUsers` whenever a user connects or disconnects. You can listen for this event to update the list of online users in your application.

javascript socket.on('getOnlineUsers', (onlineUsers) => { console.log('Online users:', onlineUsers); });

## Data Models

The Medical Platform project utilizes Mongoose for MongoDB object modeling, providing a structured way to define the data schema and interact with the database. This section outlines the core models used in the application.

#### Core Models

- **User**: Represents the users of the platform, including doctors, patients, and administrators.
- **Chat-Message**: Manages the messaging functionality within the platform, enabling communication between users.
- **Auth**: Handles user authentication and authorization, ensuring secure access to the platform.
- **Medical-Examination**: Represents the medical examinations conducted by healthcare providers, including details about the examination and results.
- **Medical-Record**: Contains the medical records of patients, including their health history and treatment plans.
- **Complaint**: Represents patient complaints or feedback about the medical services provided.
- **Payment**: Manages the payment transactions related to medical services.
- **Day**: Represents a specific day within the scheduling system, useful for managing appointments and reservations.
- **Reservation**: Handles the reservation of medical services, including details about the reservation time and status.
- **Review**: Contains patient reviews and feedback about the medical services received.
- **Doctor**: Represents healthcare professionals who provide medical services.
- **Center**: Represents medical centers or facilities where medical services are offered.
- **Clinic**: Represents clinics within the medical center, focusing on specific specialties or departments.

# Filtering, Sorting, and Pagination for Patients in Clinics or Centers

The Medical Platform project implements advanced features for querying and managing patient data within clinics or centers, including filtering, sorting, and pagination. These features are designed to provide a flexible and efficient way to interact with patient records within specific healthcare facilities, ensuring that users can easily find and navigate through the information they need.

## Filtering

**Pattern:** Filters for patients within clinics or centers are applied using the filter query parameter. The format is property:rule:value, where property is the field to filter on, rule is the comparison operator (e.g., eq for equals, like for pattern matching), and value is the value to compare against.

**Examples:**

- GET /api/v1/clinics?filter=age:gte:30 - Returns patients across all clinics aged 30 or older.
- GET /api/v1/centers?filter=name:like:John - Returns patients across all centers whose name contains "John".

## Sorting

**Pattern:** Sorting for patients within clinics or centers is applied using the sort query parameter. The format is property:direction, where property is the field to sort by, and direction is either asc for ascending or desc for descending.

**Examples:**

- GET /api/v1/clinics?sort=age:asc - Returns patients across all clinics sorted by age in ascending order.
- GET /api/v1/centers?sort=name:desc - Returns patients across all centers sorted by name in descending order.

## Pagination

**Pattern:** Pagination for patients within clinics or centers is controlled using the page and size query parameters. page is the current page number, and size is the number of items per page.

**Examples:**

- GET /api/v1/clinics?page=2&size=10 - Returns the second page of patients across all clinics, with 10 patients per page.
- GET /api/v1/centers?page=1&size=20 - Returns the first page of patients across all centers, with 20 patients per page.

## Conclusion

This README provides a comprehensive overview of your project, its features, and how to get started. It also includes a section for contributing, which encourages community involvement,

## Contributing

Contributions are welcome! Please feel free to suggest improvements.
### GitHub Repository
[GitHub Repository](https://github.com/osama-altamr/Medical-Platform-Api)