<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script type="text/javascript" src='js/jquery-3.3.1.min.js'></script>
  <script type="text/javascript" src='js/services.js'></script>
  <script type="text/javascript" src='js/util.js'></script>
  <script type="text/javascript" src='js/md5.min.js'></script>
  <link rel="stylesheet" type="text/css" href="materialize/materialize.min.css">
  <title>Login</title>
  <style type="text/css">
    .content{
      width: 50vw;
      margin: auto;
    }
  </style>
  <script>
    util.authGuard('must not login')
  </script>
</head>
<body>
  <div class="content">
    <form class="row">
      <div class="col s12">
        <div class="row">
          <h1>Login Page</h1>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="email" type="email" class="validate" required>
            <label for="email">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="password" type="password" class="validate" required>
            <label for="password">Password</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <button class="btn waves-effect waves-light" type="submit">Submit</button>
          </div>
        </div>
      </div>
    </form>
  </div>
  <script type="text/javascript">
    $(document).ready(() => {
      $('form').on('submit', (e) => {
        e.preventDefault()
        const email = $('#email').val().trim()
        const password = md5($('#password').val().trim())
        services.login(email, password)
          .done(r => {
            if(r.user.role_id != 1){
              M.toast({ html: 'Not authorized' })
              return
            }
            localStorage.setItem('token', r.token)
            location.href = '/restaurant';
          })
          .fail(r => {
            M.toast({ html: 'Login failed' })
          })
      })
    })
  </script>
  <script type="text/javascript" src="materialize/materialize.min.js"></script>
</body>
</html>