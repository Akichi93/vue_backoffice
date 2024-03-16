<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />
    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Contrats</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>

                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Contrats
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="card mb-0">
              <div class="card-header">
                <h4 class="card-title mb-0">Information personnelle</h4>
              </div>
              <div class="card-body">
                <form action="#">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>N° de la police</label>
                            <input type="text" class="form-control" v-model="form.numero_police"
                              placeholder="Entrez le numéro de police" required />
                            <p style="color: red" class="text-red" v-if="errors.numero_police"
                              v-text="errors.numero_police"></p>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Branche</label>
                            <select class="form-select mb-3" name="type" @change="onChange($event)" id="type"
                              v-model="form.branche_id">
                              <option v-for="branche in branches" :value="branche" :key="branche.uuidBranche">
                                {{ branche.nom_branche }}
                              </option>
                            </select>
                            <p style="color: red" class="text-red" v-if="errors.branche_id" v-text="errors.branche_id">
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6" v-if="form.branche_id != 0">
                          <div class="form-group">
                            <label>Compagnie:</label>
                            <compagniecomponent :placeholder="'selectionnez la compagnie'" @select="optionSelected"
                              v-model="form.compagnie_id"></compagniecomponent>

                            <p style="color: red" class="text-red" v-if="errors.compagnie_id"
                              v-text="errors.compagnie_id"></p>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Date d'émission:</label>
                            <input type="date" class="form-control" v-model="form.souscrit_le" />
                            <p style="color: red" class="text-red" v-if="errors.souscrit_le"
                              v-text="errors.souscrit_le">
                            </p>

                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>A:</label>
                            <input type="time" class="form-control" v-model="form.heure_police" />
                            <p style="color: red" class="text-red" v-if="errors.heure_police"
                              v-text="errors.heure_police"></p>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Expire le:</label>
                            <input type="date" class="form-control" v-model="form.expire_le" />
                            <p style="color: red" class="text-red" v-if="errors.expire_le" v-text="errors.expire_le">
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Client:</label>
                            <Multiselect v-model="form.client_id" :options="clients" :custom-label="({ uuidClient, nom_client }) =>
                              `${uuidClient} - [${nom_client}]`
                              " valueProp="uuidClient" :placeholder="placeholder" label="nom_client"
                              track-by="nom_client" :searchable="true">
                            </Multiselect>
                            <p style="color: red" class="text-red" v-if="errors.client_id" v-text="errors.client_id">
                            </p>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                              data-bs-target="#add_client" style="margin-top: 25px">
                              Ajouter client
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6" v-if="form.branche_id != 0">
                          <div class="form-group">
                            <label>Apporteur:</label>
                            <apporteurcomponent :placeholder="'selectionnez un apporteur'" @select="optionSelect"
                              v-model="form.apporteur_id"></apporteurcomponent>
                            <p style="color: red" class="text-red" v-if="errors.apporteur_id"
                              v-text="errors.apporteur_id"></p>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Effet de police</label>
                            <input type="date" class="form-control" v-model="form.effet_police" />
                            <p style="color: red" class="text-red" v-if="errors.effet_police"
                              v-text="errors.effet_police"></p>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Reconduction</label>
                            <Multiselect v-model="form.reconduction" :options="reconducts"
                              placeholder="Choisir la reconduction" :searchable="false" />
                            <p style="color: red" class="text-red" v-if="errors.reconduction"
                              v-text="errors.reconduction"></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="card tab-box mt-3" v-if="form.branche_id.nom_branche == 'AUTOMOBILE' ||
                              form.branche_id.nom_branche == 'MOTO' ||
                              form.branche_id.nom_branche == 'AUTOMOBILE HORS TPV' ||
                              form.branche_id.nom_branche == 'AUTOMOBILE TPV'
                              ">
          <div class="row user-tabs">
            <div class="col-lg-12 col-md-12 col-sm-12 line-tabs">
              <ul class="nav nav-tabs nav-tabs-bottom pt-3 pb-2">
                <li class="nav-item">
                  <a href="#emp_profile" data-bs-toggle="tab" class="nav-link active">Carte grise</a>
                </li>
                <li class="nav-item">
                  <a href="#emp_projects" data-bs-toggle="tab" class="nav-link">Garantie</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="tab-content" v-if="form.branche_id.nom_branche == 'AUTOMOBILE' ||
                              form.branche_id.nom_branche == 'MOTO' ||
                              form.branche_id.nom_branche == 'AUTOMOBILE HORS TPV' ||
                              form.branche_id.nom_branche == 'AUTOMOBILE TPV'
                              ">
          <div id="emp_profile" class="pro-overview tab-pane fade show active">
            <div class="row">
              <div class="col-md-12">
                <div class="card mb-0">
                  <div class="card-header">
                    <h4 class="card-title mb-0">Carte grise</h4>
                  </div>
                  <div class="card-body">

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>N° d'immatriculation:</label>
                          <input type="text" class="form-control" v-model="form.numero_immatriculation" />
                          <p style="color: red" class="text-red" v-if="errors.numero_immatriculation"
                            v-text="errors.numero_immatriculation">
                          </p>
                        </div>
                        <div class="form-group">
                          <label>Date de 1ère mise en circulation:</label>
                          <input type="date" class="form-control" v-model="date_circulation" />
                        </div>
                        <div class="form-group">
                          <label>Identification du proprietaire:</label>
                          <input type="text" class="form-control" v-model="identification_proprietaire" />
                        </div>
                        <div class="form-group">
                          <label>Adresse du propriétaire:</label>
                          <input type="text" class="form-control" v-model="adresse_proprietaire" />
                        </div>
                        <div class="row">
                          <div class="col-md-9">
                            <div class="form-group">
                              <label>Zone de circulation:</label>
                              <Multiselect v-model="zone" :options="localisations" :custom-label="({ uuidLocalisation, nom_ville }) =>
                              `${uuidLocalisation} - [${nom_ville}]`
                              " valueProp="nom_ville" placeholder="Selectionnez zone" label="nom_ville"
                                track-by="nom_ville" :searchable="true">
                              </Multiselect>
                            </div>
                          </div>
                          <div class="col-md-3">
                            <div class="form-group">
                              <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#addProspect" style="margin-top: 25px">
                                Ajouter
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-9">
                            <div class="form-group">
                              <label>Catégorie d'usage:</label>
                              <Multiselect v-model="categorie_id" :options="categories" :custom-label="({ uuidCategorie, categorie }) =>
                              `${uuidCategorie} - [${categorie}]`
                              " valueProp="categorie" placeholder="Selectionnez une catégorie" label="categorie"
                                track-by="categorie" :searchable="true">
                              </Multiselect>
                            </div>
                          </div>
                          <div class="col-md-3">
                            <div class="form-group">
                              <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#addCategorie" style="margin-top: 25px">
                                Ajouter
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-9">
                            <div class="form-group">
                              <label>Marque:</label>
                              <Multiselect v-model="marque_id" :options="marques" :custom-label="({ uuidMarque, marque }) =>
                              `${uuidMarque} - [${marque}]`
                              " valueProp="marque" placeholder="Selectionnez une marque" label="marque"
                                track-by="marque" :searchable="true">
                              </Multiselect>
                            </div>
                          </div>
                          <div class="col-md-3">
                            <div class="form-group">
                              <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#addMarque" style="margin-top: 25px">
                                Ajouter
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-9">
                            <div class="form-group">
                              <label>Genre:</label>
                              <Multiselect v-model="genre_id" :options="genres" :custom-label="({ uuidGenre, genre }) =>
                              `${uuidGenre} - [${genre}]`
                              " valueProp="genre" placeholder="Selectionnez un genre" label="genre" track-by="genre"
                                :searchable="true">
                              </Multiselect>
                            </div>
                          </div>
                          <div class="col-md-3">
                            <div class="form-group">
                              <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#addGenre" style="margin-top: 25px">
                                Ajouter
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="form-group">
                          <label>Type technique ou commercial:</label>
                          <typecomponent :placeholder="'Choisir un type'" v-model="type">
                          </typecomponent>
                        </div>
                        <div class="form-group">
                          <label>Carrosserie:</label>
                          <input type="text" class="form-control" v-model="carosserie" />
                        </div>
                        <div class="row">
                          <div class="col-md-9">
                            <div class="form-group">
                              <label>Couleur:</label>
                              <Multiselect v-model="couleur_id" :options="couleurs" :custom-label="({ uuidCouleur, couleur }) =>
                              `${uuidCouleur} - [${couleur}]`
                              " valueProp="couleur" placeholder="Selectionnez une couleur" label="couleur"
                                track-by="couleur" :searchable="true">
                              </Multiselect>
                            </div>
                          </div>
                          <div class="col-md-3">
                            <div class="form-group">
                              <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#addCouleur" style="margin-top: 25px">
                                Ajouter
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-6">
                            <div class="form-group">
                              <label>Energie:</label>
                              <Multiselect v-model="energie_id" :options="energies" :custom-label="({ uuidEnergie, energie }) =>
                              `${uuidEnergie} - [${energie}]`
                              " valueProp="energie" placeholder="Selectionnez une energie" label="energie"
                                track-by="energie" :searchable="true">
                              </Multiselect>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#addEnergie" style="margin-top: 25px">
                                Ajouter
                              </button>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-12">
                            <div class="form-group">
                              <label>Places assises:</label>
                              <input type="text" class="form-control" v-model="place" />
                            </div>
                            <div class="form-group">
                              <label>Puissance fiscale:</label>
                              <input type="text" class="form-control" v-model="puissance" />
                            </div>

                            <div class="form-group">
                              <label>Charge utile(kg):</label>
                              <input type="text" class="form-control" v-model="charge" />
                            </div>

                            <div class="form-group">
                              <label>Valeur à neuf:</label>
                              <input type="number" class="form-control" v-model="valeur_neuf" />
                            </div>

                            <div class="form-group">
                              <label>Valeur vénale:</label>
                              <input type="number" class="form-control" v-model="valeur_venale" />
                            </div>
                            <div class="card">
                              <div class="card-header">
                                <h4 class="card-title mb-0">
                                  Information sur le conducteur
                                </h4>
                              </div>
                              <div class="card-body">
                                <form action="#">
                                  <div class="form-group">
                                    <label>Catégorie socio-professionelle</label>
                                    <input type="text" class="form-control" v-model="categorie_socio_pro" />
                                  </div>

                                  <div class="form-group">
                                    <label>Ancienneté du permis</label>
                                    <input type="number" class="form-control" v-model="permis" />
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tab-pane fade" id="emp_projects">
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
                              <input class="form-check-input" type="radio" name="flexRadioDefault"
                                id="flexRadioDefault2" v-model="tierce" value="Tierce complete" />
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
                              <input class="form-check-input" type="radio" name="flexRadioDefault"
                                id="flexRadioDefault3" v-model="tierce" value="Tierce collision" />
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
                              <input class="form-check-input" type="radio" name="flexRadioDefault"
                                id="flexRadioDefault4" v-model="tierce" value="dommage" />
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

                            <div class="col-lg-3 col-md-6" id="garantie10">
                              <div class="mt-4 mt-md-0">
                                <div>
                                  <div class="form-check form-check-right">
                                    <input class="form-check-input" type="checkbox" name="checked[]"
                                      value="Bris de glaces" v-model="typegarantie" id="checkbox10" />
                                    <label class="form-check-label" for="checkbox10">
                                      Bris de glaces
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="col-lg-3 col-md-6" id="garantie10">
                              <div class="mt-4 mt-md-0">
                                <div>
                                  <div class="form-check form-check-right">
                                    <input class="form-check-input" type="checkbox" name="checked[]" value="Assistance"
                                      v-model="typegarantie" id="checkbox10" />
                                    <label class="form-check-label" for="checkbox10">
                                      Assistance
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
          </div>
        </div>

        <div class="row" style="margin-top: 15px">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title mb-0">Primes</h4>
              </div>
              <div class="card-body">

                <div class="form-group">
                  <label>Prime nette</label>
                  <input type="number" class="form-control" v-model="form.primes_nette" @input="handleInput" />
                  <p style="color: red" class="text-red" v-if="errors.primes_nette" v-text="errors.primes_nette"></p>
                </div>
                <div class="form-group">
                  <label>Accessoires</label>
                  <input type="number" class="form-control" v-model="form.accessoires" />
                  <p style="color: red" class="text-red" v-if="errors.accessoires" v-text="errors.accessoires"></p>
                </div>
                <div class="form-group">
                  <label>Frais courtier</label>
                  <input type="number" class="form-control" v-model="form.frais_courtier" />
                  <p style="color: red" class="text-red" v-if="errors.frais_courtier" v-text="errors.frais_courtier">
                  </p>
                </div>
                <div class="form-group" v-if="form.branche_id.nom_branche == 'AUTOMOBILE' ||
                              form.branche_id.nom_branche == 'MOTO' || form.branche_id.nom_branche == 'AUTOMOBILE HORS TPV' ||
                              form.branche_id.nom_branche == 'AUTOMOBILE TPV'
                              ">
                  <label>FGA</label>
                  <input type="number" class="form-control" v-model="cfga" />
                </div>
                <div class="form-group">
                  <label>Taxes totales</label>
                  <input type="number" class="form-control" v-model="form.taxes_totales" />
                  <p style="color: red" class="text-red" v-if="errors.taxes_totales" v-text="errors.taxes_totales"></p>
                </div>
                <div class="form-group">
                  <b> <label>Prime TTC</label></b>
                  <br>
                  <div>
                    {{ primeTTC }}
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title mb-0">Commission</h4>
              </div>
              <div class="card-body">
                <form action="#">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Commission courtier:</label>
                            <input type="text" class="form-control" v-model="tauxcomp.tauxcomp" disabled />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            {{ calulateCommissionCompagnie }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Gestion</label>
                    <input type="text" class="form-control" v-model="gestion" />
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Commission apporteur:</label>
                            <input type="text" class="form-control" v-model="taux.taux" disabled />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            {{ calulateCommissionApporteur }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>



        <div class="submit-section">
          <button class="btn btn-primary submit-btn" @click="storeContrat">
            Enregistrer
          </button>
        </div>

        <addadresse @adresse-add="handleClientsChange"></addadresse>
        <addcategorie @categorie-add="handleCategorieChange"></addcategorie>
        <addenergie @energie-add="handleEnergieChange"></addenergie>
        <addcouleur @couleur-add="handleCouleurChange"></addcouleur>
        <addgenre @genre-add="handleGenreChange"></addgenre>
        <addmarque @marque-add="handleMarqueChange"></addmarque>
        <addclient @client-add="refresh"></addclient>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import compagniecomponent from "../../components/select/compagniecomponent.vue";
import apporteurcomponent from "../../components/select/apporteurcomponent.vue";
import branchecomponent from "../../components/select/branchecomponent.vue";
import typecomponent from "../../components/select/typecomponent.vue";
import addadresse from "../../pages/form/addadresse.vue";
import addcategorie from "../../pages/form/addcategorie.vue";
import addenergie from "../../pages/form/addenergie.vue";
import addgenre from "../../pages/form/addgenre.vue";
import addcouleur from "../../pages/form/addcouleur.vue";
import addmarque from "../../pages/form/addmarque.vue";
import addclient from "../../pages/clients/addclient.vue";
import AppStorage from '../../db/AppStorage';
import { apiUrl } from "../../utils/constants/apiUrl";
import { v4 as uuidv4 } from 'uuid';
import { validateContratForm } from '../../utils/helpers/formValidation';
import { calculateCommissionApporteur, calculateCommissionCompagnie } from '../../utils/helpers/commisionHelpers';
import {
  getCategoriesList,
} from "../../services/formService";

import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({
  /* options */
});
export default {
  name: "addcontrat",
  components: {
    Multiselect,
    Header,
    Sidebar,
    compagniecomponent,
    apporteurcomponent,
    branchecomponent,
    addadresse,
    addcategorie,
    addenergie,
    addgenre,
    addcouleur,
    addmarque,
    typecomponent,
    addclient,
  },
  data() {
    return {
      value: null,
      errors: [],
      typegarantie: [],
      branches: [],
      clients: [],
      localisations: [],
      categories: [],
      marques: [],
      genres: [],
      couleurs: [],
      energies: [],


      form: {

        // Contrat form
        branche_id: "",
        compagnie_id: "",
        apporteur_id: "",
        client_id: "",
        numero_police: "",
        souscrit_le: "",
        effet_police: "",
        heure_police: "",
        expire_le: "",
        reconduction: "",

        //Automobile
        numero_immatriculation: "",

        // Primes
        primes_nette: 0,
        frais_courtier: 0,
        accessoires: 0,
        taxes_totales: 0,

      },



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
      tierce: "",

      cfga: 0,

      prime_ttc: 0,
      commission: "",
      gestion: "",
      commission_apporteur: "",
      taux_courtier: "",
      taux_apporteur: "",
      tauxcomp: "",
      taux: "",
      calulateCommissionApporteur: "",
      calulateCommissionCompagnie: "",

      reconducts: ["Oui", "Non"],
    };
  },
  created() {
    this.getBranche();
    this.getClients();
    this.getAdresse();
    this.getCategorie();
    this.getMarque();
    this.getGenre();
    this.getCouleur();
    this.getEnergie();
  },
  computed: {
    primeTTC() {
      // Calculer la prime TTC
      return parseFloat(this.form.primes_nette) +
        parseFloat(this.form.accessoires) +
        parseFloat(this.form.frais_courtier) +
        parseFloat(this.cfga) +
        parseFloat(this.form.taxes_totales);
    }
  },
  methods: {

    async getBranche() {
      AppStorage.getBranches().then((result) => {
        this.branches = result;
      });
    },

    async getClients() {
      AppStorage.getClients().then((result) => {
        this.clients = result;
      });
    },

    async getAdresse() {
      AppStorage.getLocalisations().then((result) => {
        this.localisations = result;
      });
    },

    async getCategorie() {
      AppStorage.getCategories().then((result) => {
        this.categories = result;
      });
    },

    async getMarque() {
      AppStorage.getMarques().then((result) => {
        this.marques = result;
      });
    },

    async getGenre() {
      AppStorage.getGenres().then((result) => {
        this.genres = result;
      });
    },

    async getCouleur() {
      AppStorage.getCouleurs().then((result) => {
        this.couleurs = result;
      });
    },

    async getEnergie() {
      AppStorage.getEnergies().then((result) => {
        this.energies = result;
      });
    },

    // calculate() {

    // },



    onChange(event) {
      // console.log(event.target.value);
      // alert(event.target.value)
    },

    async optionSelected(option) {
      // Récupérer les identifiants de la branche
      const id_branche = this.form.branche_id.uuidBranche;

      try {
        // Utiliser la méthode pour obtenir le taux en fonction de l'id de la branche et de l'option sélectionnée
        const taux = await AppStorage.getTauxParIdBrancheEtCompagnie(id_branche, option);

        // Faire quelque chose avec le taux récupéré
        if (taux) {
          // Faire quelque chose avec le taux trouvé, par exemple, affecter à une propriété
          this.tauxcomp = taux;
        } else {
          // Gérer le cas où aucun taux correspondant n'est trouvé
          console.log("Aucun taux trouvé pour la branche et la compagnie sélectionnées.");
        }

        // Autres actions que vous souhaitez effectuer après avoir obtenu le taux
      } catch (error) {
        // Gérer les erreurs potentielles lors de la résolution de la promesse
        console.error("Erreur lors de la récupération du taux :", error);
      }
    },

    async optionSelect(optional) {

      // Récupérer les identifiants de la branche
      const id_branche = this.form.branche_id.uuidBranche;

      try {
        // Utiliser la méthode pour obtenir le taux en fonction de l'id de la branche et de l'option sélectionnée
        const taux = await AppStorage.getTauxParIdBrancheEtApporteur(id_branche, optional);

        // Faire quelque chose avec le taux récupéré
        if (taux) {
          // Faire quelque chose avec le taux trouvé, par exemple, affecter à une propriété
          this.taux = taux;
        } else {
          // Gérer le cas où aucun taux correspondant n'est trouvé
          console.log("Aucun taux trouvé pour la branche et l'apporteur sélectionnés.");
        }
      } catch (error) {
        // Gérer les erreurs potentielles lors de la résolution de la promesse
        console.error("Erreur lors de la récupération du taux :", error);
      }
    },

    // async checkInternetConnection() {
    //   const response = await fetch("/api/check-internet-connection");
    //   const data = await response.json();
    //   return data.connected;
    // },

    async storeContrat() {
      // const isConnected = await this.checkInternetConnection();

      // if (isConnected) {
      //   await this.storeContratOnline();
      // } else {
      await this.storeContratOffline();
      // }
    },

    // async storeContratOnline() {
    //   try {
    //     const uuid = require('uuid').v4();
    //     const userId = parseInt(AppStorage.getId(), 10);
    //     const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);

    //     const response = await axios.post(apiUrl.postcontrat, {
    //       id: userId,
    //       uuidContrat: uuid,
    //       id_entreprise: entrepriseId,
    //       id_branche: this.branche_id.uuidBranche,
    //       branche: this.branche_id.nom_branche,
    //       id_client: this.client_id,
    //       id_compagnie: this.compagnie_id,
    //       id_apporteur: this.apporteur_id,
    //       numero_police: this.numero_police,
    //       effet_police: this.effet_police,
    //       heure_police: this.heure_police,
    //       expire_le: this.expire_le,
    //       souscrit_le: this.souscrit_le,
    //       reconduction: this.reconduction,
    //       //Automobile
    //       numero_immatriculation: this.numero_immatriculation,
    //       date_circulation: this.date_circulation,
    //       identification_proprietaire: this.identification_proprietaire,
    //       adresse_proprietaire: this.adresse_proprietaire,
    //       zone: this.zone,
    //       categorie_id: this.categorie_id,
    //       marque_id: this.marque_id,
    //       genre_id: this.genre_id,
    //       type: this.type,
    //       carosserie: this.carosserie,
    //       couleur_id: this.couleur_id,
    //       energie_id: this.energie_id,
    //       place: this.place,
    //       puissance: this.puissance,
    //       charge: this.charge,
    //       valeur_neuf: this.valeur_neuf,
    //       valeur_venale: this.valeur_venale,
    //       categorie_socio_pro: this.categorie_socio_pro,
    //       permis: this.permis,
    //       option: this.option_garantie,
    //       entree: this.entree_le,
    //       garantie: this.typegarantie,
    //       tierce: this.tierce,
    //       prime_nette: this.primes_nette,
    //       accessoires: this.accessoires,
    //       frais_courtier: this.frais_courtier,
    //       cfga: this.cfga,
    //       taxes_totales: this.taxes_totales,
    //       commission_courtier:
    //         this.primes_nette * this.tauxcomp.tauxcomp * 0.01,
    //       commission_apporteur:
    //         this.primes_nette *
    //         this.taux.taux *
    //         0.01 *
    //         this.tauxcomp.tauxcomp *
    //         0.01,
    //       gestion: this.gestion,
    //       primes_ttc:
    //         this.primes_nette +
    //         this.frais_courtier +
    //         this.accessoires +
    //         this.cfga +
    //         this.taxes_totales,
    //     });

    //     const updatedContrats = await this.fetchContrats();

    //     if (response.status === 200) {
    //       toaster.success(`Contrat ajouté avec succès`, { position: "top-right" });
    //       this.contrats = response.data;
    //       this.$router.push("/listcontrat");
    //     }

    //     // Mettre à jour IndexedDB avec les contrats récupérés après comparaison
    //     AppStorage.getContrats().then((existingContrats) => {
    //       if (existingContrats && updatedContrats) {
    //         // Comparaison des nouvelles contrats avec ceux déjà existants
    //         const newContrats = updatedContrats.filter((compagnie) => {
    //           return !existingContrats.some((existingContrat) => existingContrat.id_contrat === compagnie.id_contrat);
    //         });

    //         // Insérer uniquement les nouvelles contrats dans IndexedDB
    //         if (newContrats.length > 0) {
    //           AppStorage.storeDataInIndexedDB('contrats', newContrats);
    //         }
    //       }
    //     });

    //     // Mettre à jour IndexedDB avec l'avenant récupéré

    //     const newAvenant = response.data;

    //     AppStorage.storeDataInIndexedDB('avenants', newAvenant);

    //   } catch (error) {
    //     this.handleStoreContratError(error);
    //   }
    // },


    handleInput() {
      this.calulateCommissionApporteur = calculateCommissionApporteur({ tauxcomp: this.tauxcomp.tauxcomp, primes_nette: this.form.primes_nette, taux: this.taux.taux });
      this.calulateCommissionCompagnie = calculateCommissionCompagnie({ tauxcomp: this.tauxcomp.tauxcomp, primes_nette: this.form.primes_nette })
    },

    getFormattedDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      return year + month + day;
    },

    generateCodevenant() {
      let dateDuJour = this.getFormattedDate();
      return "AV-" + dateDuJour;
    },

    async storeContratOffline() {
      try {

        this.errors = validateContratForm(this.form);

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

          const clientName = await AppStorage.getClientNameByUUID(this.form.client_id);
          const clientCode = await AppStorage.getClientCodeByUUID(this.form.client_id);
          const compagnieName = await AppStorage.getCompagnieNameByUUID(this.form.compagnie_id);
          const apporteurName = await AppStorage.getApporteurNameByUUID(this.form.apporteur_id);

          const newContratData = [{
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
            commission_courtier:
              this.calulateCommissionCompagnie,
            commission_apporteur:
              this.calulateCommissionApporteur,
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

          }];

          // Enregistré les contrats dans IndexedDB
          await AppStorage.storeDataInIndexedDB("contrats", newContratData);

          // Enregistré les avenants dans IndexedDB
          let type = 'Terme'

          const [annee, mois, day] = this.form.souscrit_le.split('-');

          let codeAvenant = this.generateCodevenant();


          let totalPrimeTtc =
            this.form.primes_nette +
            this.form.frais_courtier +
            this.form.accessoires +
            this.cfga +
            this.form.taxes_totales;

          const calculateCommission = () => {
            return this.form.primes_nette *
              this.taux.taux *
              0.01 *
              this.tauxcomp.tauxcomp *
              0.01;
          };

          const calculateCommissionCourtier = () => {
            return this.form.primes_nette * this.tauxcomp.tauxcomp * 0.01;
          };

          const uuidAvenant = uuidv4();

          const newAvenantsData = [{
            uuidContrat: uuid,
            annee: annee,
            mois: mois,
            type: type,
            nom_client: clientName,
            nom_branche: this.form.branche_id.nom_branche,
            nom_compagnie: compagnieName,
            numero_police: this.form.numero_police,
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
            sync: 0,
            solder: 0,
            reverser: 0,
            payer_apporteur: 0,
            payer_courtier: 0,
            supprimer_avenant: 0,
            id_entreprise: entrepriseId,
          }];

          // Enregistré les avenants dans IndexedDB
          await AppStorage.storeDataInIndexedDB("avenants", newAvenantsData);

          if (this.form.branche_id.nom_branche == "AUTOMOBILE" || this.form.branche_id.nom_branche == "MOTO" || this.form.branche_id.nom_branche == "MOTO" ||
            form.branche_id.nom_branche == 'AUTOMOBILE HORS TPV' ||
            form.branche_id.nom_branche == 'AUTOMOBILE TPV') {

            const uuidAutomobile = uuidv4();

            const newAutomobileData = [{
              uuidAutomobile: uuidAutomobile,
              uuidContrat: uuid,
              numero_immatriculation: this.form.numero_immatriculation,
              date_circulation: this.date_circulation,
              identification_proprietaire: this.identification_proprietaire,
              adresse_proprietaire: this.adresse_proprietaire,
              zone: this.zone,
              categorie: this.categorie_id,
              marque: this.marque_id,
              genre_id: this.genre_id,
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
              option: this.option_garantie,
              entree: this.entree_le,
              tierce: this.tierce,
              prime_nette: this.primes_nette,
              accessoires: this.accessoires,
              frais_courtier: this.frais_courtier,
              cfga: this.cfga,
              taxes_totales: this.taxes_totales,
              commission_courtier: calculateCommissionCourtier(),
              commission_apporteur: calculateCommission(),
              gestion: this.gestion,
              primes_ttc: totalPrimeTtc,
              sync: 0,
              supprimer_automobile: 0,
              id_entreprise: entrepriseId,
            }];

            await AppStorage.storeDataInIndexedDB("automobiles", newAutomobileData);

            let test = JSON.parse(JSON.stringify(this.typegarantie));
            let donnees = [];

            for (let i = 0; i < Object.keys(test).length; i++) {
              donnees.push(test[i]);
            }


            for (let i = 0; i < donnees.length; i++) {

              // Générer un UUID unique
              const uuidGarantie = uuidv4();

              const newGarantieData = [{
                uuidGarantie: uuidGarantie,
                uuidAutomobile: uuidAutomobile,
                nom_garantie: donnees[i],
                sync: 0,
                id_entreprise: entrepriseId,
              }];

              await AppStorage.storeDataInIndexedDB("garanties", newGarantieData);
            }

          }

          toaster.success(`Contrat ajouté`, { position: "top-right" });

          this.$router.push("/listcontrat");
        }

      } catch (error) {
        console.error("Error storing contract offline:", error);
      }
    },

    // handleStoreContratError(error) {
    //   if (error.response && error.response.status === 422) {
    //     toaster.error(`Veuillez remplir les champs indiqués`, { position: "top-right" });
    //     this.errors = error.response.data.errors;
    //   } else if (error.request) {
    //     console.log("Request error:", error.request);
    //   } else {
    //     console.log("Error:", error.message);
    //   }
    // },

    // fetchContrats
    // async fetchContrats() {
    //   const token = AppStorage.getToken();

    //   // Configurez les en-têtes de la requête
    //   const headers = {
    //     Authorization: "Bearer " + token,
    //     "x-access-token": token,
    //   };

    //   try {
    //     const response = await axios.get(apiUrl.getcontrat, { headers });

    //     // Vous pouvez traiter les données comme vous le souhaitez
    //     const contrats = response.data;

    //     // Retourner les contrats pour une utilisation éventuelle
    //     return contrats;
    //   } catch (error) {
    //     console.error("Erreur lors de la récupération des clients sur le serveur", error);
    //   }
    // },


    // async storeContrat() {
    //   alert(this.branche_id.uuidBranche)
    //   const response = await fetch(
    //     "/api/check-internet-connection"
    //   );

    //   const data = await response.json();

    //   this.isConnected = data.connected;

    //   if (this.isConnected) {

    //     const { v4: uuidv4 } = require('uuid');
    //     const uuid = uuidv4();
    //     const userId = AppStorage.getId();
    //     const entrepriseId = AppStorage.getEntreprise();

    //     axios
    //       .post("/api/auth/postContrat", {
    //         //Contrat
    //         id: userId,
    //         uuidContrat: uuid,
    //         id_entreprise: entrepriseId,
    //         id_branche: this.branche_id.uuidBranche,
    //         branche: this.branche_id.nom_branche,
    //         id_client: this.client_id,
    //         id_compagnie: this.compagnie_id,
    //         id_apporteur: this.apporteur_id,
    //         numero_police: this.numero_police,
    //         effet_police: this.effet_police,
    //         heure_police: this.heure_police,
    //         expire_le: this.expire_le,
    //         souscrit_le: this.souscrit_le,
    //         reconduction: this.reconduction,
    //         //Automobile
    //         numero_immatriculation: this.numero_immatriculation,
    //         date_circulation: this.date_circulation,
    //         identification_proprietaire: this.identification_proprietaire,
    //         adresse_proprietaire: this.adresse_proprietaire,
    //         zone: this.zone,
    //         categorie_id: this.categorie_id,
    //         marque_id: this.marque_id,
    //         genre_id: this.genre_id,
    //         type: this.type,
    //         carosserie: this.carosserie,
    //         couleur_id: this.couleur_id,
    //         energie_id: this.energie_id,
    //         place: this.place,
    //         puissance: this.puissance,
    //         charge: this.charge,
    //         valeur_neuf: this.valeur_neuf,
    //         valeur_venale: this.valeur_venale,
    //         categorie_socio_pro: this.categorie_socio_pro,
    //         permis: this.permis,
    //         option: this.option_garantie,
    //         entree: this.entree_le,
    //         garantie: this.typegarantie,
    //         tierce: this.tierce,
    //         prime_nette: this.primes_nette,
    //         accessoires: this.accessoires,
    //         frais_courtier: this.frais_courtier,
    //         cfga: this.cfga,
    //         taxes_totales: this.taxes_totales,
    //         commission_courtier:
    //           this.primes_nette * this.tauxcomp.tauxcomp * 0.01,
    //         commission_apporteur:
    //           this.primes_nette *
    //           this.taux.taux *
    //           0.01 *
    //           this.tauxcomp.tauxcomp *
    //           0.01,
    //         gestion: this.gestion,
    //         primes_ttc:
    //           this.primes_nette +
    //           this.frais_courtier +
    //           this.accessoires +
    //           this.cfga +
    //           this.taxes_totales,
    //       })
    //       .then((response) => {
    //         if (response.status === 200) {
    //           toaster.success(`Contrat ajouté avec succès`, {
    //             position: "top-right",
    //           });
    //           this.contrats = response.data;
    //         }
    //         this.$router.push("/listcontrat");
    //       })
    //       .catch((error) => {
    //         if (error.response.status === 422) {
    //           toaster.error(`Veuillez remplir les champs indiqués`, {
    //             position: "top-right",
    //           });
    //           this.errors = error.response.data.errors;
    //           // console.log("Message non enregisté")
    //         } else if (error.request) {
    //           // The request was made but no response was received
    //           console.log(error.request);
    //         } else {
    //           // Something happened in setting up the request that triggered an Error
    //           console.log("Error", error.message);
    //         }
    //       });
    //   } else {
    //     const { v4: uuidv4 } = require('uuid');
    //     const uuid = uuidv4();

    //     const userId = parseInt(AppStorage.getId(), 10);
    //     const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);

    //     // Si hors ligne, ajoutez la nouvelle donnée directement dans IndexedDB
    //     const newContratData = [{
    //       id: userId,
    //       uuidContrat: uuid,
    //       id_entreprise: entrepriseId,
    //       id_branche: this.branche_id.uuidBranche,
    //       branche: this.branche_id.nom_branche,
    //       id_client: this.client_id,
    //       id_compagnie: this.compagnie_id,
    //       id_apporteur: this.apporteur_id,
    //       numero_police: this.numero_police,
    //       effet_police: this.effet_police,
    //       heure_police: this.heure_police,
    //       expire_le: this.expire_le,
    //       souscrit_le: this.souscrit_le,
    //       reconduction: this.reconduction,
    //       prime_nette: this.primes_nette,
    //       accessoires: this.accessoires,
    //       frais_courtier: this.frais_courtier,
    //       cfga: this.cfga,
    //       taxes_totales: this.taxes_totales,
    //       commission_courtier:
    //         this.primes_nette * this.tauxcomp.tauxcomp * 0.01,
    //       commission_apporteur:
    //         this.primes_nette *
    //         this.taux.taux *
    //         0.01 *
    //         this.tauxcomp.tauxcomp *
    //         0.01,
    //       gestion: this.gestion,
    //       primes_ttc:
    //         this.primes_nette +
    //         this.frais_courtier +
    //         this.accessoires +
    //         this.cfga +
    //         this.taxes_totales,
    //     }];

    //     // Ajouter la nouvelle donnée dans IndexedDB
    //     await AppStorage.storeDataInIndexedDB("contrats", newContratData);

    //     toaster.info(`Contrat ajouté localement (hors ligne)`, {
    //       position: "top-right",
    //     });
    //   }
    // },

    calculttc: function (event) {
      alert(this.event.target.value);
    },

    refresh() {
      // Récupérer les clients depuis IndexedDB après l'ajout d'un nouveau client
      AppStorage.getClients().then((result) => {
        this.clients = result;
      });
    },

    handleClientsChange() {
      AppStorage.getLocalisations().then((result) => {
        this.localisations = result;
      });
    },

    handleCategorieChange() {
      AppStorage.getCategories().then((result) => {
        this.categories = result;
      });
    },

    handleMarqueChange() {
      AppStorage.getMarques().then((result) => {
        this.marques = result;
      });

    },

    handleGenreChange() {
      AppStorage.getGenres().then((result) => {
        this.genres = result;
      });
    },

    handleCouleurChange() {
      AppStorage.getCouleurs().then((result) => {
        this.couleurs = result;
      });
    },

    handleEnergieChange() {
      AppStorage.getEnergies().then((result) => {
        this.energies = result;
      });
    },
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
