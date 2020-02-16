@extends('layout.master')
@section('title')
  {{ $restaurant->name }}
@endsection

@section('content')
<form class="row" enctype='multipart/form-data'>
  <div class="col s6 push-s3">
    <div class="row">
      <h3>Update Restaurant</h3>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <input id="name" type="text" class="validate" required value='{{ $restaurant->name }}'>
        <label for="name">Name</label>
      </div>
    </div>
    <div class="row">
      <label>Image</label>
      <div class="file-field input-field">
        <div class="btn">
            <span>Browse</span>
            <input type="file" id="image" accept="image/*"  />
        </div>
        <div class="file-path-wrapper">
            <input class="file-path validate" type="text" placeholder="Upload image" id='upload-file-text' />
        </div>
      </div>
    </div>
    <div class="row">
      <img src='/api/images/{{ $restaurant->image }}' width='50%' id='image-for-show' />
    </div>
    <div class="row">
      <div class="input-field col s12">
        <button class="btn waves-effect waves-light" type="submit">Update</button>
        <a class="btn waves-effect waves-light" id='btn-delete'>Delete</a>
      </div>
    </div>
  </div>
</form>

<input type='hidden' id='restaurant_id' value='{{ $restaurant->id }}' />
@endsection

@section('script')
<script type="text/javascript">
  $('form').on('submit', e => {
    e.preventDefault()
    const name = $('#name').val().trim()
    const image = $('#image')[0].files[0]
    const id = $('#restaurant_id').val()
    services.updateRestaurant(id, name, image)
      .done(r => M.toast({ html: r }))
      .fail(r => M.toast({ html: r.responseText }))
  })

  $('#image').on('change', event => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = e => $('#image-for-show').attr('src', e.target.result)
    reader.readAsDataURL(file);
  })

  $('#btn-delete').on('click', e => {
    const id = $('#restaurant_id').val()
    services.deleteRestaurant(id)
      .done(r => location.href = '/restaurant')
      .fail(r => M.toast({ html: r.responseText }))
  })
</script>
@endsection