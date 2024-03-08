import { commissionApporteur } from '../constants/technicalConstant';

export const calculateCommissionApporteur = ({ primes_nette, tauxcomp, taux }) => {
    const commission = (primes_nette * tauxcomp * commissionApporteur) * (taux * commissionApporteur);
    return commission.toFixed(2);
}

export const calculateCommissionCompagnie = ({ primes_nette, tauxcomp }) => {
    const commission = primes_nette * tauxcomp * commissionApporteur;
    return commission.toFixed(2);
}


