<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />

    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Statistiques contrats</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="/home">Tableau de bord</a>
                  </li>
                  <li class="breadcrumb-item active">Statistiques contrats</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title mb-0"></h4>
                <div class="row">
                  <div class="col-xl-3 col-md-6" @change="getData()">
                    <select class="form-select mb-3" v-model="filtre">
                      <option value="expire">Expiré</option>
                      <option value="solde">Soldé</option>
                      <option value="nonsolde">Non soldé</option>
                      <option value="reverse">Reversé</option>
                    </select>
                    <label>Filtre de type</label>
                  </div>

                  <div class="col-xl-3 col-md-6">
                    <input class="form-control" type="date" v-model="date_debut" />
                  </div>
                  <div class="col-xl-3 col-md-6">
                    <input class="form-control" type="date" v-model="date_fin" v-if="date_debut != 0"
                      @change="getDate()" />
                  </div>

                  <div class="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                    <div class="add-emp-section">
                      <input type="text" v-model="name" />
                      <button @click="exportToCSV" class="list-icon active">
                        <i class="fas fa-file-csv"></i> Exporter en CSV
                      </button>
                      <button @click="exportToExcel" class="list-icon active">
                        <i class="fas fa-file-csv"></i> Exporter en excel
                      </button>
                    </div>
                    <label>Exportation de données</label>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="col-row">
                  <input type="text" class="form-control" placeholder="Rechercher un contrat" v-model="search"
                    @keyup="searchcontrat" />
                </div>
                <div class="table-responsive">
                  <table id="tbl_exporttable_to_xls" class="table table-striped mb-0">
                    <thead>
                      <tr>
                        <th>Branche</th>
                        <th>Numéro de police</th>
                        <th>Nom du client</th>
                        <th>Email du client</th>
                        <th>Contact du client</th>
                        <th>Adresse du client</th>
                        <th>Postal du client</th>
                        <th>Profession du client</th>
                        <th>Fax du client</th>
                        <th>Nom de l'apporteur</th>
                        <th>Contact de l'apporteur</th>
                        <th>Email de l'apporteur</th>
                        <th>Adresse de l'apporteur</th>
                        <th>Nom de la compagnie</th>
                        <th>Adresse de la compagnie</th>
                        <th>Email de la compagnie</th>
                        <th>Contact de l'apporteur</th>
                        <th>Expire le</th>
                        <th>Effet de police</th>
                        <th>Heure de police</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="contrat in contrats" :key="contrat.id_contrat">
                        <tr>
                          <td v-text="contrat.branche.nom_branche"></td>
                          <td v-text="contrat.numero_police"></td>
                          <td v-text="contrat.client.nom_client"></td>
                          <td v-text="contrat.client.email_client"></td>
                          <td v-text="contrat.client.tel_client"></td>
                          <td v-text="contrat.client.adresse_client"></td>
                          <td v-text="contrat.client.postal_client"></td>
                          <td v-text="contrat.client.profession_client"></td>
                          <td v-text="contrat.client.fax_client"></td>
                          <td v-text="contrat.apporteur.nom_apporteur"></td>
                          <td v-text="contrat.apporteur.contact_apporteur"></td>
                          <td v-text="contrat.apporteur.email_apporteur"></td>
                          <td v-text="contrat.apporteur.adresse_apporteur"></td>
                          <td v-text="contrat.compagnie.nom_compagnie"></td>
                          <td v-text="contrat.compagnie.adresse_compagnie"></td>
                          <td v-text="contrat.compagnie.email_compagnie"></td>
                          <td v-text="contrat.compagnie.contact_compagnie"></td>
                          <td v-text="contrat.expire_le"></td>
                          <td v-text="contrat.effet_police"></td>
                          <td v-text="contrat.heure_police"></td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import ExcelJS from 'exceljs';
