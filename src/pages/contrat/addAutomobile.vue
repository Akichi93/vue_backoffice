<template>
  <div id="add_auto" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter véhicule</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">

          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <form action="#">
                    <h4 class="card-title">Carte grise</h4>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>N° d'immatriculation</label>
                          <input type="text" class="form-control" v-model="form.numero_immatriculation" />
                        </div>
                        <div class="form-group">
                          <label>Date de 1ère mise encirculation</label>
                          <input type="date" class="form-control" v-model="form.date_circulation" />
                        </div>
                        <div class="form-group">
                          <label>Identification du proprietaire</label>
                          <input type="text" class="form-control" v-model="form.identification_proprietaire" />
                        </div>
                        <div class="form-group">
                          <label class="d-block">Adresse du propriétaire:</label>
                          <input type="text" class="form-control" v-model="form.adresse_proprietaire" />
                        </div>
                        <div class="form-group">
                          <label class="d-block">Type technique ou commercial:</label>
                          <typecomponent :placeholder="'Choisir un type'" v-model="form.type">
                          </typecomponent>
                        </div>
                        <div class="form-group">
                          <label class="d-block">Couleur:</label>

                          <Multiselect v-model="form.couleur_id" :options="couleurs" :custom-label="({ id_couleur, couleur }) =>
                            `${id_couleur} - [${couleur}]`
                            " valueProp="couleur" placeholder="Selectionnez une couleur" label="couleur"
                            track-by="couleur" :searchable="true">
                          </Multiselect>
                        </div>
                        <div class="form-group">
                          <label class="d-block">Places assises:</label>
                          <input type="number" class="form-control" v-model="form.place" />
                        </div>
                        <div class="form-group">
                          <label class="d-block">Charge utile(kg):</label>
                          <input type="text" class="form-control" v-model="charge" />
                        </div>
                        <div class="form-group">
                          <label class="d-block">Valeur vénale:</label>
                          <input type="number" class="form-control" v-model="valeur_venale" />
                        </div>
                        <div class="form-group">
                          <label class="d-block">Ancienneté du permis:</label>
                          <input type="number" class="form-control" v-model="permis" />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Zone de circulation</label>
                          <Multiselect v-model="form.zone" :options="localisations" :custom-label="({ id_localisation, nom_ville }) =>
                            `${id_localisation} - [${nom_ville}]`
                            " valueProp="nom_ville" placeholder="Selectionnez zone" label="nom_ville"
                            track-by="nom_ville" :searchable="true">
                          </Multiselect>
                        </div>
                        <div class="form-group">
                          <label>Catégorie d'usage</label>
                          <Multiselect v-model="form.categorie_id" :options="categories" :custom-label="({ id_categorie, categorie }) =>
                            `${id_categorie} - [${categorie}]`
                            " valueProp="categorie" placeholder="Selectionnez une catégorie" label="categorie"
                            track-by="categorie" :searchable="true">
                          </Multiselect>
                        </div>
                        <div class="form-group">
                          <label>Marque</label>
                          <Multiselect v-model="form.marque_id" :options="marques" :custom-label="({ id_marque, marque }) =>
                            `${id_marque} - [${marque}]`
                            " valueProp="marque" placeholder="Selectionnez une marque" label="marque" track-by="marque"
                            :searchable="true">
                          </Multiselect>
                        </div>
                        <div class="form-group">
                          <label>Carrosserie</label>
                          <input type="text" class="form-control" v-model="form.carosserie" />
                        </div>
                        <div class="form-group">
                          <label>Genre</label>
                          <Multiselect v-model="genre_id" :options="form.genres" :custom-label="({ id_genre, genre }) =>
                            `${id_genre} - [${genre}]`
                            " valueProp="genre" placeholder="Selectionnez un genre" label="genre" track-by="genre"
                            :searchable="true">
                          </Multiselect>
                        </div>
                        <div class="form-group">
                          <label>Energie</label>
                          <Multiselect v-model="form.energie_id" :options="energies" :custom-label="({ id_energie, energie }) =>
                            `${id_energie} - [${energie}]`
                            " valueProp="energie" placeholder="Selectionnez une energie" label="energie"
                            track-by="energie" :searchable="true">
                          </Multiselect>
                        </div>
                        <div class="form-group">
                          <label>Puissance fiscale</label>
                          <input type="number" class="form-control" v-model="form.puissance" />
                        </div>
                        <div class="form-group">
                          <label>Valeur à neuf</label>
                          <input type="number" class="form-control" v-model="form.valeur_neuf" />
                        </div>
                        <div class="form-group">
                          <label>Catégorie socio-professionelle</label>
                          <input type="text" class="form-control" v-model="form.categorie_socio_pro" />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">
                  <h4 class="card-title mb-0">Garantie</h4>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-3 col-md-6">
                      <div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                            v-model="tierce" value="Tierce simple" />
                          <label class="form-check-label" for="flexRadioDefault1">
                            Tierce simple
                          </label>
                        </div>
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-3 col-md-6">
                      <div class="mt-4 mt-md-0">
                        <div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                              v-model="tierce" value="Tierce complete" />
                            <label class="form-check-label" for="flexRadioDefault2">
                              Tierce complete
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--end col-->

                    <div class="col-lg-3 col-md-6">
                      <div class="mt-4 mt-md-0">
                        <div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3"
                              v-model="tierce" value="Tierce collision" />
                            <label class="form-check-label" for="flexRadioDefault3">
                              Tierce collision
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--end col-->

                    <div class="col-lg-3 col-md-6">
                      <div class="mt-4 mt-md-0">
                        <div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4"
                              v-model="tierce" value="dommage" />
                            <label class="form-check-label" for="flexRadioDefault4">
                              Dommage
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--end col-->
                    <div class="card-body">
                      <div class="live-preview">
                        <div class="row">
                          <div class="col-lg-3 col-md-6" id="garantie1">
                            <div>
                              <div class="form-check form-check-right">
                                <input class="form-check-input" type="checkbox" value=" Responsabilité civile"
                                  v-model="typegarantie" id="checkbox1" />
                                <label class="form-check-label" for="checkbox1">
                                  Responsabilité civile
                                </label>
                              </div>
                            </div>
                          </div>
                          <!--end col-->

                          <div class="col-lg-3 col-md-6" id="garantie2">
                            <div class="mt-4 mt-md-0">
                              <div>
                                <div class="form-check form-check-right">
                                  <input class="form-check-input" type="checkbox" value="Défense et recours"
                                    v-model="typegarantie" id="checkbox2" />
                                  <label class="form-check-label" for="checkbox2">
                                    Défense et recours
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!--end col-->

                          <div class="col-lg-3 col-md-6" id="garantie3">
                            <div class="mt-4 mt-md-0">
                              <div>
                                <div class="form-check form-check-right">
                                  <input class="form-check-input" type="checkbox" value="Avance sur recours"
                                    id="checkbox3" v-model="typegarantie" />
                                  <label class="form-check-label" for="checkbox3">
                                    Avance sur recours
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!--end col-->

                          <div class="col-lg-3 col-md-6" id="garantie4">
                            <div class="mt-4 mt-md-0">
                              <div>
                                <div class="form-check form-check-right">
                                  <input class="form-check-input" type="checkbox" value="Dommage tous accident"
                                    v-model="typegarantie" id="checkbox4" />
                                  <label class="form-check-label" for="checkbox4">
                                    Dommage tous accident
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-lg-3 col-md-6">
                            <div class="mt-4 mt-md-0">
                              <div>
                                <div class="form-check form-check-right">
                                  <input class="form-check-input" type="checkbox" value="Dommage tierce collision"
                                    v-model="typegarantie" id="checkbox5" />
                                  <label class="form-check-label" for="checkbox5">
                                    Dommage tierce collision
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-lg-3 col-md-6" id="garantie6">
                            <div class="mt-4 mt-md-0">
                              <div>
                                <div class="form-check form-check-right">
                                  <input class="form-check-input" type="checkbox" value="Vol des acccessoires"
                                    v-model="typegarantie" id="checkbox6" />
                                  <label class="form-check-label" for="checkbox6">
                                    Vol des acccessoires
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-lg-3 col-md-6" id="garantie7">
                            <div class="mt-4 mt-md-0">
                              <div>
                                <div class="form-check form-check-right">
                                  <input class="form-check-input" type="checkbox" value="Vol simple"
                                    v-model="typegarantie" id="checkbox7" />
                                  <label class="form-check-label" for="checkbox7">
                                    Vol simple
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-lg-3 col-md-6" id="garantie8">
                            <div class="mt-4 mt-md-0">
                              <div>
                                <div class="form-check form-check-right">
                                  <input class="form-check-input" type="checkbox" value="Vol par agression"
                                    v-model="typegarantie" id="checkbox8" />
                                  <label class="form-check-label" for="checkbox8">
                                    Vol par agression
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-lg-3 col-md-6" id="garantie9">
                            <div class="mt-4 mt-md-0">
                              <div>
                                <div class="form-check form-check-right">
                                  <input class="form-check-input" type="checkbox" name="checked[]" value="Incendie"
                                    v-model="typegarantie" id="checkbox9" />
                                  <label class="form-check-label" for="checkbox9">
                                    Incendie
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-lg-3 col-md-6" id="garantie10">
                            <div class="mt-4 mt-md-0">
                              <div>
                                <div class="form-check form-check-right">
                                  <input class="form-check-input" type="checkbox" name="checked[]"
                                    value="Personnes transportees" v-model="typegarantie" id="checkbox10" />
                                  <label class="form-check-label" for="checkbox10">
                                    Personnes transportees
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!--end row-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="submit-section">
            <button class="btn btn-primary cancel-btn" data-bs-dismiss="modal" aria-label="Close">
              Annuler
            </button>
            <button type="button" data-bs-dismiss="modal" aria-label="Close" class="btn btn-primary submit-btn"
              @click="storeAutomobile">
              Enregistrer
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import AppStorage from "../../db/AppStorage";
import typecomponent from "../../components/select/typecomponent.vue";
import { v4 as uuidv4 } from 'uuid';
// import {
//   getAdresseList,
//   getCategoriesList,
//   getMarquesList,
//   getGenresList,
//   getCouleursList,
//   getEnergiesList
// } from "../../services/formService";

