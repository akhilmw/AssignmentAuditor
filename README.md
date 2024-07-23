# Assignment Auditor ![Assignment Auditor](/front-end/public/assignment_logo.png)

Assignment Auditor is an efficient platform where code reviewers and students can seamlessly collaborate. Students can submit their assignments via GitHub, and available code reviewers can claim them, provide detailed code reviews with video URLs, and update the status to "completed" or "needs review." This ensures that both parties are always aware of the status of their assignments and work.

## Features

- **Student Submission**: Students can submit their GitHub link of the assignment.
- **Reviewer Claiming**: Code reviewers can claim assignments for review.
- **Status Updates**: Reviewers can update the assignment status to "completed" or "needs review."
- **Detailed Reviews**: Reviewers can provide detailed code reviews along with video URLs.
- **Post Comments**: Code Reviewers and Students can post comments in the comments section.

## Tech Stack

### Frontend

- **ReactJS**: A JavaScript library for building user interfaces.
- **Axios**: A promise-based HTTP client for the browser and Node.js.

### Backend

- **Java 17**: The programming language used for the backend.
- **Spring Boot**: A framework that simplifies the development of Java-based applications.
- **Spring Security**: A powerful and highly customizable authentication and access-control framework.

### Database

- **MySQL**: An open-source relational database management system.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Java 17
- Maven
- MySQL

### Frontend Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/akhilmw/AssignmentAuditor.git
    cd front-end
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file with the following content:

    ```env
    VITE_API_URL=http://localhost:8080/api
    ```

4. Start the development server:

    ```sh
    npm run dev
    ```

### Backend Setup

1. Clone the repository:

    ```sh
    cd back-end
    ```

2. Update the `application.properties` file with your MySQL database configuration:

    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/yourdatabase
    spring.datasource.username=yourusername
    spring.datasource.password=yourpassword
    ```

3. Build the project:

    ```sh
    ./mvnw clean install
    ```

4. Run the project:

    ```sh
    ./mvnw spring-boot:run
    ```

### MySQL Setup

1. Create a database for the project:

    ```sql
    CREATE DATABASE assignment_auditor;
    ```

2. Run the application to initialize the database schema.

## Deployment

The application is deployed using Docker and hosted on an AWS EC2 instance.

## Live Demo

Check out the live demo: [Assignment Auditor](http://51.20.78.25:5173)

## Usage

- Students can log in and submit their assignments by providing their GitHub repository URLs.
- All the submitted assignments will be visible in the student's dashboard
- Reviewers can log in, claim assignments, review them, and provide feedback.
- The Code Reviewer dashboard provides an overview of assignments in different states: "Awaiting Review," "In Review," and "Needs Update."

## Screenshots

Here you can add some screenshots of your application:

![Add Tasks](/Screenshot 2024-07-22 at 10.16.28 PM.png)

![Screenshot 2](/Screenshot 2024-07-22 at 10.17.39 PM.png)

![Screenshot 3](/Screenshot 2024-07-22 at 10.28.37 PM.png)

![Screenshot 4](/Screenshot 2024-07-22 at 10.30.13 PM.png)

![Screenshot 5](/Screenshot 2024-07-22 at 10.31.25 PM.png)

![Screenshot 6](/Screenshot 2024-07-22 at 10.32.19 PM.png)

![Screenshot 7](/Screenshot 2024-07-22 at 10.42.39 PM.png)

![Screenshot 8](/Screenshot 2024-07-22 at 10.44.46 PM.png)

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/fooBar`).
3. Commit your changes (`git commit -am 'Add some fooBar'`).
4. Push to the branch (`git push origin feature/fooBar`).
5. Create a new Pull Request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [akhilmw2@gmail.com](mailto:your-akhilmw2@gmail.com)

Project Link: [[https://github.com/akhilmw/AssignmentAuditor](https://github.com/akhilmw/AssignmentAuditor)]
