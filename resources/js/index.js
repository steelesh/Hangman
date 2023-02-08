const startWrapper = document.getElementById(`startWrapper`);
const gameWrapper = document.getElementById(`gameWrapper`);
const guessesText = document.getElementById(`guesses`);
const wordHolderText = document.getElementById(`wordHolder`);
const guessForm = document.getElementById(`guessForm`);
const guessInput = document.getElementById(`guessInput`);
const guessButton = document.getElementById(`guessSubmitButton`);
const resetGame = document.getElementById(`resetGame`);
let canvas = document.getElementById(`hangmanCanvas`);
const startGameBtn = document.getElementById(`start`);
const exitGameBtn = document.getElementById(`exitGame`);
const ApiInfo = document.getElementById(`echoApiInfo`);

try {
  const game = new Hangman(canvas);
  startWrapper.style.display = 'block';
  gameWrapper.style.display = 'none';

  $(guessInput).keyup(function () {
    if ($(this).val().length != 0) {
      guessButton.disabled = false;
    } else {
      guessButton.disabled = true;
    }
  });

  startGameBtn.addEventListener(`click`, function (event) {
    event.preventDefault();
    game.start(function () {
      event.preventDefault();
      startWrapper.style.display = 'none';
      gameWrapper.style.display = 'block';
      wordHolderText.innerHTML = game.getWordHolderText();
      guessesText.innerHTML = game.getGuessesText();
      guessInput.focus();
    });

    guessForm.addEventListener(`submit`, function (e) {
      e.preventDefault();
      let input = guessInput.value;
      game.guess(input);
      wordHolderText.innerHTML = game.getWordHolderText();
      guessesText.innerHTML = game.getGuessesText();
      guessInput.value = '';
      if (game.isOver === true) {
        guessInput.placeholder = '';
        guessInput.disabled = true;
        guessButton.disabled = true;
        resetGame.style.display = 'block';
        exitGameBtn.style.width = '50%';
        if (game.didWin === true) {
          alert(
            `Congratulations! You won the game!\nYou guessed the word '${sessionStorage.getItem(
              'Word'
            )}' correctly`
          );
        } else {
          alert(
            `Sorry, you lost!\n'${sessionStorage.getItem(
              'Word'
            )}' was the word to guess!`
          );
        }
      }
    });

    resetGame.addEventListener(`click`, function (e) {
      e.preventDefault();
      guessInput.disabled = false;
      guessButton.disabled = false;
      guessInput.placeholder = '';
      resetGame.style.display = 'none';
      exitGameBtn.style.width = '100%';
      game.start(function () {
        e.preventDefault();
        wordHolderText.innerHTML = game.getWordHolderText();
        guessesText.innerHTML = game.getGuessesText();
        guessInput.focus();
      });
    });
  });
} catch (error) {
  console.error(error);
  alert(error);
}

function limitKeypress(event, value, maxLength) {
  if (value != undefined && value.toString().length >= maxLength) {
    event.preventDefault();
  }
}

guessInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    guessButton.click();
    event.target.blur();
    guessInput.focus();
  }
});

exitGameBtn.addEventListener(`click`, function (e) {
  e.preventDefault();
  location.reload();
});
