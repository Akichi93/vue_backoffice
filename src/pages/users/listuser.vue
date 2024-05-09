<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />
    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Utilisateurs</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Utilisateurs
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
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#add_user"
                class="btn btn-success btn-add-emp"
                style="width: auto"
                ><i class="fas fa-plus"></i>
                Ajouter utilisateur
              </a>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-row">
            <input
              type="text"
              class="form-control"
              placeholder="Rechercher un utilisateur"
              v-model="q"
              @keyup="searchtask"
            />
          </div>
          <div class="col-md-12">
            <div>
              <table class="table table-striped custom-table mb-0">
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
                      <td>
                        <span class="badge badge-pill bg-success">{{
                          user.nom_role
                        }}</span>
                      </td>
                      <td class="text-end ico-sec d-flex justify-content-end">
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_department"
                          title="Modifier"
                          @click="getUser(user.id)"
                          ><i class="fas fa-pen"></i>
                        </a>
                        <a
                          href="#"
                          @click="viewusers(user.id)"
                          title="Voir les détails"
                          ><i class="fas fa-eye"></i>
                        </a>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <adduser @user-add="refresh"></adduser>
    <edituser v-bind:userstoedit="userstoedit"></edituser>
  </div>
</template>
<script>
import axios from "axios";
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
// import { getUsersList } from "../../services/userservice";
import { apiUrl } from "../../utils/constants/apiUrl";
import adduser from "./adduser.vue";
import edituser from "./edituser.vue";
export default {
  components: {
    Header,
    Sidebar,
    adduser,
    edituser,
  },
  data() {
    return {
      users: {},
      userstoedit: "",
    };
  },
  created() {
    this.getUsers();
  },

  methods: {
    getUser(id) {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Ajoutez le token JWT dans l'en-tête
        },
      };
      const editUserUrl = apiUrl.setedituser(id);
      axios
        .get(editUserUrl, config)
        .then((response) => (this.userstoedit = response.data))
        .catch((error) => console.log(error));
    },

    async getUsers() {
      axios
        .get(apiUrl.getuser)
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.message || error.message;
        });
    },

    refresh(users) {
      this.users = users.data;
    },
  },
};
</script>
  