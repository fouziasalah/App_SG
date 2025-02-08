const express = require("express");
const cors = require("cors");
const { DataTypes } = require('sequelize');
const app = express();
const port = 5000;
const sequelize = require('./config/database');  
const SocieteDeGestion = require('./models/SocieteDeGestion'); 
const Scpi = require('./models/Scpi'); 
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config(); 
const { Pool } = require('pg');
// const { user } = require('./models/user'); 
const User = require('./models/user')(sequelize);



/*connexion à la bdd PostgreSQL*/
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(passport.initialize());

//- Middleware
app.use(cors());
app.use(express.json());

// Test de connexion
sequelize.authenticate()
  .then(() => {
    console.log('Connex  bdd réussie avec sequelize.');
  })
  .catch(err => {
    console.error('connexion impossible', err);
  });

app.get("/", (req, res) => {
  res.send("Hiiiiiiiii, Express avec PostgreSQL et CORS !");
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});



// ___________________LES SOCIÉTÉS DE GESTION

  
  // Ajout d' une société de gestion
  app.post('/societes-de-gestion', async (req, res) => {
    
    try {
      const societe = await SocieteDeGestion.create(req.body);
      res.status(201).json(societe);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de l’ajout de la société de gestion' });
  }
  });
  // ALL SOCIÉTÉS DE GESTION
