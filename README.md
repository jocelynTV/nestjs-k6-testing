# NestJS API Performance Testing

This project demonstrates a NestJS application connected to MongoDB with four types of APIs: RestAPI, GraphQL, WebSocket, and gRPC. Additionally, it includes performance tests for each API type using k6.io.

## Prerequisites

- [Node.js](https://nodejs.org/en) (v16.x or later)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [k6](https://k6.io/) (for running the performance tests)

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing with k6](#testing-with-k6)
  - [Testing Rest](#testing-rest)
  - [Testing GraphQL](#testing-graphql)
  - [Testing WebSocket](#testing-websocket)
  - [Testing gRPC](#testing-grpc)
- [Contributing](#contributing)
- [License](#license)

## Installation

Clone the repository:

```bash
git clone https://github.com/jocelynTV/nestjs-k6-testing.git
cd nestjs-performance-testing
```

Navigate to the `api` directory:

```bash
pnpm install
```

Ensure your MongoDB instance is running and update the MongoDB connection settings in your .env file or directly in the code as per your environment.

## Running the Application

```bash
pnpm start:dev
```

## Testing with k6

Navigate to the `tests` directory

### Testing Rest
```bash
k6 run rest.js
```

### Testing GraphQL
```bash
k6 run graphql.js
```

### Testing WebSocket
```bash
k6 run websocket.js
```

### Testing gRPC
```bash
k6 run grpc.js
```

## Contributing
Feel free to open issues or submit pull requests for improvements and additional features.

## License
This project is licensed under the MIT License.