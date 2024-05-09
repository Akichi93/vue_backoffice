<template>
    <div id="add_frais" class="modal custom-modal fade" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ajouter un frais médical</h5>
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
            <div class="section">
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <label>Montant</label>
                    <InputNumber
                      :numberValue="form.montant"
                      :placeholder="'Entrez le montant'"
                      @update:numberValue="updateMontant"
                    >
                    </InputNumber>
                    <p
                    style="color: red"
                    class="text-red"
                    v-if="errors.montant"
                    v-text="errors.montant"
                  ></p>
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
                @click="storeMontant"
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
  import InputNumber from "../../components/input/inputNumber.vue";

  import { validateFraisForm } from "../../utils/helpers/formValidation";
  import { v4 as uuidv4 } from "uuid";
  // import switchService from '../../services/switchService';
  import { createToaster } from "@meforma/vue-toaster";
  import AppStorage from "../../db/AppStorage";
  const toaster = createToaster({
    /* options */
  });
  
  export default {
    components: {
      InputNumber,
    },
    data() {
      return {
        form: {
          montant: ""
        },
        errors: {},
      };
    },
    methods: {
        updateMontant(value) {
        this.form.montant = value;
      },
      async storeMontant() {
        this.errors = validateFraisForm(this.form);
  
        if (Object.keys(this.errors).length > 0) {
          toaster.error(`Veuillez remplir les champs`, {
            position: "top-right",
          });
          return;
        }
  
        const uuid = uuidv4();
        const userId = parseInt(AppStorage.getId(), 10);
        const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);
  
        const newFraisData = [
          {
            id: userId,
            uuidFraisMedical: uuid,
            montant: this.form.montant,
            sync: 0,
            id_entreprise: entrepriseId,
          },
        ];
  
        await AppStorage.storeDataInIndexedDB(
          "fraismedicals",
          newFraisData
        );
  
        const updatedFrais = await AppStorage.getReductionGroups();
  
        this.$emit("frais-add", updatedFrais);
  
        toaster.success(`Montant ajouté `, { position: "top-right" });
      },
    },
  };
  </script>
      