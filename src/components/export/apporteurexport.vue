<template>
  <button @click="exportToExcel">Exporter en Excel</button>
  <button @click="exportToCSV">Exporter en CSV</button>
</template>
<script>
import { getApporteursExport } from "../../services/apporteurService";
import AppStorage from "../../db/AppStorage";
export default {
  created() {
    this.getApporteur();
  },

  methods: {
    async getApporteur() {
      this.apporteurs = await switchService.getApporteurs();
      // AppStorage.getApporteurs().then((result) => {
      //   this.apporteurs = result;
      // });
    },
    exportToCSV() {
      const header = Object.keys(this.apporteurs[0]).join(",");
      const rows = this.apporteurs.map((row) => Object.values(row).join(","));

      const csvContent = `${header}\n${rows.join("\n")}`;

      const blob = new Blob([csvContent], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "apporteurs.csv";
      link.click();
    },
    exportToExcel() {
      // Create a new Excel file
      const xlsContent = this.generateExcelContent();

      // Create a Blob from the content
      const blob = new Blob([xlsContent], { type: "application/vnd.ms-excel" });

      // Create a link element and trigger a download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "apporteurs.xls";
      link.click();
    },

    generateExcelContent() {
      const fieldMappings = {
        code_apporteur: "Code Apporteur",
        nom_apporteur: "Nom Apporteur",
        contact_apporteur: "Contact Apporteur",
        adresse_apporteur: "Adresse Apporteur",
      };

      const table = document.createElement("table");
      const headerRow = table.insertRow(0);

      // Ajouter les en-têtes
      Object.values(fieldMappings).forEach((header) => {
        const th = document.createElement("th");
        th.innerHTML = header;
        headerRow.appendChild(th);
      });

      // Ajouter les lignes de données
      this.apporteurs.forEach((row) => {
        const tr = table.insertRow(-1);

        Object.keys(fieldMappings).forEach((field) => {
          const td = tr.insertCell(-1);
          // Vérifier si la valeur du champ est définie, sinon, utiliser "N/A"
          td.innerHTML = row[field] !== undefined ? row[field] : "N/A";
        });
      });

      const tableHtml = table.outerHTML;

      return `
<html xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:x="urn:schemas-microsoft-com:office:excel"
  xmlns="http://www.w3.org/TR/REC-html40">
  <head><!--[if gte mso 9]><xml>
  <x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
  <x:Name>Sheet 1</x:Name>
  <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
  </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
  </head><body>${tableHtml}</body></html>`;
    },
  },
};
</script>