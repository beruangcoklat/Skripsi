@extends('layout.master')
@section('title', 'Restaurant')

@section('content')
<form class="row" enctype='multipart/form-data'>
  <div class="col s6 push-s3">
    <div class="row">
      <h3>Insert Restaurant</h3>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <input id="name" type="text" class="validate" required>
        <label for="name">Name</label>
      </div>
    </div>
    <div class = "row">
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
      <div class="input-field col s12">
        <button class="btn waves-effect waves-light" type="submit">Submit</button>
      </div>
    </div>
  </div>
</form>
@endsection

@section('script')
<script type="text/javascript">
  $('form').on('submit', e => {
    e.preventDefault()
    const name = $('#name').val().trim()
    const image = $('#image')[0].files[0];
    services.insertRestaurant(name, image)
      .done(r => {
        $('#name').val('')
        $('#image').val('')
        $('#upload-file-text').val('')
        M.toast({ html: r })
      })
      .fail(r => M.toast({ html: r.responseText }))
  })
</script>
@endsection