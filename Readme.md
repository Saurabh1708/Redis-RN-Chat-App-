# React Native Chat App

This is a real-time chat application built using [React Native](https://reactnative.dev/) for the frontend, Node.js for the backend, and Redis for the pub/sub messaging model.

[Socket.io](https://socket.io/) was used for spinning up socket connections between client and server

[Redis insights](https://redis.com/redis-enterprise/redis-insight/) can be used for visualizing redis cache

## Features

- Real-time messaging using Redis pub/sub model
- Cross-platform support (iOS and Android)
- Easy setup and installation

## Setup Instructions

### Prerequisites

- Node.js installed on your machine
- Redis installed and running locally

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Saurabh1708/Redis-RN-Chat-App-.git
   ```

2. Navigate to the project directory:

   ```
   cd chat-app-fs
   ```

3. Install dependencies for the React Native app:

   ```
    cd client/RNChatApp && npm install
   ```

4. Installing nodejs dependencies
   ```
   cd ../../server && npm install
   ```

### Running the Application

#### Start Redis Server

```
brew services start redis
```

#### Start Node.js Server

```
npm run dev
```

#### Start React Native App

```
cd ../client/RNChatApp && npm run android
```

This will launch the React Native app in the Android emulator or on a connected Android device.