app.get('/societes-de-gestion', async (req, res) => {
  try {
    const societes = await SocieteDeGestion.findAll({ order: [['idsocietgest', 'ASC']] });
    console.log('Les données :',societes);
    res.json(societes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }

});
  //  SOCIÉTÉS DE GESTION BY ID
  app.get('/societes-de-gestion/:idsocietgest', async (req, res) => {
    const { idsocietgest } = req.params;
    console.log("-----ID de SG:", idsocietgest);
  
    try {
      const societe = await SocieteDeGestion.findByPk(idsocietgest);
      if (!societe) {
        return res.status(404).json({ error: "Société de gestion non trouvée" });
      }
      
      console.log("Les données de la base :", societe);
      return res.json(societe);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  });

  //    Modifier une société de gestion
  app.put('/societes-de-gestion/:idsocietgest', async (req, res) => {
    const { idsocietgest } = req.params;
    console.log("-----ID  pr modifier:", idsocietgest);

    const { nomsocietgest, date_creation, nombre_de_fonds, encours_global_scpi, effectif, localisation, description } = req.body;
    
    if (!nomsocietgest || !date_creation || !nombre_de_fonds || !encours_global_scpi || !effectif  || !localisation || !description ) {
        return res.status(400).json({ error: ' les champs doivent être remplis.' });
    }

    try {
        
        const societesDeGestion = await SocieteDeGestion.findByPk(idsocietgest);

        if (!societesDeGestion) {
            return res.status(404).json({ error: ' aucune Société de gestion' });
        }
        const societeUpdated = await societesDeGestion.update({
            nomsocietgest,
            date_creation,
            nombre_de_fonds,
            encours_global_scpi,
            effectif,
            localisation,
            description
        });

    console.log("la societe modifiee est :",societeUpdated )
        res.json(societeUpdated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur lors de la modification' });
    }
});

  // Supprimer une société de gestion
     app.delete('/societes-de-gestion/:idsocietgest', async (req, res) => {
    const { idsocietgest } = req.params; 
     console.log("ID récupéré:",idsocietgest);

  try {
    const societe = await SocieteDeGestion.findByPk(idsocietgest);

    if (!societe) {
        return res.status(404).json({ error: "Societé de gestion non trouvée" });
    }

    await societe.destroy();
    res.status(204).send(); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la suppression de la SG" });
  }
});


/* ________________________________________Les SCpis_______________*/

// Ajout d'une SCPI
app.post('/Addscpi', async (req, res) => {
  const { nomscpi, typescpi, categoriecpi, capitalisation, date_creation, idSocieteGest } = req.body;
  console.log("ajout d une scpi",req.body);
  try {
    const newScpi = await Scpi.create({
      nomscpi,
      typescpi,
      categoriecpi,
      capitalisation,
      date_creation,
      idSocieteGest
    });
    
    res.status(201).json(newScpi);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la SCPI' });
  }
});
//-----------------------------------------------GET ALL SCPIS
app.get('/GetAllScpis', async (req, res) => {
  try {
    const scpis = await Scpi.findAll();
    console.log("les scpis existante:",scpis);
    res.json(scpis);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des SCPI' });
  }
});
//-------------Filtres-------------------------------------------
app.get('/GetAllScpisFiltred', async (req, res) => {
  try {
    
    const { type, categorie, societeId } = req.query; 
    console.log("req query dans les filtres", req.query);

    
    let scpis = await Scpi.findAll();

    console.log("Les SCPI avant filtrage:", scpis);

   
    let filteredScpis = scpis.filter(scpi => {
      return (
        (!type || scpi.typescpi.toLowerCase().includes(type.toLowerCase())) && (!categorie || scpi.categoriecpi.toLowerCase().includes(categorie.toLowerCase())) && 
        (!societeId || scpi.idSocieteGest == societeId) 
      );
    });

    console.log("Les SCPI après filtrage:", filteredScpis);

    res.json(filteredScpis); 
  } catch (err) {
    console.error("Erreur lors de la récupération des SCPI :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


///***************** société de gestion  by id et ses scpis*/
app.get('/societe-de-gestion-scpis/:id', async (req, res) => {
  const societegestId = req.params.id;
  try {
    const result = await pool.query(`
      SELECT
        s.idsocietgest,
        s.nomsocietgest,
        s.date_creation,
        s.nombre_de_fonds,
        s.encours_global_scpi,
        s.effectif,
        s.localisation,
        s.description,
        COALESCE(
          json_agg(
            json_strip_nulls(
              json_build_object(
                'idscpi', sc.idscpi,
                'nomscpi', sc.nomscpi,
                'typescpi', sc.typescpi,
                'categoriecpi', sc.categoriecpi,
                'capitalisation', sc.capitalisation,
                'date_creation', sc.date_creation
              )
            )
          ) FILTER (WHERE sc.idscpi IS NOT NULL),
          '[]'
        ) AS scpis
      FROM societes_de_gestion s
      LEFT JOIN scpi sc ON sc."idSocieteGest" = s."idsocietgest"
      WHERE s."idsocietgest" = $1
      GROUP BY s.idsocietgest;
    `, [societegestId]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Société de gestion non trouvée' });
    }
  } catch (err) {
    console.error('Erreur lors de la récupération des données :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


// ------------------Modifier une SCPI
app.put('/UpdateScpi/:idscpi', async (req, res) => {
  const { idscpi } = req.params;
  console.log("le id récupéré dans modifier scpi:",idscpi);
  const { nomscpi, typescpi, categoriecpi, capitalisation, date_creation, idSocieteGest } =  req.body;
   console.log("le body:",req.body);
   if (!nomscpi || !typescpi || !categoriecpi || !capitalisation || !date_creation || !idSocieteGest) {
    return res.status(400).json({ error: ' les champs doivent être remplis.' });
  }
  try {
    const scpi = await Scpi.findByPk(idscpi);
    console.log(" les données  retournées by findPK",scpi);
    if (!scpi) {
      return res.status(404).json({ error: 'SCPI non trouvée' });
    }

    scpi.nomscpi = nomscpi;
    scpi.typescpi = typescpi;
    scpi.categoriecpi = categoriecpi;
    scpi.capitalisation = capitalisation;
    scpi.date_creation = date_creation;
    scpi.idSocieteGest = idSocieteGest;
    
    await scpi.save();
    
    res.json(scpi);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la modif de la SCPI' });
  }
});

/// --------------------------------Suprimer une scpi
app.delete('/DeleteScpi/:idscpi', async (req, res) => {
  const { idscpi } = req.params;
  console.log("ID récupéré lors de la supression scpi",idscpi);

  try {
    const scpi = await Scpi.findByPk(idscpi);
    
    if (!scpi) {
      return res.status(404).json({ error: 'SCPI non trouvée' });
    }

    await scpi.destroy();
    res.status(204).send(); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la suppression de la SCPI' });
  }
});

/**--------------------------------récupérer scpi by ID */
app.get('/GetScpi/:idscpi', async (req, res) => {
  const { idscpi } = req.params;  
  try {
    const scpi = await Scpi.findByPk(idscpi);
    if (!scpi) {
      return res.status(404).json({ error: 'Aucune SCPI trouvée' });
    }
    res.json(scpi);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération de la SCPI' });
  }
});



// /**************************************AUthentification passport jwt */

const SECRET_KEY = 'SECRET_KEY';
const users = [];

// =============================
// Configuration de Passport-JWT
// =============================

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
  secretOrKey: SECRET_KEY,
};
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  console.log("JWT reçu dans Passport :", jwt_payload); 

  try {

    const user = await User.findOne({ where: { id: jwt_payload.id } });
console.log(" user dans existe dans bdd de la partie passport",user);
    if (user) {
      return done(null, user);
    }
    
    return done(null, false);
  } catch (error) {
    console.error("Erreur lors de la vérification du token :", error);
    return done(error, false);
  }
}));

/*****************Inscription (créer admin)*/

app.post('/signup', async (req, res) => {
  const { email, password, role } = req.body;
  console.log("email et password récupérés de la req:", req.body);

  if (!email || !password) {
    return res.status(400).json({ msg: "email et password sont requis" });
  }

  try {
    // if Exist
    console.log("Recherche de l'utilisateur dans la base de données avec email:", email);
    const existingUser = await User.findOne({ where: { email } });

    console.log("Résultat de la recherche d'utilisateur:", existingUser);

    if (existingUser) {
      return res.status(400).json({ msg: "Cet utilisateur existe déjà" });
    }

    // Hasher PW
    const hashedPassword = await bcrypt.hash(password, 10);

    // New user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: role || 'user', 
    });

    console.log("Utilisateur créé avec succès:", newUser);

    res.json({ msg: "Utilisateur créé avec succès", user: { id: newUser.id, email: newUser.email, role: newUser.role } });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    res.status(500).json({ msg: "Erreur lors de la création de l'utilisateur", error: error.message || error });
  }
});


//---------------Connexion
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log("Email:", email);
  console.log("Mot de passe:", password);

  if (!email || !password) {
    return res.status(400).json({ msg: "Email ou mot de passe manquant" });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ msg: "Utilisateur non trouvé" });
  }

  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Mot de passe incorrect" });
    }

    // Si authent alors generation  un token JWT
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: "Erreur lors de la connexion", error });
  }
});


// -----------------------------------profil
app.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log("Utilisateur dans req.user : ", req.user); 
  if (!req.user) {
    return res.status(401).json({ msg: "Utilisateur non authentifié" });
  }

  res.status(200).json({
    msg: "Accès au profil autorisé",
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
    }
  });
});


// Route pour ladmin
app.get('/admin', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: "Utilisateur non authentifié" });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: "Accès refusé. L'administrateur est requis." });
  }

  res.status(200).json({
    msg: "Bienvenue, administrateur !",
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role
    }
  });
});
