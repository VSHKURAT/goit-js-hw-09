
const refs= {
    background : document.querySelector('body'),
    startBtn : document.querySelector(`button[data-start`),
    stopBtn : document.querySelector(`button[data-stop]`)
}
let intervalId = null

console.log(refs.startBtn)
console.log(refs.stopBtn)

refs.startBtn.addEventListener ('click' , runColorChange)
refs.stopBtn.addEventListener('click' , stopColorChange)

function runColorChange(){
  refs.startBtn.setAttribute('disabled', true);
  intervalId = setInterval(()=>{
        refs.background.style.backgroundColor = getRandomHexColor()
    }, 1000)
    
}

function stopColorChange(){

clearInterval(intervalId)
refs.startBtn.removeAttribute('disabled', true)
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }