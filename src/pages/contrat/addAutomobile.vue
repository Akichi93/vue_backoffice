<template>
  <div id="add_auto" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter véhicule</h5>
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
                          <input
                            type="text"
                            class="form-control"
                            v-model="form.numero_immatriculation"
                          />
                        </div>
                        <div class="form-group">
                          <label>Date de 1ère mise encirculation</label>
                          <input
                            type="date"
                            class="form-control"
                            v-model="form.date_circulation"
                          />
                        </div>
                        <div class="form-group">
                          <label>Identification du proprietaire</label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="form.identification_proprietaire"
                          />
                        </div>
                        <div class="form-group">
                          <label class="d-block"
                            >Adresse du propriétaire:</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            v-model="form.adresse_proprietaire"
                          />
                        </div>
                        <div class="form-group">
                          <label class="d-block"
                            >Type technique ou commercial:</label
                          >
                          <typecomponent
                            :placeholder="'Choisir un type'"
                            v-model="form.type"
                          >
                          </typecomponent>
                        </div>

                        <div class="col-md-12">
                          <div class="row">
                            <div class="col-md-6" v-if="!showCouleur">
                              <div class="form-group">
                                <label>Couleur</label>
                                <Multiselect
                                  v-model="form.couleur_id"
                                  :options="couleurs"
                                  :custom-label="
                                    ({ uuidCouleur, couleur }) =>
                                      `${uuidCouleur} - [${couleur}]`
                                  "
                                  valueProp="couleur"
                                  placeholder="Selectionnez une couleur"
                                  label="couleur"
                                  track-by="couleur"
                                  :searchable="true"
                                >
                                </Multiselect>
                              </div>
                            </div>
                            <div class="col-md-6" v-if="!showCouleur">
                              <div class="form-group">
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  @click="showCouleur = true"
                                  style="margin-top: 25px"
                                >
                                  Ajouter
                                </button>
                              </div>
                            </div>
                            <div class="col-md-6" v-if="showCouleur">
                              <div class="form-group">
                                <label>Veuillez entrer une couleur</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="ajout_couleur"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  v-if="showCouleur"
                                  @click="storeCouleur"
                                  style="margin-top: 25px"
                                >
                                  Ajouter
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="form-group">
                          <label class="d-block">Places assises:</label>
                          <input
                            type="number"
                            class="form-control"
                            v-model="form.place"
                          />
                        </div>
                        <div class="form-group">
                          <label class="d-block">Charge utile(kg):</label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="charge"
                          />
                        </div>
                        <div class="form-group">
                          <label class="d-block">Valeur vénale:</label>
                          <input
                            type="number"
                            class="form-control"
                            v-model="valeur_venale"
                          />
                        </div>
                        <div class="form-group">
                          <label class="d-block">Ancienneté du permis:</label>
                          <input
                            type="number"
                            class="form-control"
                            v-model="permis"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Zone de circulation</label>
                          <Multiselect
                            v-model="form.zone"
                            :options="localisations"
                            :custom-label="
                              ({ uuidLocalisation, nom_ville }) =>
                                `${uuidLocalisation} - [${nom_ville}]`
                            "
                            valueProp="nom_ville"
                            placeholder="Selectionnez zone"
                            label="nom_ville"
                            track-by="nom_ville"
                            :searchable="true"
                          >
                          </Multiselect>
                        </div>
                        <div class="col-md-12">
                          <div class="row">
                            <div class="col-md-6" v-if="!showCategorie">
                              <div class="form-group">
                                <label>Catégorie d'usage</label>
                                <Multiselect
                                  v-model="form.categorie_id"
                                  :options="categories"
                                  :custom-label="
                                    ({ uuidCategorie, categorie }) =>
                                      `${uuidCategorie} - [${categorie}]`
                                  "
                                  valueProp="categorie"
                                  placeholder="Sélectionnez une catégorie"
                                  label="categorie"
                                  track-by="categorie"
                                  :searchable="true"
                                >
                                </Multiselect>
                              </div>
                            </div>
                            <div class="col-md-6" v-if="!showCategorie">
                              <div class="form-group">
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  @click="showCategorie = true"
                                  style="margin-top: 25px"
                                >
                                  Ajouter
                                </button>
                              </div>
                            </div>
                            <div class="col-md-6" v-if="showCategorie">
                              <div class="form-group">
                                <label>Veuillez entrer la catégorie</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="ajout_cat"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  v-if="showCategorie"
                                  @click="storeCategorie"
                                  style="margin-top: 25px"
                                >
                                  Ajouter
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-12">
                          <div class="row">
                            <div class="col-md-6" v-if="!showMarque">
                              <div class="form-group">
                                <label>Marque</label>
                                <Multiselect
                                  v-model="form.marque_id"
                                  :options="marques"
                                  :custom-label="
                                    ({ uuidMarque, marque }) =>
                                      `${uuidMarque} - [${marque}]`
                                  "
                                  valueProp="marque"
                                  placeholder="Selectionnez une marque"
                                  label="marque"
                                  track-by="marque"
                                  :searchable="true"
                                >
                                </Multiselect>
                              </div>
                            </div>
                            <div class="col-md-6" v-if="!showMarque">
                              <div class="form-group">
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  @click="showMarque = true"
                                  style="margin-top: 25px"
                                >
                                  Ajouter
                                </button>
                              </div>
                            </div>
                            <div class="col-md-6" v-if="showMarque">
                              <div class="form-group">
                                <label>Veuillez entrer la marque</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="ajout_marque"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  v-if="showMarque"
                                  @click="storeMarque"
                                  style="margin-top: 25px"
                                >
                                  Ajouter
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="form-group">
                          <label>Carrosserie</label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="form.carosserie"
                          />
                        </div>

                        <div class="col-md-12">
                          <div class="row">
                            <div class="col-md-6" v-if="!showGenre">
                              <div class="form-group">
                                <label>Genre</label>
                                <Multiselect
                                  v-model="form.genre_id"
                                  :options="genres"
                                  :custom-label="
                                    ({ uuidGenre, genre }) =>
                                      `${uuidGenre} - [${genre}]`
                                  "
                                  valueProp="genre"
                                  placeholder="Selectionnez un genre"
                                  label="genre"
                                  track-by="genre"
                                  :searchable="true"
                                >
                                </Multiselect>
                              </div>
                            </div>
                            <div class="col-md-6" v-if="!showGenre">
                              <div class="form-group">
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  @click="showGenre = true"
                                  style="margin-top: 25px"
                                >
                                  Ajouter
                                </button>
                              </div>
                            </div>
                            <div class="col-md-6" v-if="showGenre">
                              <div class="form-group">
                                <label>Veuillez entrer le genre</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="ajout_genre"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  v-if="showGenre"
                                  @click="storeGenre"
                                  style="margin-top: 25px"
                                >
                                  Ajouter
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-12">
                          <div class="row">
                            <div class="col-md-6" v-if="!showEnergie">
                              <div class="form-group">
                                <label>Energie</label>
                                <Multiselect
                                  v-model="form.energie_id"
                                  :options="energies"
                                  :custom-label="
                                    ({ uuidEnergie, energie }) =>
                                      `${uuidEnergie} - [${energie}]`
                                  "
                                  valueProp="energie"
                                  placeholder="Selectionnez une energie"
                                  label="energie"
                                  track-by="energie"
                                  :searchable="true"
                                >
                                </Multiselect>
                              </div>
                            </div>
                            <div class="col-md-6" v-if="!showEnergie">
                              <div class="form-group">
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  @click="showEnergie = true"
                                  style="margin-top: 25px"
                                >
                                  Ajouter
                                </button>
                              </div>
                            </div>
                            <div class="col-md-6" v-if="showEnergie">
                              <div class="form-group">
                                <label>Veuillez entrer le type d'energie</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="ajout_energie"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  v-if="showEnergie"
                                  @click="storeEnergie"
                                  style="margin-top: 25px"
                                >
                                  Ajouter
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="form-group">
                          <label>Puissance fiscale</label>
                          <input
                            type="number"
                            class="form-control"
                            v-model="form.puissance"
                          />
                        </div>
                        <div class="form-group">
                          <label>Valeur à neuf</label>
                          <input
                            type="number"
                            class="form-control"
                            v-model="form.valeur_neuf"
                          />
                        </div>
                        <div class="form-group">
                          <label>Catégorie socio-professionelle</label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="form.categorie_socio_pro"
                          />
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
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            v-model="tierce"
                            value="Tierce simple"
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault1"
                          >
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
                            <input
                              class="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault2"
                              v-model="tierce"
                              value="Tierce complete"
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioDefault2"
                            >
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
                            <input
                              class="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault3"
                              v-model="tierce"
                              value="Tierce collision"
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioDefault3"
                            >
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
                            <input
                              class="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault4"
                              v-model="tierce"
                              value="dommage"
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioDefault4"
                            >
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
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value=" Responsabilité civile"
                                  v-model="typegarantie"
                                  id="checkbox1"
                                />
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
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value="Défense et recours"
                                    v-model="typegarantie"
                                    id="checkbox2"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="checkbox2"
                                  >
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
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value="Avance sur recours"
                                    id="checkbox3"
                                    v-model="typegarantie"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="checkbox3"
                                  >
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
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value="Dommage tous accident"
                                    v-model="typegarantie"
                                    id="checkbox4"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="checkbox4"
                                  >
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
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value="Dommage tierce collision"
                                    v-model="typegarantie"
                                    id="checkbox5"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="checkbox5"
                                  >
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
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value="Vol des acccessoires"
                                    v-model="typegarantie"
                                    id="checkbox6"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="checkbox6"
                                  >
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
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value="Vol simple"
                                    v-model="typegarantie"
                                    id="checkbox7"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="checkbox7"
                                  >
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
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value="Vol par agression"
                                    v-model="typegarantie"
                                    id="checkbox8"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="checkbox8"
                                  >
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
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    name="checked[]"
                                    value="Incendie"
                                    v-model="typegarantie"
                                    id="checkbox9"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="checkbox9"
                                  >
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
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    name="checked[]"
                                    value="Personnes transportees"
                                    v-model="typegarantie"
                                    id="checkbox10"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="checkbox10"
                                  >
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
            <button
              class="btn btn-primary cancel-btn"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Annuler
            </button>
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              class="btn btn-primary submit-btn"
              @click="storeAutomobile"
            >
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
import { v4 as uuidv4 } from "uuid";

