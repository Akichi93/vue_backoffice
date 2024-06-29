<template>
  <div class="main-wrapper">
    <Header />
    <Sidebar />
    <div class="page-wrapper">
      <div class="content container-fluid pb-0">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Création de la tarification MRH</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Tarificateur MRH
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
                <h3 class="text-center">Tarificateur MRH</h3>
                <div class="card">
                  <div class="card-body">
                    <form>
                      <div class="form-group row">
                        <label for="prospect" class="col-sm-2 col-form-label"
                          ><strong>Prospect</strong>:</label
                        >
                        <div class="col-sm-10">
                          <selectcomponent
                            v-model="selectedValues"
                            :options="options"
                            placeholder="Sélectionnez une ou plusieurs options"
                            label-key="name"
                            track-by="id"
                            @input="handleSelectedValuesChange"
                          ></selectcomponent>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label
                          for="contractType"
                          class="col-sm-2 col-form-label"
                          ><strong>Type de contrat</strong>:</label
                        >
                        <div class="col-sm-10">
                          <habitationcomponent
                            :placeholder="'selectionnez un type de contrat'"
                            v-model="habitations"
                            @change="handleChange"
                          ></habitationcomponent>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="rent" class="col-sm-2 col-form-label"
                          ><strong>Loyer</strong>:</label
                        >
                        <div class="col-sm-10">
                          <inputNumber
                            :numberValue="nbre_min"
                            :placeholder="'1 000 000 FCFA'"
                            @update:numberValue="updateLoyer"
                          >
                          </inputNumber>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="content" class="col-sm-2 col-form-label"
                          ><strong>Contenu</strong>:</label
                        >
                        <div class="col-sm-10">
                          <inputNumber
                            :numberValue="nbre_min"
                            :placeholder="'9 600 000 FCFA'"
                            @update:numberValue="updateContenu"
                          >
                          </inputNumber>
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

                <h5
                  class="card-title"
                  v-if="
                    habitations == 'LOCATAIRE' || habitations === 'PROPRIETAIRE'
                  "
                >
                  Désignation des Garanties
                </h5>

                <div class="table-responsive" v-if="habitations == 'LOCATAIRE'">
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th class="designation-header">
                            Désignation des Garanties
                          </th>
                          <th class="couvert-exclu-column">Couvert ou Exclu</th>
                          <th class="capitaux-header">
                            Capitaux Garantis (FCFA)
                          </th>
                          <th class="franchise-header">Franchises (FCFA)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="
                              text-align: center;
                              font-weight: bold;
                              background-color: #77b5fe;
                            "
                          >
                            I - Incendie / Explosion / Foudre et Evènements
                            Assimilés
                          </td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Risques Locatifs / Bâtiments
                          </td>
                          <td :class="colors[0]">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                              :index="0"
                              @update-color="handleUpdateColor"
                            ></couverturecomponent>
                          </td>

                          <td class="capital">180 000 000</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Risques Locatifs Supplémentaires
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">90 000 000</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Contenu (mobilier, matériels et effets personnels)
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">9 600 000</td>

                          <td></td>
                        </tr>
                        <tr class="highlight-row">
                          <td class="designation-column">
                            Pertes indirectes forfaitaires
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            10% du capital Bâtiment et Contenu
                          </td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Pertes d'usage / RC Pertes de loyers
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">1 an de loyer</td>

                          <td class="capitaux-column">Néant</td>
                        </tr>
                        <tr class="highlight-row">
                          <td class="designation-column">
                            Frais de Déplacement, de replacement et de
                            relogement / Frais de réinstallation
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">1 an de loyer</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Frais de Démolition et de Déblai
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            10% du capital garanti sur le contenu
                          </td>

                          <td>Néant</td>
                        </tr>
                        <tr class="highlight-row">
                          <td class="designation-column">
                            Frais et Honoraires d'Experts
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">Frais réels</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Recours des Voisins et des Tiers
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">200 000 000</td>

                          <td>Néant</td>
                        </tr>
                        <tr class="highlight-row">
                          <td class="designation-column">
                            Recours des locataires et des co-locataires
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">1 an de loyer</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Troubles de Jouissance / Privation de jouissance
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">1 an de loyer</td>

                          <td>Néant</td>
                        </tr>
                        <tr class="highlight-row">
                          <td class="designation-column">
                            Explosions, foudre, chute d'appareils de navigation
                            aérienne, choc de véhicules terrestres
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">100% des capitaux assurés</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Frais de clôture Provisoire et de gardiennage, Frais
                            de sauvetage
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            5% de l'indemnité sur le bâtiment et le contenu
                          </td>

                          <td>Néant</td>
                        </tr>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="
                              text-align: center;
                              font-weight: bold;
                              background-color: #77b5fe;
                            "
                          >
                            II - Dommages aux Appareils Electriques (1er Risque
                            absolu)
                          </td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Limitation de la garantie par sinistre
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">3 000 000</td>

                          <td class="capital">10%</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Détériorations accidentelles
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">250 000</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Frais de Transport et d'Installation
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">15% du capital ci-dessus</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Frais et Honoraires d'experts
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">Selon barème ANECI</td>

                          <td>Néant</td>
                        </tr>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="
                              text-align: center;
                              font-weight: bold;
                              background-color: #77b5fe;
                            "
                          >
                            III - Dégâts des Eaux (1er Risque absolu)
                          </td>
                        </tr>
                        <tr>
                          <td class="designation-column">Bâtiments</td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            Valeur de reconstitution à neuf à concurrence des
                            dommages subis
                          </td>

                          <td class="capital">25 000</td>
                        </tr>
                        <tr>
                          <td class="designation-column">Mobilier personnel</td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            Valeur de remplacement vétusté déduite, à
                            concurrence du capital "Contenu"
                          </td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Recherche des fuites
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">250 000</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">Infiltrations</td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">150 000</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Frais de recherche de fuite
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">15% du capital ci-dessus</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Privation de jouissance
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">1 an de loyer</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Recours des Voisins et des Tiers
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">25 000 000</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Frais et Honoraires d'experts
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">Selon barème ANECI</td>

                          <td>Néant</td>
                        </tr>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="
                              text-align: center;
                              font-weight: bold;
                              background-color: #77b5fe;
                            "
                          >
                            IV - Bris de Glaces (1er Risque absolu)
                          </td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Limitation de la garantie par sinistre
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">500 000</td>

                          <td class="capital">25 000</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Frais de clôture Provisoire et de gardiennage, Frais
                            de sauvetage
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">15% du capital ci-dessus</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Détérioration du Mobilier et du Bâtiment
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">5% du capital ci-dessus</td>

                          <td>Néant</td>
                        </tr>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="text-align: center; font-weight: bold"
                          >
                            V - Vol (1er Risque absolu)
                          </td>
                        </tr>
                        <tr>
                          <td class="designation-column">Mobilier personnel</td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            Valeur de remplacement vétusté déduite, à
                            concurrence du capital "Contenu"
                          </td>

                          <td class="capital">25 000</td>
                        </tr>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="
                              text-align: center;
                              font-weight: italic;
                              color: red;
                            "
                          >
                            * Objets precieux compris à concurrence de 30%.
                            Contenu des dépensescompris à concurrence de 20% de
                            ce capital avec un maximum de 500 000 FCFA
                          </td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Frais et Honoraires d'experts
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">Selon barème ANECI</td>

                          <td>Neant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Frais de clôture provisoire et/ou de gardiennage
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">100000</td>

                          <td>Neant</td>
                        </tr>
                        <tr>
                          <td>Détérioration mobilières et immobilières</td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">100000</td>

                          <td>Neant</td>
                        </tr>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="
                              text-align: center;
                              font-weight: bold;
                              background-color: #77b5fe;
                            "
                          >
                            VI- Tempête, Ouragans, Cyclones
                          </td>
                        </tr>
                        <tr>
                          <td>Bâtiments</td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            Valeur de reconstitution à neuf à concurrence des
                            dommages subis
                          </td>

                          <td>10% du sinistre</td>
                        </tr>
                        <tr>
                          <td>Mobilier personnel</td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            Valeur de remplacement vétusté déduite, à
                            concurrence du capital "Contenu"
                          </td>

                          <td>10% du sinistre</td>
                        </tr>
                        <tr>
                          <td>Frais et Honoraires d'experts</td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">Selon barème ANECI</td>

                          <td>Néant</td>
                        </tr>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="
                              text-align: center;
                              font-weight: bold;
                              background-color: #77b5fe;
                            "
                          >
                            VII- Séjours - Voyages
                          </td>
                        </tr>
                        <tr>
                          <td>Limitation de la garantie par sinistre</td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital"></td>

                          <td></td>
                        </tr>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="
                              text-align: center;
                              font-weight: bold;
                              background-color: #77b5fe;
                            "
                          >
                            VIII- Tous Risques Informatique (1er Risque absolu)
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Dommages directs au Matériel y compris ordinateurs
                            portables ou appareils électroniques et tablettes en
                            tous lieux
                          </td>
                          <td>
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">3000000</td>

                          <td>25000</td>
                        </tr>
                        <tr>
                          <td>
                            Frais de Reconstitution et de Reconversion des
                            médias
                          </td>
                          <td>
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">500000</td>

                          <td>25000</td>
                        </tr>
                        <tr>
                          <td>Frais Supplémentaires d'Exploitation</td>
                          <td>
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">500000</td>

                          <td>10000</td>
                        </tr>
                        <tr>
                          <td>Frais et Honoraires d'experts</td>
                          <td>
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">Selon barème ANECI</td>

                          <td>Néant</td>
                        </tr>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="
                              text-align: center;
                              font-weight: bold;
                              background-color: #77b5fe;
                            "
                          >
                            IX- Responsabilité Civile Familiale et Privée
                          </td>
                        </tr>
                        <tr>
                          <td>Dommages corporels</td>
                          <td>
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">500000000</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td>Dommages matériels et immatériels confondus</td>
                          <td>
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">50000000</td>

                          <td>50000</td>
                        </tr>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="
                              text-align: center;
                              font-weight: bold;
                              background-color: #77b5fe;
                            "
                          >
                            X- Responsabilité Civile en séjour-voyage
                          </td>
                        </tr>
                        <tr>
                          <td>Risques locatifs</td>
                          <td>
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            Dans les même limitations que celles prévues pour
                            les responsabilités en tant que locataire,
                            propriétaire et co-propriétaire.
                          </td>

                          <td></td>
                        </tr>
                        <tr>
                          <td>Troubles locatifs</td>
                          <td>
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            Dans les même limitations que celles prévues pour
                            les responsabilités en tant que locataire,
                            propriétaire et co-propriétaire.
                          </td>
                          <td>25000</td>
                        </tr>
                        <tr>
                          <td>Responsabilité pour pertes de loyer</td>
                          <td>
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            Dans les même limitations que celles prévues pour
                            les responsabilités en tant que locataire,
                            propriétaire et co-propriétaire.
                          </td>
                          <td>Sauf dommages corporels</td>
                        </tr>
                        <tr>
                          <td>Recours des voisins et des tiers</td>
                          <td>
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            Dans les même limitations que celles prévues pour
                            les responsabilités en tant que locataire,
                            propriétaire et co-propriétaire.
                          </td>
                          <td></td>
                        </tr>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="
                              text-align: center;
                              font-weight: bold;
                              background-color: #77b5fe;
                            "
                          >
                            XI- Défense et Recours
                          </td>
                        </tr>
                        <tr>
                          <td>Défense et recours</td>
                          <td>
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">500000</td>
                          <td>Néant</td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="container">
                      <div class="table-container">
                        <table>
                          <tr class="header-row">
                            <th>PRIME NETTE ANNUELLE</th>
                            <td>
                              151 400 <br />
                              <span>.Prime Incendie : 32 850</span> <br />
                              <span>.Prime Autres Risques : 118 550</span>
                            </td>
                          </tr>
                          <tr>
                            <th>Accessoires :</th>
                            <td>10 000</td>
                          </tr>
                          <tr>
                            <th>Taxes :</th>
                            <td>27 902</td>
                          </tr>
                          <tr class="footer-row">
                            <th>PRIME TTC ANNUELLE (FCFA)</th>
                            <td>189 302</td>
                          </tr>
                          <tr class="highlight-row">
                            <th>
                              Date d’effet :<br />Date d’échéance :<br />Nombre
                              de jours :
                            </th>
                            <td>
                              07/05/2021 <br />
                              31/03/2022 <br />
                              329
                            </td>
                          </tr>
                          <tr>
                            <th>PRIME NETTE AU PRORATA :</th>
                            <td>
                              136 467 <br />
                              <span>.Prime Incendie au prorata : 29 610</span>
                              <br />
                              <span
                                >.Prime Autres Risques au prorata : 106
                                857</span
                              >
                            </td>
                          </tr>
                          <tr>
                            <th>Accessoires :</th>
                            <td>5 000</td>
                          </tr>
                          <tr>
                            <th>Taxes au prorata :</th>
                            <td>24 147</td>
                          </tr>
                          <tr class="footer-row">
                            <th>PRIME TTC AU PRORATA (FCFA)</th>
                            <td>165 614</td>
                          </tr>
                        </table>
                      </div>

                      <div class="note">
                        <b>LOCATAIRE</b> <br />
                        * Taux risques locatifs = 0,45‰ <br />
                        * Taux contenu = 5,25‰ <br />
                        * Responsabilité Civile vie privée (Forfait) = 5.000
                        FCFA <br />
                        * Tous Risques Informatique = 5%
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="table-responsive"
                  v-if="habitations == 'PROPRIETAIRE'"
                >
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th class="designation-column">
                            Désignation des Garanties
                          </th>
                          <th class="couvert-exclu-column">Couvert ou Exclu</th>
                          <th>Capitaux Garantis (FCFA)</th>
                          <th>Franchises (FCFA)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="
                              text-align: center;
                              font-weight: bold;
                              background-color: #77b5fe;
                            "
                          >
                            I - Incendie / Explosion / Foudre et Evènements
                            Assimilés
                          </td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Risques Locatifs / Bâtiments
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">180 000 000</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Risques Locatifs Supplémentaires
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">90 000 000</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Contenu (mobilier, matériels et effets personnels)
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">9 600 000</td>

                          <td></td>
                        </tr>
                        <tr class="highlight-row">
                          <td class="designation-column">
                            Pertes indirectes forfaitaires
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            10% du capital Bâtiment et Contenu
                          </td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Pertes d'usage / RC Pertes de loyers
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">1 an de loyer</td>

                          <td>Néant</td>
                        </tr>
                        <tr class="highlight-row">
                          <td class="designation-column">
                            Frais de Déplacement, de replacement et de
                            relogement / Frais de réinstallation
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">1 an de loyer</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Frais de Démolition et de Déblai
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            10% du capital garanti sur le contenu
                          </td>

                          <td>Néant</td>
                        </tr>
                        <tr class="highlight-row">
                          <td class="designation-column">
                            Frais et Honoraires d'Experts
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">Frais réels</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Recours des Voisins et des Tiers
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">200 000 000</td>

                          <td>Néant</td>
                        </tr>
                        <tr class="highlight-row">
                          <td class="designation-column">
                            Recours des locataires et des co-locataires
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">1 an de loyer</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Troubles de Jouissance / Privation de jouissance
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">1 an de loyer</td>

                          <td>Néant</td>
                        </tr>
                        <tr class="highlight-row">
                          <td class="designation-column">
                            Explosions, foudre, chute d'appareils de navigation
                            aérienne, choc de véhicules terrestres
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">100% des capitaux assurés</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Frais de clôture Provisoire et de gardiennage, Frais
                            de sauvetage
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            5% de l'indemnité sur le bâtiment et le contenu
                          </td>

                          <td>Néant</td>
                        </tr>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="
                              text-align: center;
                              font-weight: bold;
                              background-color: #77b5fe;
                            "
                          >
                            II - Dommages aux Appareils Electriques (1er Risque
                            absolu)
                          </td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Limitation de la garantie par sinistre
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">3 000 000</td>

                          <td class="capital">10%</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Détériorations accidentelles
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">250 000</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Frais de Transport et d'Installation
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">15% du capital ci-dessus</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Frais et Honoraires d'experts
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">Selon barème ANECI</td>

                          <td>Néant</td>
                        </tr>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="
                              text-align: center;
                              font-weight: bold;
                              background-color: #77b5fe;
                            "
                          >
                            III - Dégâts des Eaux (1er Risque absolu)
                          </td>
                        </tr>
                        <tr>
                          <td class="designation-column">Bâtiments</td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            Valeur de reconstitution à neuf à concurrence des
                            dommages subis
                          </td>

                          <td class="capital">25 000</td>
                        </tr>
                        <tr>
                          <td class="designation-column">Mobilier personnel</td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            Valeur de remplacement vétusté déduite, à
                            concurrence du capital "Contenu"
                          </td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Recherche des fuites
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">250 000</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">Infiltrations</td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">150 000</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Frais de recherche de fuite
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">15% du capital ci-dessus</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Privation de jouissance
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">1 an de loyer</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Recours des Voisins et des Tiers
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">25 000 000</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Frais et Honoraires d'experts
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">Selon barème ANECI</td>

                          <td>Néant</td>
                        </tr>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="
                              text-align: center;
                              font-weight: bold;
                              background-color: #77b5fe;
                            "
                          >
                            IV - Bris de Glaces (1er Risque absolu)
                          </td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Limitation de la garantie par sinistre
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">500 000</td>

                          <td class="capital">25 000</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Frais de clôture Provisoire et de gardiennage, Frais
                            de sauvetage
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">15% du capital ci-dessus</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Détérioration du Mobilier et du Bâtiment
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">5% du capital ci-dessus</td>

                          <td>Néant</td>
                        </tr>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="text-align: center; font-weight: bold"
                          >
                            V - Vol (1er Risque absolu)
                          </td>
                        </tr>
                        <tr>
                          <td class="designation-column">Mobilier personnel</td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            Valeur de remplacement vétusté déduite, à
                            concurrence du capital "Contenu"
                          </td>

                          <td class="capital">25 000</td>
                        </tr>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="
                              text-align: center;
                              font-weight: italic;
                              color: red;
                            "
                          >
                            * Objets precieux compris à concurrence de 30%.
                            Contenu des dépensescompris à concurrence de 20% de
                            ce capital avec un maximum de 500 000 FCFA
                          </td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Frais et Honoraires d'experts
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">Selon barème ANECI</td>

                          <td>Neant</td>
                        </tr>
                        <tr>
                          <td class="designation-column">
                            Frais de clôture provisoire et/ou de gardiennage
                          </td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">100000</td>

                          <td>Neant</td>
                        </tr>
                        <tr>
                          <td>Détérioration mobilières et immobilières</td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">100000</td>

                          <td>Neant</td>
                        </tr>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="
                              text-align: center;
                              font-weight: bold;
                              background-color: #77b5fe;
                            "
                          >
                            VI- Tempête, Ouragans, Cyclones
                          </td>
                        </tr>
                        <tr>
                          <td>Bâtiments</td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            Valeur de reconstitution à neuf à concurrence des
                            dommages subis
                          </td>

                          <td>10% du sinistre</td>
                        </tr>
                        <tr>
                          <td>Mobilier personnel</td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            Valeur de remplacement vétusté déduite, à
                            concurrence du capital "Contenu"
                          </td>

                          <td>10% du sinistre</td>
                        </tr>
                        <tr>
                          <td>Frais et Honoraires d'experts</td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">Selon barème ANECI</td>

                          <td>Néant</td>
                        </tr>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="
                              text-align: center;
                              font-weight: bold;
                              background-color: #77b5fe;
                            "
                          >
                            VII- Séjours - Voyages
                          </td>
                        </tr>
                        <tr>
                          <td>Limitation de la garantie par sinistre</td>
                          <td class="couvert-exclu-column">
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital"></td>

                          <td></td>
                        </tr>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="
                              text-align: center;
                              font-weight: bold;
                              background-color: #77b5fe;
                            "
                          >
                            VIII- Tous Risques Informatique (1er Risque absolu)
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Dommages directs au Matériel y compris ordinateurs
                            portables ou appareils électroniques et tablettes en
                            tous lieux
                          </td>
                          <td>
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">3000000</td>

                          <td>25000</td>
                        </tr>
                        <tr>
                          <td>
                            Frais de Reconstitution et de Reconversion des
                            médias
                          </td>
                          <td>
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">500000</td>

                          <td>25000</td>
                        </tr>
                        <tr>
                          <td>Frais Supplémentaires d'Exploitation</td>
                          <td>
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">500000</td>

                          <td>10000</td>
                        </tr>
                        <tr>
                          <td>Frais et Honoraires d'experts</td>
                          <td>
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">Selon barème ANECI</td>

                          <td>Néant</td>
                        </tr>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="
                              text-align: center;
                              font-weight: bold;
                              background-color: #77b5fe;
                            "
                          >
                            IX- Responsabilité Civile Familiale et Privée
                          </td>
                        </tr>
                        <tr>
                          <td>Dommages corporels</td>
                          <td>
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">500000000</td>

                          <td>Néant</td>
                        </tr>
                        <tr>
                          <td>Dommages matériels et immatériels confondus</td>
                          <td>
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">50000000</td>

                          <td>50000</td>
                        </tr>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="
                              text-align: center;
                              font-weight: bold;
                              background-color: #77b5fe;
                            "
                          >
                            X- Responsabilité Civile en séjour-voyage
                          </td>
                        </tr>
                        <tr>
                          <td>Risques locatifs</td>
                          <td>
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            Dans les même limitations que celles prévues pour
                            les responsabilités en tant que locataire,
                            propriétaire et co-propriétaire.
                          </td>

                          <td></td>
                        </tr>
                        <tr>
                          <td>Troubles locatifs</td>
                          <td>
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            Dans les même limitations que celles prévues pour
                            les responsabilités en tant que locataire,
                            propriétaire et co-propriétaire.
                          </td>
                          <td>25000</td>
                        </tr>
                        <tr>
                          <td>Responsabilité pour pertes de loyer</td>
                          <td>
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            Dans les même limitations que celles prévues pour
                            les responsabilités en tant que locataire,
                            propriétaire et co-propriétaire.
                          </td>
                          <td>Sauf dommages corporels</td>
                        </tr>
                        <tr>
                          <td>Recours des voisins et des tiers</td>
                          <td>
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">
                            Dans les même limitations que celles prévues pour
                            les responsabilités en tant que locataire,
                            propriétaire et co-propriétaire.
                          </td>
                          <td></td>
                        </tr>
                        <tr class="header-row">
                          <td
                            colspan="5"
                            style="
                              text-align: center;
                              font-weight: bold;
                              background-color: #77b5fe;
                            "
                          >
                            XI- Défense et Recours
                          </td>
                        </tr>
                        <tr>
                          <td>Défense et recours</td>
                          <td>
                            <couverturecomponent
                              :placeholder="'selectionnez un type'"
                              v-model="apporteur_id"
                            ></couverturecomponent>
                          </td>
                          <td class="capital">500000</td>
                          <td>Néant</td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="container">
                      <div class="table-container">
                        <table>
                          <tr class="header-row">
                            <th>PRIME NETTE ANNUELLE</th>
                            <td>
                              151 400 <br />
                              <span>.Prime Incendie : 32 850</span> <br />
                              <span>.Prime Autres Risques : 118 550</span>
                            </td>
                          </tr>
                          <tr>
                            <th>Accessoires :</th>
                            <td>10 000</td>
                          </tr>
                          <tr>
                            <th>Taxes :</th>
                            <td>27 902</td>
                          </tr>
                          <tr class="footer-row">
                            <th>PRIME TTC ANNUELLE (FCFA)</th>
                            <td>189 302</td>
                          </tr>
                          <tr class="highlight-row">
                            <th>
                              Date d’effet :<br />Date d’échéance :<br />Nombre
                              de jours :
                            </th>
                            <td>
                              07/05/2021 <br />
                              31/03/2022 <br />
                              329
                            </td>
                          </tr>
                          <tr>
                            <th>PRIME NETTE AU PRORATA :</th>
                            <td>
                              136 467 <br />
                              <span>.Prime Incendie au prorata : 29 610</span>
                              <br />
                              <span
                                >.Prime Autres Risques au prorata : 106
                                857</span
                              >
                            </td>
                          </tr>
                          <tr>
                            <th>Accessoires :</th>
                            <td>5 000</td>
                          </tr>
                          <tr>
                            <th>Taxes au prorata :</th>
                            <td>24 147</td>
                          </tr>
                          <tr class="footer-row">
                            <th>PRIME TTC AU PRORATA (FCFA)</th>
                            <td>165 614</td>
                          </tr>
                        </table>
                      </div>

                      <div class="note">
                        <b>LOCATAIRE</b> <br />
                        * Taux risques locatifs = 0,45‰ <br />
                        * Taux contenu = 5,25‰ <br />
                        * Responsabilité Civile vie privée (Forfait) = 5.000
                        FCFA <br />
                        * Tous Risques Informatique = 5%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group text-center">
              <button type="button" class="btn btn-primary">Enregistrer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import couverturecomponent from "../../components/select/couverturecomponent.vue";
