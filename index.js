import { playGame, placeAllBoats } from './game_logic/round.js';

let userName = '';

function inputName() {
    const inputNameDiv = document.getElementById('input-container');
    inputNameDiv.innerHTML = `
        <form class="">
            <div class="field">
                <label class="label is-large">Input your nickname:</label>
                <div class="control">
                    <input id="input-name" class="input is-large" type="text" placeholder="Your nickname for the game" />
                </div>
            </div>
            <button id="btn-submit-name" class="button is-primary is-medium" type="button">Play game!</button>
        </form>  
    `;

    const inputBtn = document.getElementById('btn-submit-name');
    inputBtn.addEventListener('click', () => {
        const userNameInput = document.getElementById('input-name');
        
        if(userNameInput.value !== ''){
            userNameInput.className = "input";
            userName = userNameInput.value;
            inputNameDiv.classList.add('fade-out');
            inputNameDiv.remove();
            playGame(userName);

        } else {
            userNameInput.className = "input is-danger";
            userNameInput.placeholder = "You need to write something you know???"
        }
    });
}

addEventListener('DOMContentLoaded', () => {
    inputName();
});

export { userName };