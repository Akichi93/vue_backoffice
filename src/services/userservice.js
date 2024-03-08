import axios from "axios";


export async function getUsersList() {

    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
    };

    const response = await axios.get("/api/auth/utilisateurs", { headers })
    return response.data;

}


export async function postUser(rcv_data) {

    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
    };

    const response = await axios.post(`/api/auth/utilisateurs `, rcv_data, { headers })
    return response.data;

}



