import axios from 'axios';
import {routes} from '../router/routes';
import {names} from '../router/names';
import {bus} from '../main';
import events from '../config/events';
import messages from '../config/messages';
import {clearState} from '../store/state';
import store from '../store';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import router from '../router';

const ACCESS_TOKEN = 'access-token';
const REFRESH_TOKEN = 'refresh-token';

class AuthService {
    register(email, password, passwordRepeat) {
        let data = {
            email,
            password: {
                first: password,
                second: passwordRepeat
            }
        };
        axios
            .post(routes.register, data)
            .then(() => this.login(email, password, router))
            .catch(() => {
                bus.$emit(events.errorMessage, messages.emailInUse);
                return true;
            });
    }

    login(email, password) {
        axios
            .post(routes.login, {username: email, password})
            .then(response => {
                this.storeTokens(response.data.token, response.data.refresh_token);
                router.push({name: names.allDrinks});
            })
            .catch(() => {
                bus.$emit(events.errorMessage, messages.invalidData);
                return true;
            });
    }

    refreshToken() {
        return axios
            .post(routes.refreshToken, {refresh_token: localStorage.getItem(REFRESH_TOKEN)})
            .then(response => this.storeTokens(response.data.token, response.data.refresh_token));
    }

    fbRedirect() {
        axios.get(routes.fbRedirect).then(data => window.location.href = data.data.url);
    }

    loginViaFb(authToken) {
        return axios.post(routes.fbLogin, {authToken: authToken}).then(data => {
            return {
                token: data.data.token,
                refresh_token: data.data.refresh_token,
                isCorrect: true
            };
        }).catch(() => {
            return {
                token: '',
                refresh_token: '',
                isCorrect: false
            };
        });
    }

    async isLogged() {
        if (localStorage.getItem(ACCESS_TOKEN) === null && localStorage.getItem(REFRESH_TOKEN) === null) {
            this.clearTokens();
            return false;
        }
        if (this.checkAccessToken()) {
            return true;
        }
        return this.refreshToken().then(() => true).catch(() => {
            this.clearTokens();
            return false;
        });
    }

    checkAccessToken() {
        try {
            const accessToken = jwtDecode(localStorage.getItem(ACCESS_TOKEN));
            const currentDate = new Date();
            return moment.unix(accessToken.exp).toDate().getTime() >= currentDate.getTime();
        } catch (error) {
            return false;
        }
    }

    getAuthString() {
        return `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;
    }

    storeTokens(accessToken, refreshToken) {
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
    }

    clearTokens() {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        store.replaceState(clearState);
    }

    resetPassword(email) {
        return axios
            .post(routes.resetPassword, {email});
    }

    changePassword(token, password, passwordRepeat) {
        const data = {
            newPassword: {
                first: password,
                second: passwordRepeat
            }
        };
        return axios
            .post(routes.changePassword(token), data);
    }

    checkToken(token) {
        return axios
            .get(routes.checkToken(token))
            .then(() => true)
            .catch(() => {
                bus.$emit(events.errorMessage, messages.tokenExpired);
                router.push({name: names.login});
                return true;
            });
    }
}

export const authService = new AuthService();