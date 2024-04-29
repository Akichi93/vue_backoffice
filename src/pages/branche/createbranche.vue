<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />
    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Création de branche</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home"> Tableau de bord </router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Branches
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xl-12 d-flex">
            <div class="card flex-fill">
              <div class="card-header">
                <h4 class="card-title mb-0">Branches</h4>
              </div>
              <div class="card-body">
                <form action="#">
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label"
                      >Nom de branche</label
                    >
                    <div class="col-lg-9">
                      <input
                        type="text"
                        v-model="form.nom_branche"
                        class="form-control"
                      />
                    </div>
                  </div>

                  <div class="text-end">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      @click.prevent="storeBranche"
                    >
                      Créer
                    </button>
                  </div>
                </form>
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
import { postBranche } from "../../services/brancheService";
import { useBranchesStore } from "../../store/branche";
import { createToaster } from "@meforma/vue-toaster";
import AppStorage from "../../db/AppStorage.js";
import { apiUrl } from "../../utils/constants/apiUrl";
import { v4 as uuidv4 } from "uuid";
import { validateBrancheForm } from "../../utils/helpers/formValidation";
import switchService from "../../services/switchService";
const toaster = createToaster({
  /* options */
});

export default {
  components: { Header, Sidebar },

  data() {
    return {
      form: {
        nom_branche: null,
        // uuid: null
      },
    };
  },
  methods: {
    async storeBranche() {
      this.errors = validateBrancheForm(this.form);

      if (Object.keys(this.errors).length > 0) {
        toaster.error(`Veuillez remplir les champs`, {
          position: "top-right",
        });
        return; 
      }

      const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);

      const { success, uuid, error } = await switchService.storeBranche(this.form.nom_branche,entrepriseId);

      if (success) {
        this.$router.push("/listbranche");
        toaster.success(`Branche ajoutée`, {
          position: "top-right",
        });
      } else {
        console.error(error); // Gérer l'erreur
        toaster.error(`Erreur lors de l'ajout de la branche`, {
          position: "top-right",
        });
      }
    },
  },
};
</script>
