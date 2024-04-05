import axios from "axios";


export async function getEntreprisesList() {

    // const token = localStorage.getItem("token");

    // // Configurez les en-têtes de la requête
    // const headers = {
    //     Authorization: "Bearer " + token,
    //     "x-access-token": token,
    // };

    

    const response = await axios.get("https://app.fl4ir.com/api/auth/entreprises")
    return response.data;

}



