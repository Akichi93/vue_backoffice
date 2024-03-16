<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />

    <div class="page-wrapper">
      <div class="content container-fluid pb-0"></div>



      <form method="get">
        <div class="row">
          <div class="col-xl-3 col-md-6">
            <select class="form-select mb-3" v-model="year" @select="optionSelected">
              <option v-for="data in getYear" :value="data" :key="data">
                {{ data }}
              </option>
            </select>
          </div>
          <div class="col-xl-3 col-md-6" v-if="year != null" @change="getData()">
            <select class="form-select mb-3" v-model="branch">
              <option value="tous">Toutes les branches</option>
              <option v-for="branche in branches" :value="branche.uuidBranche" :key="branche.uuidBranche">
                {{ branche.nom_branche }}
              </option>
            </select>
          </div>
        </div>
      </form>

      <div class="row">
        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div class="card flex-fill tickets-card">
            <div class="card-header">
              <div class="text-center w-100 p-3">
                <h3 class="bl-text mb-1" v-text="contrat"></h3>
                <h2>Nombre de contrats</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div class="card flex-fill tickets-card">
            <div class="card-header">
              <div class="text-center w-100 p-3">
                <h3 class="bl-text mb-1" v-text="prospect"></h3>
                <h2>Nombre de prospects</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div class="card flex-fill tickets-card">
            <div class="card-header">
              <div class="text-center w-100 p-3">
                <h3 class="bl-text mb-1" v-text="echeance"></h3>
                <h2>Contrat à echeance</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div class="card flex-fill tickets-card">
            <div class="card-header">
              <div class="text-center w-100 p-3">
                <h3 class="bl-text mb-1" v-text="sinistre"></h3>
                <h2>Nombre de sinistres</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div class="card flex-fill tickets-card">
            <div class="card-header">
              <div class="text-center w-100 p-3">
                <h3 class="bl-text mb-1" v-text="countemission"></h3>
                <h2>Emissions</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div class="card flex-fill tickets-card">
            <div class="card-header">
              <div class="text-center w-100 p-3">
                <h3 class="bl-text mb-1" v-text="comissioncourtier"></h3>
                <h2>Commission courtier</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div class="card flex-fill tickets-card">
            <div class="card-header">
              <div class="text-center w-100 p-3">
                <h3 class="bl-text mb-1" v-text="comissionapporteur"></h3>
                <h2>Commission apporteur</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <Bar :data="chartData" />
        </div>
        <div class="col-md-6">
          <Bar :data="chartDonnees" />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <Bar :data="chartGraphs" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Header from "../layout/Header.vue";
