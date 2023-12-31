document.addEventListener('DOMContentLoaded', function () {
    GameName = "Puzzle Slide Game";
    document.title = GameName;
    document.querySelector('.game_name').textContent = GameName;
    document.querySelector('.game_title').textContent = GameName;

    // GameContainer = document.querySelector('.game_container');
    GameButtons = document.querySelector('.game_buttons');

    const CreateButtons = (btn_numbers) => {
        let Buttons = [];
        for(let i = 1; i <= btn_numbers; i++){
            let Button = document.createElement('button');
            Button.textContent = i;
            Buttons.push(Button);
        }
        let empty_button = document.createElement('div');
        empty_button.className = 'empty';
        Buttons.push(empty_button);
        // console.log(randomButtons.length);
        for (let i = Buttons.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [Buttons[i], Buttons[j]] = [Buttons[j], Buttons[i]];
        }
        return Buttons;
    } 
    
    const randomButtons = CreateButtons(8);
    console.log(randomButtons);

    randomButtons.forEach((button)=>{
        button.addEventListener('click', () =>  {
            console.log('click');
            if(ButtonIsMoved(button)) {
                swapButton(button);
                if(isPuzzleSolved()) {
                    alert('Mabrouk');
                }
            }
        });
        // let randomButtons = Math.floor(Math.random() * button);
        GameButtons.appendChild(button);
    })

    const ButtonIsMoved = (btn) => {
        const btnIndex = randomButtons.indexOf(btn);
        const emptyIndex = randomButtons.indexOf(document.querySelector('.empty'));
        console.log(emptyIndex);
        const rowDiff = Math.abs(Math.floor(btnIndex / 3) - Math.floor(emptyIndex / 3));
        console.log('rowDiff = ',rowDiff);
        const colDiff = Math.abs(Math.floor(btnIndex % 3 - emptyIndex % 3));
        console.log('colDiff = ',colDiff);
        return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    } 
    
    const swapButton = (btn) => {
        const btnIndex = randomButtons.indexOf(btn);
        const emptyButton = document.querySelector('.empty');
        const empty_index =  randomButtons.indexOf(emptyButton);
        [randomButtons[btnIndex], randomButtons[empty_index]] = [randomButtons[empty_index], randomButtons[btnIndex]];
        updatePuzzle();
    } 

    const isPuzzleSolved = () => {
        return randomButtons.every((button, index) => button.textContent == index);
    }

    const updatePuzzle = () => {
        GameButtons.innerHTML = '';
        randomButtons.forEach((button) => GameButtons.appendChild(button));
    }

});