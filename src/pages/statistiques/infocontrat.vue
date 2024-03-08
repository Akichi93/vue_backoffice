<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />

    <div class="page-wrapper">
      <!-- Begin page -->
      <div class="page-content">
        <div class="container-fluid">
          <div class="profile-foreground position-relative mx-n4 mt-n4">
            <div class="profile-wid-bg">
              <img
              :src="require('@/assets/images/profile-bg.jpg')"
                alt=""
                class="profile-wid-img"
              />
            </div>
          </div>
          <div class="pt-4 mb-4 mb-lg-3 pb-lg-4">
            <div class="row g-4">
              <div class="col">
                <div class="p-2">
                  <h3 class="text-black mb-1" v-text="contrats.nom_client"></h3>
                  <p
                    class="text-white-75"
                    v-text="contrats.profession_client"
                  ></p>
                </div>
              </div>
              <!--end col-->
            </div>
            <!--end row-->
          </div>

          <div class="row">
            <div class="col-lg-12">
              <div>
                <div class="d-flex">
                  <!-- Nav tabs -->
                  <ul
                    class="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1"
                    role="tablist"
                  >
                    <li class="nav-item">
                      <a
                        class="nav-link fs-14 active"
                        data-bs-toggle="tab"
                        href="#overview-tab"
                        role="tab"
                      >
                        <i class="ri-airplay-fill d-inline-block d-md-none"></i>
                        <span class="d-none d-md-inline-block">Détails</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link fs-14"
                        data-bs-toggle="tab"
                        href="#documents"
                        role="tab"
                      >
                        <i
                          class="ri-folder-4-line d-inline-block d-md-none"
                        ></i>
                        <span class="d-none d-md-inline-block">Documents</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <!-- Tab panes -->
                <div class="tab-content pt-4 text-muted">
                  <div
                    class="tab-pane active"
                    id="overview-tab"
                    role="tabpanel"
                  >
                    <div class="row">
                      <div class="col-xxl-3">
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title mb-3">Info</h5>
                            <div class="table-responsive">
                              <table class="table table-borderless mb-0">
                                <tbody>
                                  <tr>
                                    <th class="ps-0" scope="row">
                                      Numéro de police :
                                    </th>
                                    <td class="text-muted">
                                      {{ contrats.numero_police }}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th class="ps-0" scope="row">
                                      Souscrit le :
                                    </th>
                                    <td class="text-muted">
                                      {{ contrats.souscrit_le }}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th class="ps-0" scope="row">
                                      Effet de police :
                                    </th>
                                    <td class="text-muted">
                                      {{ contrats.effet_police }}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th class="ps-0" scope="row">
                                      Heure de police :
                                    </th>
                                    <td class="text-muted">
                                      {{ contrats.heure_police }}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th class="ps-0" scope="row">Expire le</th>
                                    <td class="text-muted">
                                      {{ contrats.expire_le }}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th class="ps-0" scope="row">Expire le</th>
                                    <td class="text-muted">
                                      {{ contrats.reconduction }}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <!-- end card body -->
                        </div>
                        <!-- end card -->
                      </div>
                      <!--end col-->
                    </div>
                    <!--end row-->
                  </div>
                  <div class="tab-pane fade" id="documents" role="tabpanel">
                    <div class="card">
                      <div class="card-body">
                        <div class="d-flex align-items-center mb-4">
                          <h5 class="card-title flex-grow-1 mb-0">Documents</h5>
                        </div>
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="table-responsive">
                              <table
                                class="table table-borderless align-middle mb-0"
                              >
                                <thead class="table-light">
                                  <tr>
                                    <th scope="col">Nom du fichier</th>
                                    <th scope="col">Documents</th>
                                    <th scope="col">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <template
                                    v-for="(file, index) in files"
                                    :key="index"
                                  >
                                    <tr>
                                      <td v-text="file.titre"></td>
                                      <td v-text="file.nom_file"></td>

                                      <td>
                                        <a
                                          :href="
                                            '/images/piece_avenant/' +
                                            file.nom_fichier
                                          "
                                        >
                                          <iframe
                                            :src="
                                              '/images/piece_sinistres/' +
                                              file.nom_file
                                            "
                                            frameborder="0"
                                            width="80"
                                            height="80"
                                          ></iframe>
                                         
                                        </a>
                                        <!-- <a
                                          href="#"
                                          data-bs-toggle="modal"
                                          data-bs-target="#personal_info_modal-{{ $file->id_fileavenant }}"
                                          ><i
                                            class="ri-eye-fill me-2 align-middle text-muted"
                                          ></i
                                          >Voir</a
                                        >
                                        <a
                                          href="{{ asset('/images/piece_avenant/' . $file->nom_file) }}"
                                          download
                                          ><i
                                            class="ri-eye-fill me-2 align-middle text-muted"
                                          ></i
                                          >Télécharger</a
                                        >

                                        <div
                                          id="personal_info_modal"
                                          class="modal custom-modal fade"
                                          role="dialog"
                                        >
                                          <div
                                            class="modal-dialog modal-dialog-centered modal-lg"
                                            role="document"
                                          >
                                            <div class="modal-content">
                                              <div class="modal-header">
                                                <h5 class="modal-title">
                                                  Fichier
                                                </h5>
                                                <button
                                                  type="button"
                                                  class="close"
                                                  data-bs-dismiss="modal"
                                                  aria-label="Close"
                                                >
                                                  <i class="fas fa-times"></i>
                                                </button>
                                              </div>
                                              <div class="modal-body">
                                                <div class="row">
                                                  <iframe
                                                    src=""
                                                    frameborder="0"
                                                    width="850"
                                                    height="400"
                                                  ></iframe>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div> -->
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
                  </div>
                  <!--end tab-pane-->
                </div>
                <!--end tab-content-->
              </div>
            </div>
            <!--end col-->
          </div>
          <!--end row-->
        </div>
        <!-- container-fluid -->
      </div>
    </div>
  </div>
  <!-- End Page-content -->
  <!-- End Page-content -->
</template>
<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
export default {
  name: "statclient",
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      contrats: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const token = localStorage.getItem("token");

      // Configurez les en-têtes de la requête
      const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
      };
      axios

        .get(`/api/auth/detailscontrats/${this.$route.params.id_contrat}`, {
          headers,
        })
        .then((response) => {
          this.contrats = response.data.contrats;
          this.files = response.data.files;
        })
        .catch((error) => {
          this.error = error.response.data.message || error.message;
        });
    },
  },
};
</script>