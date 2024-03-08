<template>
     <div id="assign_leader" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Fichier</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div>
            <ul class="chat-user-list">
              <template v-for="file in filetoedit" :key="file.id_fileavenant">


                <div class="media d-flex">
                  <div class="media-body align-self-center text-nowrap flex-grow-1">
                    <div class="user-name">
                      Nom du fichier: {{ file.titre }}
                    </div>
                    <span class="designation">Fichier:
                      <a :href="'/images/piece_avenant/' + file.nom_file" download>{{ file.nom_file }}</a></span>
                  </div>


                </div>
                <div>
                  <iframe v-bind:src="'/images/piece_avenant/' + file.nom_file" type="" width="750" height="500"></iframe>
                </div>

              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default{
    props:['filetoedit']
}
</script>