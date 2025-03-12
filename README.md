# URL Shortener

A simple URL shortener built using **Node.js, Express, MongoDB**, and **React.js**. The backend provides an API for shortening long URLs, storing them in a database, and redirecting users when they access the short link. The frontend provides a user-friendly interface to interact with the service.

---

## **📌 Features**
- Shorten long URLs into shorter, shareable links.
- Store shortened URLs in a MongoDB database.
- Redirect users from short URLs to the original long URL.
- Track analytics (number of clicks on each short URL).
- Simple and clean React UI.
- Full-stack implementation (backend with Node.js & Express, frontend with React).

---

## **📂 Project Structure**
```
/url-shortener
│
├── /models                     # Mongoose schema for URLs
│   └── ShortUrl.js
│
├── /node_modules               # Node.js dependencies
│
├── .env                         # Environment variables
├── server.js                     # Express server file
├── package.json                  # Backend dependencies
│
├── /url-shortener-frontend      # React frontend
│   ├── /public                   # Static files
│   ├── /src                      # React components & logic
│   │   ├── App.js                 # Main frontend logic
│   │   ├── App.css                # Styling
│   │   └── index.js               # React entry point
│   ├── package.json              # Frontend dependencies
│   └── .gitignore                 # Ignore unnecessary files
│
└── README.md                    # Project documentation
```

---

## **🖼️ Screenshots**
### 1️⃣ **Dashboard Interface**  
![Dashboard Screenshot](https://github.com/manal-herradi/images/blob/main/dashboard.png)  

### 2️⃣ **Testing API with `/shorten` Endpoint**  
![API Testing Screenshot](https://github.com/manal-herradi/images/blob/main/postman.png)  

### 3️⃣ **Viewing Click Analytics**  
![Analytics Screenshot](https://github.com/manal-herradi/images/blob/main/postman_clicks.png)  

---

## **🚀 Installation & Setup**
Follow these steps to set up and run the project on your local machine.

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/manal-herradi/url-shortener.git
cd url-shortener
```

### **2️⃣ Install Backend Dependencies**
```sh
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the root directory and add:
```sh
MONGO_URI=your_mongodb_connection_string
PORT=5500
```
Replace `your_mongodb_connection_string` with your MongoDB URI.

### **4️⃣ Start the Backend Server**
```sh
node server.js
```
You should see:
```
✅ Connected to MongoDB
🚀 Server running on port 5500
```

---

## **🖥️ Frontend Setup**
### **1️⃣ Navigate to the Frontend Directory**
```sh
cd url-shortener-frontend
```

### **2️⃣ Install Frontend Dependencies**
```sh
npm install
```

### **3️⃣ Start the Frontend**
```sh
npm start
```
The frontend will be available at **http://localhost:3000**

---

## **📡 API Endpoints**
The backend provides the following API routes:

| Method | Endpoint           | Description |
|--------|-------------------|-------------|
| POST   | `/shorten`        | Shorten a given URL |
| GET    | `/:shortId`       | Redirect to the original URL |
| GET    | `/analytics/:shortId` | View click count for a short URL |

### **Example Request**
**POST `/shorten`**
```json
{
  "longUrl": "https://example.com"
}
```
**Response**
```json
{
  "shortUrl": "http://localhost:5500/abc123"
}
```

### **View Click Analytics**
**GET `/analytics/abc123`**  
**Response**
```json
{
  "shortId": "abc123",
  "longUrl": "https://example.com",
  "clicks": 42
}
```

---

## **💻 Usage**
1. Open **http://localhost:3000**.
2. Enter a long URL and click **Shorten**.
3. Copy the generated short link and use it.
4. Track clicks using `/analytics/:shortId`.

---

## **🚀 Deployment**
### **Backend Deployment**
To deploy the backend, you can use **Heroku** or **Render**.
1. Push your backend code to **GitHub**.
2. Create an app on **Heroku** or **Render**.
3. Set environment variables (`MONGO_URI`).
4. Deploy.

### **Frontend Deployment**
Use **Vercel** to deploy the frontend:
```sh
npm install -g vercel
vercel
```

---
### **Made by Manal **