import { createToaster } from "@meforma/vue-toaster";
import switchService from '../../services/switchService';
const toaster = createToaster({
  /* options */
});
export default {
  components: {
    Multiselect,
    typecomponent,
  },
  data() {
    return {
      showCategorie: false,
      showMarque: false,
      showGenre: false,
      showEnergie: false,
      showCouleur: false,
      value: null,
      typegarantie: [],
      localisations: [],
      categories: [],
      marques: [],
      genres: [],
      couleurs: [],
      energies: [],
      ajout_cat: "",
      ajout_marque: "",
      ajout_genre: "",
      ajout_couleur: "",
      ajout_energie: "",

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
    validateFormCategorie() {
      if (!this.ajout_cat) {
        toaster.error(`Veuillez entrer une catégorie`, {
          position: "top-right",
        });
        return false;
      }
      return true;
    },

    validateFormMarque() {
      if (!this.ajout_marque) {
        toaster.error(`Veuillez entrer une marque`, {
          position: "top-right",
        });
        return false;
      }
      return true;
    },

    validateFormGenre() {
      if (!this.ajout_genre) {
        toaster.error(`Veuillez entrer un genre`, {
          position: "top-right",
        });
        return false;
      }
      return true;
    },

    validateFormEnergie() {
      if (!this.ajout_energie) {
        toaster.error(`Veuillez entrer une energie`, {
          position: "top-right",
        });
        return false;
      }
      return true;
    },

    validateFormCouleur() {
      if (!this.ajout_couleur) {
        toaster.error(`Veuillez entrer une couleur`, {
          position: "top-right",
        });
        return false;
      }
      return true;
    },

    async storeCategorie() {
      if (this.validateFormCategorie()) {
        const categorie = this.ajout_cat;
        const updatedLocalisations = await switchService.storeCategorie(
          categorie
        );
        // Émettre un événement avec les prospects mis à jour
        this.$emit("categorie-add", updatedLocalisations);

        // Réinitialiser le formulaire après l'affichage du toaster success
        this.ajout_cat = "";

        toaster.success(`Energie ajouté avec succès`, {
          position: "top-right",
        });
      }

      // Réinitialiser les valeurs après la soumission
      this.form.categorie_id = null;
      this.showCategorie = false; // Cacher le champ d'entrée et afficher à nouveau le Multiselect
    },

    async storeMarque() {
      if (this.validateFormMarque()) {
        const marque = this.ajout_marque;
        const updatedMarques = await switchService.storeMarque(marque);

        // Émettre un événement avec les prospects mis à jour
        this.$emit("marque-add", updatedMarques);

        // Réinitialiser le formulaire après l'affichage du toaster success
        this.ajout_marque = "";

        toaster.success(`Marque ajouté avec succès`, {
          position: "top-right",
        });
        // Réinitialiser les valeurs après la soumission
      }
      this.form.marque_id = null;
      this.showMarque = false; // Cacher le champ d'entrée et afficher à nouveau le Multiselect
    },

    async storeGenre() {
      if (this.validateFormGenre()) {
        const genre = this.ajout_genre;
        const updatedGenres = await switchService.storeGenre(genre);

        this.$emit("genre-add", updatedGenres);

        this.ajout_genre = "";

        toaster.success(`Genre ajouté avec succès`, {
          position: "top-right",
        });
      }

      this.form.genre_id = null;
      this.showGenre = false;
    },

    async storeEnergie() {
      if (this.validateFormEnergie()) {
        const energie = this.ajout_energie;
        const updatedEnergies = await switchService.storeEnergie(energie);

        this.$emit("energie-add", updatedEnergies);

        this.ajout_energie = "";

        toaster.success(`Energie ajouté avec succès`, {
          position: "top-right",
        });
      }
      this.form.energie_id = null;
      this.showEnergie = false;
    },

    async storeCouleur() {
      if (this.validateFormCouleur()) {
        const couleur = this.ajout_couleur;
        const updatedCouleurs = await switchService.storeCouleur(couleur);

        // Émettre un événement avec les prospects mis à jour
        this.$emit("couleur-add", updatedCouleurs);

        this.ajout_couleur = "";

        toaster.success(`Couleur ajouté avec succès`, {
          position: "top-right",
        });
      }
      this.form.couleur_id = null;
      this.showCouleur = false;
    },

    async getBranche() {
      this.branches = await switchService.getBranches();
    },

    async getClients() {
      this.clients = await switchService.getClients();
    },

    async getAdresse() {
      this.localisations = await switchService.getAdresse();
    },

    async getCategorie() {
      this.categories = await switchService.getCategorie();
    },

    async getMarque() {
      this.marques = await switchService.getMarque();
    },

    async getGenre() {
      this.genres = await switchService.getGenre();
    },

    async getCouleur() {
      this.couleurs = await switchService.getCouleur();
    },

    async getEnergie() {
      this.energies = await switchService.getEnergie();
    },

    async storeAutomobile() {
      const uuidContrat = this.$route.params.uuidContrat;
      const uuidAutomobile = uuidv4();
      const userId = parseInt(AppStorage.getId(), 10);
      const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);

      const contrat = await AppStorage.getContratByUuid(uuidContrat);
      let typegaranties = Object.values(this.typegarantie);

      await switchService.storeAutomobile(this.form,userId, entrepriseId, uuidAutomobile, uuidContrat, contrat,typegaranties)

      // const newAutomobileData = [
      //   {
      //     uuidAutomobile: uuidAutomobile,
      //     uuidContrat: uuidContrat,
      //     numero_immatriculation: this.form.numero_immatriculation,
      //     date_circulation: this.date_circulation,
      //     identification_proprietaire: this.form.identification_proprietaire,
      //     adresse_proprietaire: this.form.adresse_proprietaire,
      //     zone: this.form.zone,
      //     categorie: this.form.categorie_id,
      //     marque: this.form.marque_id,
      //     genre_id: this.form.genre_id,
      //     type: this.form.type,
      //     carosserie: this.form.carosserie,
      //     couleur: this.form.couleur_id,
      //     energie: this.form.energie_id,
      //     place: this.form.place,
      //     puissance: this.form.puissance,
      //     charge: this.form.charge,
      //     valeur_neuf: this.form.valeur_neuf,
      //     valeur_venale: this.form.valeur_venale,
      //     categorie_socio_pro: this.form.categorie_socio_pro,
      //     permis: this.form.permis,
      //     option: this.form.option_garantie,
      //     entree: this.form.entree_le,
      //     tierce: this.tierce,
      //     prime_nette: contrat.prime_nette,
      //     accessoires: contrat.prime_nette,
      //     frais_courtier: contrat.frais_courtier,
      //     cfga: contrat.cfga,
      //     taxes_totales: contrat.taxes_totales,
      //     commission_courtier: contrat.commission_courtier,
      //     commission_apporteur: contrat.commission_apporteur,
      //     gestion: contrat.gestion,
      //     primes_ttc: contrat.primes_ttc,
      //     sync: 0,
      //     supprimer_automobile: 0,
      //     id_entreprise: entrepriseId,
      //   },
      // ];

      // await AppStorage.storeDataInIndexedDB("automobiles", newAutomobileData);

      // let test = JSON.parse(JSON.stringify(this.typegarantie));
      // let donnees = [];

      // for (let i = 0; i < Object.keys(test).length; i++) {
      //   donnees.push(test[i]);
      // }

      // for (let i = 0; i < donnees.length; i++) {
      //   // Générer un UUID unique
      //   const uuidGarantie = uuidv4();

      //   const newGarantieData = [
      //     {
      //       uuidGarantie: uuidGarantie,
      //       uuidAutomobile: uuidAutomobile,
      //       nom_garantie: donnees[i],
      //       sync: 0,
      //       id_entreprise: entrepriseId,
      //     },
      //   ];

      //   await AppStorage.storeDataInIndexedDB("garanties", newGarantieData);
      // }

      // // Une fois que la mise à jour est effectuée avec succès, récupérez la liste mise à jour des prospects
      // const updatedAutomobiles = await AppStorage.getAutomobileByUuidContrat(
      //   uuidContrat
      // );

      // Émettre un événement avec les prospects mis à jour
      this.$emit("automobile-add", updatedAutomobiles);

      toaster.success(`Véhicule ajouté avec succès`, {
        position: "top-right",
      });

     
    },
  },
};
</script>