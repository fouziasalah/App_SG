// const jwt = require("jsonwebtoken");
// const SECRET_KEY = "secret";

// const verifyToken = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(403).json({ error: "Accès interdit" });

//   try {
//     const verified = jwt.verify(token.split(" ")[1], SECRET_KEY);
//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: "Token invalide" });
//   }
// };

// const verifyAdmin = (req, res, next) => {
//   if (req.user.role !== "admin") return res.status(403).json({ error: "Accès réservé aux admins" });
//   next();
// };

// module.exports = { verifyToken, verifyAdmin };
