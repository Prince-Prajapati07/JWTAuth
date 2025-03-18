const express = require("express")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const path = require("path")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const JWT_SECRET = process.env.JWT_SECRET || "ShinchanDon"

app.use(express.json()) //Middleware to serve static files
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use(cors())

const users = []

// Simple hash function using crypto
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Verify password
function verifyPassword(plainPassword, hashedPassword) {
    const hashedInput = hashPassword(plainPassword);
    return hashedInput === hashedPassword;
}

function logger(req, res, next) {
    console.log(`${req.method} request to ${req.path} at ${new Date().toISOString()}`)
    next()
}

app.use(logger)

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.post("/signup", function (req, res) {
    const { username, password } = req.body

    if (!username || username.length < 6) {
        return res.status(400).json({
            message: "Username must be at least 6 characters long"
        })
    }

    if (!password || password.length < 8) {
        return res.status(400).json({
            message: "Password must be at least 8 characters long"
        })
    }

    
    if (users.find(person => person.username === username)) {
        return res.status(400).json({
            message: "Username already taken"
        })
    }

    // Hash password with crypto
    const hashedPassword = hashPassword(password);
    
    // Create new user
    const newUser = {
        username,
        password: hashedPassword,
        createdAt: new Date().toISOString()
    }

    users.push(newUser)
    console.log(`New user registered: ${username}`)

    res.status(201).json({
        message: "Account created successfully"
    })
})

app.post("/signin", function (req, res) {
    const { username, password } = req.body

    
    const user = users.find(user => user.username === username)

    if (!user) {
        return res.status(401).json({
            message: "Invalid username or password"
        })
    }

    // Verify password
    if (!verifyPassword(password, user.password)) {
        return res.status(401).json({
            message: "Invalid username or password"
        })
    }
    
    // Generate token
    const token = jwt.sign({
        username: username,
        iat: Math.floor(Date.now() / 1000)
    }, JWT_SECRET, { expiresIn: '24h' })

    // Store token
    user.token = token

    res.json({
        token,
        message: "Authentication successful"
    })
})

function auth(req, res, next) {
    const token = req.headers.token
    
    if (!token) {
        return res.status(401).json({
            message: "Authentication required"
        })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded 
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }
}

app.get("/me", auth, function (req, res) {
    const user = users.find(user => user.username === req.user.username)
    
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    
    
    res.json({
        username: user.username,
        createdAt: user.createdAt
    })
})

// Start the server
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
    console.log(`Visit http://localhost:${PORT}`)
}) 