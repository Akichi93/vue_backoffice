<template>
  <Multiselect
    :value="client"
    :options="clients"
    :custom-label="
      ({ id_client, nom_client }) => `${id_client} - [${nom_client}]`
    "
    valueProp="id_client"
    :placeholder="placeholder"
    label="nom_client"
    track-by="nom_client"
    :searchable="true"
  >
  </Multiselect>
</template>
<script>
// import Vue from 'vue';  // Importez Vue
import Multiselect from "@vueform/multiselect";
import { getClientList } from "../../services/formService";

export default {
  name: "clientcomponent",
  props: ["client", "placeholder","updateClients"],
  data() {
    return {
      clients: [],
    };
  },
  created() {
    this.getClient();
  },
  methods: {
    // refresh(clients) {
    //     this.clients = clients.data;
    // },

    getClient: function () {
      getClientList().then((resultat) => {
        this.clients = resultat;
        console.log(resultat);
      });
    },

    handleClientsChange(clientData) {
      // Traitement des changements dans la liste des clients
      console.log("Liste des clients mise à jour :", clientData);

      // Supposez que vous voulez loguer le dernier client ajouté
      // const dernierClientAjoute = clientData[clientData.length - 1];
      // console.log("Dernier client ajouté :", dernierClientAjoute);

      // console.log("Liste des clients mise à jour dans le watcher :", clientData);

      this.updateClients(clientData);
    },
  },
  watch: {
    // client: function (response) {
    //   console.log("Nouveau client sélectionné :", response.data);
    //   this.getClient();
    // },

    clients: {
      handler: "handleClientsChange",
      deep: true,
    },
  },
  mounted() {
    // Appeler la fonction updateClients du parent avec les clients actuels
    this.updateClients(this.clients.data);
  },
  components: { Multiselect },
};
</script>
      
<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->