<template>
  <div id="add_client" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter une tarification</h5>
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
            <div class="col-sm-12">
              <div class="form-group">
                <label>Classes</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Entrez la boîte postale"
                />
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <label>Profession</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Entrez la boîte postale"
                />
              </div>
            </div>
          </div>
          <div class="section">
            <h5><b>TAUX</b></h5>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Décès</label>
                  <input type="text" class="form-control" placeholder="Décès" />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label>IPT</label>
                  <input type="text" class="form-control" placeholder="IPT" />
                </div>
              </div>
            </div>
          </div>
          <div class="section">
            <h5><b>FRAIS MEDICAUX ET PHARMACEUTIQUES</b></h5>
            <div class="row">
            <div class="col-sm-6">
              <div class="form-group">
                <label>100.000</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email du client"
                />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <label>200.000</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email du client"
                />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <label>400.000</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email du client"
                />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <label>500.000</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email du client"
                />
              </div>
            </div>
          </div>
          </div>
        

         
          <div class="submit-section">
            <button
              type="button"
              class="btn btn-primary cancel-btn"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Annuler
            </button>
            <button
              type="button"
              class="btn btn-primary submit-btn"
              @click="storeClient"
              data-bs-dismiss="modal"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
export default {};
</script>
  