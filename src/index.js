document.addEventListener('DOMContentLoaded', () => {
    getAllDogs()
  })
  const dogForm = document.querySelector('#dog-form')
  
  dogForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('WARNING:', e.target);
    let obj = {}
    obj.name = e.target.name.value
    obj.breed = e.target.breed.value
    obj.sex = e.target.sex.value
    obj.id = e.target.dataset.dog_id
  
    let row = document.getElementById(e.target.dataset.dog_id)
  
    updateDogInfo(obj)
    editTableRow(obj, row, dogForm)
  })
  
  function updateDogInfo(obj) {
    fetch(`http://localhost:3000/dogs/${obj.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      })
      .then(res => res.json())
      .then(obj => console.log('edited:', obj))
  }
  
  function getAllDogs() {
    fetch('http://localhost:3000/dogs')
      .then(res => res.json())
      .then(dogs => dogs.forEach(dog => putEachDogOnTable(dog)))
  }
  
  function putEachDogOnTable(obj) {
    const tableRow = document.createElement('tr')
    tableRow.id = obj.id
    putInfoToTable(obj, tableRow)
  }
  
  function putInfoToTable(dog, row) {
  
    const name = document.createElement('td')
    name.id = 'name'
    name.innerText = dog.name
    const breed = document.createElement('td')
    breed.id = 'breed'
    breed.innerText = dog.breed
    const sex = document.createElement('td')
    sex.id = 'sex'
    sex.innerText = dog.sex
  
    const edit = document.createElement('td')
    const editBtn = document.createElement('button')
    editBtn.id = `edit-${dog.id}`
    editBtn.innerText = "Edit Dog"
    editBtn.addEventListener('click', () => {
      handleEditButton(dog)
    })
    edit.append(editBtn)
  
    const remove = document.createElement('td')
    const delButton = document.createElement('button')
    delButton.id = `delete-${dog.id}`
    delButton.innerText = 'Delete'
    delButton.addEventListener('click', () => {
      row.innerHTML = ''
      deleteDog(dog.id)
    })
    remove.append(delButton)
    row.append(name, breed, sex, edit, remove)
    document.querySelector('tbody#table-body').appendChild(row)
  }
  
  function handleEditButton(obj) {
    dogForm.name.value = obj.name
    dogForm.breed.value = obj.breed
    dogForm.sex.value = obj.sex
    dogForm.dataset.dog_id = obj.id
  }
  
  function editTableRow(dog, row, dogForm) {
    dogForm.name.value = ''
    dogForm.breed.value = ''
    dogForm.sex.value = ''
  
    row.querySelector('#name').innerText = dog.name
    row.querySelector('#breed').innerText = dog.breed
    row.querySelector('#sex').innerText = dog.sex
  }
  
  function deleteDog(id) {
    fetch(`http://localhost:3000/dogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(dog => console.log(dog))
  }
  