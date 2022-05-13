import Notiflix from 'notiflix';

const refs ={
  delay: document.querySelector('input[name=delay]'),
  step: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
  form: document.querySelector('.form')
}

let infoObj = {}

refs.form.addEventListener('input', () => {
 
  return  infoObj = {
       inputDelay : refs.delay.value,
       inputStep : refs.step.value,
       inputAmount : refs.amount.value
    }
    
})



refs.form.addEventListener('submit', (e) => {
  e.preventDefault()
  let counter = 0
  let delayCounter = Number(infoObj.inputDelay)
  for (let index = 0; index < infoObj.inputAmount; index+=1) {
    counter +=1
    createPromise( counter,delayCounter)
    .then(
      value => { Notiflix.Notify.success(value)}
    )
    .catch(
      error => {
        Notiflix.Notify.failure(error)
      }
    )
    delayCounter+= Number(infoObj.inputStep)
    
  }
  

 
})

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3
return new Promise((resolve,reject) =>{
    return setTimeout(() => {
      
      if (shouldResolve) {
        // Fulfill
        resolve (`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        // Reject
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
  
    }, delay);
  })
}


// createPromise(1,4000)
// .then(
//   value => { console.log(value)}
// )
// .catch(
//   error => {
//     console.log(error)
//   }
// )