# 💡 Mathool - Math Utility Tool

A simple full-stack web application that allows users to:

* Check if a number is **prime**
* Compute the **factorial** of a number
* Perform both in a single request

Built with **Spring Boot** for the backend and **React + TypeScript + MUI** for the frontend.

---

## 🫠 Live Demo

* **Frontend:** [https://mathool.netlify.app/](https://mathool.netlify.app/)
* **Backend API:** [https://mathool.onrender.com](https://mathool.onrender.com)
* **Docker Image:** [DockerHub Repo](https://hub.docker.com/r/pogiii/mathool)

---

## 🚀 Quick Start (Run Locally)

### Backend - Spring Boot

```bash
# Clone the repository
git clone https://github.com/AaronCallanga/mathool-server.git
cd mathool-server

# Build the JAR (skip tests)
./mvnw clean package -DskipTests # or use
mvn clean package

# Run the app
java -jar target/mathool-0.0.1-SNAPSHOT.jar

# OR run using Docker
docker build -t mathool-backend .
docker run -p 8080:8080 mathool-backend
```

#### REST Endpoints

| Endpoint                                | Method | Description              |
| --------------------------------------- | ------ | ------------------------ |
| `/api/v1/math/prime?number=5`           | GET    | Check if number is prime |
| `/api/v1/math/factorial?number=5`       | GET    | Calculate factorial      |
| `/api/v1/math/prime-factorial?number=5` | GET    | Get both in one request  |

### Frontend - React + Vite

```bash
# Clone the repository
git clone https://github.com/AaronCallanga/mathool-client.git
cd mathool-client

# Install dependencies
npm install

#  Modify API Endpoint (uncomment the localhost url, comment the onrender url)
Example:
const modeOptions: Mode[] = [
  {
    label: "Check Prime",
    url: //`https://mathool.onrender.com/api/v1/math/prime?number=`,
    "http://localhost:8080/api/v1/math/prime?number=",
  },
  {
    label: "Calculate Factorial",
    url: //`https://mathool.onrender.com/api/v1/math/factorial?number=`,
    "http://localhost:8080/api/v1/math/factorial?number=",
  },
  {
    label: "Prime & Factorial",
    url: //`https://mathool.onrender.com/api/v1/math/prime-factorial?number=`
    "http://localhost:8080/api/v1/math/prime-factorial?number=",
  },
];

# Start the development server
npm run dev
```

* Runs on: `http://localhost:5173`
* Connects to backend on `http://localhost:8080`

---

## 📚 Project Structure

### Backend

```
mathool-server/
├── controller/
├── service/
├── dto/
├── config/
└── MathoolApplication.java
```

### Frontend

```
mathool-client/
├── components/
├── types/
├── App.tsx
└── main.tsx
```

---

## 📄 License

MIT License. Feel free to use, modify, and share!

---

## ✨ Author

Made with ❤️ by [Aaron Callanga](https://github.com/AaronCallanga)
