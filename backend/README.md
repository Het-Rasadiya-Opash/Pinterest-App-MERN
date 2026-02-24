# Backend API Documentation

A Pinterest-like social media platform backend API built with Node.js, Express, and MongoDB.

## Base URL
```
http://localhost:3000
```

## Authentication
The API uses JWT tokens stored in HTTP-only cookies for authentication. Protected routes require a valid token.

## API Endpoints

### Users (`/users`)

#### Register User
- **POST** `/users/auth/register`
- **Body:**
```json
{
  "username": "johndoe",
  "displayName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response (201):**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "username": "johndoe",
  "displayName": "John Doe",
  "email": "john@example.com",
  "createdAt": "2023-09-06T10:30:00.000Z",
  "updatedAt": "2023-09-06T10:30:00.000Z"
}
```

#### Login User
- **POST** `/users/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response (200):**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "username": "johndoe",
  "displayName": "John Doe",
  "email": "john@example.com",
  "createdAt": "2023-09-06T10:30:00.000Z",
  "updatedAt": "2023-09-06T10:30:00.000Z"
}
```

#### Logout User
- **POST** `/users/auth/logout`
- **Response (200):**
```json
{
  "message": "Logout successful"
}
```

#### Get User Profile
- **GET** `/users/:username`
- **Response (200):**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "username": "johndoe",
  "displayName": "John Doe",
  "email": "john@example.com",
  "img": "profile-image-url",
  "followerCount": 25,
  "followingCount": 15,
  "isFollowing": false,
  "createdAt": "2023-09-06T10:30:00.000Z",
  "updatedAt": "2023-09-06T10:30:00.000Z"
}
```

#### Follow/Unfollow User
- **POST** `/users/follow/:username`
- **Auth Required:** Yes
- **Response (200):**
```json
{
  "message": "Successful"
}
```

### Pins (`/pins`)

#### Get Pins
- **GET** `/pins`
- **Query Parameters:**
  - `cursor` (number): Page number for pagination
  - `search` (string): Search term for title/tags
  - `userId` (string): Filter by user ID
  - `boardId` (string): Filter by board ID
  - `saved` (boolean): Get saved pins (requires auth)
- **Response (200):**
```json
{
  "pins": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
      "user": "64f8a1b2c3d4e5f6a7b8c9d0",
      "title": "Beautiful Sunset",
      "description": "Amazing sunset view",
      "link": "https://example.com",
      "board": "64f8a1b2c3d4e5f6a7b8c9d2",
      "tags": ["nature", "sunset"],
      "media": "/path/to/image.jpg",
      "width": 800,
      "height": 600,
      "createdAt": "2023-09-06T10:30:00.000Z",
      "updatedAt": "2023-09-06T10:30:00.000Z"
    }
  ],
  "nextCursor": 1
}
```

#### Get Single Pin
- **GET** `/pins/:id`
- **Response (200):**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
  "user": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "username": "johndoe",
    "img": "profile-image-url",
    "displayName": "John Doe"
  },
  "title": "Beautiful Sunset",
  "description": "Amazing sunset view",
  "link": "https://example.com",
  "board": "64f8a1b2c3d4e5f6a7b8c9d2",
  "tags": ["nature", "sunset"],
  "media": "/path/to/image.jpg",
  "width": 800,
  "height": 600,
  "createdAt": "2023-09-06T10:30:00.000Z",
  "updatedAt": "2023-09-06T10:30:00.000Z"
}
```

#### Create Pin
- **POST** `/pins`
- **Auth Required:** Yes
- **Content-Type:** `multipart/form-data`
- **Body:**
```json
{
  "title": "Beautiful Sunset",
  "description": "Amazing sunset view",
  "link": "https://example.com",
  "board": "64f8a1b2c3d4e5f6a7b8c9d2",
  "tags": "nature,sunset",
  "textOptions": "{}",
  "canvasOptions": "{}",
  "newBoard": "New Board Name",
  "media": "image_file"
}
```
- **Response (201):**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
  "user": "64f8a1b2c3d4e5f6a7b8c9d0",
  "title": "Beautiful Sunset",
  "description": "Amazing sunset view",
  "link": "https://example.com",
  "board": "64f8a1b2c3d4e5f6a7b8c9d2",
  "tags": ["nature", "sunset"],
  "media": "/path/to/image.jpg",
  "width": 800,
  "height": 600,
  "createdAt": "2023-09-06T10:30:00.000Z",
  "updatedAt": "2023-09-06T10:30:00.000Z"
}
```

#### Check Pin Interactions
- **GET** `/pins/interaction-check/:id`
- **Response (200):**
```json
{
  "likeCount": 15,
  "isLiked": true,
  "isSaved": false
}
```

#### Interact with Pin (Like/Save)
- **POST** `/pins/interact/:id`
- **Auth Required:** Yes
- **Body:**
```json
{
  "type": "like"
}
```
- **Response (200):**
```json
{
  "message": "Successful"
}
```

### Comments (`/comments`)

#### Get Pin Comments
- **GET** `/comments/:postId`
- **Response (200):**
```json
[
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d3",
    "description": "Great photo!",
    "pin": "64f8a1b2c3d4e5f6a7b8c9d1",
    "user": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "username": "johndoe",
      "img": "profile-image-url",
      "displayName": "John Doe"
    },
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T10:30:00.000Z"
  }
]
```

#### Add Comment
- **POST** `/comments`
- **Auth Required:** Yes
- **Body:**
```json
{
  "description": "Great photo!",
  "pin": "64f8a1b2c3d4e5f6a7b8c9d1"
}
```
- **Response (201):**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d3",
  "description": "Great photo!",
  "pin": "64f8a1b2c3d4e5f6a7b8c9d1",
  "user": "64f8a1b2c3d4e5f6a7b8c9d0",
  "createdAt": "2023-09-06T10:30:00.000Z",
  "updatedAt": "2023-09-06T10:30:00.000Z"
}
```

### Boards (`/boards`)

#### Get User Boards
- **GET** `/boards/:userId`
- **Response (200):**
```json
[
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d2",
    "title": "Nature Photos",
    "user": "64f8a1b2c3d4e5f6a7b8c9d0",
    "pinCount": 5,
    "firstPin": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
      "title": "Beautiful Sunset",
      "media": "/path/to/image.jpg"
    },
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T10:30:00.000Z"
  }
]
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "All fields are required!"
}
```

### 401 Unauthorized
```json
{
  "message": "Authentication required for saved pins"
}
```

### 500 Internal Server Error
```json
{
  "message": "Something went wrong!",
  "status": 500,
  "stack": "Error stack trace..."
}
```

## Setup

1. Install dependencies: `npm install`
2. Set environment variables in `.env`
3. Start server: `npm run dev`
4. Server runs on port 3000