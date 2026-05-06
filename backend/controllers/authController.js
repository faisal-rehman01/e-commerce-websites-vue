const users = []


const signup = (req, res) => {
  try {
    const { name, email, password } = req.body

    console.log("SIGNUP BODY:", req.body)

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" })
    }

    const hasLetter = /[a-zA-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)

    if (!hasLetter || !hasNumber || password.length < 6) {
      return res.status(400).json({
        message: "Password must be 6+ chars with letters & numbers"
      })
    }

    const userExist = users.find(u => u.email === email)

    if (userExist) {
      return res.status(400).json({
        message: "User already registered"
      })
    }

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password
    }

    users.push(newUser)

    console.log("USERS DB:", users)

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Server error" })
  }
}


const login = (req, res) => {
  try {
    const { email, password } = req.body

    console.log("LOGIN BODY:", req.body)
    console.log("USERS DB:", users)

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      })
    }

    const user = users.find(u => u.email === email)

    if (!user) {
      return res.status(401).json({
        message: "Account not found"
      })
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid password"
      })
    }

    return res.json({
      message: "Login successful",
      user
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Server error" })
  }
}

module.exports = { signup, login }