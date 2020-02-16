var services = {}

services.login = (email, password) => {
  return $.ajax({
    method: 'post',
    url: '/api/login',
    data: { email, password }
  })
}

services.me = () => {
  return $.ajax({
    method: 'get',
    url: '/api/me',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}

services.insertRestaurant = (name, image) => {
  const data = new FormData();
  data.append('name', name)
  data.append('image', image)
  return $.ajax({
    method: 'post',
    url: '/api/restaurant/insert',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    data,
    processData: false,
    contentType: false
  })
}

services.updateRestaurant = (id, name, image) => {
  const data = new FormData()
  data.append('id', id)
  data.append('name', name)
  image !== null && data.append('image', image)
  return $.ajax({
    method: 'post',
    url: '/api/restaurant/update',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    data,
    processData: false,
    contentType: false
  })
}

services.deleteRestaurant = (id) => {
  return $.ajax({
    method: 'get',
    url: `/api/restaurant/delete/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}

services.findRestaurant = (id) => {
  return $.ajax({
    method: 'get',
    url: `/api/restaurant/find/${id}`
  })
}

services.insertMenu = (name, calory, image, category_id, restaurant_id) => {
  const data = new FormData();
  data.append('name', name)
  data.append('calory', calory)
  data.append('image', image)
  data.append('menu_category_id', category_id)
  data.append('restaurant_id', restaurant_id)
  return $.ajax({
    method: 'post',
    url: '/api/menu/insert',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    data,
    processData: false,
    contentType: false
  })
}

services.updateMenu = (menu_id, name, calory, image, category_id) => {
  const data = new FormData()
  data.append('id', menu_id)
  data.append('name', name)
  data.append('calory', calory)
  image !== null && data.append('image', image)
  data.append('menu_category_id', category_id)
  return $.ajax({
    method: 'post',
    url: '/api/menu/update',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    data,
    processData: false,
    contentType: false
  })
}

services.deleteMenu = (id) => {
  return $.ajax({
    method: 'get',
    url: `/api/menu/delete/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}

services.verifyMenu = (id) => {
  return $.ajax({
    method: 'post',
    url: '/api/menu/verify',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    data: { id }
  })
}

services.insertMenuCategory = (name) => {
  return $.ajax({
    method: 'post',
    url: '/api/menuCategory/insert',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    data: { name }
  })
}

services.updateMenuCategory = (id, name) => {
  return $.ajax({
    method: 'post',
    url: '/api/menuCategory/update',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    data: { id, name }
  })
}

services.deleteMenuCategory = (id) => {
  return $.ajax({
    method: 'get',
    url: `/api/menuCategory/delete/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}

services.getMenuCategory = () => {
  return $.ajax({
    method: 'get',
    url: '/api/menuCategory/all'
  })
}

services.logout = () => {
  return $.ajax({
    method: 'get',
    url: '/api/logout',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}