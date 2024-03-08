<template>
  <div id="add_garantie" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter une garantie</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <h4 class="card-title mb-0">Garantie</h4>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <input type="hidden" v-model="id_contrat" :modelValue="id_contrat" />
                      <div class="col-lg-3 col-md-6">
                        <div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                              v-model="tierce" value="Tierce simple" />
                            <label class="form-check-label" for="flexRadioDefault1">
                              Tierce simple
                            </label>
                          </div>
                        </div>
                      </div>
                      <!--end col-->
                      <div class="col-lg-3 col-md-6">
                        <div class="mt-4 mt-md-0">
                          <div>
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                v-model="tierce" value="Tierce complete" />
                              <label class="form-check-label" for="flexRadioDefault2">
                                Tierce complete
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--end col-->

                      <div class="col-lg-3 col-md-6">
                        <div class="mt-4 mt-md-0">
                          <div>
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3"
                                v-model="tierce" value="Tierce collision" />
                              <label class="form-check-label" for="flexRadioDefault3">
                                Tierce collision
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--end col-->

                      <div class="col-lg-3 col-md-6">
                        <div class="mt-4 mt-md-0">
                          <div>
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4"
                                v-model="tierce" value="dommage" />
                              <label class="form-check-label" for="flexRadioDefault4">
                                Dommage
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--end col-->
                      <div class="card-body">
                        <div class="live-preview">
                          <div class="row">
                            <div class="col-lg-3 col-md-6" id="garantie1">
                              <div>
                                <div class="form-check form-check-right">
                                  <input class="form-check-input" type="checkbox" value=" Responsabilité civile"
                                    v-model="typegarantie" id="checkbox1" />
                                  <label class="form-check-label" for="checkbox1">
                                    Responsabilité civile
                                  </label>
                                </div>
                              </div>
                            </div>
                            <!--end col-->

                            <div class="col-lg-3 col-md-6" id="garantie2">
                              <div class="mt-4 mt-md-0">
                                <div>
                                  <div class="form-check form-check-right">
                                    <input class="form-check-input" type="checkbox" value="Défense et recours"
                                      v-model="typegarantie" id="checkbox2" />
                                    <label class="form-check-label" for="checkbox2">
                                      Défense et recours
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!--end col-->

                            <div class="col-lg-3 col-md-6" id="garantie3">
                              <div class="mt-4 mt-md-0">
                                <div>
                                  <div class="form-check form-check-right">
                                    <input class="form-check-input" type="checkbox" value="Avance sur recours"
                                      id="checkbox3" v-model="typegarantie" />
                                    <label class="form-check-label" for="checkbox3">
                                      Avance sur recours
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!--end col-->

                            <div class="col-lg-3 col-md-6" id="garantie4">
                              <div class="mt-4 mt-md-0">
                                <div>
                                  <div class="form-check form-check-right">
                                    <input class="form-check-input" type="checkbox" value="Dommage tous accident"
                                      v-model="typegarantie" id="checkbox4" />
                                    <label class="form-check-label" for="checkbox4">
                                      Dommage tous accident
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="col-lg-3 col-md-6">
                              <div class="mt-4 mt-md-0">
                                <div>
                                  <div class="form-check form-check-right">
                                    <input class="form-check-input" type="checkbox" value="Dommage tierce collision"
                                      v-model="typegarantie" id="checkbox5" />
                                    <label class="form-check-label" for="checkbox5">
                                      Dommage tierce collision
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="col-lg-3 col-md-6" id="garantie6">
                              <div class="mt-4 mt-md-0">
                                <div>
                                  <div class="form-check form-check-right">
                                    <input class="form-check-input" type="checkbox" value="Vol des acccessoires"
                                      v-model="typegarantie" id="checkbox6" />
                                    <label class="form-check-label" for="checkbox6">
                                      Vol des acccessoires
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="col-lg-3 col-md-6" id="garantie7">
                              <div class="mt-4 mt-md-0">
                                <div>
                                  <div class="form-check form-check-right">
                                    <input class="form-check-input" type="checkbox" value="Vol simple"
                                      v-model="typegarantie" id="checkbox7" />
                                    <label class="form-check-label" for="checkbox7">
                                      Vol simple
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="col-lg-3 col-md-6" id="garantie8">
                              <div class="mt-4 mt-md-0">
                                <div>
                                  <div class="form-check form-check-right">
                                    <input class="form-check-input" type="checkbox" value="Vol par agression"
                                      v-model="typegarantie" id="checkbox8" />
                                    <label class="form-check-label" for="checkbox8">
                                      Vol par agression
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="col-lg-3 col-md-6" id="garantie9">
                              <div class="mt-4 mt-md-0">
                                <div>
                                  <div class="form-check form-check-right">
                                    <input class="form-check-input" type="checkbox" name="checked[]" value="Incendie"
                                      v-model="typegarantie" id="checkbox9" />
                                    <label class="form-check-label" for="checkbox9">
                                      Incendie
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="col-lg-3 col-md-6" id="garantie10">
                              <div class="mt-4 mt-md-0">
                                <div>
                                  <div class="form-check form-check-right">
                                    <input class="form-check-input" type="checkbox" name="checked[]"
                                      value="Personnes transportees" v-model="typegarantie" id="checkbox10" />
                                    <label class="form-check-label" for="checkbox10">
                                      Personnes transportees
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!--end row-->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="submit-section">
              <button class="btn btn-primary cancel-btn" data-bs-dismiss="modal" aria-label="Close">
                Annuler
              </button>
              <button type="button" class="btn btn-primary submit-btn" @click="storeGarantie">
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script></script>