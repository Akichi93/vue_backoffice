<template>
  <div class="main-wrapper">

    <Header />

    <Sidebar />

    <div class="page-wrapper">
      <div class="content container-fluid pb-0">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>upload des bases</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">ableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">Upload</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>


        <div class="card tab-box mt-3">
          <div class="row user-tabs">
            <div class="col-lg-12 col-md-12 col-sm-12 line-tabs">
              <ul class="nav nav-tabs nav-tabs-bottom pt-3 pb-2">
                <li class="nav-item">
                  <a href="#client_tab" data-bs-toggle="tab" class="nav-link active">Clients</a>
                </li>

                <li class="nav-item">
                  <a href="#emp_profile" data-bs-toggle="tab" class="nav-link">Prospects</a>
                </li>



                <li class="nav-item">
                  <a href="#apporteurs" data-bs-toggle="tab" class="nav-link">Apporteurs</a>
                </li>

                <li class="nav-item">
                  <a href="#taux_apporteurs" data-bs-toggle="tab" class="nav-link">Taux apporteurs</a>
                </li>

                <li class="nav-item">
                  <a href="#bank_statutory" data-bs-toggle="tab" class="nav-link">Compagnies</a>
                </li>

                <li class="nav-item">
                  <a href="#taux_compagnies" data-bs-toggle="tab" class="nav-link">Taux compagnies</a>
                </li>

                <li class="nav-item">
                  <a href="#contrats_tab" data-bs-toggle="tab" class="nav-link">Contrats</a>
                </li>

                <li class="nav-item">
                  <a href="#sinistres_tab" data-bs-toggle="tab" class="nav-link">Sinistres</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="tab-content">

          <clientfile></clientfile>

          <prospectfile></prospectfile>

          <apporteurfile></apporteurfile>

          <tauxapporteurfile></tauxapporteurfile>

          <compagniefile></compagniefile>

          <tauxcompagniefile></tauxcompagniefile>

          <contratfile></contratfile>

          <sinistrefile></sinistrefile>


        </div>

      </div>
    </div>
  </div>
</template>
<script>
import clientfile from '../../components/file/clientfile.vue';
import prospectfile from '../../components/file/prospectfile.vue';
import apporteurfile from '../../components/file/apporteurfile.vue';
import tauxapporteurfile from '../../components/file/tauxapporteurfile.vue';
import compagniefile from '../../components/file/compagniefile.vue';
import tauxcompagniefile from '../../components/file/tauxcompagniefile.vue'
import Header from "../../layout/Header.vue"
import Sidebar from "../../layout/Sidebar.vue";
import Contratfile from '../../components/file/contratfile.vue';
import sinistrefile from '../../components/file/sinistrefile.vue';

export default {
  name: "upload",
  components: { Header, Sidebar, clientfile, prospectfile, apporteurfile, tauxapporteurfile, compagniefile, tauxcompagniefile, Contratfile, sinistrefile },
}
</script>