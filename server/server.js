const express = require("express");
const cors = require("cors");
const { DataTypes } = require('sequelize');
const app = express();
const port = 5000;
const sequelize = require('./config/database');  
const SocieteDeGestion = require('./models/SocieteDeGestion'); 
const Scpi = require('./models/Scpi'); 

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

//- Middleware
app.use(cors());
app.use(express.json());

// Test de connexion
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données avec sequelize.');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données avec sequlize:', err);
  });

// Route de test
app.get("/", (req, res) => {
  res.send("Hiiiiiiiii, Express avec PostgreSQL et CORS !");
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});


//---------------------AUTHENT ADMIN

// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     if (username === 'admin' && password === 'admin') {
//       return res.status(200).json({ message: 'successful', token: 'dummy-token' });
//     } else {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//   });


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
    console.log('Led données de la base :',societes);
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
  




//___________________________________________________________________________________________
  // Modifier une société de gestion
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
            return res.status(404).json({ error: ' pas de Société de gestion' });
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

    console.log("la societe modifieeest :",societeUpdated )
        res.json(societeUpdated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur lors de la mise à jour' });
    }
});

  //-----------------------------------------------------------------------------------------------------
  // Supprimer une société de gestion
     app.delete('/societes-de-gestion/:idsocietgest', async (req, res) => {
    const { idsocietgest } = req.params; 
     console.log("le id récupéré:",idsocietgest);

  try {
    const societe = await SocieteDeGestion.findByPk(idsocietgest);

    if (!societe) {
        return res.status(404).json({ error: "Societé de gestion non trouvée" });
    }

    await societe.destroy();
    res.status(204).send(); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la suppression de la société de gestion" });
  }
});


/* -----------------------
   SCPI
-------------------------*/

// Ajout d'une SCPI
app.post('/Addscpi', async (req, res) => {
  const { nomscpi, typescpi, categoriecpi, capitalisation, date_creation, idSocieteGest } = req.body;
  console.log("ajout de scpi",req.body);
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
//________GET ALL SCPIS
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
//-------------------------------------------------Filtres----------------------------------------------------

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
///-  *****************SCPI par son société de gestion 

// app.get("/societes-de-gestion/:idsocietgest/scpis", async (req, res) => {
//   try {
//     const { idsocietgest } = req.params;
//     const societe = await SocieteGestion.findByPk(idsocietgest);
//     if (!societe) {
//       return res.status(404).json({ error: "Société de gestion non trouvée" });
//     }
//     const scpis = await Scpi.findAll({
//       where: { idsocietgest }
//     });

//     res.json(scpis);
//   } catch (error) {
//     console.error("Erreur lors de la récupération des SCPI :", error);
//     res.status(500).json({ error: "Erreur serveur" });
//   }
// });


// Modifier une SCPI
app.put('/UpdateScpi/:idscpi', async (req, res) => {
  const { idscpi } = req.params;
  console.log("le id récupéré dans modifier scpi:",idscpi);
  const { nomscpi, typescpi, categoriecpi, capitalisation, date_creation, idSocieteGest } =  req.body;
   console.log("le body:",req.body);
   if (!nomscpi || !typescpi || !categoriecpi || !capitalisation || !date_creation || !idSocieteGest) {
    return res.status(400).json({ error: 'Tous les champs doivent être non vide.' });
  }
  try {
    const scpi = await Scpi.findByPk(idscpi);
    console.log(" les données findPK",scpi);
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
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la SCPI' });
  }
});

/// Suprimer une scpi
app.delete('/DeleteScpi/:idscpi', async (req, res) => {
  const { idscpi } = req.params;
  console.log(" le id récupére lors de delete scpi",idscpi);

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

/**** récupérer scpi by id */
app.get('/GetScpi/:idscpi', async (req, res) => {
  const { idscpi } = req.params;  
  try {
    const scpi = await Scpi.findByPk(idscpi);
    if (!scpi) {
      return res.status(404).json({ error: 'SCPI non trouvée' });
    }
    res.json(scpi);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération de la SCPI' });
  }
});

