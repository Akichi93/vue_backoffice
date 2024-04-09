import axios from "axios";


export async function getEntreprisesList() {

    // const token = localStorage.getItem("token");

    // // Configurez les en-têtes de la requête
    // const headers = {
    //     Authorization: "Bearer " + token,
    //     "x-access-token": token,
    // };

    const base_url = import.meta.env.VITE_API_BASE_URL;

    const apiUrl = `${base_url}/api/auth/entreprises`;
    const response = await axios.get(apiUrl);

    // const response = await axios.get("https://app.fl4ir.com/api/auth/entreprises")
    return response.data;

}



