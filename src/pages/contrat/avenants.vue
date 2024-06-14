<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />
    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>
                Emissions - {{ contrats.nom_client }} -
                {{ contrats.numero_police }} - {{ contrats.nom_branche }} - {{ contrats.compagnie.nom }}
              </h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item">
                    <router-link to="/listcontrat"
                      >Liste des contrats</router-link
                    >
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Contrats
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div class="row filter-row">
          <div class="col-md-8"></div>
          <div class="col-md-4">
            <div class="add-emp-section">
              <a
                href=""
                class="btn btn-success btn-add-emp"
                data-bs-toggle="modal"
                data-bs-target="#add_avenant"
                style="width: auto"
                ><i class="fas fa-plus"></i>
                Nouvelle emission
              </a>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-row">
            <input
              type="text"
              class="form-control"
              placeholder="Rechercher un avenant"
              v-model="q"
              @keyup="searchtask"
            />
          </div>
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-striped custom-table mb-0">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Prime Nette</th>
                    <th>Accessoires</th>
                    <th>FGA</th>
                    <th>Prime TTC</th>
                    <th>Com courtier</th>
                    <th>Com apporteur</th>
                    <th>Année</th>
                    <th>Date d'effet</th>
                    <th>Date d'échéance</th>    
                  
                    <th>Date de saisie</th>
                   
                    <th>Solder</th>
                    <th>Reverser</th>
                    <th class="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                 
                    <tr  v-for="avenant in avenants"
                    :key="avenant.uuidAvenant">
                      <td v-text="avenant.type"></td>
                    
                      <td>{{ avenant.prime_nette }}</td>
                      <td>{{ avenant.accessoires }}</td>
                      <td>{{ avenant.cfga }}</td>
                      <td>{{ avenant.prime_ttc }}</td>
                      <td>{{ avenant.commission_courtier }}</td>
                      <td>{{ avenant.commission }}</td>
                      <td>{{ avenant.annee }}</td>
                      <td>{{ avenant.date_debut }}</td>
                      <td>{{ avenant.date_fin }}</td>
                      <!-- <td>{{ avenant.mois }}</td> -->
                     
                     
                      <td>{{ avenant.date_emission }}</td>
                     
                      <td v-if="avenant.solder == 0">
                        <span class="badge badge-pill bg-danger">NON</span>
                      </td>
                      <td v-else>
                        <span class="badge badge-pill bg-success">OUI</span>
                      </td>
                      <td v-if="avenant.reverser == 0">
                        <span class="badge badge-pill bg-danger">NON</span>
                      </td>
                      <td v-else>
                        <span class="badge badge-pill bg-success">OUI</span>
                      </td>
                      <td class="text-end ico-sec d-flex justify-content-end">
                        <a
                          href="#"
                          @click="editAvenant(avenant.uuidAvenant)"
                          data-bs-toggle="modal"
                          data-bs-target="#add_file"
                          title="Ajouter fichier"
                          ><i class="fas fa-plus"></i>
                        </a>

                        <a
                          href="#"
                          @click="fetchFile(avenant.uuidAvenant)"
                          data-bs-toggle="modal"
                          data-bs-target="#assign_leader"
                          title="Voir fichier"
                          ><i class="fas fa-file"></i>
                        </a>

                        <div
                          id="assign_leader"
                          class="modal custom-modal fade"
                          role="dialog"
                        >
                          <div
                            class="modal-dialog modal-dialog-centered modal-lg"
                            role="document"
                          >
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title">Fichiers</h5>
                                <button
                                  type="button"
                                  class="close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <i class="fas fa-times"></i>
                                </button>
                              </div>
                              <div class="modal-body">
                                <ul class="file-list">
                                  <li
                                    v-for="file in files"
                                    :key="file.id_fileavenant"
                                  >
                                    <div class="media d-flex">
                                      <div
                                        class="media-body align-self-center text-nowrap flex-grow-1"
                                      >
                                        <div class="file-title">
                                          Nom du fichier: {{ file.titre }}
                                        </div>
                                        <span class="file-details">
                                          Fichier:
                                          <a
                                            :href="`/images/piece_avenant/${file.nom_file}`"
                                            download
                                          >
                                            {{ file.nom_file }}
                                          </a>
                                        </span>
                                      </div>
                                    </div>
                                    <div>
                                      <iframe
                                        :src="`https://fl4ir.loca.lt/images/piece_avenant/${file.nom_file}`"
                                        type=""
                                        width="750"
                                        height="500"
                                      ></iframe>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        <a
                          href="#"
                          @click="viewFacture(avenant.uuidAvenant)"
                          data-bs-toggle="modal"
                          data-bs-target="#view_facture"
                          title="Voir la facture"
                        >
                          <i class="fas fa-eye"></i>
                        </a>

                        <a
                          href="#"
                          @click="editAvenant(avenant.uuidAvenant)"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_avenant"
                          title="Supprimer"
                          ><i class="fas fa-trash-alt"></i>
                        </a>

                        <a
                          v-if="avenant.solder == 0"
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#solder_contrat"
                          @click="editAvenant(avenant.uuidAvenant)"
                          title="Solder"
                          ><i class="fas fa-balance-scale"></i>
                        </a>

                        <a
                          v-if="avenant.solder == 1 && avenant.reverser == 0"
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#reverser_contrat"
                          @click="editAvenant(avenant.uuidAvenant)"
                          title="Reverser"
                          ><i class="fa fa-times"></i>
                        </a>
                      </td>
                    </tr>
                  
                </tbody>
              </table>
            </div>

            <addavenant @avenant-add="refresh"></addavenant>
            <editavenant v-bind:avenantoedit="avenantoedit"></editavenant>
            <soldercontrat
              v-bind:avenantoedit="avenantoedit"
              @avenant-solder="refresh"
            ></soldercontrat>
            <reversercontrat
              v-bind:avenantoedit="avenantoedit"
              @avenant-reverser="refresh"
            ></reversercontrat>
            <deleteavenant
              v-bind:avenantoedit="avenantoedit"
              @avenant-delete="refresh"
            ></deleteavenant>
            <viewfacture v-bind:facturetoedit="facturetoedit"></viewfacture>
            <addfile v-bind:avenantoedit="avenantoedit"></addfile>
            <!-- <viewfile v-bind:avenantoedit="avenantoedit"></viewfile> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import addavenant from "../contrat/addavenant.vue";
