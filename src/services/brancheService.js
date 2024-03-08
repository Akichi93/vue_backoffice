import axios from "axios";
import { apiUrl } from "../utils/constants/apiUrl";


export async function getBranchesList(page = 1) {

    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
    };

    const response = await axios.get("/api/auth/branchesList?page=" + page, { headers })

    return response.data;


}

export async function postBranche(rcv_data) {

    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
    };

    const response = await axios.post(apiUrl.postbranche, rcv_data, { headers })
    return response.data;

}

export async function getBranches(id_branche, rcv_data) {
    const response = await axios
        .get("api/auth/editBranche/" + id_branche, rcv_data)
    return response.data;

}

export async function userUpdate(id_branche, rcv_data) {
    const response = await axios
        .put(`/sign-up/${id}`, rcv_data)
    return response.data;

}

export async function searchbrancheList() {
    const response = await axios.get("/branchesList/" + this.rcv_data)
    return response.data.data;

}

export async function getbrancheExport() {

    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
    };

    const response = await axios.get("/api/auth/getBranche", { headers })

    return response.data;


}

