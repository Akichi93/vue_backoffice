<template>
  <div id="add_client" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter client</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label>Civilité</label>
                <civilitecomponent :placeholder="'selectionnez une civilité'" v-model="form.civilite"></civilitecomponent>
                <p style="color: red" class="text-red" v-if="errors.civilite"
                  v-text="errors.civilite"></p>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <label>Nom complet du client</label>
                <input type="text" class="form-control" placeholder="Entrez le nom du client" v-model="form.nom_client" />
                <p style="color: red" class="text-red" v-if="errors.nom_client"
                  v-text="errors.nom_client"></p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label>Boîte postal</label>
                <input type="text" class="form-control" placeholder="Entrez la boîte postale"
                  v-model="form.postal_client" />
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <label>Téléphone</label>
                <inputText :placeholder="'téléphone'" v-model="form.tel_client"></inputText>
                <p style="color: red" class="text-red" v-if="errors.tel_client"
                  v-text="errors.tel_client"></p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label>Adresse</label>
                <adressecomponent :placeholder="'selectionnez l\'adresse'" v-model="form.adresse_client">
                </adressecomponent>
                <p style="color: red" class="text-red" v-if="errors.adresse_client"
                  v-text="errors.adresse_client"></p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label>Profession</label>
                <professioncomponent :placeholder="'selectionnez une profession'" v-model="form.profession_client">
                </professioncomponent>
                <p style="color: red" class="text-red" v-if="errors.profession_client"
                  v-text="errors.profession_client"></p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label>Email</label>
                <input type="text" class="form-control" placeholder="Email du client" v-model="form.email_client" />
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Fax</label>
            <input type="text" class="form-control" placeholder="fax du client" v-model="form.fax_client" />
          </div>
          <div class="submit-section">
            <button type="button" class="btn btn-primary cancel-btn" data-bs-dismiss="modal" aria-label="Close">
              Annuler
            </button>
            <button type="button" class="btn btn-primary submit-btn" @click="storeClient" data-bs-dismiss="modal">
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import adressecomponent from "../../components/select/adressecomponent.vue";
import professioncomponent from "../../components/select/professioncomponent.vue";
import civilitecomponent from "../../components/select/civilitecomponent.vue";
import inputText from "../../components/input/inputText.vue";
import AppStorage from "../../db/AppStorage.js";
import { validateClientForm } from '../../utils/helpers/formValidation';
// import { apiUrl } from "../../utils/constants/apiUrl";
import { createToaster } from "@meforma/vue-toaster";
// import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const toaster = createToaster({
  /* options */
});

export default {
  components: {
    adressecomponent,
    professioncomponent,
    civilitecomponent,
    inputText,
  },
  data() {
    return {
      form: {
        civilite: "",
        nom_client: "",
        postal_client: "",
        adresse_client: "",
        email_client: "",
        tel_client: "",
        profession_client: "",
        fax_client: "",
      },
      clients: [],
      errors: {},
    };
  },
  methods: {
    async storeClient() {
      // const isConnected = await this.checkInternetConnection();

      // if (isConnected) {
      //   await this.storeClientOnline();
      // } else {
      await this.storeClientOffline();
      // }
    },

    // async checkInternetConnection() {
    //   const response = await fetch("/api/check-internet-connection");
    //   const data = await response.json();
    //   this.isConnected = data.connected;
    //   return this.isConnected;
    // },

    // async storeClientOnline() {
    //   const userId = AppStorage.getId();
    //   const entrepriseId = AppStorage.getEntreprise();
    //   const uuid = require('uuid').v4();

    //   const numeroClient = this.generateNumeroClient();

    //   try {
    //     const response = await axios.post(apiUrl.postclient, {
    //       civilite: this.civilite,
    //       nom_client: this.nom_client,
    //       postal_client: this.postal_client,
    //       adresse_client: this.adresse_client,
    //       tel_client: this.tel_client,
    //       profession_client: this.profession_client,
    //       fax_client: this.fax_client,
    //       email_client: this.email_client,
    //       id: userId,
    //       id_entreprise: entrepriseId,
    //       uuidClient: uuid,
    //       numero_client: numeroClient,
    //     });

    //     if (response.status === 200) {
    //       toaster.success(`Client ajouté avec succès`, { position: "top-right" });
    //     }

    //     const updatedClients = await this.fetchClients();
    //     await this.updateIndexedDBWithNewClients(updatedClients);

    //     this.emitClientAddEvent();

    //   } catch (error) {
    //     console.error("Erreur lors de l'ajout du client sur le serveur", error);
    //   }
    // },

    async storeClientOffline() {

      this.errors = validateClientForm(this.form);

      if (Object.keys(this.errors).length > 0) {
        // Afficher un message d'erreur
        toaster.error(`Veuillez remplir les champs`, {
          position: "top-right",
        });
      }

      if (Object.keys(this.errors).length === 0) {
        const uuid = uuidv4();
        const userId = parseInt(AppStorage.getId(), 10);
        const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);

        const numeroClient = this.generateNumeroClient();

        const newClientData = [{
          civilite: this.form.civilite,
          nom_client: this.form.nom_client,
          postal_client: this.form.postal_client,
          adresse_client: this.form.adresse_client,
          tel_client: this.form.tel_client,
          profession_client: this.form.profession_client,
          fax_client: this.form.fax_client,
          email_client: this.form.email_client,
          sync: 0,
          uuidClient: uuid,
          id_entreprise: entrepriseId,
          user_id: userId,
          numero_client: numeroClient,
          supprimer_client: 0,
        }];

        await AppStorage.storeDataInIndexedDB("clients", newClientData);
        const result = await AppStorage.getClients();
        this.emitClientAddEvent();

        toaster.success(`Client ajouté `, { position: "top-right" });
      }
    },

    generateNumeroClient() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      const dateDuJour = year + month + day;

      const nom = this.form.nom_client;
      const deuxPremiersCaracteres = nom.substring(0, 2).toUpperCase();

      return `CL-${deuxPremiersCaracteres}-${dateDuJour}`;
    },

    // async updateIndexedDBWithNewClients(updatedClients) {
    //   const existingClients = await AppStorage.getClients();
    //   if (existingClients && updatedClients) {
    //     const newClients = updatedClients.filter((client) => {
    //       return !existingClients.some((existingClient) => existingClient.id_client === client.id_client);
    //     });

    //     if (newClients.length > 0) {
    //       AppStorage.storeDataInIndexedDB('clients', newClients);
    //     }
    //   }
    // },

    emitClientAddEvent() {
      AppStorage.getClients().then((result) => {
        this.$emit("client-add", result);
      });
    },



    // fetchClients
    // async fetchClients() {
    //   const token = AppStorage.getToken();

    //   // Configurez les en-têtes de la requête
    //   const headers = {
    //     Authorization: "Bearer " + token,
    //     "x-access-token": token,
    //   };

    //   try {
    //     const response = await axios.get(apiUrl.getclient, { headers });

    //     // Vous pouvez traiter les données comme vous le souhaitez
    //     const clients = response.data;

    //     // Retourner les clients pour une utilisation éventuelle
    //     return clients;
    //   } catch (error) {
    //     console.error("Erreur lors de la récupération des clients sur le serveur", error);
    //   }
    // },
  },
};
</script>
