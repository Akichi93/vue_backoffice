<template>
  <div class="export-buttons">
    <button class="btn btn-primary" @click="exportToExcel">Exporter en Excel</button>
    <button class="btn btn-primary" @click="exportToCSV">Exporter en CSV</button>
  </div>
</template>

<script>
import switchService from "../../services/switchService";

export default {
  data() {
    return {
      contrats: [],
    };
  },
  created() {
    this.getContrats();
  },
  methods: {
    async getContrats() {
      this.contrats = await switchService.getContrats();
    },
    exportToCSV() {
      const header = Object.keys(this.contrats[0]).join(",");
      const rows = this.contrats.map(row => Object.values(row).join(","));

      const csvContent = `${header}\n${rows.join("\n")}`;

      const blob = new Blob([csvContent], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "contracts.csv";
      link.click();
    },
    exportToExcel() {
      const xlsContent = this.generateExcelContent();
      const blob = new Blob([xlsContent], { type: "application/vnd.ms-excel" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "contracts.xls";
      link.click();
    },
    generateExcelContent() {
      const table = document.createElement("table");
      const headerRow = table.insertRow(0);

      Object.keys(this.contrats[0]).forEach(header => {
        const th = document.createElement("th");
        th.innerHTML = header;
        headerRow.appendChild(th);
      });

      this.contrats.forEach(row => {
        const tr = table.insertRow(-1);

        Object.values(row).forEach(value => {
          const td = tr.insertCell(-1);
          td.innerHTML = value;
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

<style scoped>
.export-buttons {
  margin-top: 20px;
}

.export-buttons button {
  margin-right: 10px;
}
</style>
