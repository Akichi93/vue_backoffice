class OfflineService {
    async storeContrat(form, uuid, entrepriseId) {

        const clientName = await AppStorage.getClientNameByUUID(this.form.client_id);
        const clientCode = await AppStorage.getClientCodeByUUID(this.form.client_id);
        const compagnieName = await AppStorage.getCompagnieNameByUUID(this.form.compagnie_id);
        const apporteurName = await AppStorage.getApporteurNameByUUID(this.form.apporteur_id);

        const newContratData = [
            {
                id: userId,
                uuidContrat: uuid,
                id_entreprise: entrepriseId,
                uuidBranche: this.form.branche_id.uuidBranche,
                nom_branche: this.form.branche_id.nom_branche,
                uuidClient: this.form.client_id,
                nom_client: clientName,
                numero_client: clientCode,
                nom_compagnie: compagnieName,
                nom_apporteur: apporteurName,
                uuidCompagnie: this.form.compagnie_id,
                uuidApporteur: this.form.apporteur_id,
                numero_police: this.form.numero_police,
                effet_police: this.form.effet_police,
                heure_police: this.form.heure_police,
                expire_le: this.form.expire_le,
                souscrit_le: this.form.souscrit_le,
                reconduction: this.form.reconduction,
                prime_nette: this.form.primes_nette,
                accessoires: this.form.accessoires,
                frais_courtier: this.form.frais_courtier,
                cfga: this.cfga,
                taxes_totales: this.form.taxes_totales,
                commission_courtier: this.calulateCommissionCompagnie,
                commission_apporteur: this.calulateCommissionApporteur,
                gestion: this.gestion,
                primes_ttc:
                    this.form.primes_nette +
                    this.form.frais_courtier +
                    this.form.accessoires +
                    this.cfga +
                    this.form.taxes_totales,
                sync: 0,
                solde: 0,
                reverse: 0,
                supprimer_contrat: 0,
            },
        ];

        // Enregistré les contrats dans IndexedDB
        await AppStorage.storeDataInIndexedDB("contrats", newContratData);

        // Enregistré les avenants dans IndexedDB
        let type = "Terme";

        const [annee, mois, day] = this.form.souscrit_le.split("-");

        let codeAvenant = this.generateCodevenant();

        let totalPrimeTtc =
            this.form.primes_nette +
            this.form.frais_courtier +
            this.form.accessoires +
            this.cfga +
            this.form.taxes_totales;

        const calculateCommission = () => {
            return (
                this.form.primes_nette *
                this.taux.taux *
                0.01 *
                this.tauxcomp.tauxcomp *
                0.01
            );
        };

        const calculateCommissionCourtier = () => {
            return this.form.primes_nette * this.tauxcomp.tauxcomp * 0.01;
        };

        const uuidAvenant = uuidv4();

        const newAvenantsData = [
            {
                id: userId,
                uuidContrat: uuid,
                annee: annee,
                mois: mois,
                type: "Terme",
                nom_client: clientName,
                nom_branche: this.form.branche_id.nom_branche,
                // nom_compagnie: compagnieName,
                // numero_police: this.form.numero_police,
                prime_ttc: totalPrimeTtc,
                retrocession: 0,
                commission: calculateCommission(),
                commission_courtier: calculateCommissionCourtier(),
                prise_charge: 0,
                ristourne: 0,
                prime_nette: this.form.primes_nette,
                date_emission: this.form.souscrit_le,
                date_debut: this.form.effet_police,
                date_fin: this.form.expire_le,
                accessoires: this.form.accessoires,
                frais_courtier: this.form.frais_courtier,
                cfga: this.cfga,
                taxes_totales: this.form.taxes_totales,
                code_avenant: codeAvenant,
                uuidAvenant: uuidAvenant,
                uuidApporteur: this.form.apporteur_id,
                uuidCompagnie: this.form.compagnie_id,
                uuidClient: this.form.client_id,
                sync: 0,
                solder: 0,
                reverser: 0,
                payer_apporteur: 0,
                payer_courtier: 0,
                supprimer_avenant: 0,
                id_entreprise: entrepriseId,
            },
        ];

        // Enregistré les avenants dans IndexedDB
        await AppStorage.storeDataInIndexedDB("avenants", newAvenantsData);

        if (
            this.form.branche_id.nom_branche == "AUTOMOBILE" ||
            this.form.branche_id.nom_branche == "MOTO" ||
            this.form.branche_id.nom_branche == "MOTO" ||
            this.form.branche_id.nom_branche == "AUTOMOBILE HORS TPV" ||
            this.form.branche_id.nom_branche == "AUTOMOBILE TPV"
        ) {
            const uuidAutomobile = uuidv4();

            const newAutomobileData = [
                {
                    uuidAutomobile: uuidAutomobile,
                    uuidContrat: uuid,
                    numero_immatriculation: this.form.numero_immatriculation,
                    date_circulation: this.date_circulation,
                    identification_proprietaire: this.identification_proprietaire,
                    adresse_proprietaire: this.adresse_proprietaire,
                    zone: this.zone,
                    categorie: this.categorie_id,
                    marque: this.marque_id,
                    genre: this.genre_id,
                    type: this.type,
                    carosserie: this.carosserie,
                    couleur: this.couleur_id,
                    energie: this.energie_id,
                    place: this.place,
                    puissance: this.puissance,
                    charge: this.charge,
                    valeur_neuf: this.valeur_neuf,
                    valeur_venale: this.valeur_venale,
                    categorie_socio_pro: this.categorie_socio_pro,
                    permis: this.permis,
                    // option: this.option_garantie,
                    entree: this.entree_le,
                    tierce: this.tierce,
                    // prime_nette: this.form.primes_nette,
                    // accessoires: this.form.accessoires,
                    // frais_courtier: this.form.frais_courtier,
                    // cfga: this.cfga,
                    // taxes_totales: this.form.taxes_totales,
                    // commission_courtier: calculateCommissionCourtier(),
                    // commission_apporteur: calculateCommission(),
                    // gestion: this.gestion,
                    // primes_ttc: totalPrimeTtc,
                    sync: 0,
                    supprimer_automobile: 0,
                    id_entreprise: entrepriseId,
                    id: userId,
                },
            ];

            await AppStorage.storeDataInIndexedDB(
                "automobiles",
                newAutomobileData
            );

            let test = JSON.parse(JSON.stringify(this.typegarantie));
            let donnees = [];

            for (let i = 0; i < Object.keys(test).length; i++) {
                donnees.push(test[i]);
            }

            for (let i = 0; i < donnees.length; i++) {
                // Générer un UUID unique
                const uuidGarantie = uuidv4();

                const newGarantieData = [
                    {
                        uuidGarantie: uuidGarantie,
                        uuidAutomobile: uuidAutomobile,
                        nom_garantie: donnees[i],
                        sync: 0,
                        id_entreprise: entrepriseId,
                    },
                ];

                await AppStorage.storeDataInIndexedDB(
                    "garanties",
                    newGarantieData
                );
            }
        }
    }
}

export default OfflineService;