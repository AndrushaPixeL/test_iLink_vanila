const inputName = document.getElementById('input_name')
const select = document.getElementById('select_gender')
const selectList = document.getElementById('select_list')
const male = document.getElementById('male')
const female = document.getElementById('female')
const form2 = document.getElementById('form_row_2')
const form3 = document.getElementById('form_row_3')
const inputCoutry = document.getElementById('input_country')
const inputCity = document.getElementById('input_city')
const inputDate = document.getElementById('input_date')
const submitButton = document.getElementById('form_button_inactive')
const fileInput = document.getElementById('file_input_container')
const checkMobile = document.getElementById('body')
const idArray = []

if (checkMobile.offsetWidth<=750) {
  console.log(123123123);
  document.getElementById('prev').className = "prevM"
  document.getElementById('next').className = "nextM"

} else if (checkMobile.offsetWidth>750){
  console.log(4444444);

  document.getElementById('prev').className = "prev"
  document.getElementById('next').className = "next"
}
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};

var slideIndex = 1
showSlides(slideIndex)
function plusSlide() {
  showSlides((slideIndex += 1))
}
function minusSlide() {
  showSlides((slideIndex -= 1))
}
function currentSlide(n) {
  showSlides((slideIndex = n))
}
document.addEventListener('keydown', function(event) {
  if (event.code == 'ArrowRight' ) {
    showSlides((slideIndex += 1))
  }
  if (event.code == 'ArrowLeft') {
    showSlides((slideIndex -= 1))
  }
});

function showSlides(n) {
  var i
  var slides = document.getElementsByClassName('item')
  var dots = document.getElementsByClassName('slider_dots_item')
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none'
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '')
  }
  slides[slideIndex - 1].style.display = 'block'
  dots[slideIndex - 1].className += ' active'
}


function submitHandler(e) {
  e.preventDefault()
  var request = new XMLHttpRequest()
  request.onreadystatechange = function () {
    console.log('readyState=', this.readyState, 'statis=', this.status)
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      document.getElementById('success_info').style.display = "flex"
      console.log(333, 'SUCCESS', this)
    }
  }
  document.getElementById('success_info').style.display = "flex" //что-бы отобразился Comleted

  request.open(this.method, this.action, true)
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

  var data = new FormData(this)
  for (var key of data.keys()) console.log(key, data.get(key))
  //не понял как разобраться с ошибкой картинки, нужно сервер запускать и смотреть что и как
  request.send(data)
}

inputName.onfocus = function () {
  select.disabled = false
}
inputCoutry.onfocus = function () {
  inputCity.disabled = false
}
inputCity.onfocus = function () {
  inputDate.disabled = false
}

inputName.onblur = function () {
  inputFunc(inputName, select)
}
inputCoutry.onblur = function () {
  inputFunc(inputCoutry, inputCity)
}
inputCity.onblur = function () {
  inputFunc(inputCity, inputDate)
}

function inputFunc(input, nextField) {
  if (!input.value || !/^[a-zA-z_\d]{4,20}$/.test(input.value)) {
    input.classList.add('form_invalid')
    document.getElementById(input.id + '_error').innerHTML =
      'From 4 to 20 characters without signs'
    nextField.disabled = true
  } else {
    input.classList.remove('form_invalid')
    document.getElementById(input.id + '_error').innerHTML = ''
    input.style.borderColor = '#8E43ED'
  }
}
inputDate.oninput = function () {
  if (inputDate.value.length === 10) {
    form3.style.display = 'flex'
  }
}
inputDate.onblur = function () {
  let date = inputDate.value
  let checkDD = Number(date.charAt(0) + date.charAt(1))
  let checkMM = Number(date.charAt(3) + date.charAt(4))
  let checkYYYY = Number(
    date.charAt(6) + date.charAt(7) + date.charAt(8) + date.charAt(9)
  )

  let dateRoot = 0
  if (date[2] === '.' && date[2] === '.') {
    dateRoot++
  }
  if (0 < checkDD && checkDD <= 31) {
    dateRoot++
  }
  if (0 < checkMM && checkMM <= 12) {
    dateRoot++
  }
  if (1900 < checkYYYY && checkYYYY < 2021) {
    dateRoot++
  }
  if (dateRoot === 4) {
    inputDate.classList.remove('form_invalid')
    document.getElementById(inputDate.id + '_error').innerHTML = ''
    inputDate.style.borderColor = '#8E43ED'
    form3.style.display = 'flex'
  } else {
    inputDate.classList.add('form_invalid')
    document.getElementById('input_date_error').innerHTML =
      'The date should be of the form: dd.mm.yyyy'
  }
}

