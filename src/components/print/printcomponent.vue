<template>
  <div>
    <div class="controls">
      <label>
        Taille du texte:
        <input
          type="range"
          class="form-range"
          min="50"
          max="200"
          v-model="fontSize"
          @input="adjustFontSize"
        />
      </label>
      <label>
        Nombre de pages:
        <input
          type="number"
          class="form-control"
          v-model.number="pageCount"
          @input="adjustPageCount"
          min="1"
        />
      </label>
      <button class="btn btn-success" @click="printSection">Imprimer</button>
      <button class="btn btn-primary" @click="exportToPDF">Exporter en PDF</button>
    </div>

    <div
      class="preview"
      ref="printableArea"
      :style="{ fontSize: `${fontSize}%` }"
    >
      <div v-if="!isPreview">
        <slot></slot>
      </div>
      <div v-else>
        <div
          v-for="(page, index) in paginatedContent"
          :key="index"
          class="page"
        >
          <div v-html="page"></div>
        </div>
      </div>
    </div>

    <div class="note">
      <p>
        Note: Pour éviter l'affichage de l'heure d'impression sur la feuille,
        désactivez les en-têtes et pieds de page dans les paramètres
        d'impression de votre navigateur.
      </p>
    </div>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";

export default {
  name: "PrintButton",
  data() {
    return {
      isPreview: false,
      fontSize: 100,
      pageCount: 1,
      paginatedContent: [],
    };
  },
  methods: {
    adjustFontSize() {
      if (this.isPreview) {
        this.paginateContent();
      }
    },
    adjustPageCount() {
      if (this.isPreview) {
        this.paginateContent();
      }
    },
    paginateContent() {
      const content = this.$refs.printableArea.innerText;
      const lines = content.split("\n");
      const linesPerPage = Math.ceil(lines.length / this.pageCount);

      this.paginatedContent = [];
      for (let i = 0; i < this.pageCount; i++) {
        const pageContent = lines
          .slice(i * linesPerPage, (i + 1) * linesPerPage)
          .join("\n");
        this.paginatedContent.push(pageContent);
      }
    },
    printSection() {
      const printContents = this.$refs.printableArea.innerHTML;
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    },
    exportToPDF() {
      const element = this.$refs.printableArea; // Récupérer l'élément à convertir en PDF

      // Configuration des options pour html2pdf
      const options = {
        margin: [10, 10, 10, 10], // Marges en pixels (haut, droite, bas, gauche)
        filename: "facture.pdf", // Nom du fichier PDF à télécharger
        image: { type: "jpeg", quality: 0.98 }, // Format d'image et qualité (optionnel)
        html2canvas: { scale: 2 }, // Facteur d'échelle pour améliorer la résolution (optionnel)
      };

      // Convertir et télécharger en PDF avec les options configurées
      html2pdf()
        .set(options)
        .from(element)
        .then(() => {
          // Fermer le modal après l'exportation en PDF
          this.$emit("closeModal");
        })
        .save();
    },
  },
};
</script>

<style scoped>
.controls {
  margin-bottom: 10px;
}

button {
  margin-right: 10px;
}

.preview {
  transform-origin: top left;
  padding: 10px;
  margin-top: 10px;
  overflow: auto;
}

.page {
  page-break-after: always;
  margin-bottom: 20px;
}

.note {
  margin-top: 20px;
  color: #666;
}
</style>
