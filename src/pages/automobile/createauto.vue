<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />
    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="page-header">
          <div class="row">
            <div class="col-sm-12">
              <h3 class="page-title">Creer tarification automobile</h3>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/home">Tableau de bord</router-link>
                </li>
                <li class="breadcrumb-item active">
                  Creer tarification automobile
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="card mb-0">
              <div class="card-header">
                <h4 class="card-title mb-0">Information</h4>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-6 col-md-3">
                    
                      <label class="col-lg-3 col-form-label">Cie</label>
                      <div class="col-lg-9">
                        <Multiselect v-model="zone" :options="localisations" valueProp="nom_ville"
                          placeholder="Selectionnez zone" label="nom_ville" track-by="nom_ville" :searchable="true">
                        </Multiselect>
                      </div>
                  
                  </div>
                  <div class="col-sm-3 col-md-3">
                    <div class="input-block mb-3 row">
                      <label class="col-lg-3 col-form-label">Code tarif</label>
                      <div class="col-lg-9">
                        <Multiselect v-model="zone" :options="localisations" valueProp="nom_ville"
                          placeholder="Selectionnez zone" label="nom_ville" track-by="nom_ville" :searchable="true">
                        </Multiselect>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-3">
                    <div class="input-block mb-3 row">
                      <label class="col-lg-3 col-form-label">Catégorie</label>
                      <div class="col-lg-9">
                        <Multiselect v-model="zone" :options="localisations" valueProp="nom_ville"
                          placeholder="Selectionnez zone" label="nom_ville" track-by="nom_ville" :searchable="true">
                        </Multiselect>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-3">
                    <div class="input-block mb-6 row">
                      <label class="col-lg-3 col-form-label">Police</label>
                      <div class="col-lg-9">
                        <Multiselect v-model="zone" :options="localisations" valueProp="nom_ville"
                          placeholder="Selectionnez zone" label="nom_ville" track-by="nom_ville" :searchable="true">
                        </Multiselect>
                      </div>
                    </div>
                  </div>
                </div>
              
                <div class="row">

                  <div class="col-sm-6 col-md-3">
                    <div class="input-block mb-3 row">
                      <label class="col-lg-3 col-form-label">Zone</label>
                      <div class="col-lg-9">
                        <Multiselect v-model="zone" :options="localisations" valueProp="nom_ville"
                          placeholder="Selectionnez zone" label="nom_ville" track-by="nom_ville" :searchable="true">
                        </Multiselect>
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
                <h4 class="card-title mb-0">Véhicules</h4>
              </div>
              <div class="card-body">
                <div class="form-group">
                  <label>Marque</label>
                  <input type="number" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Type</label>
                  <input type="number" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Immat</label>
                  <input type="number" class="form-control" />
                </div>
                <div class="form-group">
                  <label>N chassis</label>
                  <input type="number" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Pays d'origine</label>
                  <input type="number" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Puissance</label>
                  <input type="number" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Charge utile</label>
                  <input type="number" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Energie</label>
                  <input type="number" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Valeur neuve</label>
                  <input type="number" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Valeur vénale</label>
                  <input type="number" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Date de mise en circulation</label>
                  <input type="number" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Nbre de places</label>
                  <input type="number" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Valeur accessoires</label>
                  <input type="number" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Remorque</label>
                  <input type="number" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Mat inflammable</label>
                  <input type="number" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Véhicule 4*4</label>
                  <input type="number" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Ancienne immat</label>
                  <input type="number" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Equipé GPS</label>
                  <input type="number" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Tracteur agricole</label>
                  <input type="number" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Susprime passager transportés</label>
                  <input type="number" class="form-control" />
                </div>

              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title mb-0">Détails</h4>
              </div>
              <div class="card-body">
                <form action="#">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Prise d'effet:</label>
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Fin garanties:</label>
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Prorata</label>
                    <input type="text" class="form-control" />
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Taux courte période:</label>
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Date d'emission:</label>
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Date de début:</label>
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Date de fin:</label>
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Profession:</label>
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Reduct profession:</label>
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Conducteur habituel:</label>
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Date naiss conducteur:</label>
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Taux de majo:</label>
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Catégorie permis:</label>
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Date du permis:</label>
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Red permis + 2ans:</label>
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Exonéré de taxe:</label>
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Exonéré accessoires:</label>
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Exonéré commission:</label>
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Exonéré CEDEAO:</label>
                            <input type="text" class="form-control" />
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

        <div class="row">
          <div class="col-sm-12">
            <form>
              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <div class="table-responsive">
                    <table class="table table-hover table-white">
                      <tbody>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td colspan="5" class="text-end">Prime HT</td>
                          <td class="text-end pr-4">
                            <input class="form-control text-end" value="0" type="text" />
                          </td>
                        </tr>
                        <tr>
                          <td colspan="5" class="text-end">Carte brune</td>
                          <td class="text-end pe-4">
                            <input class="form-control text-end" type="text" />
                          </td>
                        </tr>
                        <tr>
                          <td colspan="5" class="text-end pe-4">
                            <b>FGA</b>
                          </td>
                          <td class="text-end tdata-width pe-4">
                            <input class="form-control text-end" type="text" />
                          </td>
                        </tr>
                        <tr>
                          <td colspan="5" class="text-end">T.E</td>
                          <td class="text-end pe-4">
                            <input class="form-control text-end" type="text" />
                          </td>
                        </tr>
                        <tr>
                          <td colspan="5" class="text-end">Prime TTC</td>
                          <td class="text-end pe-4">
                            <input class="form-control text-end" type="text" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
              <div class="submit-section">
                <button class="btn btn-primary submit-btn">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import Multiselect from "@vueform/multiselect";
export default {
  components: { Header, Sidebar, Multiselect },
};
</script>
<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->