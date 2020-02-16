@extends('layout.master')
@section('title')
  {{ $menu->name }}
@endsection

@section('content')
<form class="row" enctype='multipart/form-data'>
  <div class="col s6 push-s3">
    <div class="row">
      <h3>Update Menu</h3>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <input id="name" type="text" class="validate" required value='{{ $menu->name }}'>
        <label for="name">Name</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <input id="calory" type="number" class="validate" required min='0' step='0.01' value='{{ $menu->calory }}'>
        <label for="calory">Calory</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <select>
          <option value="" disabled>Choose category</option>
          @foreach($categories as $category)
            @if($menu->menu_category_id == $category->id)
              <option value="{{ $category->id }}" selected>{{ $category->name }}</option>
            @else
              <option value="{{ $category->id }}">{{ $category->name }}</option>
            @endif
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
      <img id='image-for-show' src='/api/images/{{ $menu->image }}' width='50%' />
    </div>
    <div class="row">
      <div class="input-field">
        <button class="btn waves-effect waves-light" type="submit">Update</button>
        <a class="btn waves-effect waves-light" id='btn-delete'>Delete</a>
      </div>
    </div> 
  </div>
</form>

<input type='hidden' id='menu-id' value='{{ $menu->id }}' />
<input type='hidden' id='restaurant-id' value='{{ $menu->restaurant->id }}' />
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
      const menu_id = $('#menu-id').val()

      if(category_id == ''){
        M.toast({ html: 'Choose category' })
        return
      }

      services.updateMenu(menu_id, name, calory, image, category_id)
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
      const menu_id = $('#menu-id').val()
      const restaurant_id = $('#restaurant-id').val()
      services.deleteMenu(menu_id)
        .done(r => location.href = `/restaurant/${restaurant_id}`)
        .fail(r => M.toast({ html: r.responseText }))
    })
  })
</script>
@endsection