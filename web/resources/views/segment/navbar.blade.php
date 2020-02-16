<nav style='background-color: #78B242 !important'>
  <div class="nav-wrapper">
    <a href="/restaurant" class="brand-logo left">
      <div style='padding: 5px'>
        <img src='/image/icon.png' height='50' />
      </div>
    </a>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a href="/restaurant">Restaurant</a></li>
      <li><a href="/menuCategory">Menu Category</a></li>
      <li id='logout'><a href="#">Logout</a></li>
    </ul>
  </div>
</nav>

<script>
  $('#logout').on('click', () => services.logout().then(r => window.location.href = '/'))
</script>