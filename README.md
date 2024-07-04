# adaTanam

## Features Description
- Basic auth i.e. signup, login, email confirmation for new accounts & password resets
- Adding farmers' produce to cart
- Viewing farmers' produce and stores
- Simulating order placement and payment

## Architecture
### Frontend
- **Framework**: Built with ReactJS.
- **UI Components**: Utilizes MUI v5 for consistent and responsive UI elements.
- **Dev Scaffold**: React project scaffolded by Vite for rapid UI reflected updates.

### Backend
- **Framework**: Developed with Spring Boot (Java 17).
- **Data Processing**: Exposes REST API endpoints to frontend for data queries.
- **Structure**: Standard layered architecture of controller, service, repository, and model. DTOs used too especially for API responses to the client.
- **Database Interaction**: Persists data into a PostgreSQL database via JPA.
- **Security Measures**: Implements JWT for authentication and authorization of requests from clients.
- **SMTP Integration**: Uses SMTP service provided by domain provider ([.tech domains](https://get.tech/)) to send emails via dedicated email to end-users.

### Database
- **Type**: PostgreSQL database, hosted on Azure.

### Storage Server
- **Type**: Using Azure Storage services
- To store files i.e. image files from user uploads.

## Azure Services
1. Static Web Apps
  - To host CSR-based frontend application
2. App Service
  - To host backend API service
  - Swagger docs exposed for ease of reference and testing
3. Azure Database for PostgreSQL
4. Azure Storage Service
  - Application image files stored into blob storage in dedicated container

## Development Requirements
- node: v
- npm
- Java
- Maven
- PostgreSQL
- Domain name, email, and SMTP (with SSL) details from domain provider
- Azure subscription (This project used free services & credits from Azure for Students subscription)

## Deployment
### Local
1. Ensure development requirements installed.
2. Configure .sample.env as necessary for web/ and spring-boot-backend/ folders.
3. Setup DB via running DDL and DML scripts in database/.
4. To run frontend, open a terminal in web/ directory and run:
```
npm install
npm run dev
```
5. To run backend, open a terminal in spring-boot-backend/ and run:
```
mvn clean install -DskipTests
```
6. Backend service can be verified by cheking localhost:{your-port-number}, or to the Swagger docs itself at localhost:{your-port-number}/swagger-ui
7. Frontend can be viewed via localhost:5173.

### To Azure via GitHub Actions CI/CD