import Sidebar from "../layout/Sidebar.vue";
import { Bar } from "vue-chartjs";
import { apiUrl } from "../utils/constants/apiUrl";
// import { createToaster } from "@meforma/vue-toaster";
// const toaster = createToaster({});
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import AppStorage from '../db/AppStorage';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
export default {
  data() {
    return {
      // minHeight: '500px',
      isConnected: false,
      // year: "",
      branch: null,
      contrat: "",
      prospect: "",
      sinistre: "",
      comissioncourtier: "",
      comissionapporteur: "",
      echeance: "",
      countemission: "",
      // compagnies:[],
      year: null, // Propriété pour stocker l'année sélectionnée
      years: [],
      getYear: {},
      branches: {},
      chartData: {
        labels: [""],
        datasets: [
          {
            label: "Chiffre d'affaire par mois dans l'année",
            backgroundColor: "#f87979",
            data: [0],
          },
        ],
      },
      chartDonnees: {
        labels: [""],
        datasets: [
          {
            label: "Chiffres d'affaires par branche",
            backgroundColor: "#f87979",
            data: [0],
          },
        ],
      },

      chartGraphs: {
        labels: [""],
        datasets: [
          {
            label: "Chiffres d'affaires par compagnie",
            backgroundColor: "#f87979",
            data: [0],
          },
        ],
      },
    };
  },
  created() {
    this.getCategory();
    this.getTypes();
    this.getData();


    // Vérification initiale de la connexion
    // this.checkInternetConnectivity();
  },
  name: "dashboard",

  components: { Header, Sidebar, Bar },




  methods: {
    // async checkInternetConnectivity() {
    //   try {
    //     const response = await fetch(
    //       "https://fl4ir.loca.lt/api/check-internet-connection"
    //     );
    //     const data = await response.json();

    //     this.isConnected = data.connected;
    //     // Affichage de la notification
    //     if (this.isConnected) {
    //       // this.showNotification("Connecté à Internet", "success");
    //     } else {
    //       // this.showNotification("Pas de connexion Internet", "error");
    //     }
    //   } catch (error) {
    //     this.isConnected = false;
    //     // this.showNotification("Pas de connexion Internet", "error");
    //   }
    // },




    // showNotification(message, type) {
    //   // Configuration du toaster
    //   const toaster = createToaster({
    //     /* options */
    //   });

    //   // Affichage de la notification
    //   if (type === "success") {
    //     toaster.success(message, {
    //       position: "top-right",
    //     });
    //   } else if (type === "error") {
    //     toaster.error(message, {
    //       position: "top-right",
    //     });
    //   }
    // },


    optionSelected() {
      // L'année sélectionnée est stockée dans la variable 'year'
      console.log("Année sélectionnée :", this.year);
    },

    async getCategory() {
      const groupedData = await AppStorage.getAvenantsGroupedByYear();
      this.getYear = Object.keys(groupedData).map(year => parseInt(year));


      // console.log(this.getYear)
      // const token = localStorage.getItem("token");

      // // Configurez les en-têtes de la requête
      // const headers = {
      //   Authorization: "Bearer " + token,
      //   "x-access-token": token,
      // };
      // axios.get(apiUrl.year, { headers }).then(
      //   function (response) {
      //     this.getYear = response.data;
      //   }.bind(this)
      // );
    },

    async getTypes() {
      const brancheData = await AppStorage.getBranches();
      this.branches = brancheData;

      // const token = localStorage.getItem("token");

      // // Configurez les en-têtes de la requête
      // const headers = {
      //   Authorization: "Bearer " + token,
      //   "x-access-token": token,
      // };
      // axios.get(apiUrl.retrievebranche, { headers }).then(
      //   function (response) {
      //     this.branches = response.data;
      //   }.bind(this)
      // );
    },

    async getData() {

      const token = localStorage.getItem("token");

      // Configurez les en-têtes de la requête
      const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
      };

      const yearSelected = this.year;

      

      // Si branch est défini, utilisez sa valeur, sinon utilisez une valeur par défaut
      const branch = this.branch !== null ? this.branch : 'Aucune branche sélectionnée';

      console.log(branch)

      const data = await AppStorage.getDataByYearAndBranch(yearSelected, branch)
        .then((response) => {

          this.contrat = response.contratsCount;
          this.prospect = response.prospectsCount;
          this.sinistre = response.sinistresCount;
          this.comissioncourtier = response.commissionCompagnieSum;
          this.comissionapporteur = response.commissionApporteurSum;
          this.echeance = response.expiredContractsCount;
          this.countemission = response.countemission;

          const moisNoms = {
            "01": "JANVIER",
            "02": "FEVRIER",
            "03": "MARS",
            "04": "AVRIL",
            "05": "MAI",
            "06": "JUIN",
            "07": "JUILLET",
            "08": "AOUT",
            "09": "SEPTEMBRE",
            10: "OCTOBRE",
            11: "NOVEMBRE",
            12: "Décembre",
          };

          // // Remplacer les nombres de mois par leurs noms correspondants dans les labels
          const labels = response.primes.map((prime) => {
            const moisNumber = prime.name; // Supposons que le nombre de mois est stocké dans la propriété "name" de l'objet

            if (moisNoms[moisNumber]) {
              return moisNoms[moisNumber];
            }

            // Si le mois n'est pas trouvé dans le tableau, retourne le nombre de mois sans modification
            return moisNumber;
          });

          const data = response.primes.map((prime) => prime.y);

          const label = response.accessoires.map(
            (accesoire) => accesoire.name
          );

          const donnees = response.accessoires.map(
            (accesoire) => accesoire.y
          );

          const titre = response.compagnies.map(
            (compagnie) => compagnie.name
          );

          const graphs = response.compagnies.map(
            (compagnie) => compagnie.y
          );

          // Graph chiffre d'affaire par mois
          this.chartData = {
            labels: labels,
            datasets: [
              {
                label: "Chiffre d'affaire par mois dans l'année",
                backgroundColor: [
                  "#123E6B",
                  "#97B0C4",
                  "#A5C8ED",
                  "#F26D85",
                  "#4CAF50",
                  "#FFC107",
                  "#9C27B0",
                  "#FF5722",
                  "#795548",
                  "#009688",
                ],
                data: data,
              },
            ],
          };

          // Graph chiffre d'affaire par branche
          this.chartDonnees = {
            labels: label,
            datasets: [
              {
                label: "Chiffres d'affaires par branche",
                backgroundColor: [
                  "#123E6B",
                  "#97B0C4",
                  "#A5C8ED",
                  "#F26D85",
                  "#4CAF50",
                  "#FFC107",
                  "#9C27B0",
                  "#FF5722",
                  "#795548",
                  "#009688",
                ],
                data: donnees,
              },
            ],
          };

          // Graph chiffre d'affaire par compagnie
          this.chartGraphs = {
            labels: titre,
            datasets: [
              {
                label: "Chiffres d'affaires par compagnie",
                backgroundColor: [
                  "#123E6B",
                  "#97B0C4",
                  "#A5C8ED",
                  "#F26D85",
                  "#4CAF50",
                  "#FFC107",
                  "#9C27B0",
                  "#FF5722",
                  "#795548",
                  "#009688",
                ],
                data: graphs,
              },
            ],
          };

        console.log(response)

          return response; // Si vous voulez transmettre la réponse à la prochaine étape
        })
        .catch((error) => {
          // Gérer les erreurs éventuelles
          console.error(error);
          throw error; // Si vous voulez transmettre l'erreur à la prochaine étape
        });


    


      
    },
  },
};
</script>
