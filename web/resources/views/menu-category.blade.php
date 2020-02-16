@extends('layout.master')
@section('title', 'Menu Categories')

@section('content')
<div class="row">
  <div class="col s6 push-s3">
    <table>
      <thead>
        <tr>
            <th>Menu Category</th>
            <th>Update</th>
            <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="text" id="new-category">
          </td>
          <td>
             <button class="btn waves-effect waves-light" onclick="insertCategory()">
              Insert
              <i class="material-icons right">add</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table> 
  </div>
</div>
@endsection

@section('script')
<script type="text/javascript">

  services.getMenuCategory()
    .done(r => r.map(item => addRow(item.id, item.name)))

  function updateCategory(id){
    const name = $('#input-' + id).val()
    services.updateMenuCategory(id, name)
      .done(r => M.toast({ html: r }))
      .fail(r => M.toast({ html: r.responseText }))
  }

  function deleteCategory(id){
    services.deleteMenuCategory(id)
      .done(r => {
        $('#tr-' + id).remove();
        M.toast({ html: r })
      })
      .fail(r => M.toast({ html: r.responseText }))
  }

  function insertCategory(){
    const name = $('#new-category').val().trim()
    services.insertMenuCategory(name)
      .done(r => {
        M.toast({ html: 'Insert menu category success' })
        $('#new-category').val('')
        addRow(r.id, r.name);
      })
      .fail(r => M.toast({ html: r.responseText }))
  }

  function addRow(id, name){
    const elem = `
        <tr id='tr-${id}'>
          <td>
            <input type="text" value="${name}" id='input-${id}'>
          </td>
          <td>
            <button class="btn waves-effect waves-light" onclick="updateCategory(${id})">
              Update
              <i class="material-icons right">edit</i>
            </button>
          </td>
          <td>
            <button class="btn waves-effect waves-light" onclick="deleteCategory(${id})">
              Delete
              <i class="material-icons right">delete</i>
            </button>
          </td>
        </tr>
    ` 
    $('table tr:last').before(elem)
  }
</script>
@endsection