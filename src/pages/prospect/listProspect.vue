<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />

    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Prospects</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Prospect
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
              <router-link
                to="/createprospect"
                class="btn btn-success btn-add-emp"
                style="width: auto"
              >
                <i class="fas fa-plus"></i>Ajouter prospect</router-link
              >
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-row">
            <input
              type="text"
              class="form-control"
              placeholder="Rechercher un prospect"
              v-model="q"
              @keyup="searchtask"
            />
          </div>
          <div class="col-md-12" style="display: flex; justify-content: end">
            <prospectexport></prospectexport>
          </div>
          <div class="col-md-12">
            <div class="table-responsive">
              <template v-if="isLoading">
                <loadingcomponent></loadingcomponent>
              </template>
              <template v-else>
                <table class="table table-striped custom-table mb-0">
                <thead>
                  <tr>
                    <th>Nom du prospect</th>
                    <th>Adresse</th>
                    <th>Contact</th>
                    <th>Etat</th>
                    <th>Profession</th>
                    <th>Statut</th>
                    <th class="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(prospect, i) in prospects" :key="i">
                    <tr>
                      <td v-text="prospect.nom_prospect"></td>
                      <td v-text="prospect.adresse_prospect"></td>
                      <td v-text="prospect.tel_prospect"></td>
                      <td v-if="prospect.etat == 0">
                        <span class="badge badge-pill bg-danger">Prospect</span>
                      </td>
                      <td v-else>
                        <span class="badge badge-pill bg-success">Client</span>
                      </td>

                      <td v-text="prospect.profession_prospect"></td>
                      <td v-text="prospect.statut"></td>
                      <td class="text-end ico-sec d-flex justify-content-end">
                        <a
                          href="#"
                          v-if="prospect.etat == 0"
                          @click="editProspect(prospect.uuidProspect)"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_project"
                          title="Admettre comme un client"
                          ><i class="fas fa-check"></i>
                        </a>
                        <a
                          href="#"
                          v-if="prospect.etat == 0"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_department"
                          @click="editProspect(prospect.uuidProspect)"
                          title="Modifier"
                          ><i class="fas fa-pen"></i>
                        </a>
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#change_statut"
                          @click="editProspect(prospect.uuidProspect)"
                          title="Changer d'etat"
                          ><i class="fas fa-edit"></i>
                        </a>

                        <router-link
                          :to="{
                            name: 'detailsprospect',
                            params: { uuidProspect: prospect.uuidProspect },
                          }"
                          ><i class="fas fa-eye"></i
                        ></router-link>

                        <a
                          href="#"
                          v-if="prospect.etat == 0"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_prospect"
                          @click="editProspect(prospect.uuidProspect)"
                          title="Modifier"
                          ><i class="fas fa-trash-alt"></i>
                        </a>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
              </template>
             
            </div>

            <admettreProspect
              v-bind:prospectoedit="prospectoedit"
              @prospect-admettre="refresh"
            ></admettreProspect>
            <editProspect
              v-bind:prospectoedit="prospectoedit"
              @prospect-updated="refresh"
            ></editProspect>
            <changeProspect
              v-bind:prospectoedit="prospectoedit"
              @prospect-change="refresh"
            ></changeProspect>
            <deleteProspect
              v-bind:prospectoedit="prospectoedit"
              @prospect-deleted="refresh"
            ></deleteProspect>

            <!-- <pagination align="center" :data="paginations" :limit="5" :current_page="paginations.current_page"
              :last_page="paginations.last_page" @pagination-change-page="getProspects">
            </pagination> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import pagination from "laravel-vue-pagination";
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import { getRoleActif } from "../../services/roleservice";
import admettreProspect from "./admettreProspect.vue";
import deleteProspect from "./deleteProspect.vue";
import editProspect from "./editProspect.vue";
import changeProspect from "./changeProspect.vue";
import prospectexport from "../../components/export/prospectexport.vue";
import switchService from "../../services/switchService";
import loadingcomponent from "../../components/loading/spinnercomponent.vue"

export default {
  name: "listprospect",
  components: {
    Header,
    Sidebar,
    // pagination,
    admettreProspect,
    deleteProspect,
    editProspect,
    changeProspect,
    prospectexport,
    loadingcomponent
  },
  data() {
    return {
      value: null,
      prospects: [],
      prospectoedit: "",
      q: "",
      roleactif: "",
      isLoading: true,
    };
  },
  created() {
    this.getProspects();
  },

  methods: {
    async getProspects() {
      try {
        this.isLoading = true;
        this.prospects = await switchService.getProspects();
        // console.log(this.prospects)
      } catch (error) {
        console.error("There was an error fetching the data:", error);
      } finally {
        this.isLoading = false;
      }
    },

    getRoleconnect() {
      getRoleActif().then((result) => {
        this.roleactif = result;
      });
    },

    async editProspect(uuidProspect) {
      if (!uuidProspect) {
        console.error("UUID prospect is missing or undefined");
        return;
      }
      try {
        this.prospectoedit = await switchService.getProspectByUuid(
          uuidProspect
           );
        
      } catch (error) {
        console.log(error);
      }
    },

    async searchtask() {
      if (this.q.length > 3) {
        this.prospects = await switchService.searchProspectsByName(this.q);
      } else {
        this.getProspects();
         }
    },

    async refresh() {
      this.prospects = await switchService.getProspects();
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