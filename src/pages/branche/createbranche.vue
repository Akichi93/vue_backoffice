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
                    <router-link to="/home">
                      Tableau de bord
                    </router-link>
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
                    <label class="col-lg-3 col-form-label">Nom de branche</label>
                    <div class="col-lg-9">
                      <input type="text" v-model="form.nom_branche" class="form-control" />
                    </div>
                  </div>

                  <div class="text-end">
                    <button type="submit" class="btn btn-primary" @click.prevent="storeBranche">
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
import { v4 as uuidv4 } from 'uuid';
import { validateBrancheForm } from '../../utils/helpers/formValidation';
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
      // const branchesStore = useBranchesStore();
      // const response = await fetch(
      //   "/api/check-internet-connection"
      // );

      // const data = await response.json();

      // this.isConnected = data.connected;
      // if (this.isConnected) {

      //   try {
      //     // Generate UUID using the 'uuid' library
      //     const { v4: uuidv4 } = require('uuid');
      //     this.form.uuidBranche = uuidv4(); // Assign the generated UUID to the form

      //     const response = await postBranche(this.form);

      //     // Utilisez le magasin Pinia pour ajouter la branche
      //     branchesStore.addBranch(response);


      //     // Appeler fetchClients pour récupérer la liste mise à jour après l'insertion
      //     const updatedBranches = await this.fetchBranches();


      //     // Mettre à jour IndexedDB avec les branc récupérés après comparaison
      //     AppStorage.getBranches().then((existingBranches) => {
      //       if (existingBranches && updatedBranches) {
      //         // Comparaison des nouveaux clients avec ceux déjà existants
      //         const newBranches = updatedBranches.filter((branche) => {
      //           return !existingBranches.some((existingBranches) => existingBranches.id_branche === branche.id_branche);
      //         });

      //         console.log('Nouvelles branches à insérer dans IndexedDB :', newBranches);

      //         // Insérer uniquement les nouveaux branches dans IndexedDB
      //         if (newBranches.length > 0) {
      //           AppStorage.storeDataInIndexedDB('branches', newBranches);
      //         }
      //       }
      //     });

      //     this.$router.push("/listbranche");
      //     toaster.success(`Branche ajoutée avec succès`, {
      //       position: "top-right",
      //     });


      //   } catch (error) {
      //     console.error("Erreur lors de l'ajout de la branche", error);
      //   }
      // } else {
      this.errors = validateBrancheForm(this.form);

      if (Object.keys(this.errors).length > 0) {
        // Afficher un message d'erreur
        toaster.error(`Veuillez remplir les champs`, {
          position: "top-right",
        });
      }

      if (Object.keys(this.errors).length === 0) {
        const uuid = uuidv4();

        const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);

        // Si hors ligne, ajoutez la nouvelle donnée directement dans IndexedDB
        const newBrancheData = [{
          uuidBranche: uuid,
          nom_branche: this.form.nom_branche,
          id_entreprise: entrepriseId,
          sync: 0,
        }];

        // Ajouter la nouvelle donnée dans IndexedDB
        await AppStorage.storeDataInIndexedDB("branches", newBrancheData);

        this.$router.push("/listbranche");

        toaster.success(`Client ajouté`, {
          position: "top-right",
        });
        // }

      }
    },

    // Votre méthode actuelle fetchClients
    // async fetchBranches() {
    //   const token = AppStorage.getToken();

    //   // Configurez les en-têtes de la requête
    //   const headers = {
    //     Authorization: "Bearer " + token,
    //     "x-access-token": token,
    //   };

    //   try {
    //     const response = await axios.get(apiUrl.getbranche, { headers });

    //     // Vous pouvez traiter les données comme vous le souhaitez
    //     const branches = response.data;

    //     // Retourner les clients pour une utilisation éventuelle
    //     return branches;
    //   } catch (error) {
    //     console.error("Erreur lors de la récupération des clients sur le serveur", error);
    //   }
    // },
  },
};
</script>
