<template>
  <div id="assign_leader" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Fichiers</h5>
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
          <ul class="file-list">
            <li v-for="file in files" :key="file.id_fileavenant">
              <div class="media d-flex">
                <div class="media-body align-self-center text-nowrap flex-grow-1">
                  <div class="file-title">Nom du fichier: {{ file.titre }}</div>
                  <span class="file-details">
                    Fichier:
                    <a :href="`/images/piece_avenant/${file.nom_file}`" download>
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
          </ul>
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
      files: [] // Initialize files as an empty array
    };
  },
  mounted() {
    this.fetchFiles();
  },
  methods: {
    fetchFiles() {
      const uuid = this.avenantoedit.uuidAvenant;
      alert(uuid)
      axios
        .get(`https://fl4ir.loca.lt/api/auth/fileavenants/${uuid}`)
        .then((response) => {
          this.files = response.data;
        })
        .catch((error) => {
          console.error("Error fetching files:", error);
          // Handle error (e.g., display error message)
        });
    }
  }
};
</script>

<style scoped>
/* Ajoutez des styles CSS personnalisés ici */
.file-list {
  list-style: none;
  padding: 0;
}
.file-list li {
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
}
.file-title {
  font-weight: bold;
}
.file-details {
  font-style: italic;
}
</style>
