<template>
  <div class="col-md-8 form1" style="display: none">
    <div>
      <label>Adresse</label>
      <input
        type="text"
        class="form-control"
        placeholder="Entrez une nouvelle adresse"
        v-model="ajout_adresse"
      />
    </div>
  </div>
  <div class="col-md-2 form2" style="display: none">
    <div>
      <button
        type="button"
        class="btn btn-primary"
        style="margin-top: 25px"
        @click="storeAdresse"
      >
        Ajouter
      </button>
    </div>
  </div>
</template>
<script>
export default{
    
}
</script>