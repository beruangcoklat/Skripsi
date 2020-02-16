var util = {}

util.authGuard = type => {
  services.me()
    .done(() => {
      if (type === 'must not login') {
        location.href = '/restaurant'
      }
    })
    .fail(() => {
      if (type === 'must login') {
        location.href = '/'
      }
    })
}
