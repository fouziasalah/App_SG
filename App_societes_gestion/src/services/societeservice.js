import axios from "axios";

const URL_API = "http://localhost:5000";

// __________________________________________Les Sociétés de gestion

/**------------------------GET ALL  */
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


/** --------------------------------------GET SOCIETE DE GESTION BY ID */
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

  /** ------------------------------Retourner une SG avec ses scpis */
  export const getSocieteGestionByIDandScpis = async (idsocietgest) => {
    try {
        const response = await axios.get(`${URL_API}/societe-de-gestion-scpis/${idsocietgest}`);
        return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération la societe de gestion et ses scpis", error);
      throw error;
    }
  };
  

//_____________________________________________les SCPIs ______________________________________

/**-----------------------------GET ALL  */
export const getAllScpis = async () => {
    try {
        const response = await axios.get(`${URL_API}/GetAllScpis`);
        return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des SCPI", error);
      throw error;
    }
  };
 /*-------------------- -------Filtrage des Scpis par ID societe de gestion ,Type,Categ -----*/ 

 export const GetScpiFiltredByIdSGOrTypeOrCateg = async (filters = {}) => {
  try {
    const response = await axios.get(`${URL_API}/GetAllScpisFiltred`, { params: filters });
    return response.data;
  } catch (error) {
      console.error("Erreur lors de filtrage des scpis", error);
      throw error;
    }
  };

