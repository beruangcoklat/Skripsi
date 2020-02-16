<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src='/js/jquery-3.3.1.min.js'></script>
  <script src='/js/services.js'></script>
  <script src='/js/util.js'></script>
  <link rel="stylesheet" type="text/css" href="/materialize/materialize.min.css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <title>@yield('title')</title>
  @yield('head')
  <style>
    *{
      margin: 0;
      padding: 0;
    }
    .clickable:hover{
      cursor: pointer;
    }
  </style>
  <script>
    util.authGuard('must login')
  </script>
</head>
<body>
  @include('segment.navbar')
  @yield('content')
  @yield('script')
  <script src="/materialize/materialize.min.js"></script>
</body>
</html>
