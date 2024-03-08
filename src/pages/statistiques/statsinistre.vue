<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />

    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Statistiques sinistres</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="/home">Tableau de bord</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Statistiques sinistres
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <table id="example" class="table table-striped custom-table mb-0">
                <thead>
                  <tr>
                    <th>Branche</th>
                    <th>Numero de police</th>
                    <th>Nom du client</th>
                    <th>Nom de l'apporteur</th>
                    <th>Date declaration</th>
                    <th>Reference</th>
                    <th>gestion</th>
                    <th>Date de survenance</th>
                    <th>Numero sinistre agence</th>
                    <th>Lieu</th>
                    <th>Bénéficiaire</th>
                    <th>Block</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>

                    <td>
                      <!-- @php
                                error_reporting(0);
                                $sinistres = Reglement::select(DB::raw('SUM(montant) as total'))
                                    ->where('id_sinistre', $client->id_sinistre)
                                    ->where('type_reglement', 'Beneficiaire')
                                    ->get();

                                $x = $sinistres[0]['total'];
                            @endphp
                            {{ $x }} -->
                    </td>
                    <td>
                      <!-- @php
                                error_reporting(0);
                                $sinistre = Reglement::select(DB::raw('SUM(montant) as totals'))
                                    ->where('id_sinistre', $client->id_sinistre)
                                    ->where('type_reglement', 'Block')
                                    ->get();

                                $x = $sinistre[0]['totals'];
                            @endphp
                            {{ $x }} -->
                    </td>
                  </tr>
                </tbody>
              </table>
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
  name: "statsinistre",
  components: {
    Header,
    Sidebar,
  },
};
</script>