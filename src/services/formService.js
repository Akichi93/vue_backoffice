import axios from "axios";
import { apiUrl } from "../utils/constants/apiUrl";


export async function getAdresseList() {

    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
    };

    const response = await axios.get(apiUrl.getlocalisation, { headers })
    return response.data;

}


export async function getBrancheList() {

    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
    };

    const response = await axios.get(apiUrl.getbranche, { headers })
    return response.data;

}

export async function getProfessionList() {

    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
    };

    const response = await axios.get(apiUrl.getprofession, { headers })
    return response.data;

}


export async function getClientList() {

    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
    };

    const response = await axios.get(apiUrl.getclient, { headers })
    return response.data;

}


export async function getCompagnieList() {

    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
    };

    const response = await axios.get(apiUrl.getcompagnie, { headers })
    return response.data;

}


export async function getApporteurList() {

    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
    };

    const response = await axios.get(apiUrl.getapporteur, { headers })
    return response.data;

}


export async function getGenresList() {

    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
    };

    const response = await axios.get(apiUrl.getgenre, { headers })
    return response.data;

}


export async function getMarquesList() {

    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
    };

    const response = await axios.get(apiUrl.getmarque, { headers })
    return response.data;

}


export async function getCouleursList() {

    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
    };

    const response = await axios.get(apiUrl.getcouleur, { headers })
    return response.data;

}


export async function getCategoriesList() {

    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
    };

    const response = await axios.get("/api/auth/getcategories", { headers })
    return response.data;

}

export async function getEnergiesList() {

    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
    };

    const response = await axios.get(apiUrl.getenergie, { headers })
    return response.data;

}


export async function getRoleList() {

    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
    };

    const response = await axios.get("/api/auth/getRoles", { headers })
    return response.data;

}
