const express = require("express")
const cors = require("cors")

const app = express()


app.use(cors())
app.use(express.json())


const authRoutes = require("./routes/authRoutes")
app.use("/api/auth", authRoutes)


app.get("/", (req, res) => {
  res.json({ message: "Server is running 🚀" })
})


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" })
})


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})