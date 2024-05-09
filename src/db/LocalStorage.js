class LocalStorage {

    static async storeToken(token) {
        localStorage.setItem('token', token);
    }

    static async storeUser(user) {
        localStorage.setItem('user', user);
    }

    static async storeId(id) {
        localStorage.setItem('id', id);
    }

    static async storeEntreprise(entreprise) {
        localStorage.setItem('entreprise', entreprise);
    }

    static async storeRole(role) {
        localStorage.setItem('role', role);
    }

    static async storeContact(contact) {
        localStorage.setItem('contact', contact);
    }

    static async storeAdresse(adresse) {
        localStorage.setItem('adresse', adresse);
    }

    static async storeEmail(email) {
        localStorage.setItem('email', email);
    }

    static async storeMode(mode) {
        localStorage.setItem('mode', mode);
    }
  

    static async store(token, user, id, entreprise, role, contact, adresse, email, mode) {
        await this.storeToken(token);
        await this.storeUser(user);
        await this.storeId(id);
        await this.storeEntreprise(entreprise);
        await this.storeRole(role);
        await this.storeContact(contact);
        await this.storeAdresse(adresse);
        await this.storeEmail(email);
        await this.storeMode(mode);
    }

    static async clear() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        localStorage.removeItem('entreprise');
        localStorage.removeItem('role');
        localStorage.removeItem('mode');
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static getUser() {
        return localStorage.getItem('user');
    }

    static getId() {
        return localStorage.getItem('id');
    }

    static getEntreprise() {
        return localStorage.getItem('entreprise');
    }

    static getRole() {
        return localStorage.getItem('role');
    }

    static getContact() {
        return localStorage.getItem('contact');
    }

    static getAdresse() {
        return localStorage.getItem('adresse');
    }

    static getEmail() {
        return localStorage.getItem('email');
    }

    static getMode() {
        return localStorage.getItem('mode');
    }
}

export default LocalStorage;
