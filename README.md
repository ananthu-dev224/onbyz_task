
# 📌 URL Shortener & SMS Management System

A full-stack application that provides:
- URL shortening with analytics
- SMS template management
- SMS sending using templates
- Secure authentication and rate limiting

Built as part of an assignment focusing on **code quality, API design, and real-world considerations**.

---

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- express-rate-limit

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router
- Toastify

---

## ✨ Features

### URL Shortener
- Generate short URLs from long URLs
- Redirect short URL to original URL
- Track:
  - Click count
  - Last accessed time
- Prevent duplicate short URLs per user

### SMS Template Management
- Create SMS templates with placeholders  
  (e.g. `{{name}}`, `{{shortUrl}}`)
- List available templates (user-specific)

### Send SMS
- Send SMS using a selected template
- Dynamic placeholder replacement
- Mock SMS gateway (console-based)
- Log SMS details in database

---

## 🔐 Bonus Features Implemented

- **JWT-based Authentication**
  - Secure protected APIs
  - Token issued only on login
- **Rate Limiting**
  - Applied to SMS sending API to prevent abuse  
  - Limit: `10 SMS per hour per user/IP`

---

## 📁 Project Structure
- The backend follows a modular layered architecture where each feature is isolated into its own module.
- The frontend follows component based structure for reusbality

## API Documentation : https://www.postman.com/blue-satellite-762740/workspace/onbyz/collection/30758167-1be257c3-df6f-4ed6-b799-79ffc55f7cce?action=share&creator=30758167


---

## ⚙️ Setup Instructions Backend and Frontend

```bash
git clone <repo-url>
cd project-root
create .env using .env.example

```bash
cd backend
npm install
npm run dev

```bash
cd frontend
npm install
npm run dev

