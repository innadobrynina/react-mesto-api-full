export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkStatus(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then((this._checkStatus));
    }

    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,

        })
            .then(this._checkStatus);
    }

    postNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkStatus);
    }

    setUserData(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._checkStatus);
    }

    setUserAvatarData(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: data.link
            })
        })
            .then(this._checkStatus);
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            headers: this._headers,
            method: 'DELETE'
        })
            .then(this._checkStatus);
    }

    changeLikeStatus(cardId, like) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: like ? 'PUT' : 'DELETE',
            headers: this._headers
        })
            .then(this._checkStatus);
    }
}


export const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-22",
    headers: {
        authorization: "bb37a53f-65dd-4153-b255-188fa4e0f13b",
        "Content-Type": "application/json",
    },
});
