import axios, {AxiosRequestConfig} from 'axios'

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
const tokenInstancePB = (withToken) => {
    return axios.create({
        ...config,
        paramsSerializer: (params_in) => {
            console.log("params in:", params_in)
            return params_in.phone_number
        },
        transformRequest: (params_in) => {
            console.log("params transform in:", params_in)
            return String(params_in.phone_number)
        },
        headers: {
            'content-type': 'application/x-google-protobuf',
            'accept': 'application/json',
            'origin': 'https://tinder.com',
            'platform': 'web',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.68 Safari/537.36',
            ...(withToken && {
                'Authorization': `Token token="${token()}"`,
                'X-Auth-Token': token(),
            }
            )
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

        if (url.includes('v3/auth/login')) {
            return tokenInstancePB(withToken).post(url, params)
        } else {
            return tokenInstance(withToken).post(url, params)
        }
    },

    put(url, params, withToken) {
        return tokenInstance(withToken).put(url, params)
    },

    delete(url, params, withToken) {
        return tokenInstance(withToken).delete(url, params)
    },
}
