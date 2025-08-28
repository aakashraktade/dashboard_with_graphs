Dashboard & User Management Application
Project Description
This project is a single-page application built with React that focuses on two key functionalities: a data dashboard with interactive visualizations and a user management list with in-memory pagination. The application fetches data from a provided API to present key metrics and user information in a clear and organized manner.

Features
1. Dashboard with Data Visualizations
The dashboard provides a visual summary of user data using various charts and key performance indicators (KPIs).

Total Users Tile: A large number block displaying the total count of users.

Users Created Per Day: A line or bar chart showing the number of new users over the last 30 days.

Avatar Distribution: A pie chart illustrating the distribution of users with or without profile pictures.

Signup Time of Day Distribution: A pie or heatmap chart representing the most active signup hours.

Recently Joined Users: A horizontal list showcasing the top 5 newest users.

2. User List with In-Memory Pagination
This section displays a list of all users with robust filtering and navigation features.

In-Memory Pagination: The user list is paginated, displaying a fixed number of users per page (e.g., 10 users).

Sorting: Users can be sorted by name or creation date.

Search: A search feature allows users to filter the list by a user's name or email.

User Details: Each row is clickable to view a user's detailed information, which can be displayed in a modal or on a separate page.

3. Optional Enhancements
User Management: The ability to create, edit, or delete user entries.

Avatar Preview: A modal or pop-up to show a full-size preview of a user's avatar.

Enhanced Search: Additional search filters and functionalities.

Technologies Used
React: The core JavaScript library for building the user interface.

Recharts: A popular chart library for React used to create the data visualizations on the dashboard.

HTML, CSS: For structuring and styling the application.

JavaScript (ES6+): For application logic and interactivity.

Setup and Installation
Follow these steps to get the project up and running on your local machine.

Prerequisites
Node.js (LTS version recommended)

npm or yarn

Installation Steps
Clone the repository:

git clone [repository-url]
cd [project-folder]

Install dependencies:

npm install
# or
yarn install

Start the development server:

npm start
# or
yarn start
