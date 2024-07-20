
/**
 * Formater une réponse réussie.
 * @param {Object} data - Les données à inclure dans la réponse.
 * @param {string} message - Message facultatif pour la réponse.
 * @returns {Object} - Objet de réponse formaté.
 */
export function successResponse(data, message = 'Operation successful') {
    return {
        success: true,
        data: data,
        message: message
    };
}

/**
 * Formater une réponse d'erreur.
 * @param {string} error - Message d'erreur à inclure dans la réponse.
 * @param {number} [statusCode=500] - Code de statut HTTP.
 * @param {Object} [details={}] - Détails supplémentaires sur l'erreur.
 * @returns {Object} - Objet de réponse formaté.
 */
export function errorResponse(error, statusCode = 500, details = {}) {
    return {
        success: false,
        error: error,
        statusCode: statusCode,
        details: details
    };
}
