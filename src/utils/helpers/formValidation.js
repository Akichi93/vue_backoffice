// helpers/formValidation.js

export function validateForm(form) {
  const errors = {};

  if (!form.name) {
    errors.name = 'Le nom de l\'entreprise est requis.';
  }

  if (!form.email) {
    errors.email = 'L\'email de l\'entreprise est requis.';
  } else if (!isValidEmail(form.email)) {
    errors.email = 'Veuillez saisir une adresse email valide.';
  }
  if (!form.adresse) {
    errors.adresse = 'L\'adresse de l\'entreprise est requis.';
  }
  if (!form.contact) {
    errors.contact = 'Le contact de l\'entreprise est requis.';
  }



  // Ajoutez d'autres validations selon vos besoins pour les autres champs du formulaire

  return errors;
}


export function validateProspectForm(form) {
  const errors = {};


  if (!form.civilite) {
    errors.civilite = 'La civilité  est requise.';
  }

  if (!form.nom_prospect) {
    errors.nom_prospect = 'Le nom du prospect est requis.';
  } else if (form.nom_prospect.length < 3) {
    errors.nom_prospect = 'Le nom du prospect doit avoir au moins 3 caractères.';
  }

  if (!form.tel_prospect) {
    errors.tel_prospect = 'Le contact du prospect est requis.';
  } else if (!/^\d{10}$/g.test(form.tel_prospect)) {
    errors.tel_prospect = 'Le numéro de téléphone doit comporter 10 chiffres.';
  }

  if (!form.profession_prospect) {
    errors.profession_prospect = 'La profession du prospect est requis.';
  }

  if (!form.adresse_prospect) {
    errors.adresse_prospect = 'L\'adresse du prospect est requis.';
  }

  if (!form.etat) {
    errors.etat = 'L\'etat du prospect est requis.';
  }

  // Ajoutez d'autres validations selon vos besoins pour les autres champs du formulaire

  return errors;
}

export function validateClientForm(form) {
  const errors = {};


  if (!form.civilite) {
    errors.civilite = 'La civilité  est requise.';
  }

  if (!form.nom_client) {
    errors.nom_client = 'Le nom du client est requis.';
  } else if (form.nom_client.length < 3) {
    errors.nom_client = 'Le nom du client doit avoir au moins 3 caractères.';
  }

  if (!form.tel_client) {
    errors.tel_client = 'Le contact du client est requis.';
  } else if (!/^\d{10}$/g.test(form.tel_client)) {
    errors.tel_client = 'Le numéro de téléphone doit comporter 10 chiffres.';
  }

  if (!form.profession_client) {
    errors.profession_client = 'La profession du prospect est requis.';
  }

  if (!form.adresse_client) {
    errors.adresse_client = 'L\'adresse du client est requis.';
  }

  // Ajoutez d'autres validations selon vos besoins pour les autres champs du formulaire

  return errors;
}

export function validateCompagnieForm(form) {
  const errors = {};

  if (!form.nom_compagnie) {
    errors.nom_compagnie = 'Le nom de la compagnie est requis.';
  } else if (form.nom_compagnie.length < 3) {
    errors.nom_compagnie = 'Le nom de la compagnie doit avoir au moins 3 caractères.';
  }

  if (!form.contact_compagnie) {
    errors.contact_compagnie = 'Le contact de la compagnie est requis.';
  } else if (!/^\d{10}$/g.test(form.contact_compagnie)) {
    errors.contact_compagnie = 'Le numéro de téléphone doit comporter 10 chiffres.';
  }

  if (!form.email_compagnie) {
    errors.email_compagnie = 'L\'email de la compagnie est requis.';
  } else if (!/\S+@\S+\.\S+/g.test(form.email_compagnie)) {
    errors.email_compagnie = 'L\'email de la compagnie n\'est pas valide.';
  }

  if (!form.adresse_compagnie) {
    errors.adresse_compagnie = 'L\'adresse de la compagnie est requis.';
  }

  // Ajoutez d'autres validations selon vos besoins pour les autres champs du formulaire

  return errors;
}

