<template>
  <button class="btn btn-primary" @click="exportToExcel">
    Exporter en Excel
  </button>
  <button class="btn btn-primary" @click="exportToCSV">Exporter en CSV</button>
</template>
<script>
import switchService from "../../services/switchService";
export default {
  created() {
    this.getClients();
  },

  methods: {
    async getClients() {
      this.clients = await switchService.getClients();
    },
    exportToCSV() {
      const header = Object.keys(this.clients[0]).join(",");
      const rows = this.clients.map((row) => Object.values(row).join(","));

      const csvContent = `${header}\n${rows.join("\n")}`;

      const blob = new Blob([csvContent], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "clients.csv";
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
      link.download = "clients.xls";
      link.click();
    },
    generateExcelContent() {
      // Create an HTML table with the data
      const table = document.createElement("table");
      const headerRow = table.insertRow(0);

      // Add headers
      Object.keys(this.clients[0]).forEach((header) => {
        const th = document.createElement("th");
        th.innerHTML = header;
        headerRow.appendChild(th);
      });

      // Add data rows
      this.clients.forEach((row) => {
        const tr = table.insertRow(-1);

        Object.values(row).forEach((value) => {
          const td = tr.insertCell(-1);
          td.innerHTML = value;
        });
      });

      // Convert the table to HTML string
      const tableHtml = table.outerHTML;

      // Create the Excel file content
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
<style scoped>
.export-buttons {
  margin-top: 20px;
}

.export-buttons button {
  margin-right: 10px;
}
</style>