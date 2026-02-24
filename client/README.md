# Client-Side API Documentation

Frontend application for a Pinterest-like social media platform built with React, Vite, and TanStack Query.

## API Base Configuration

The client uses Axios with a configured base URL from environment variables:

```javascript
// src/utils/apiRequest.js
import axios from "axios";

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT, // e.g., "http://localhost:3000"
  withCredentials: true, // For cookie-based authentication
});
```

## API Endpoints Usage

### Authentication Endpoints

#### Register User
```javascript
const register = async (userData) => {
  const response = await apiRequest.post("/users/auth/register", {
    username: "johndoe",
    displayName: "John Doe", 
    email: "john@example.com",
    password: "password123"
  });
  return response.data;
};
```

#### Login User
```javascript
const login = async (credentials) => {
  const response = await apiRequest.post("/users/auth/login", {
    email: "john@example.com",
    password: "password123"
  });
  return response.data;
};
```

#### Logout User
```javascript
const logout = async () => {
  const response = await apiRequest.post("/users/auth/logout");
  return response.data;
};
```

### User Endpoints

#### Get User Profile
```javascript
const getUserProfile = async (username) => {
  const response = await apiRequest.get(`/users/${username}`);
  return response.data;
};

// Example response:
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "username": "johndoe",
  "displayName": "John Doe",
  "email": "john@example.com",
  "img": "profile-image-url",
  "followerCount": 25,
  "followingCount": 15,
  "isFollowing": false
}
```

#### Follow/Unfollow User
```javascript
const followUser = async (username) => {
  const response = await apiRequest.post(`/users/follow/${username}`);
  return response.data;
};

// Response: { "message": "Successful" }
```

### Pin Endpoints

#### Get Pins (with filters)
```javascript
const getPins = async (filters = {}) => {
  const response = await apiRequest.get("/pins", {
    params: {
      userId: filters.userId || undefined,
      saved: filters.saved ? "true" : "false",
      search: filters.search || "",
      boardId: filters.boardId || "",
      cursor: filters.cursor || 0
    }
  });
  return response.data;
};

// Example usage in Gallery component:
const { data, isPending, error } = useQuery({
  queryKey: ["pins", userId, saved, search, boardId],
  queryFn: () => getPins({ userId, saved, search, boardId })
});

// Example response:
{
  "pins": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
      "user": "64f8a1b2c3d4e5f6a7b8c9d0",
      "title": "Beautiful Sunset",
      "description": "Amazing sunset view",
      "media": "/path/to/image.jpg",
      "width": 800,
      "height": 600,
      "tags": ["nature", "sunset"]
    }
  ],
  "nextCursor": 1
}
```

#### Get Single Pin
```javascript
const getPin = async (pinId) => {
  const response = await apiRequest.get(`/pins/${pinId}`);
  return response.data;
};

// Example response:
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
  "user": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "username": "johndoe",
    "displayName": "John Doe",
    "img": "profile-image-url"
  },
  "title": "Beautiful Sunset",
  "description": "Amazing sunset view",
  "media": "/path/to/image.jpg",
  "tags": ["nature", "sunset"]
}
```

#### Create Pin
```javascript
const createPin = async (pinData, imageFile) => {
  const formData = new FormData();
  formData.append("title", pinData.title);
  formData.append("description", pinData.description);
  formData.append("link", pinData.link || "");
  formData.append("board", pinData.board || "");
  formData.append("tags", pinData.tags || "");
  formData.append("textOptions", JSON.stringify(pinData.textOptions || {}));
  formData.append("canvasOptions", JSON.stringify(pinData.canvasOptions || {}));
  formData.append("newBoard", pinData.newBoard || "");
  formData.append("media", imageFile);

  const response = await apiRequest.post("/pins", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data;
};
```

#### Check Pin Interactions
```javascript
const checkInteractions = async (pinId) => {
  const response = await apiRequest.get(`/pins/interaction-check/${pinId}`);
  return response.data;
};

// Example response:
{
  "likeCount": 15,
  "isLiked": true,
  "isSaved": false
}
```

#### Like/Save Pin
```javascript
const interactWithPin = async (pinId, type) => {
  const response = await apiRequest.post(`/pins/interact/${pinId}`, {
    type: type // "like" or "save"
  });
  return response.data;
};

// Usage:
await interactWithPin("64f8a1b2c3d4e5f6a7b8c9d1", "like");
await interactWithPin("64f8a1b2c3d4e5f6a7b8c9d1", "save");
```

### Comment Endpoints

#### Get Pin Comments
```javascript
const getComments = async (pinId) => {
  const response = await apiRequest.get(`/comments/${pinId}`);
  return response.data;
};

// Example response:
[
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d3",
    "description": "Great photo!",
    "pin": "64f8a1b2c3d4e5f6a7b8c9d1",
    "user": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "username": "johndoe",
      "displayName": "John Doe",
      "img": "profile-image-url"
    },
    "createdAt": "2023-09-06T10:30:00.000Z"
  }
]
```

#### Add Comment
```javascript
const addComment = async (commentData) => {
  const response = await apiRequest.post("/comments", {
    description: commentData.description,
    pin: commentData.pinId
  });
  return response.data;
};

// Example response:
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d3",
  "description": "Great photo!",
  "pin": "64f8a1b2c3d4e5f6a7b8c9d1",
  "user": "64f8a1b2c3d4e5f6a7b8c9d0",
  "createdAt": "2023-09-06T10:30:00.000Z"
}
```

### Board Endpoints

#### Get User Boards
```javascript
const getUserBoards = async (userId) => {
  const response = await apiRequest.get(`/boards/${userId}`);
  return response.data;
};

// Example response:
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
    }
  }
]
```

## React Query Integration

### Example Hook Usage
```javascript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Get pins with caching
const usePins = (filters) => {
  return useQuery({
    queryKey: ["pins", filters.userId, filters.saved, filters.search, filters.boardId],
    queryFn: () => getPins(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Create pin with cache invalidation
const useCreatePin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createPin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pins"] });
    },
  });
};

// Like/Save pin with optimistic updates
const useInteractPin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ pinId, type }) => interactWithPin(pinId, type),
    onSuccess: (_, { pinId }) => {
      queryClient.invalidateQueries({ queryKey: ["interactions", pinId] });
      queryClient.invalidateQueries({ queryKey: ["pins"] });
    },
  });
};
```

## Error Handling

```javascript
// Global error handling in components
const { data, isPending, error } = useQuery({
  queryKey: ["pins"],
  queryFn: getPins,
  retry: 3,
  retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
});

if (isPending) return "Loading pins...";
if (error) return "Something went wrong!";
if (!data?.pins?.length) return "No pins found.";
```

## Environment Variables

Create a `.env` file in the client root:
```
VITE_API_ENDPOINT=http://localhost:3000
```

## Setup

1. Install dependencies: `npm install`
2. Set environment variables in `.env`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`