export default {
  name: "statcontrat",
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      contrats: [],
      filtre: "",
      search: "",
      name: "",
      date_debut: "",
      date_fin: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const token = localStorage.getItem("token");
      // Configurez les en-têtes de la requête
      const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
      };

      axios
        .get("/api/auth/expiredata", { headers })
        .then((response) => {
          this.contrats = response.data;
        })
        .catch((error) => {
          this.error = error.response.data.message || error.message;
        });
    },

    getData() {
      const token = localStorage.getItem("token");
      // Configurez les en-têtes de la requête
      const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
      };

      const params = {
        filtre: this.filtre,
      };
      axios
        .get("/api/auth/expiredata/", {
          params: params,
          headers: headers,
        })
        .then((response) => {
          this.contrats = response.data;
        })
        .catch((error) => console.log(error));
    },

    getDate() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
      };

      const params = {
        date_debut: this.date_debut,
        date_fin: this.date_fin,
      };
      axios
        .get("/api/auth/expiredata/", {
          params: params,
          headers: headers,
        })
        .then((response) => {
          this.contrats = response.data;
        })
        .catch((error) => console.log(error));
    },

    searchcontrat() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
      };

      const params = {
        search: this.search,
      };

      axios
        .get("/api/auth/expiredata/", {
          params: params,
          headers: headers,
        })
        .then((response) => (this.contrats = response.data))
        .catch((error) => console.log(error));
    },

    exportToCSV() {
      // Prepare data for CSV
      let csvContent =
        "data:text/csv;charset=utf-8," +
        "Branche,Numéro de police,Nom du client,Email du client,Contact du client,Adresse du client,Postal du client,Profession du client,Fax du client,Nom de l'apporteur,Contact de l'apporteur,Email de l'apporteur,Adresse de l'apporteur,Nom de la compagnie,Adresse de la compagnie,Email de la compagnie,Contact de l'apporteur,Expire le,Effet de police,Heure de police\n";

      // Iterate through contrats and add rows to CSV content
      this.contrats.forEach((contrat) => {
        csvContent +=
          [
            contrat.branche.nom_branche,
            contrat.numero_police,
            contrat.client.nom_client,
            contrat.client.email_client,
            contrat.client.tel_client,
            contrat.client.adresse_client,
            contrat.client.postal_client,
            contrat.client.profession_client,
            contrat.client.fax_client,
            contrat.apporteur.nom_apporteur,
            contrat.apporteur.contact_apporteur,
            contrat.apporteur.email_apporteur,
            contrat.apporteur.adresse_apporteur,
            contrat.compagnie.nom_compagnie,
            contrat.compagnie.adresse_compagnie,
            contrat.compagnie.email_compagnie,
            contrat.compagnie.contact_compagnie,
            contrat.expire_le,
            contrat.effet_police,
            contrat.heure_police,
          ].join(",") + "\n";
      });

      // Create a data URI for the CSV content
      const encodedURI = encodeURI(csvContent);

      // Create an anchor element to trigger the download
      const link = document.createElement("a");
      link.setAttribute("href", encodedURI);
      link.setAttribute("download", this.name + ".csv");
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Remove the link from the DOM
      document.body.removeChild(link);
    },

    exportToExcel() {
        // Create a new Excel file
        const xlsContent = this.generateExcelContent();
  
        // Create a Blob from the content
        const blob = new Blob([xlsContent], { type: "application/vnd.ms-excel" });
  
        // Create a link element and trigger a download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "contrats.xls";
        link.click();
      },
      generateExcelContent() {
        // Create an HTML table with the data
        const table = document.createElement("table");
        const headerRow = table.insertRow(0);
  
        // Add headers
        Object.keys(this.contrats[0]).forEach((header) => {
          const th = document.createElement("th");
          th.innerHTML = header;
          headerRow.appendChild(th);
        });
  
        // Add data rows
        this.contrats.forEach((row) => {
          const tr = table.insertRow(-1);
  
          Object.values(row).forEach((value) => {
            const td = tr.insertCell(-1);
            td.innerHTML = value;
          });
        });
  
        // Convert the table to HTML string
        const tableHtml = table.outerHTML;
  
        // Create the Excel file content
        return `
        <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:x="urn:schemas-microsoft-com:office:excel"
          xmlns="http://www.w3.org/TR/REC-html40">
          <head><!--[if gte mso 9]><xml>
          <x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
          <x:Name>Sheet 1</x:Name>
          <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
          </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
          </head><body>${tableHtml}</body></html>`;
      },   

  },
};
</script>