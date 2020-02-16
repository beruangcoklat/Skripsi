@extends('layout.master')
@section('title')
  {{ $restaurant->name }}
@endsection

@section('head')
<script>
  const gotoMenuDetail = (menu_id) => location.href = `/menu/detail/${menu_id}`
  const gotoRestaurantDetail = (restaurant_id) => location.href = `/restaurant/detail/${restaurant_id}`
</script>
@endsection

@section('content')
<div class='row'>
  <div class='col s6 push-s3 clickable' onClick='gotoRestaurantDetail({{ $restaurant->id }})'> 
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="/api/images/{{ $restaurant->image }}" height=300>
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">
          {{ $restaurant->name }}
        </span>
      </div>
    </div>
  </div>
</div>

<div class="row">
  <div class='col s6 push-s3'>
    <ul class="collection">
      @foreach($menus as $menu)
      <li class="collection-item avatar clickable" onClick='gotoMenuDetail({{ $menu->id }})'>
        <img src="/api/images/{{ $menu->image }}" class="circle">
        <span class="title">{{ $menu->name }}</span>
        <table>
          <tr>
            <td>Category</td>
            <td>{{ $menu->category->name }}</td>
          </tr>
          <tr>
            <td>Calory</td>
            <td>{{ $menu->calory }} kcal</td>
          </tr>
        </table>
      </li>
      @endforeach
    </ul>
  </div>
</div>

<div class="fixed-action-btn">
  <a class="btn-floating btn-large red" href='/menu/insert/{{ $restaurant->id }}'>
    <i class="large material-icons">add</i>
  </a>
</div>
@endsection