<template>
    <div id="add_file" class="modal custom-modal fade" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Ajouter pièce</h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <b-form @submit="submit" @keydown="form.onKeydown($event)">
                        <div class="row">
                            <div class="col-md-12">
                                <input v-model="avenantoedit.id_avenant" type="hidden" :modelValue="avenantoedit.id_avenant"
                                    name="name" />
                                <HasError :form="form" field="name" class="form-control" />

                                <b-form-group id="titre" label="Titre de la pièce" label-for="titre" description="">
                                    <b-form-input id="titre" v-model="form.titre" type="text"
                                        placeholder="Titre de la pièce" required>
                                    </b-form-input>
                                </b-form-group>

                                <b-form-group id="piece" label="Pièce" label-for="piece" description="">
                                    <input type="file" name="file" @change="handleFile" class="form-control"
                                        accept="image/*,.pdf" />
                                    <HasError :form="form" field="file" />
                                </b-form-group>
                            </div>
                        </div>

                        <b-form-group class="mt-3">
                            <b-button type="submit" variant="primary" class="m-3">Ajouter</b-button>
                            <b-button type="reset" variant="danger" class="ml-3">Annuler</b-button>
                        </b-form-group>
                    </b-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Form from "vform";
import { HasError } from "vform/src/components/bootstrap5";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({
  /* options */
});
export default {
    components: {
        HasError,
    },
    props: ["avenantoedit"],
    data() {
        return {
            form: Form.make({
                id_avenant: "",
                titre: "",
                file: null,
            }),
        };
    },
    methods: {
        handleFile(event) {
            // We'll grab just the first file...
            // You can also do some client side validation here.
            const file = event.target.files[0];

            // Set the file object onto the form...
            this.form.file = file;
            this.form.id_avenant = this.avenantoedit.id_avenant
            // this.form.id_sinistre = file
        },

        async submit() {
            const response = await this.form.post("/api/auth/postFileAvenant", {}).then((res) => {
                if (res.status === 200) {
                    toaster.success(`Fichier avenant ajouté avec succès`, {
                        position: "top-right",
                    });

                    this.form.reset();
                }
            });
        },
    }
}
</script>