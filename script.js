let countdown;
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')


function timer(seconds) {

  const now = Date.now()
  const then = now + (seconds * 1000)
  displayTimeLeft(seconds)
  displayEndTime(then)

  clearInterval(countdown)
  countdown = setInterval(() => {
    let secondsLeft = Math.round((then - Date.now()) / 1000)
    if (secondsLeft < 0) {
      clearInterval(countdown)
      return
    }
    displayTimeLeft(secondsLeft)

  }, 1000);
}


function displayTimeLeft(seconds) {
  let minutes = Math.floor(seconds / 60)
  let remainderSeconds = (seconds % 60)
  let display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
  document.title = display;
  timerDisplay.textContent = display
}



function displayEndTime(timestamp) {
  const end = new Date(timestamp)
  const hours = end.getHours()
  const minutes = end.getMinutes()

  endTime.textContent = `Be Back At ${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' : ''}${minutes}`
}


function displayError() {
  endTime.textContent = 'Please Enter A Valid Number Of Minutes'
}




buttons.forEach(button => {
  button.addEventListener('click', function () {
    let seconds = parseInt(this.dataset.time)
    timer(seconds)
  })
})

document.customForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const mins = parseInt(this.minutes.value * 60)
  if (isNaN(mins)) {
    displayError()
    this.reset()
    return
  }
  timer(mins)
  this.reset()
})