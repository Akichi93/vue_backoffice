import axios from "axios";
import { apiUrl } from "../utils/constants/apiUrl";


export async function getClientsList(page = 1) {

    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
    };

    const response = await axios.get("/api/auth/clientList?page=" + page, { headers })
    return response.data;

}

export async function getClientSelect() {

    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
    };

    const response = await axios.get(apiUrl.getclient, { headers })
    return response.data;

}




