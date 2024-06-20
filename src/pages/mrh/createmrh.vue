<template>
  <div class="main-wrapper">
    <Header />
    <Sidebar />
    <div class="page-wrapper">
      <div class="content container-fluid pb-0">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Création de compagnie</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Compagnies
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="card mb-0">
              <div class="card-body">
                <h1 class="text-center">Tarificateur MRH</h1>
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Prospect</h5>
                    <form>
                      <div class="form-group row">
                        <label
                          for="contractType"
                          class="col-sm-2 col-form-label"
                          ><strong>Type de contrat</strong>:</label
                        >
                        <div class="col-sm-10">
                          <input
                            type="text"
                            class="form-control"
                            id="contractType"
                            placeholder="Entrez le type de contrat"
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="rent" class="col-sm-2 col-form-label"
                          ><strong>Loyer</strong>:</label
                        >
                        <div class="col-sm-10">
                          <input
                            type="number"
                            class="form-control"
                            id="rent"
                            placeholder="1 000 000 FCFA"
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="content" class="col-sm-2 col-form-label"
                          ><strong>Contenu</strong>:</label
                        >
                        <div class="col-sm-10">
                          <input
                            type="number"
                            class="form-control"
                            id="content"
                            placeholder="9 600 000 FCFA"
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="houseType" class="col-sm-2 col-form-label"
                          ><strong>Type d'habitation</strong>:</label
                        >
                        <div class="col-sm-10">
                          <input
                            type="text"
                            class="form-control"
                            id="houseType"
                            placeholder="Entrez le type d'habitation"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="card mb-0">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Désignation des Garanties</h5>
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th rowspan="2">Désignation des Garanties</th>
                          <th rowspan="2">Couvert ou Exclu</th>
                          <th colspan="2">Capitaux Garantis (FCFA)</th>
                          <th rowspan="2">Franchises (FCFA)</th>
                        </tr>
                        <tr>
                          <th>Montant</th>
                          <th>Annexes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="header-row">
                          <td colspan="5">
                            I - Incendie / Explosion / Foudre et Evènements
                            Assimilés
                          </td>
                        </tr>
                        <tr>
                          <td>Risques Locatifs / Bâtiments</td>
                          <td>COUVERT</td>
                          <td class="capital">180 000 000</td>
                          <td></td>
                          <td class="franchise"></td>
                        </tr>
                        <tr>
                          <td>Risques Locatifs Supplémentaires</td>
                          <td>COUVERT</td>
                          <td class="capital">90 000 000</td>
                          <td></td>
                          <td class="franchise"></td>
                        </tr>
                        <tr>
                          <td>
                            Contenu (mobilier, matériels et effets personnels)
                          </td>
                          <td>COUVERT</td>
                          <td class="capital">9 600 000</td>
                          <td></td>
                          <td class="franchise"></td>
                        </tr>
                        <tr class="highlight-row">
                          <td>Pertes indirectes forfaitaires</td>
                          <td>COUVERT</td>
                          <td class="capital">
                            10% du capital Bâtiment et Contenu
                          </td>
                          <td></td>
                          <td class="franchise">Néant</td>
                        </tr>
                        <tr>
                          <td>Pertes d'usage / RC Pertes de loyers</td>
                          <td>COUVERT</td>
                          <td class="capital">1 an de loyer</td>
                          <td></td>
                          <td class="franchise">Néant</td>
                        </tr>
                        <tr class="highlight-row">
                          <td>
                            Frais de Déplacement, de replacement et de
                            relogement / Frais de réinstallation
                          </td>
                          <td>COUVERT</td>
                          <td class="capital">1 an de loyer</td>
                          <td></td>
                          <td class="franchise">Néant</td>
                        </tr>
                        <tr>
                          <td>Frais de Démolition et de Déblai</td>
                          <td>COUVERT</td>
                          <td class="capital">
                            10% du capital garanti sur le contenu
                          </td>
                          <td></td>
                          <td class="franchise">Néant</td>
                        </tr>
                        <tr class="highlight-row">
                          <td>Frais et Honoraires d'Experts</td>
                          <td>COUVERT</td>
                          <td class="capital">Frais réels</td>
                          <td></td>
                          <td class="franchise">Néant</td>
                        </tr>
                        <tr>
                          <td>Recours des Voisins et des Tiers</td>
                          <td>COUVERT</td>
                          <td class="capital">200 000 000</td>
                          <td></td>
                          <td class="franchise">Néant</td>
                        </tr>
                        <tr class="highlight-row">
                          <td>Recours des locataires et des co-locataires</td>
                          <td>COUVERT</td>
                          <td class="capital">1 an de loyer</td>
                          <td></td>
                          <td class="franchise">Néant</td>
                        </tr>
                        <tr>
                          <td>
                            Troubles de Jouissance / Privation de jouissance
                          </td>
                          <td>COUVERT</td>
                          <td class="capital">1 an de loyer</td>
                          <td></td>
                          <td class="franchise">Néant</td>
                        </tr>
                        <tr class="highlight-row">
                          <td>
                            Explosions, foudre, chute d'appareils de navigation
                            aérienne, choc de véhicules terrestres
                          </td>
                          <td>COUVERT</td>
                          <td class="capital">100% des capitaux assurés</td>
                          <td></td>
                          <td class="franchise">Néant</td>
                        </tr>
                        <tr>
                          <td>
                            Frais de clôture Provisoire et de gardiennage, Frais
                            de sauvetage
                          </td>
                          <td>COUVERT</td>
                          <td class="capital">
                            5% de l'indemnité sur le bâtiment et le contenu
                          </td>
                          <td></td>
                          <td class="franchise">Néant</td>
                        </tr>
                        <tr class="header-row">
                          <td colspan="5">
                            II - Dommages aux Appareils Electriques (1er Risque
                            absolu)
                          </td>
                        </tr>
                        <tr>
                          <td>Limitation de la garantie par sinistre</td>
                          <td>COUVERT</td>
                          <td class="capital">
                            15% du contenu dans la limite de 1 500 000 FCFA
                          </td>
                          <td></td>
                          <td class="franchise">20 000</td>
                        </tr>
                        <tr>
                          <td>Frais de Transport et d'Installation</td>
                          <td>COUVERT</td>
                          <td class="capital">15% du capital ci-dessus</td>
                          <td></td>
                          <td class="franchise">Néant</td>
                        </tr>
                        <tr>
                          <td>Frais et Honoraires d'experts</td>
                          <td>COUVERT</td>
                          <td class="capital">Selon barème ANECI</td>
                          <td></td>
                          <td class="franchise">Néant</td>
                        </tr>
                        <tr class="header-row">
                          <td colspan="5">
                            III - Dégâts des Eaux (1er Risque absolu)
                          </td>
                        </tr>
                        <tr>
                          <td>Bâtiments</td>
                          <td>COUVERT</td>
                          <td class="capital">
                            Valeur de reconstitution à neuf à concurrence des
                            dommages subis
                          </td>
                          <td></td>
                          <td class="franchise">25 000</td>
                        </tr>
                        <tr>
                          <td>Mobilier personnel</td>
                          <td>COUVERT</td>
                          <td class="capital">
                            Valeur de remplacement vétusté déduite, à
                            concurrence du capital "Contenu"
                          </td>
                          <td></td>
                          <td class="franchise">Néant</td>
                        </tr>
                        <tr>
                          <td>Recherche des fuites</td>
                          <td>COUVERT</td>
                          <td class="capital">250 000</td>
                          <td></td>
                          <td class="franchise">Néant</td>
                        </tr>
                        <tr>
                          <td>Infiltrations</td>
                          <td>COUVERT</td>
                          <td class="capital">150 000</td>
                          <td></td>
                          <td class="franchise">Néant</td>
                        </tr>
                        <tr>
                          <td>Frais de recherche de fuite</td>
                          <td>COUVERT</td>
                          <td class="capital">15% du capital ci-dessus</td>
                          <td></td>
                          <td class="franchise">Néant</td>
                        </tr>
                        <tr>
                          <td>Privation de jouissance</td>
                          <td>COUVERT</td>
                          <td class="capital">1 an de loyer</td>
                          <td></td>
                          <td class="franchise">Néant</td>
                        </tr>
                        <tr>
                          <td>Recours des Voisins et des Tiers</td>
                          <td>COUVERT</td>
                          <td class="capital">25 000 000</td>
                          <td></td>
                          <td class="franchise">Néant</td>
                        </tr>
                        <tr>
                          <td>Frais et Honoraires d'experts</td>
                          <td>COUVERT</td>
                          <td class="capital">Selon barème ANECI</td>
                          <td></td>
                          <td class="franchise">Néant</td>
                        </tr>
                        <tr class="header-row">
                          <td colspan="5">
                            IV - Bris de Glaces (1er Risque absolu)
                          </td>
                        </tr>
                        <tr>
                          <td>Limitation de la garantie par sinistre</td>
                          <td>COUVERT</td>
                          <td class="capital">500 000</td>
                          <td></td>
                          <td class="franchise">25 000</td>
                        </tr>
                        <tr>
                          <td>
                            Frais de clôture Provisoire et de gardiennage, Frais
                            de sauvetage
                          </td>
                          <td>COUVERT</td>
                          <td class="capital">15% du capital ci-dessus</td>
                          <td></td>
                          <td class="franchise">Néant</td>
                        </tr>
                        <tr>
                          <td>Détérioration du Mobilier et du Bâtiment</td>
                          <td>COUVERT</td>
                          <td class="capital">5% du capital ci-dessus</td>
                          <td></td>
                          <td class="franchise">Néant</td>
                        </tr>
                        <!-- Ajoutez les autres sections de la même manière -->
                      </tbody>
                    </table>
                  </div>
                </div>
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

export default {
  name: "createcompagnie",
  components: {
    Header,
    Sidebar,
  },
};
</script>
  
  <style scoped>
.table-responsive {
  overflow-x: auto;
}
.highlight-row {
  background-color: #f2f2f2;
}
.header-row {
  background-color: #e0e0e0;
}
.table thead th {
  vertical-align: middle;
  text-align: center;
}
.franchise {
  text-align: right;
}
.capital {
  text-align: center;
}
</style>

  