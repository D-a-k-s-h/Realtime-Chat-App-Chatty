# 💬 Chatty - Real-Time Chat Application

Chatty is a full-stack real-time chat application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and powered by **Socket.IO** for seamless live communication. It features user authentication, real-time messaging, group chats, online status, and more — all wrapped in a modern and responsive UI built with **Tailwind CSS**.

🔗 **Live Demo**: [Chatty Live App](https://realtime-chat-app-chatty-li7x.onrender.com)

---

## 🚀 Features

- 🔐 **User Authentication** (Login / Register with JWT)
- 💬 **One-to-One Chats**
- ✨ **Real-Time Messaging** using Socket.IO
- ✅ **Online / Offline Status**
- 📝 **Search Users & Chats**
- 🖼️ **Profile Picture Upload**
- 🔄 **Responsive UI** (mobile & desktop-friendly)

---

## 🛠️ Tech Stack

| Frontend   | Backend    | Real-time   | Database | Styling        |
|------------|------------|-------------|----------|----------------|
| React.js   | Node.js    | Socket.IO   | MongoDB  | Tailwind CSS   |
| Axios      | Express.js | WebSockets  | Mongoose | DaisyUI (opt.) |

---

## 📁 Folder Structure (Simplified)

```
chatty/
├── client/            # React Frontend
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
├── server/            # Node Backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── socket.js
├── .env
└── README.md
```

---

## 🧰 Getting Started

### ✅ Prerequisites

- Node.js ≥ 16.x
- MongoDB (local or Atlas)

### 🖥️ Clone & Setup

```bash
git clone https://github.com/D-a-k-s-h/chatty.git
cd chatty
```

### 📦 Backend Setup

```bash
cd server
npm install
```

Create a `.env` file with:

```
PORT=4000
DATABASE_URL=mongodb+srv://dakshkumarug22:QIHBQwCUQUpRT8iC@cluster0.ecllf.mongodb.net/chatAppDB
JWT_SECRET=dakshk
```

Start server:

```bash
npm run dev
```

### 🎨 Frontend Setup

```bash
cd ./frontend
npm install
npm start
```

---

## 🔐 Authentication

- Uses **JWT-based token authentication**
- Axios interceptors manage token refresh and secure routes

---

## 📡 API Endpoints

```http
POST   /api/v1/auth/login
POST   /api/v1/auth/signup
POST   /api/v1/auth/update-profile-pic
POST   /api/v1/messages/allusers
POST   /api/v1/messages/getuserdetails
POST   /api/v1/messages/send/:id
```

---

## 🧠 Future Enhancements

- 🎉 Message reactions
- 👀 Typing alerts
- 📬 Read receipts
- 🔔 Push notifications

---

## 👨‍💻 Author

**Daksh Kumar**  
[GitHub](https://github.com/D-a-k-s-h) • [LinkedIn](https://www.linkedin.com/in/daksh-k-789083257)

---

## 🙌 Support

If you found this project useful, please consider giving it a ⭐️ and sharing it!

---

## 🪪 License

This project is licensed under the **NO License**.
