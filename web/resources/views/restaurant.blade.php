@extends('layout.master')
@section('title', 'Restaurant')

@section('content')
<div class='row'>
  @foreach($restaurants as $restaurant)
	<div class="col s3">
    <div class="card">
    <div class="card-image">
      <img src="/api/images/{{$restaurant->image}}" height='200'>
      <!-- <span class="card-title">title</span> -->
    </div>
    <div class="card-content">
      <p>{{ $restaurant->name }}</p>
    </div>
    <div class="card-action">
      <a href="/menu/{{$restaurant->id}}">See All Menu</a>
    </div>
    </div>
  </div>
  @endforeach
</div>

<div class="fixed-action-btn">
  <a class="btn-floating btn-large red" href='/restaurant/insert'>
    <i class="large material-icons">add</i>
  </a>
</div>
@endsection