import habitationcomponent from "../../components/select/habitationcomponent.vue";
import selectcomponent from "../../components/select/selectcomponent.vue";
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import inputNumber from "./../../components/input/inputNumber.vue";

export default {
  name: "createcompagnie",
  components: {
    Header,
    Sidebar,
    habitationcomponent,
    inputNumber,
    selectcomponent,
    couverturecomponent,
  },
  data() {
    return {
      habitations: "",
      apporteur_id: null,
      colors: ["", ""], // Array to store colors for each instance
    };
  },
  methods: {
    handleUpdateColor({ index, color }) {
      this.colors[index] = color;
    },
  },
};
</script>
<style scoped>
.green .form-control {
  border-color: green;
  color: green;
}
.red .form-control {
  border-color: red;
  color: red;
}
</style>
<style scoped>
.table-responsive {
  overflow-x: auto;
}

.table {
  width: 100%; /* Ensure the table takes up the full width */
  table-layout: auto; /* Ensure the table layout is auto for column width flexibility */
}

.table td,
.table th {
  padding: 2px 4px; /* Réduction du padding */
  line-height: 1; /* Réduction de la hauteur de ligne */
  height: 3em; /* Hauteur fixe pour les cellules */
  word-wrap: break-word; /* Retour à la ligne automatique */
}

.table th,
.table td {
  white-space: normal; /* Permet le retour à la ligne */
}

.table td:first-child,
.table th:first-child {
  max-width: 200px; /* Largeur maximale pour la première colonne */
}

.designation-header {
  max-width: 200px; /* Largeur maximale pour l'en-tête Désignation des Garanties */
}

.table td:nth-child(2),
.table th:nth-child(2) {
  width: auto; /* Ajustement automatique de la largeur */
}

.couvert-exclu-header {
  width: 10%;
}

.couvert-exclu-column {
  width: 10%;
}

.capitaux-header {
  max-width: 240px;
}

.capitaux-column {
  max-width: 240px;
}

.franchise-header {
  max-width: 240px;
}

.franchise-column {
  max-width: 240px;
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
  max-width: 240px;
}

.note {
  margin: 20px auto;
  width: 60%;
  background-color: #ffffcc;
  padding: 10px;
  border: 1px solid black;
}

.table-container {
  width: 80%; /* Adjust to 100% to accommodate larger column */
  margin: auto;
  border-collapse: collapse;
}

.table-container th,
.table-container td {
  padding: 10px;
  border: 1px solid black;
}

.designation-column {
  width: 40%;
}
</style>
