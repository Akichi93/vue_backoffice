<template>
  <div id="assign_leader" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Fichier</h5>
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
          {{ files }}

          <!-- <ul class="chat-user-list">
            <li v-for="file in filetoedit" :key="file.id_fileavenant">
              <div class="media d-flex">
                <div
                  class="media-body align-self-center text-nowrap flex-grow-1"
                >
                  <div class="user-name">Nom du fichier: {{ file.titre }}</div>
                  <span class="designation">
                    Fichier:
                    <a
                      :href="`/images/piece_avenant/${file.nom_file}`"
                      download
                    >
                      {{ file.nom_file }}
                    </a>
                  </span>
                </div>
              </div>
              <div>
                <iframe
                  :src="`/images/piece_avenant/${file.nom_file}`"
                  type=""
                  width="750"
                  height="500"
                ></iframe>
              </div>
            </li>
          </ul> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["avenantoedit"],
  data() {
    return {
      files: "", // Initialize filetoedit as an empty array
    };
  },
  created() {
    this.fetchFile();
  },

  methods: {
    fetchFile() {
      // const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const uuid = this.avenantoedit.uuidAvenant;
      axios  
        // .get(`${apiUrl}/api/auth/fileavenants/${uuid}`)
        .get(" https://fl4ir.loca.lt/api/auth/fileavenants/" + uuid)
        .then((response) => {
          this.files = response.data;
        })
        .catch((error) => {
          console.error("Error fetching files:", error);
          // Handle error (e.g., display error message)
        });
    },
  },
};
</script>
