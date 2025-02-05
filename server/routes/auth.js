// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { User } = require("../models");

// const router = express.Router();
// const SECRET_KEY = "secret"; // À stocker dans .env

// // 🔹 Route pour créer un admin
// router.post("/register-admin", async (req, res) => {
//   const { email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     await User.create({ email, password: hashedPassword, role: "admin" });
//     res.json({ message: "Admin créé avec succès" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // 🔹 Route de connexion
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ where: { email } });

//   if (!user) return res.status(400).json({ error: "Utilisateur non trouvé" });

//   const validPassword = await bcrypt.compare(password, user.password);
//   if (!validPassword) return res.status(401).json({ error: "Mot de passe incorrect" });

//   const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

//   res.json({ token, role: user.role });
// });

// module.exports = router;
