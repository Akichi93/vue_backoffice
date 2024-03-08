import axios from "axios";
import { apiUrl } from "../utils/constants/apiUrl";


export async function getProspectsList(page = 1) {

    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
    };

    const response = await axios.get("/api/auth/prospectList?page=" + page, { headers })
    return response.data;

}


export async function getProspectsExport() {

    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
    };

    const response = await axios.get(apiUrl.getprospect, { headers })
    return response.data;

}



