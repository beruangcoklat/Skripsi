@extends('layout.master')
@section('title')
  {{ $restaurant->name }}
@endsection

@section('content')
<form class="row" enctype='multipart/form-data'>
  <div class="col s6 push-s3">
    <div class="row">
      <h3>Insert Menu</h3>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <input id="name" type="text" class="validate" required>
        <label for="name">Name</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <input id="calory" type="number" class="validate" required min='0' step='0.01'>
        <label for="calory">Calory</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <select>
          <option value="" disabled selected>Choose category</option>
          @foreach($categories as $category)
            <option value="{{ $category->id }}">{{ $category->name }}</option>
          @endforeach
        </select>
        <label>Category</label>
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
      <div class="input-field">
        <button class="btn waves-effect waves-light" type="submit">Submit</button>
      </div>
    </div> 
  </div>

  <input type="hidden" id='restaurant_id' value='{{ $restaurant->id }}'>
</form>
@endsection

@section('script')
<script type="text/javascript">
  $(document).ready(() => {
    $('select').formSelect()

    $('form').on('submit', e => {
      e.preventDefault()
      const name = $('#name').val().trim()
      const calory = $('#calory').val().trim()
      const category_id = $('option:selected').val()
      const image = $('#image')[0].files[0];
      const restaurant_id = $('#restaurant_id').val()

      if(category_id == ''){
        M.toast({ html: 'Choose category' })
        return
      }

      services.insertMenu(name, calory, image, category_id, restaurant_id)
        .done(r => {
          $('#name').val('')
          $('#calory').val('')
          $('#fat').val('')
          $('#protein').val('')
          $('#image').val('')
          $('#upload-file-text').val('')
          $('select').prop('selectedIndex', 0)
          $('select').formSelect()
          M.toast({ html: r })
        })
        .fail(r => {
          M.toast({ html: r.responseText })
        })
    })
  })


</script>
@endsection