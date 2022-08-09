let filterOptions = document.querySelectorAll('.filter-options button')
let roFliOptions = document.querySelectorAll('.rotate-flip-options button')
let filterName = document.querySelector('.filter-info .name')
let filterValue = document.querySelector('.filter-info .value')
let blurValue = document.querySelector('.blur-info .value')
let inputFilterRange = document.getElementById("filter_range_input")
let inputBlurRange = document.getElementById("blur_range_input")
let image = document.querySelector('.preview-img img')
let reset = document.querySelector('.controls .reset-filter')
let saveImage = document.querySelector(".save-img")
let chooseImage = document.querySelector(".choose-img")
let chooseFile = document.querySelector(".file-input")

let value, maxValue, filter_name

filterOptions.forEach(el => {
  el.addEventListener('click', () => {
    filterOptions.forEach((el) => {
      el.classList.remove('active')
    })
    el.classList.add('active')
    editOnData(el)
  })
})

function editOnData(el) {
  value = el.dataset.value
  maxValue = el.dataset.max
  filter_name = el.dataset.filter

  inputFilterRange.value = value
  inputFilterRange.max = maxValue
  filterName.innerHTML = el.innerHTML
  filterValue.innerHTML = `${maxValue}%`

  image.style.filter = `${filter_name}(${value}%)`

}

inputFilterRange.addEventListener('change', (e) => {
  filterOptions.forEach(el => {
    if (el.classList.contains('active')) {
      value = el.dataset.value
      maxValue = el.dataset.max
      filter_name = el.dataset.filter

      filterValue.innerHTML = e.target.value + "%"
      image.style.filter = `${filter_name}(${e.target.value}%)`
    } else {
      false
    }
  })
})

inputBlurRange.addEventListener('change', (e) => {
  blurValue.innerHTML = e.target.value + "%"
  image.style.filter = `blur(${e.target.value / 10}px)`
})

roFliOptions.forEach(el => {
  el.addEventListener('click', () => {
    rotateOrFlip(el)
  })
})

function rotateOrFlip(el) {
  if (el.id === 'left') {
    image.style.transform += 'rotate(90deg)'
  } else if (el.id === 'right') {
    image.style.transform += 'rotate(-90deg)'
  } else if (el.id === 'horizontal') {
    image.style.transform += 'rotateY(180deg)'
  } else {
    image.style.transform += 'rotate(-180deg)'
  }
}

reset.addEventListener('click', () => {
  filterOptions.forEach(el => {
    if (el.id === 'brightness') {
      filterOptions.forEach(el => {
        el.classList.remove('active')
      })
      el.classList.add('active')
      image.style.filter = ''
      image.style.transform = ''
      filterName.innerHTML = el.innerHTML
      filterValue.innerHTML = el.dataset.value
      inputFilterRange.max = el.dataset.max
      inputBlurRange.value = 0
      blurValue.innerHTML = "0%"
    } else {
      false
    }
  })
})

saveImage.addEventListener('click', () => {
  let source = image.src
  download(source)
})

function download(source) {
  let filename = source.split('/').pop()
  let a = document.createElement('a')
  console.log(source);
  console.log(filename);
  a.setAttribute('href', source)
  a.setAttribute('download', filename)
  document.body.appendChild(a)
  a.click()
  a.remove()
}

chooseImage.addEventListener('click', () => {
  chooseFile.click()
})

chooseFile.addEventListener('change', (e) => {
  let src = URL.createObjectURL(e.target.files[0])
  image.src = src
})