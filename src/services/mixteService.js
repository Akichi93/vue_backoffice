// Compagnies

   // const response = await fetch(
      //   "/api/check-internet-connection"
      // );

      // const data = await response.json();

      // this.isConnected = data.connected;
      // if (this.isConnected) {
      //   const { v4: uuidv4 } = require('uuid');
      //   const uuid = uuidv4();

      //   const token = AppStorage.getToken();
      //   const userId = AppStorage.getId();
      //   const entrepriseId = AppStorage.getEntreprise();

      //   let test = JSON.parse(JSON.stringify(this.branches));
      //   let donnees = [];

      //   for (let i = 0; i < Object.keys(test).length; i++) {
      //     donnees.push(test[i]["value"]);
      //   }

      //   let testing = JSON.parse(JSON.stringify(this.branches));
      //   let datas = [];

      //   for (let i = 0; i < Object.keys(testing).length; i++) {
      //     datas.push(testing[i]["uuidBranche"]);
      //   }

      //   // Obtenir la date du jour au format YYYYMMDD
      //   var today = new Date();
      //   var year = today.getFullYear();
      //   var month = (today.getMonth() + 1).toString().padStart(2, '0');
      //   var day = today.getDate().toString().padStart(2, '0');

      //   var dateDuJour = year + month + day;

      //   // Supposons que $nom est votre variable contenant le nom du client
      //   var nom = this.nom_compagnie;

      //   // Prendre les deux premiers caractères du nom
      //   var deuxPremiersCaracteres = nom.substring(0, 2).toUpperCase(); // Mettre en majuscules

      //   // Générer le numéro de client en ajoutant "CL-" à la date du jour
      //   var codeCompagnie = "CO-" + deuxPremiersCaracteres + dateDuJour;

      //   try {
      //     const response = await axios.post(apiUrl.postcompagnie, {
      //       nom_compagnie: this.nom_compagnie,
      //       contact_compagnie: this.contact_compagnie,
      //       email_compagnie: this.email_compagnie,
      //       adresse_compagnie: this.adresse_compagnie,
      //       accidents: donnees,
      //       ids: datas,
      //       id_entreprise: entrepriseId,
      //       id: userId,
      //       uuidCompagnie: uuid,
      //       code_compagnie: codeCompagnie,
      //     });

      //     const updatedCompagnies = await this.fetchCompagnies();

      //     if (response.status === 200) {
      //       console.log(response.data)
      //       toaster.success(`Compagnie ajouté avec succès`, {
      //         position: "top-right",
      //       });
      //     }

      //     // Mettre à jour IndexedDB avec les compagnies récupérés après comparaison
      //     AppStorage.getCompagnies().then((existingCompagnies) => {
      //       if (existingCompagnies && updatedCompagnies) {
      //         // Comparaison des nouvelles compagnies avec ceux déjà existants
      //         const newCompagnies = updatedCompagnies.filter((compagnie) => {
      //           return !existingCompagnies.some((existingCompagnie) => existingCompagnie.id_compagnie === compagnie.id_compagnie);
      //         });

      //         // Insérer uniquement les nouvelles compagnies dans IndexedDB
      //         if (newCompagnies.length > 0) {
      //           AppStorage.storeDataInIndexedDB('compagnies', newCompagnies);
      //         }
      //       }
      //     });

      //     // Mettre à jour IndexedDB avec les taux compagnies récupérés

      //     const newCompanyId = response.data.id_compagnie;

      //     const ratesEndpoint = `/api/auth/gettauxcompagnie/${newCompanyId}`;

      //     const ratesResponse = await axios.get(ratesEndpoint);

      //     const rates = ratesResponse.data;

      //     AppStorage.storeDataInIndexedDB('tauxcompagnies', rates);

      //     this.$router.push("/listcompagnie");

      //   } catch (error) {
      //     console.error("Erreur lors de l'ajout de la compagnie sur le serveur", error);
      //   }
      // } else {

      