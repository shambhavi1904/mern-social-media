🌐 Socialix - Social Media Web Application

Socialix is a full-stack social media web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).
It allows users to connect, share posts, like, comment, and interact with each other through a modern and responsive interface.

---

🚀 Features

* 🔐 User Authentication (Register & Login)
* 📝 Create, Edit, and Delete Posts
* 🖼️ Image Upload using Cloudinary
* ❤️ Like and Comment on Posts
* 👤 User Profile Management
* 🔄 Follow and Unfollow Users
* 📱 Responsive UI Design
* 🔁 Real-time-like updates using state management

---

🛠️ Tech Stack

# Frontend:

* React.js
* Redux
* CSS / Bootstrap

# Backend:

* Node.js
* Express.js

# Database:

* MongoDB (Mongoose)
# Other Tools:


* JWT (Authentication)
* bcrypt (Password Hashing)

---
 ## 📁 Project Structure

```
mern-social-media/
├── client/              # React Frontend
│   ├── src/
│   └── public/
├── controllers/         # Backend Controllers
├── models/              # Mongoose Schemas
├── routes/              # API Routes
├── middleware/          # Authentication Middleware
├── server.js            # Entry point (Backend)
├── package.json
└── .env                 # Environment Variables
```


---

⚙️ Installation & Setup

1️⃣ Clone the Repository

```
git clone https://github.com/your-username/socialix.git
cd socialix
```

---

2️⃣ Install Backend Dependencies

```
npm install
```

---

3️⃣ Install Frontend Dependencies

```
cd client
npm install
```

---

4️⃣ Setup Environment Variables

Create a `.env` file in the root folder:

```
MONGO_URI=mongodb://127.0.0.1:27017/mernSocialApp
TOKEN_KEY=your_secret_key
PORT=4000
```

---

5️⃣ Run the Application

▶️ Start Backend

```
node server.js
```

▶️ Start Frontend

```
cd client
npm start
```

---

🌐 Application URLs

* Frontend: http://localhost:3000
* Backend: http://localhost:4000

---

🧠 Working Flow

* Users register and login using secure authentication (JWT).
* Data is stored in MongoDB using Mongoose schemas.
* Users can create posts with images (stored in Cloudinary).
* Posts are displayed on the home feed.
* Users can like, comment, follow, and interact with others.

---

🔒 Security Features

* Password hashing using bcrypt
* JWT-based authentication
* Protected routes
* Secure API handling

---

📌 Future Enhancements

* 💬 Real-time chat system
* 🔔 Notification feature
* 🌙 Dark mode support
* 📱 Mobile application
