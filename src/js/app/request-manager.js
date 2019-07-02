import axios from 'axios'

let config = {}

let instance = axios.create(config)

const token = () => {
    let tokenTinder = localStorage.getItem('tinder-token');
    return tokenTinder === null ? '' : tokenTinder;
}

const tokenInstance = (withToken) => {
    return axios.create({
        ...config,
        headers: {
            'os_version': '100000000002',
            'x-client-version': '63105',
            'platform': 'ios',
            'app-version': '1786',
            ...(withToken && {
                'Authorization': `Token token="${token()}"`,
                'X-Auth-Token': token(),
            })
        }
    });
}

export default {
    setConfig(value) {
        config = value;
        console.log('set', value, config);

        instance = axios.create(config);
    },
    auth(facebook_token) {
        console.log(config);

        return axios.post(config.baseURL + 'v2/auth/login/facebook', {token: facebook_token})
    },

    get(url, params, withToken) {
        return tokenInstance(withToken).get(url, {params})
    },

    post(url, params, withToken) {
        return tokenInstance(withToken).post(url, params)
    },

    put(url, params, withToken) {
        return tokenInstance(withToken).put(url, params)
    },

    delete(url, params, withToken) {
        return tokenInstance(withToken).delete(url, params)
    },
}