import soldercontrat from "../contrat/soldercontrat.vue";
import reversercontrat from "../contrat/reversercontrat.vue";
import deleteavenant from "../contrat/deleteavenant.vue";
import viewfacture from "../contrat/viewfacture.vue";
import addfile from "../contrat/addfile.vue";
// import viewfile from '../contrat/viewfile.vue';
import AppStorage from "../../db/AppStorage.js";
import switchService from "../../services/switchService";
export default {
  components: {
    Header,
    Sidebar,
    addavenant,
    soldercontrat,
    reversercontrat,
    deleteavenant,
    viewfacture,
    addfile,
    // viewfile
  },

  data() {
    return {
      aveantoedit: "",
      avenants: {},
      id_contrat: "",
      contrats: {},
      avenantoedit: "",
      facturetoedit: "",
      filetoedit: [],
      files: [],
    };
  },
  created() {
    this.fetchDataAvenant();
    this.contratInfo();
  },

  methods: {
    async fetchDataAvenant() {
      const uuidContrat = this.$route.params.uuidContrat;
      this.avenants  = await switchService.getAvenantsByUuidContrat(uuidContrat);
    },

    async editAvenant(uuidAvenant) {
      try {
        this.avenantoedit = await switchService.getAvenantByUuid(uuidAvenant);
      } catch (error) {
        console.log(error);
      }
    },

    async contratInfo() {
      try {
        const uuidContrat = this.$route.params.uuidContrat;
        this.contrats = await switchService.getContratByUuid(uuidContrat);
      } catch (error) {
        console.log(error);
      }
    },

    async viewFacture(uuidAvenant) {
      this.facturetoedit = await switchService.getFactures(uuidAvenant);
    },

    fetchFile(uuidAvenant) {
      axios
        .get(`https://fl4ir.loca.lt/api/auth/fileavenants/${uuidAvenant}`)
        .then((response) => {
          this.files = response.data;
        })
        .catch((error) => {
          console.error("Error fetching files:", error);
          // Handle error (e.g., display error message)
        });
    },

   async refresh() {
      const uuidContrat = this.$route.params.uuidContrat;
      this.avenants  = await switchService.getAvenantsByUuidContrat(uuidContrat);
    },
  },
};
</script>

<style scoped>
.page-head-box {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
}

.breadcrumb {
  background: transparent;
}

.table thead th {
  background-color: #343a40;
  color: #fff;
}

.table tbody tr:hover {
  background-color: #f1f1f1;
}

.btn-info, .btn-warning, .btn-primary, .btn-danger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
}

.btn-info i, .btn-warning i, .btn-primary i, .btn-danger i {
  margin-right: 0;
}
</style>