import requestManager from './request-manager'

const Tinder = {
  get(url, params, sendResponse) {
    requestManager.get(url, params).then(resp => {
      sendResponse({ success: true, resp })
    }).catch(resp => {
      sendResponse({ success: false, resp })
    })
  },

  post(url, params, sendResponse) {
    requestManager.post(url, params).then(resp => {
      sendResponse({ success: true, resp })
    }).catch(resp => {
      sendResponse({ success: false, resp })
    })
  },

  delete(url, params, sendResponse) {
    requestManager.delete(url, params).then(resp => {
      sendResponse({ success: true, resp })
    }).catch(resp => {
      sendResponse({ success: false, resp })
    })
  },

  put(url, params, sendResponse) {
    requestManager.put(url, params).then(resp => {
      sendResponse({ success: true, resp })
    }).catch(resp => {
      sendResponse({ success: false, resp })
    })
  },

  auth(fbToken) {
    return new Promise((resolve) => {
      requestManager.auth(fbToken).then(({ data }) => {
        const token = data.data.api_token;
        localStorage.setItem('tinder-token', token)
        localStorage.setItem('token-date', new Date().toISOString())
        resolve()
      })
    })
  },

  authSmsToken(smsToken) {
    console.log('In extension saving smsToken:' + smsToken);
    localStorage.setItem('tinder-token', smsToken);
    localStorage.setItem('token-date', new Date().toISOString())
  },

  tokenDate() {
    return localStorage.getItem('token-date')
  },

  purge() {
    localStorage.clear()
  }
}

export default Tinder
