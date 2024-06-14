// utils/helpers/calculationHelper.js

export const calculatePrimeReduite = (tauxEffectif, montantDeces) => {
    if (tauxEffectif && montantDeces) {
      const CalculPrimeReduite = montantDeces - (montantDeces * tauxEffectif) / 100;
      return parseInt(Math.round(CalculPrimeReduite));
    }
    return 0;
  };
  
  export const calculatePrimeNetteAnnuelle = (PrimeReduite, effectif) => {
    if (PrimeReduite && effectif) {
      const CalculPrimeNetteAnnuelle = PrimeReduite * effectif;
      return parseInt(Math.round(CalculPrimeNetteAnnuelle));
    }
    return 0;
  };
  
  export const calculerMontantDeces = (nombreDeces, tauxDeces, nombreIpt, tauxIpt, tauxFrais) => {
    if (
      !isNaN(nombreDeces) &&
      !isNaN(tauxDeces) &&
      !isNaN(nombreIpt) &&
      !isNaN(tauxIpt) &&
      !isNaN(tauxFrais)
    ) {
      const nombreDecesEntier = parseInt(nombreDeces);
      const tauxDecesNombre = parseFloat(tauxDeces);
      const nombreIptEntier = parseFloat(nombreIpt);
      const tauxIptNombre = parseFloat(tauxIpt);
      const tauxFraisNombre = parseFloat(tauxFrais);
  
      if (nombreDecesEntier >= 0 && tauxDecesNombre >= 0) {
        let montantDeces =
          Math.floor((nombreDecesEntier * tauxDecesNombre) / 1000) +
          Math.floor((nombreIptEntier * tauxIptNombre) / 1000) +
          Math.floor(tauxFraisNombre);
        return montantDeces;
      }
    }
    return 0;
  };
  
  export const calculerNombreJours = (debut, fin) => {
    const dateDebut = new Date(debut);
    const dateFin = new Date(fin);
    const differenceEnMillisec = dateFin - dateDebut;
    const differenceEnJours = differenceEnMillisec / (1000 * 3600 * 24);
    return Math.round(differenceEnJours);
  };
  
  export const optionTaxe = (PrimeNette, accessoire) => {
    if (PrimeNette && accessoire) {
      const TaxePrime = ((PrimeNette + accessoire) * 14.5) / 100;
      const TaxePrimeArrondie = parseInt(Math.round(TaxePrime));
      const primeTTC = parseInt(Math.round(PrimeNette + TaxePrimeArrondie + accessoire));
      return { TaxePrimeArrondie, primeTTC };
    }
    return { TaxePrimeArrondie: 0, primeTTC: 0 };
  };
  