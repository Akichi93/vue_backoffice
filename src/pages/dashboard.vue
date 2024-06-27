<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />

    <div class="page-wrapper">
      <div class="content container-fluid pb-0"></div>

      <form method="get">
        <div class="row">
          <div class="col-xl-3 col-md-6">
            <select
              class="form-select mb-3"
              v-model="year"
              @change="optionSelected"
            >
              <option v-for="data in getYear" :value="data" :key="data">
                {{ data }}
              </option>
            </select>
          </div>
          <div
            class="col-xl-3 col-md-6"
            v-if="year != null"
            @change="getData()"
          >
            <select class="form-select mb-3" v-model="branch">
              <option value="tous">Toutes les branches</option>
              <option
                v-for="branche in branches"
                :value="branche.uuidBranche"
                :key="branche.uuidBranche"
              >
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
                <h3 class="bl-text mb-1">{{ countemission }}</h3>
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
        <div class="col-md-6" v-if="chartData && chartData.length > 0">
          <Bar :data="chartData" />
        </div>
        <div class="col-md-6" v-if="chartDonnees && chartDonnees.length > 0">
          <Bar :data="chartDonnees" />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6" v-if="chartGraphs && chartGraphs.length > 0">
          <Bar :data="chartGraphs" />
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>
import Header from "../layout/Header.vue";
import Sidebar from "../layout/Sidebar.vue";
import { Bar } from "vue-chartjs";
import { apiUrl } from "../utils/constants/apiUrl";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import AppStorage from "../db/AppStorage";

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
      year: null,
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
  },
  name: "dashboard",

  components: { Header, Sidebar, Bar },

  methods: {
    async optionSelected() {
      if (this.branch) {
        await this.getData();
      }
    },

    async getCategory() {
      const groupedData = await AppStorage.getAvenantsGroupedByYear();
      this.getYear = Object.keys(groupedData).map((year) => parseInt(year));
    },

    async getTypes() {
      const brancheData = await AppStorage.getBranches();
      this.branches = brancheData;
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
      const branch =
        this.branch !== null ? this.branch : "Aucune branche sélectionnée";

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

          const labels = response.primes.map((prime) => {
            const [month, year] = prime.name.split(" "); // Séparer la chaîne "MM YYYY" en mois et année

            if (moisNoms[month] && year) {
              const monthName = moisNoms[month];
              return `${monthName} ${year}`;
            } else {
              // Gérer le cas où le mois ou l'année est manquant ou non défini
              console.warn(
                `Mois ou année manquant pour l'objet prime : ${JSON.stringify(
                  prime
                )}`
              );
              return ""; // Retourner une chaîne vide ou un libellé alternatif
            }
          });

          const data = response.primes.map((prime) => prime.y);

          const label = response.accessoires.map((accesoire) => accesoire.name);

          const donnees = response.accessoires.map((accesoire) => accesoire.y);

          const titre = response.compagnies.map((compagnie) => compagnie.name);

          const graphs = response.compagnies.map((compagnie) => compagnie.y);

          const colorPalette = [
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
          ];

          // Générer des couleurs de fond dynamiques
          const backgroundColors = colorPalette.slice(0, labels.length);
          // Graph chiffre d'affaire par mois
          this.chartData = {
            labels: labels,
            datasets: [
              {
                label: "Chiffre d'affaire par mois dans l'année",
                backgroundColor: backgroundColors,
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
<style scoped>
 

</style>
