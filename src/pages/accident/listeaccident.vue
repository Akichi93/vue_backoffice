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
                <router-link to="/createaccident" class="btn btn-success btn-add-emp" style="width: auto">
                  <i class="fas fa-plus"></i>Ajouter</router-link>
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
                      <th>Nom du prospect</th>
                      <th>Adresse</th>
                      <th>Contact</th>
                      <th>Etat</th>
                      <th>Profession</th>
                      <th>Statut</th>
                      <th class="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  
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
    name: "listprospect",
    components: {
      Header,
      Sidebar,
    },
  
  
  };
  </script>
    