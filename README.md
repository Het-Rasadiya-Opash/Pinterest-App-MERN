# Pinterest-Like Social Media Platform

A full-stack social media platform inspired by Pinterest, allowing users to create, share, and organize visual content through pins and boards.

## 🚀 Project Overview

This application consists of a React frontend and Node.js/Express backend, providing a complete social media experience with features like user authentication, pin creation, board organization, social interactions, and a built-in image editor.

## 📁 Project Structure

```
Project/
├── backend/                 # Node.js/Express API server
│   ├── controllers/         # Route handlers
│   ├── middlewares/         # Authentication & validation
│   ├── models/             # MongoDB data models
│   ├── routes/             # API route definitions
│   ├── utils/              # Database connection & utilities
│   └── index.js            # Server entry point
└── client/                 # React frontend application
    ├── public/             # Static assets
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── routes/         # Page components & layouts
    │   └── utils/          # API client & state management
    └── package.json
```

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js with ES modules
- **Framework**: Express.js 5.0
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with HTTP-only cookies
- **File Upload**: Express-fileupload with ImageKit integration
- **Image Processing**: Sharp
- **Security**: bcryptjs for password hashing, CORS

### Frontend
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS 4.2
- **State Management**: Zustand for global state
- **Data Fetching**: TanStack Query (React Query) for server state
- **Routing**: React Router 7
- **HTTP Client**: Axios
- **UI Components**: 
  - React Colorful (color picker)
  - Emoji Picker React
  - React Infinite Scroll Component
- **Image Handling**: ImageKit React SDK

## ✨ Key Features

### User Management
- User registration and authentication
- Profile management with avatars
- Follow/unfollow system
- User discovery

### Content Creation
- Pin creation with image upload
- Built-in image editor with layers and text options
- Board creation and organization
- Tag system for content categorization

### Social Interactions
- Like and save pins
- Comment system
- Follow users
- Content discovery through search

### Advanced Features
- Infinite scroll for performance
- Real-time interactions
- Responsive masonry layout
- Image optimization and CDN integration

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- ImageKit account (for image hosting)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
MONGO_URL=mongodb://localhost:27017/pinterest-clone
JWT_SECRET_KEY=your-jwt-secret
CLIENT_URL=http://localhost:5173
IMAGEKIT_URL_ENDPOINT=your-imagekit-url
IMAGEKIT_PUBLIC_KEY=your-imagekit-public-key
IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
```

4. Start development server:
```bash
npm run dev
```

Server runs on `http://localhost:3000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_ENDPOINT=http://localhost:3000
```

4. Start development server:
```bash
npm run dev
```

Client runs on `http://localhost:5173`

## 📡 API Architecture

### Authentication Flow
- JWT-based authentication with HTTP-only cookies
- Protected routes using middleware verification
- Automatic token refresh handling

### Data Models
- **User**: Profile information, followers, following
- **Pin**: Media content with metadata, tags, and interactions
- **Board**: Collections of pins organized by users
- **Comment**: User comments on pins
- **Like/Save**: User interactions with pins
- **Follow**: User relationship tracking

### Key Endpoints
- `POST /users/auth/register` - User registration
- `POST /users/auth/login` - User login
- `GET /pins` - Fetch pins with filtering
- `POST /pins` - Create new pin
- `POST /pins/interact/:id` - Like/save pins
- `GET /comments/:pinId` - Get pin comments
- `GET /boards/:userId` - Get user boards

## 🎨 Frontend Architecture

### Component Structure
- **Layout Components**: MainLayout for consistent page structure
- **Feature Components**: Gallery, PinCard, Editor for core functionality
- **UI Components**: Skeleton loaders, buttons, forms
- **Page Components**: Homepage, Profile, Create, Search pages

### State Management
- **Zustand Stores**: 
  - `authStore`: User authentication state
  - `editorStore`: Image editor state
- **React Query**: Server state caching and synchronization
- **Local State**: Component-specific state with React hooks

### Routing Structure
- `/` - Homepage with pin gallery
- `/auth` - Login/register page
- `/create` - Pin creation with editor
- `/profile/:username` - User profile pages
- `/post/:id` - Individual pin view
- `/search` - Search results page

## 🔧 Development Features

### Code Quality
- ESLint configuration for code standards
- Modern JavaScript (ES modules)
- Component-based architecture
- Responsive design patterns

### Performance Optimizations
- Infinite scroll for large datasets
- Image lazy loading
- Query caching with React Query
- Optimized bundle with Vite

### Developer Experience
- Hot module replacement
- File watching in development
- Environment-based configuration
- Comprehensive API documentation

## 📦 Build & Deployment

### Frontend Build
```bash
cd client
npm run build
```

### Backend Deployment
The backend is production-ready with:
- Error handling middleware
- CORS configuration
- File upload handling
- Database connection management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational and portfolio purposes.

---

**Note**: This is a Pinterest-inspired clone built for learning purposes. It demonstrates modern full-stack development practices with React, Node.js, and MongoDB.