<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />

    <div class="page-wrapper">
      <!-- Page Content -->
      <div class="content container-fluid">
        <!-- Page Header -->
        <div class="page-header">
          <div class="row">
            <div class="col-sm-12">
              <h3 class="page-title">
                Créer une tarification accident individuel
              </h3>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="admin-dashboard-1.html">Tableau de bord</a>
                </li>
                <li class="breadcrumb-item active">Accident individuel</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- /Page Header -->

        <div class="row">
          <div class="col-sm-12">
            <div class="col-xl-12">
              <div class="card">
                <!-- <h4 class="card-title">
                  Proposition de couverture individuelle accident
                </h4> -->
                <div class="card-body">
                  <div class="col-md-12">
                    <div class="row">
                      <!-- Première colonne -->
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-lg-3 col-form-label">
                            <label
                              >Proposant
                              <span class="text-danger">*</span></label
                            >
                          </div>
                          <div class="col-lg-9">
                            <div class="input-block mb-3">
                              <input
                                type="text"
                                placeholder="Nom & prénom"
                                class="form-control"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="input-block mb-3 row">
                          <label class="col-lg-3 col-form-label"
                            >Activité <span class="text-danger">*</span></label
                          >
                          <div class="col-lg-9">
                            <input type="text" class="form-control" placeholder="Activité" />
                          </div>
                        </div>
                        <div class="input-block mb-3 row">
                          <label class="col-lg-3 col-form-label"
                            >Effectif<span class="text-danger">*</span></label
                          >
                          <div class="col-lg-9">
                            <input type="text" class="form-control" placeholder="Effectif" />
                          </div>
                        </div>
                        <div class="input-block mb-3 row">
                          <label class="col-lg-3 col-form-label"
                            >Durée<span class="text-danger">*</span></label
                          >
                          <div class="col-lg-9">
                            <input type="text" class="form-control m-b-20" placeholder="Durée" />
                          </div>
                        </div>
                      </div>

                      <!-- Deuxième colonne -->
                      <div class="col-md-6">
                        <div class="row">
                          <!-- Colonne pour les champs "Capitaux assurés", "Décès" et "IPT" -->
                          <div class="col-lg-12">
                            <div class="row">
                              <!-- Champ "Capitaux assurés" -->
                              <div class="col-lg-3 col-form-label">
                                <label
                                  >Capitaux assurés
                                  <span class="text-danger">*</span></label
                                >
                              </div>
                              <div class="col-lg-9">
                                <div class="input-block mb-3">
                                  <input
                                    type="text"
                                    placeholder="Capitaux assurés"
                                    class="form-control"
                                  />
                                </div>
                              </div>

                              <div class="row">
                                <label class="col-lg-3 col-form-label"></label>
                                <div class="col-lg-9">
                                  <div class="row">
                                    <div class="col-md-6">
                                      <div class="input-block mb-4">
                                        <input
                                          type="text"
                                          placeholder="Décès"
                                          class="form-control"
                                        />
                                      </div>
                                    </div>
                                    <div class="col-md-6">
                                      <div class="input-block mb-4">
                                        <input
                                          type="text"
                                          placeholder="IPT"
                                          class="form-control"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="row">
                                <label class="col-lg-3 col-form-label"></label>
                                <div class="col-lg-9">
                                  <div class="row">
                                    <div class="col-md-6">
                                      <div class="input-block mb-3">
                                        <input
                                          type="text"
                                          placeholder="Frais médicaux"
                                          class="form-control"
                                        />
                                      </div>
                                    </div>
                                    <div class="col-md-6">
                                      <div class="input-block mb-3">
                                        <input
                                          type="text"
                                          placeholder="Prime nette brute/personne"
                                          class="form-control"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="row">
                                <label class="col-lg-3 col-form-label"></label>
                                <div class="col-lg-9">
                                  <div class="row">
                                    <div class="col-md-6">
                                      <div class="input-block mb-3">
                                        <input
                                          type="text"
                                          placeholder="Taux de réduction"
                                          class="form-control"
                                        />
                                      </div>
                                    </div>
                                    <div class="col-md-6">
                                      <div class="input-block mb-3">
                                        <input
                                          type="text"
                                          placeholder="Prime nette reduite/personne"
                                          class="form-control"
                                        />
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

                  <div class="row">
                    <div class="col-md-6">
                      <div class="card-body">
                        <div class="form-group row">
                          <label
                            for="primeNetteAnnuelle"
                            class="col-sm-4 col-form-label"
                            >Prime nette annuelle:</label
                          >
                          <div class="col-sm-8">
                            <input
                              type="number"
                              class="form-control"
                              id="primeNetteAnnuelle"
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label
                            for="accessoires"
                            class="col-sm-4 col-form-label"
                            >Accessoires:</label
                          >
                          <div class="col-sm-8">
                            <input
                              type="number"
                              class="form-control"
                              id="accessoires"
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label for="taxes" class="col-sm-4 col-form-label"
                            >Taxes:</label
                          >
                          <div class="col-sm-8">
                            <input
                              type="number"
                              class="form-control"
                              id="taxes"
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label"
                            ><b>Prime TTC:</b></label
                          >
                          <div class="col-sm-8"></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="card-body">
                        <div class="form-group row">
                          <label
                            for="primeNetteCourteDuree"
                            class="col-sm-4 col-form-label"
                            >Prime nette courte durée:</label
                          >
                          <div class="col-sm-8">
                            <input
                              type="number"
                              class="form-control"
                              id="primeNetteCourteDuree"
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label
                            for="accessoires2"
                            class="col-sm-4 col-form-label"
                            >Accessoires:</label
                          >
                          <div class="col-sm-8">
                            <input
                              type="number"
                              class="form-control"
                              id="accessoires2"
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label for="taxes2" class="col-sm-4 col-form-label"
                            >Taxes:</label
                          >
                          <div class="col-sm-8">
                            <input
                              type="number"
                              class="form-control"
                              id="taxes2"
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label"
                            ><b>Prime TTC:</b></label
                          >
                          <div class="col-sm-8"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="submit-section">
              <!-- <button class="btn btn-primary submit-btn m-r-10">
                Enregistrer & imprimer
              </button> -->
              <button class="btn btn-primary submit-btn">Enregistrer</button>
            </div>
                </div>
              </div>
            </div>

          
          </div>
        </div>
      </div>
      <!-- /Page Content -->
    </div>
  </div>
</template>
  <script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";

export default {
  name: "listprospect",
  components: {
    Header,
    Sidebar,
  },
};
</script>
    