select.onfocus = function () {
  selectList.style.display = 'block'
}
selectList.onclick = function () {
  selectFunc()
}
male.onmouseover = function () {
  select.value = 'Male'
}
female.onmouseover = function () {
  select.value = 'Female'
}
select.onblur = function () {
  if (select.value === 'Choose your gender') {
    select.classList.add('form_invalid')
    selectError.innerHTML = 'Choose your gender'
    selectList.style.display = 'none'
  } else {
    selectFunc()
  }
}

function selectFunc() {
  selectList.style.display = 'none'
  select.classList.remove('form_invalid')
  selectError.innerHTML = ''
  select.style.borderColor = '#8E43ED'
  form2.style.display = 'flex'
}
document
  .querySelectorAll('form')
  .forEach((form) => form.addEventListener('submit', submitHandler))
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
  fileInput.addEventListener(eventName, preventDefaults, false)
})
function preventDefaults(e) {
  e.preventDefault()
  e.stopPropagation()
}
;['dragenter', 'dragover'].forEach((eventName) => {
  fileInput.addEventListener(eventName, highlight, false)
})
;['dragleave', 'drop'].forEach((eventName) => {
  fileInput.addEventListener(eventName, unhighlight, false)
})
function highlight() {
  fileInput.classList.add('highlight')
}
function unhighlight() {
  fileInput.classList.remove('highlight')
}
fileInput.addEventListener('drop', handleDrop, false)
function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files
  handleFiles(files)
}
fileInput.onchange = function () {
  submitButton.disabled = false
  submitButton.classList.add('form_button_enebled')
}
function handleFiles(files) {
  files = [...files]
  files.forEach(previewFile)
}

function addElement(fileData, fileUrl) {
  const size = fileData.size / 1024
  const format = fileData.name.split('.').splice(-1, 1)[0]
  let name = fileData.name.replace('.' + format, '')
  let image = ''

  if (fileData.type.includes('image')) {
    image = `<img class="preview_photo" id="preview_photo" src="${fileUrl}"/>`
  }
  if (fileData.name.length > 15) {
    name = fileData.name.replace('.' + format, '').substring(15, 0) + '...'
  }
  var newDiv = document.createElement('div')
  newDiv.innerHTML = `            
      <div class="preview_container_image">
              <div class="preview_content">
                  ${image}
              <div class="preview_info">
                  <div class="preview_fileName" id="preview_fileName">${name}</div>
                  <div class="preview_fileSize" id="preview_fileSize">${format.toUpperCase()} ${size.toFixed(1)} mb</div>
              </div>
          </div>
          <div>
              <img src="./image/delete.png" class="delete_icon" onmouseup="deleteElement()">
          </div>
      </div>
  `
  newDiv.id = size + idArray.length
  idArray.push(newDiv.id)
  document.getElementById('preview_container').appendChild(newDiv)
}

function deleteElement() {
  document.addEventListener('click', ({ target: t }) => {
    if (idArray.includes(t.parentNode.parentNode.parentNode.id)) {
      document.getElementById(t.parentNode.parentNode.parentNode.id).remove()
    }
    var index = idArray.indexOf(t.parentNode.parentNode.parentNode.id)
    if (index >= 0) {
      idArray.splice(index, 1)
    }
    if (idArray.length === 0) {
      submitButton.disabled = true
      submitButton.classList.remove('form_button_enebled')
    }
  })
}

function previewFile(file) {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function () {
    let img = document.createElement('img')
    img.src = reader.result
    addElement(file, img.src)
  }
}
