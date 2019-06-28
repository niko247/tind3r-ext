import jQuery from 'jquery'

console.log('Init')
const readyStateCheckInterval = setInterval(() => {
  console.log('interval', document.readyState)
  if (document.readyState === "complete") {

   // jQuery('body').css('opacity', 0.5)
    //jQuery('body').css('pointer-events', 'none')
    console.log("before set title:")
    document.title = 'Tind3r - refresh token FB'
    const selector = document.querySelectorAll(['[name="fb_dtsg"]'])[0];
    const code = (selector || {}).value

    if (!code || !selector) {
      const token = jQuery('head').text().match(/access_token=([\w_]+)&/i)
      clearInterval(readyStateCheckInterval)
      chrome.runtime.sendMessage({
        type: 'FACEBOOK_RCV_TOKEN',
        token: token[1],
      }, response => {
        console.log('Token', token[1]);
        clearInterval(readyStateCheckInterval)
        chrome.runtime.sendMessage({
          type: 'CLOSE_TAB'
        });
      })

      return
    }
    clearInterval(readyStateCheckInterval)

  }
}, 400)
