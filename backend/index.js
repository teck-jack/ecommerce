const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

// ✅ allow both localhost (dev) & deployed frontend (prod)
const allowedOrigins = [
  process.env.FRONTEND_URL,   // e.g. https://your-frontend.vercel.app
  "https://ecommerce-88kq.vercel.app"     // local frontend for development
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // ✅ allow cookies / JWT
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

// ✅ routes
app.use("/api", router);

// ✅ PORT fix
const PORT = process.env.PORT || 8080;

// ✅ connect DB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("✅ Connected to DB");
        console.log("🚀 Server is running on port " + PORT);
    });
});
