<template>
    <div class="main-wrapper">
      <Header />
  
      <Sidebar />
  
      <div class="page-wrapper">
        <div class="content container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="page-head-box">
                <h3>Accident individuel</h3>
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <router-link to="/home">Tableau de bord</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Accident individuel
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
  
          <div class="row filter-row">
            <div class="col-md-8"></div>
            <div class="col-md-4">
              <div class="add-emp-section">
                <a href="#" data-bs-toggle="modal" data-bs-target="#add_client" class="btn btn-success btn-add-emp"
                style="width: auto"><i class="fas fa-plus"></i> Ajouter 
              </a>
              </div>
            </div>
          </div>
  
          <div class="row">
            <div class="col-row">
              <input type="text" class="form-control" placeholder="Rechercher un prospect" 
                />
            </div>
            <div class="col-md-12" style="display: flex; justify-content: end">
              <!-- <prospectexport></prospectexport> -->
            </div>
            <div class="col-md-12">
              <div class="table-responsive">
                <table class="table table-striped custom-table mb-0">
                  <thead>
                    <tr>
                      <th>Classes</th>
                      <th>Profeesions</th>
                      <th>Décès</th>
                      <th>IPT</th>
                      <th>100.000</th>
                      <th>200.000</th>
                      <th>400.000</th>
                      <th>500.000</th>
                      <th class="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                  </tbody>
                </table>
              </div>
              <addTarification @client-add="refresh"></addTarification>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import Header from "../../layout/Header.vue";
  import Sidebar from "../../layout/Sidebar.vue";
  import addTarification from "./addTarification.vue"
  
  export default {
    name: "listprospect",
    components: {
      Header,
      Sidebar,
      addTarification
    },
  
   
  };
  </script>
    