export function validateApporteurForm(form) {
  const errors = {};

  if (!form.nom_apporteur) {
    errors.nom_apporteur = 'Le nom de l\'apporteur est requis.';
  } else if (form.nom_apporteur.length < 3) {
    errors.nom_apporteur = 'Le nom de l\'apporteur doit avoir au moins 3 caractères.';
  }

  if (!form.contact_apporteur) {
    errors.contact_apporteur = 'Le contact de l\'apporteur est requis.';
  } else if (!/^\d{10}$/g.test(form.contact_apporteur)) {
    errors.contact_apporteur = 'Le numéro de téléphone doit comporter 10 chiffres.';
  }

  if (!form.email_apporteur) {
    errors.email_apporteur = 'L\'email de l\'apporteur est requis.';
  } else if (!/\S+@\S+\.\S+/g.test(form.email_apporteur)) {
    errors.email_apporteur = 'L\'email de l\'apporteur n\'est pas valide.';
  }

  if (!form.adresse_apporteur) {
    errors.adresse_apporteur = 'L\'adresse de l\'apporteur est requis.';
  }

  // Ajoutez d'autres validations selon vos besoins pour les autres champs du formulaire

  return errors;
}

export function validateBrancheForm(form) {
  const errors = {};

  if (!form.nom_branche) {
    errors.nom_branche = 'Le nom de la branche est requise.';
  } else if (form.nom_branche.length < 3) {
    errors.nom_branche = 'Le nom de la branche doit avoir au moins 3 caractères.';
  }

  // Ajoutez d'autres validations selon vos besoins pour les autres champs du formulaire

  return errors;
}

export function validateContratForm(form) {
  const errors = {};

  if (!form.numero_police) {
    errors.numero_police = 'Le numéro de la police est requis.';
  } else if (form.numero_police.length < 3) {
    errors.numero_police = 'Le numéro de la police doit avoir au moins 3 caractères.';
  }

  if (!form.branche_id) {
    errors.branche_id = 'Veuillez choisir une branche.';
  } else {
    if (form.branche_id.nom_branche === 'AUTOMOBILE' || form.branche_id.nom_branche == 'MOTO' || form.branche_id.nom_branche == 'AUTOMOBILE HORS TPV' || form.branche_id.nom_branche == 'AUTOMOBILE TPV') {
      if (!form.numero_immatriculation) {
        errors.numero_immatriculation = 'Veuillez entrer le numéro d\'immatriculation.';
      }
      // if (!form.tierce) {
      //   errors.tierce = 'Veuillez choisir le .';
      // }

    }
  }

  if (!form.compagnie_id) {
    errors.compagnie_id = 'Veuillez choisir une compagnie.';
  }

  if (!form.client_id) {
    errors.client_id = 'Veuillez choisir une client.';
  }

  if (!form.apporteur_id) {
    errors.apporteur_id = 'Veuillez choisir un apporteur.';
  }

  if (!form.souscrit_le) {
    errors.souscrit_le = 'Veuillez choisir la date de souscription.';
  }

  if (!form.heure_police) {
    errors.heure_police = 'Veuillez choisir l\'heure.';
  }

  if (!form.expire_le) {
    errors.expire_le = 'Veuillez choisir la date d\'expiration.';
  }

  if (!form.effet_police) {
    errors.effet_police = 'Veuillez choisir l\'effet de la police.';
  }

  if (!form.reconduction) {
    errors.reconduction = 'Veuillez choisir la reconduction.';
  }


  if (!form.primes_nette) {
    errors.primes_nette = 'Veuillez entrer la prime nette.';
  }

  if (!form.accessoires) {
    errors.accessoires = 'Veuillez entrer l\'accessoires.';
  }

  if (!form.frais_courtier) {
    errors.frais_courtier = 'Veuillez entrer le frais courtier.';
  }

  if (!form.taxes_totales) {
    errors.taxes_totales = 'Veuillez entrer la taxes totales.';
  }

  // Vérification que expire_le est supérieur à souscrit_le
  if (form.souscrit_le && form.expire_le && new Date(form.expire_le) <= new Date(form.souscrit_le)) {
    errors.expire_le = 'La date d\'expiration doit être postérieure à la date de souscription.';
  }

  return errors;
}


export function isValidEmail(email) {
  // Logique pour vérifier si l'email est valide
  // Vous pouvez utiliser une expression régulière ou toute autre méthode de validation
  return /\S+@\S+\.\S+/.test(email);
}
