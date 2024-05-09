import Token from './Token';
import LocalStorage from './LocalStorage';

class Online {
    static async responseAfterLogin(res) {
        const { access_token, name, user_id, id_entreprise, role, contact, adresse, email, mode } = res.data;

        await LocalStorage.store(access_token, name, user_id, id_entreprise, role, contact, adresse, email,mode);
    }
    static hasToken() {
        return LocalStorage.getToken() !== null;
    }

    static loggedIn() {
        return this.hasToken();
    }

    static name() {
        return this.loggedIn() ? LocalStorage.getUser() : null;
    }

    static id() {
        if (this.loggedIn()) {
            const payload = Token.payload(LocalStorage.getUser());
            return payload.sub;
        }
        return null;
    }
}

export default Online;
