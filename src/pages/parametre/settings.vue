<template>
  <div class="main-wrapper">
    <Header />
    <Sidebar />

    <!-- Page Wrapper -->
    <div class="page-wrapper">
      <!-- Page Content -->
      <div class="content container-fluid">
        <!-- Page Header -->
        <div class="page-header">
          <div class="row">
            <div class="col-sm-12">
              <h3 class="page-title">Paramètre</h3>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/home">Tableau de bord</router-link>
                </li>
                <li class="breadcrumb-item">Paramètre</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- /Page Header -->

        <!-- Content Starts -->
        <div class="card">
          <div class="card-body">
            <ul class="nav nav-tabs nav-tabs-solid nav-justified">
              <li class="nav-item">
                <router-link class="nav-link active" to="/settings">Utilisateurs</router-link>
                
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/synchronisation">Synchronisation</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="">Thème</router-link>
              </li>
            </ul>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="card card-table">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h3 class="card-title mb-0">Utilisateurs</h3>
                <a href="#" data-bs-toggle="modal" data-bs-target="#add_user" class="btn btn-primary" style="width: auto">
                  <i class="fas fa-plus me-2"></i>Ajouter utilisateur
                </a>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <template v-if="isLoading">
                    <loadingcomponent></loadingcomponent>
                  </template>
                  <template v-else>
                    <table class="table table-nowrap custom-table mb-0">
                      <thead>
                        <tr>
                          <th>Nom</th>
                          <th>Contact</th>
                          <th>Email</th>
                          <th>Adresse</th>
                          <th>Rôle</th>
                          <th class="text-end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <template v-for="(user, i) in users" :key="i">
                          <tr>
                            <td>{{ user.name }}</td>
                            <td>{{ user.contact }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.adresse }}</td>
                            <td></td>
                            <td>
                             
                             
                            </td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /Content End -->
      </div>
      <!-- /Page Content -->
    </div>
    <!-- /Page Wrapper -->
    <adduser @user-add="refresh"></adduser>
  </div>
</template>

<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import adduser from "../users/adduser.vue";
import onlineService from "../../services/onlineService";
import loadingcomponent from "../../components/loading/spinnercomponent.vue"

export default {
  components: {
    Header,
    Sidebar,
    adduser,
    loadingcomponent
  },
  data() {
    return {
      users: {},
      isLoading: true,
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        this.isLoading = true;
        this.users = await onlineService.getUser();
      } catch (error) {
        console.error("There was an error fetching the data:", error);
      } finally {
        this.isLoading = false;
      }
    },
    refresh() {
      // this.users = users.data;
      this.getUsers();
    },
  },
};
</script>

