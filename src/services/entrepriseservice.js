import axios from "axios";


export async function getEntreprisesList() {

    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
    };

    const response = await axios.get("/api/auth/entreprises", { headers })
    return response.data;

}



