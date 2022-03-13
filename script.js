// select elements
const dice = document.querySelector('.card__dice');
const quote = document.querySelector('.card__quote');
const title = document.querySelector('.card__title');
const speaker = document.querySelector('.card__actions-speaker');
const copy = document.querySelector('.card__actions-copy');

let advice = "It is easy to sit up and take notice, what's difficult is getting up and taking action.";

// configure speech
const speech = new SpeechSynthesisUtterance();
speech.lang = "en-US";
speech.text = advice;
speech.volume = 1;
speech.rate = 1;
speech.pitch = 1; 



dice.addEventListener('click', () => {

    dice.classList.add('card__dice-rotate')
    setTimeout(() => {
        fetch('https://api.adviceslip.com/advice', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(results => {
            dice.classList.remove('card__dice-rotate')
            title.textContent = `Advice #${results.slip.id}`
            quote.textContent = `"${results.slip.advice}"`
            advice = results.slip.advice + '.'
            speech.text = results.slip.advice + '.'
        })
        .catch(error => {
            console.log(error);
            alert('failed to fetch quote, try again')
        })
    }, 1000);

})

speaker.addEventListener('click', () => window.speechSynthesis.speak(speech));
copy.addEventListener('click',()=>{
    if (navigator.clipboard) {
        navigator.clipboard.writeText(advice)
        .then(() => {
            alert('Copied')
        })
        .catch(err => {
            alert('Failed to copy')
        })
    } else {
        const el = document.createElement('textarea');
        el.value = advice;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert("Copied!");
    }
});
