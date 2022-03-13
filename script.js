// select elements
const dice = document.querySelector('.card__dice');
const quote = document.querySelector('.card__quote');
const title = document.querySelector('.card__title');

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
        })
        .catch(error => {
            console.log(error);
            alert('failed to fetch quote, try again')
        })
    }, 1000);

})