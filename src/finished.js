import { routes, MAIN_SCREEN, FIN_SCREEN } from './routes';
const CONSOLE_BTN = document.querySelector('.consoleBtn');
const RESTART_BTN = document.querySelector('.restart');
const FIN_TIME = document.querySelector('.finalTime');
const FIN_SCORE = document.querySelector('.finalScore');
let currUrl = document.URL;

RESTART_BTN.addEventListener('click', restartGame);

const locationObserver = new MutationObserver(function() {
  if(history.state !== null) {
    renderFinal();
  }
});

locationObserver.observe(document.body, {attributes: true, childList: true, subtree: true});

window.onpopstate = function() {
    MAIN_SCREEN.classList.remove('hidden');
    FIN_SCREEN.classList.add('hidden');
};

function renderFinal() {
    console.log('renderFinal');
    console.log('finalscore', history.state.finalScore);
    console.log('finaltime', history.state.finalTime);
    FIN_SCORE.textContent = history.state.finalScore;
    FIN_TIME.textContent = history.state.finalTime;
}

function restartGame() {
  history.back();
  window.location.pathname = '/';
}