import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({
  /* options */
});
export default {
  components: {
    Multiselect,
    typecomponent
  },
  data() {
    return {
      value: null,
      typegarantie: [],
      localisations: [],
      categories: [],
      marques: [],
      genres: [],
      couleurs: [],
      energies: [],

      //Automobile
      form: {
        numero_immatriculation: "",
        date_circulation: "",
        identification_proprietaire: "",
        adresse_proprietaire: "",
        zone: "",
        categorie_id: "",
        marque_id: "",
        genre_id: "",
        type: "",
        carosserie: "",
        couleur_id: "",
        energie_id: "",
        place: "",
        puissance: "",
        charge: "",
        valeur_neuf: "",
        valeur_venale: "",
        categorie_socio_pro: "",
        permis: "",
        option_garantie: "",
        entree_le: "",

      },
      tierce: "",
      primes_nette: 0,
      frais_courtier: 0,
      accessoires: 0,
      cfga: 0,
      taxes_totales: 0,
      prime_ttc: 0,
      commission: "",
      gestion: "",
      commission_apporteur: "",
      taux_courtier: "",
      taux_apporteur: "",
      tauxcomp: "",
      taux: "",


    };
  },
  created() {
    this.getAdresse();
    this.getCategorie();
    this.getMarque();
    this.getGenre();
    this.getCouleur();
    this.getEnergie();
  },
  methods: {
    getBranche() {
      AppStorage.getBranches().then((result) => {
        this.branches = result;
      });
    },

    getClients() {
      AppStorage.getClients().then((result) => {
        this.clients = result;
      });
    },

    getAdresse() {
      AppStorage.getLocalisations().then((result) => {
        this.localisations = result;
      });
    },

    getCategorie() {
      AppStorage.getCategories().then((result) => {
        this.categories = result;
      });
    },

    getMarque() {
      AppStorage.getMarques().then((result) => {
        this.marques = result;
      });
    },

    getGenre() {
      AppStorage.getGenres().then((result) => {
        this.genres = result;
      });
    },

    getCouleur() {
      AppStorage.getCouleurs().then((result) => {
        this.couleurs = result;
      });
    },

    getEnergie() {
      AppStorage.getEnergies().then((result) => {
        this.energies = result;
      });
    },

    async storeAutomobile() {
      const uuidContrat = this.$route.params.uuidContrat;
      const uuidAutomobile = uuidv4();
      const userId = parseInt(AppStorage.getId(), 10);
      const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);

      const contrat = await AppStorage.getContratByUuid(uuidContrat);

      const newAutomobileData = [{
        uuidAutomobile: uuidAutomobile,
        uuidContrat: uuidContrat,
        numero_immatriculation: this.form.numero_immatriculation,
        date_circulation: this.date_circulation,
        identification_proprietaire: this.identification_proprietaire,
        adresse_proprietaire: this.adresse_proprietaire,
        zone: this.form.zone,
        categorie: this.form.categorie_id,
        marque: this.form.marque_id,
        genre_id: this.form.genre_id,
        type: this.form.type,
        carosserie: this.form.carosserie,
        couleur: this.form.couleur_id,
        energie: this.form.energie_id,
        place: this.form.place,
        puissance: this.form.puissance,
        charge: this.form.charge,
        valeur_neuf: this.form.valeur_neuf,
        valeur_venale: this.form.valeur_venale,
        categorie_socio_pro: this.form.categorie_socio_pro,
        permis: this.form.permis,
        option: this.form.option_garantie,
        entree: this.form.entree_le,
        tierce: this.tierce,
        prime_nette: contrat.prime_nette,
        accessoires: contrat.prime_nette,
        frais_courtier: contrat.frais_courtier,
        cfga: contrat.cfga,
        taxes_totales: contrat.taxes_totales,
        commission_courtier: contrat.commission_courtier,
        commission_apporteur: contrat.commission_apporteur,
        gestion: contrat.gestion,
        primes_ttc: contrat.primes_ttc,
        sync: 0,
        supprimer_automobile: 0,
        id_entreprise: entrepriseId,
      }];

      await AppStorage.storeDataInIndexedDB("automobiles", newAutomobileData);
      
      // axios
      //   .post("/api/auth/postAutomobile", {
      //     //Automobile
      //     numero_immatriculation: this.numero_immatriculation,
      //     date_circulation: this.date_circulation,
      //     identification_proprietaire: this.identification_proprietaire,
      //     adresse_proprietaire: this.adresse_proprietaire,
      //     zone: this.zone,
      //     categorie_id: this.categorie_id,
      //     marque_id: this.marque_id,
      //     genre_id: this.genre_id,
      //     type: this.type,
      //     carosserie: this.carosserie,
      //     couleur_id: this.couleur_id,
      //     energie_id: this.energie_id,
      //     place: this.place,
      //     puissance: this.puissance,
      //     charge: this.charge,
      //     valeur_neuf: this.valeur_neuf,
      //     valeur_venale: this.valeur_venale,
      //     categorie_socio_pro: this.categorie_socio_pro,
      //     permis: this.permis,
      //     option: this.option_garantie,
      //     entree: this.entree_le,
      //     garantie: this.typegarantie,
      //     tierce: this.tierce,
      //     id_contrat: this.$route.params.id_contrat,

      //   })
      //   .then((response) => {
      //     // this.$emit('automobile-add', response);
      //     // if (response.status === 200) {
      //     toaster.success(`Véhicule ajouté avec succès`, {
      //       position: "top-right",
      //     });
      //     // }
      //   })
      //   .catch((error) => {
      //     // console.log(error.response.headers);

      //     //   if (error.response.status === 422) {
      //     //     toaster.error(`Veuillez remplir les champs indiqués`, {
      //     //       position: "top-right",
      //     //     });
      //     //     this.errors = error.response.data.errors;
      //     //     // console.log("Message non enregisté")
      //     //   } else if (error.request) {
      //     //     // The request was made but no response was received
      //     //     console.log(error.request);
      //     //   } else {
      //     //     // Something happened in setting up the request that triggered an Error
      //     //     console.log("Error", error.message);
      //     //   }
      //   });
    },

  },
}
</script>