import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"
import Notiflix from 'notiflix';

const refs= {
    dateInput: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    daysTimer : document.querySelector('span[data-days'),
    hoursTimer : document.querySelector('span[data-hours'),
    minutesTimer : document.querySelector('span[data-minutes'),
    secondsTimer : document.querySelector('span[data-seconds')
}

let userDate

refs.startBtn.setAttribute('disabled', true)
refs.startBtn.addEventListener('click', onBtnClick)



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if( 
        selectedDates[0] <= options.defaultDate){
          return Notiflix.Report.failure('Mistake in date',
          '"Please choose a date in the future"',
          'Okay'
            )
        }
    refs.startBtn.removeAttribute('disabled', true)
    userDate = selectedDates[0]

    },
  };

const fp = flatpickr(refs.dateInput, options)




function onBtnClick(){
  const idInterval = setInterval( ()=>{
  const currentDate = new Date()  
  const deltaTime = userDate - currentDate
  const convertedTime = convertMs(deltaTime)
  changeClock(convertedTime)
  if(convertedTime.days === "-1" && convertedTime.hours === "-1" && convertedTime.minutes === "-1" && convertedTime.seconds === "-1"){
clearInterval(idInterval)
Notiflix.Report.success(
  'Time is up',
  '"Please choose date for new count"',
  'Okay',
  );
refs.startBtn.setAttribute('disabled', true)
refs.daysTimer.textContent = '00'
refs.hoursTimer.textContent = '00'
refs.minutesTimer.textContent = '00'
refs.secondsTimer.textContent = '00'
  }
  
  }, 1000)}

function changeClock({days = 0,hours = 0,seconds = 0,minutes = 0}){
refs.daysTimer.textContent = days,
refs.hoursTimer.textContent = hours,
refs.minutesTimer.textContent = minutes,
refs.secondsTimer.textContent = seconds
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value){
return String(value).padStart(2,0)
}