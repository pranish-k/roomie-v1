# Roomie App

Roomie App is a web application designed to help roommates manage shared responsibilities, including group management, chores scheduling, and bill splitting.

## Features

- **Authentication**: Register and log in securely using email and password.
- **Group Management**: Create or join groups using unique group codes.
- **Chores Scheduler**: Assign and track recurring tasks among group members.
- **Bill Splitting**: Add expenses, record payments, and view balances.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd roomie-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment:
   - Create a `.env` file in the root directory.
   - Add the following variable:
     ```
     SESSION_SECRET=your_secret_here
     ```

4. Run the application:
   ```bash
   npm start
   ```

5. Open the app in your browser:
   ```
   http://localhost:3000
   ```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: SQLite with Sequelize ORM
- **Authentication**: Passport.js
- **Frontend**: Pug templates with Tailwind CSS

## Project Structure

src/
├── config/          # Configuration files (e.g., Passport.js)
├── models/          # Sequelize models for database tables
├── routes/          # Express routes for different features
├── utils/           # Utility functions (e.g., middleware)
├── views/           # Pug templates for rendering UI
└── index.js         # Main entry point of the application

## License

This project is licensed under the MIT License.
