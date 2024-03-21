<template>
    <div class="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
        <div class="add-emp-section">
            <button @click="exportToExcel" class="list-icon active">
                <i class="fas fa-file-csv"></i> Exporter en excel
            </button>
        </div>
    </div>
</template>

<script>
import AppStorage from '../../db/AppStorage';

export default {
    data() {
        return {
            contrats: []
        };
    },
    created() {
        this.getContrats();
    },
    methods: {
        getContrats() {
            AppStorage.getDataStatistique().then((result) => {
                this.contrats = result;
            });
        },
        exportToExcel() {
            const xlsContent = this.generateExcelContent();
            const blob = new Blob([xlsContent], { type: "application/vnd.ms-excel" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "contrats.xls";
            link.click();
        },
        generateExcelContent() {
            const fieldMappings = {
                'nom_branche': 'Nom de la branche',
                'numero_police': 'Numero de la police',
                'nom_client': 'Nom du client',
                'client.email_client': 'Email du client',
                'client.tel_client': 'Contact du client',
                'client.adresse_client': 'Adresse du client',
                'client.postal_client': 'Postal du client',
                'client.profession_client': 'Profession du client',
                'client.fax_client': 'Fax du client',
                'apporteur.nom_apporteur': 'Nom de l\'apporteur',
                'apporteur.contact_apporteur': 'Contact de l\'apporteur',
                'apporteur.email_apporteur': 'Email de l\'apporteur',
                'apporteur.adresse_apporteur': 'Adresse de l\'apporteur',
                'compagnie.nom_compagnie': 'Nom de la compagnie',
                'compagnie.adresse_compagnie': 'Adresse de la compagnie',
                'compagnie.email_compagnie': 'Email de la compagnie',
                'compagnie.contact_compagnie': 'Contact de la compagnie',
                'expire_le': 'Date d\'expiration du contrat',
                'heure_police': 'Heure de la police',
                'effet_police': 'Date d\'effet de la police',
            };

            const table = document.createElement("table");
            const headerRow = table.insertRow(0);
            Object.values(fieldMappings).forEach((header) => {
                const th = document.createElement("th");
                th.innerHTML = header;
                headerRow.appendChild(th);
            });

            this.contrats.forEach((contrat) => {
                const tr = table.insertRow(-1);
                Object.keys(fieldMappings).forEach((field) => {
                    const td = tr.insertCell(-1);
                    let value = "N/A";

                    // Vérifie si le champ appartient au contrat
                    if (contrat[field] !== undefined) {
                        value = contrat[field];
                    } else {
                        // Vérifie si le champ appartient au client
                        if (field.startsWith('client.')) {
                            value = contrat.client[field.split('.')[1]];
                        }
                        // Vérifie si le champ appartient à l'apporteur
                        else if (field.startsWith('apporteur.')) {
                            value = contrat.apporteur[field.split('.')[1]];
                        }

                        else if (field.startsWith('compagnie.')) {
                            value = contrat.compagnie[field.split('.')[1]];
                        }
                    }
                    td.innerHTML = value !== undefined ? value : "N/A";
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
        
    }
};
</script>
