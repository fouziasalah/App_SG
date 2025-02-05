import axios from "axios";

const URL_API = "http://localhost:5000";

// --------------sociétés de gestion

/**GET ALL  */
export const getAllSocieteGestion = async () => {
  try {
    const response = await axios.get(`${URL_API}/societes-de-gestion`);
    // const response = await axios.get("http://localhost:5000/societes-de-gestion");

    console.log(" les données récupéres direct via le backend",response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur API sociétés :", error.response ? error.response.data : error.message);
    throw error;
  }
};


/** GET SOCIETE DE GESTION BY ID */
export const getSocieteGestionById = async (idsocietgest) => {
    try {
      const response = await axios.get(`${URL_API}/societes-de-gestion/${idsocietgest}`);
      console.log("Les SG BY ID  via le backend :", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur API société de gestion BY ID :",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };
//----------------les SCPI --------------------------------

/**GET ALL  */
export const getAllScpis = async () => {
    try {
        const response = await axios.get(`${URL_API}/GetAllScpis`);
        return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des SCPI", error);
      throw error;
    }
  };
  




// // Fonction pour récupérer les détails d'une société de gestion
// export const getCompanyById = async (companyId) => {
//   try {
//     const response = await axios.get(`${URL_API}/companies/${companyId}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Erreur lors de la récupération de la société de gestion ${companyId}`, error);
//     throw error;
//   }
// };

// // Fonction pour récupérer les SCPI d'une société de gestion
// export const getScpisByCompanyId = async (companyId) => {
//   try {
//     const response = await axios.get(`${URL_API}/scpis?companyId=${companyId}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Erreur lors de la récupération des SCPI pour la société ${companyId}`, error);
//     throw error;
//   }
// };
