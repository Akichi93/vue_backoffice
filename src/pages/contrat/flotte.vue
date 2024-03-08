<template>
    <div class="modal custom-modal fade" id="add_flotte" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="form-header">
                        <h3>Ajouter une flotte</h3>
                    </div>
                    <div class="modal-btn delete-action">
                        <h3 class="card-title">
                            Automobiles
                            <a href="BDapporteur.xlsx" download class="edit-icon"><i class="fas fa-download"
                                    title="Télécharger le model"></i>
                            </a>
                        </h3>      

                        <div class="form-group">
                            <label>Téléverser fichier</label>
                            <div>
                                <input type="file" @change="onFileChange" />
                                <button @click="uploadFile">Upload</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            selectedFile: null,
        };
    },
    methods: {
        onFileChange(event) {
            this.selectedFile = event.target.files[0];
        },
        async uploadFile() {
            const formData = new FormData();
            formData.append('import_auto', this.selectedFile);

            try {
                // Make a POST request to Laravel route for file upload
                const response = await axios.post('/api/auth/importautomobile', formData);
                console.log('File uploaded successfully:', response.data);
                // Handle response as needed
            } catch (error) {
                console.error('Error uploading file:', error);
                // Handle error
            }
        },
    },
};
</script>