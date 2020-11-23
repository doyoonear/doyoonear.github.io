import '../style.css';
import { restartGame } from './finished';
import { routes, MAIN_SCREEN, FIN_SCREEN } from './routes';

(function() {
  const TIMER = document.querySelector('.time');
  const WORD = document.querySelector('.word');
  const INPUT = document.querySelector('.write');
  const START_BTN = document.querySelector('.start');
  let SCORE = document.querySelector('.score');
  let score = SCORE.textContent;
  let wordList = [];
  let spentSecArr = [];
  let orgLength = 0;
  let randomIdx = 0;
  let totalCount = 0;
  let Interval = null;

  START_BTN.addEventListener('click', toggle);
  TIMER.addEventListener('DOMSubtreeModified', function(){ timeOver() });
  INPUT.addEventListener('keyup', checkVal);
  
  const observer = new MutationObserver(list => {
    if(START_BTN.textContent === '초기화') {
      checkEndGame();
    }
  });

  observer.observe(document.body, {attributes: true, childList: true, subtree: true});

  // 실행: getData함수 실행해서 wordList를 받아옴
  // 실행: 버튼 텍스트를 바꾸는 renderBtn 함수, setInterval timerOn 함수 실행
  // 실행: 랜덤 숫자를 받아서 타이머, 제시단어 변경하는 renderNext 함수 실행
  async function startGame() {
    console.log('startGame');
    await getData('https://my-json-server.typicode.com/kakaopay-fe/resources/words');
    renderBtn();
    timerOn();
    renderWord(wordList);
    return;
  }

  async function getData(url) {
    let response = await fetch(url);
    wordList = await response.json();
    orgLength = wordList.length;
    return wordList;
  }

  // 게임 리셋
  function endGame() {
    clear();
    renderReset();
    goToFinished();
  }

  // 실행: 시작 버튼을 눌렀을 때 버튼 텍스트에 따라서 함수 실행
  function toggle() {
    if(START_BTN.textContent === '시작') {
      return startGame();
    }
    if(START_BTN.textContent === '초기화') {
      return endGame();
    }
  }

  // 실행: 푼 문제수가 10개가 되면 calcTime, endGame 함수 실행
  function checkEndGame() {
    totalCount = splicedCount(orgLength, wordList.length);
    if(totalCount === 10) {
      endGame();
      return true; 
    }
    return false;
  }

  // 실행: clearInterval
  function clear() {
    clearInterval(Interval);
  }

  // 실행: pushState로 완료 페이지로 이동
  function goToFinished() {
      history.pushState({ 'finalScore': SCORE.textContent, 'finalTime': calcTime(spentSecArr) }, null, routes['finished']);
      MAIN_SCREEN.classList.add('hidden');
      FIN_SCREEN.classList.remove('hidden');
      return null;
  }

  // 연산: 인덱스에 해당하는 time을 받아서 -1 씩 하면서 0이 되면 끝
  function timerOn() {
    return Interval = window.setInterval(() => {
      TIMER.textContent -= 1;
    }, 1000);
  }

  // 실행
  function timeOver() {
    if(Number(TIMER.textContent) === 0) {
      removeUsed(wordList, randomIdx);
      renderScore(SCORE.textContent - 1);
      renderResult();
    }
  }

  function renderResult() {
    renderWord(wordList);
  }


  // 연산: wordList 의 배열 길이에 맞춘, 랜덤 숫자 생성
  function makeRandom(length) {
    randomIdx = Math.floor(Math.random() * length); 
    return randomIdx;
  }

  // 연산: 새로만든 랜덤 숫자를 인덱스로 받아서 splice로 원 배열에서 없애버린다. 
  function removeUsed(list, index) {
    list.splice(index, 1);
    return list;
  }

  // 연산: 엔터쳤을 때 일치하는지 확인
  function checkVal(e) {
    let match = (INPUT.value.toLowerCase() === WORD.textContent.toLowerCase());
    if(e.keyCode === 13 && match) {
      let spentSec = getSpentSec(wordList, randomIdx, TIMER.textContent);
      storeSpentSec(spentSec);
      removeUsed(wordList, randomIdx);
      renderResult();
      return true;
    }
    if(e.keyCode === 13 && !match) {
      INPUT.value = '';
      return false;
    }
  }

    // 렌더: score를 리턴
    function renderScore(newScore) {
      SCORE.textContent = newScore;
      return SCORE.textContent;
    }
  
    // 렌더: 다음 문제의 정보를 렌더한다. 
    function renderWord(list) {
      let randomIdx = makeRandom(list.length);
      INPUT.value = '';
      WORD.textContent = list[randomIdx].text;
      TIMER.textContent = list[randomIdx].second;  
    }
  
    // 렌더: 제시단어 변경하는동안 렌더하는 함수, 버튼 텍스트 변경
    function renderBtn() {
      START_BTN.textContent = '초기화';
      return null;
    }
  
    // 렌더: 단어, 타이머, 버튼 텍스트 리셋 
    function renderReset(){
      INPUT.value = '';
      START_BTN.textContent = '시작';
      WORD.textContent = '문제 단어';
      TIMER.textContent = 10;
      return null;
    }

  // 연산: 푼 문제수를 계산해서 리턴
  function splicedCount(orgLength, mutatedLength) {
    return orgLength - mutatedLength;
  }

  // 연산: 현재 TIMER 남은 시간을 가져와서 계산
  function getSpentSec(list, idx, leftSec) {
    const spentSec = list[idx].second - leftSec;
    return spentSec;
  }

  // 연산: spentSecArr에 소요시간 저장
  function storeSpentSec(spentSec) {
    spentSecArr.push(spentSec);
    return spentSecArr;
  }

  // 연산: 평균 소요시간 계산
  function calcTime(spentSecArr) {
    if(0 < spentSecArr.length) {
      const secSum = spentSecArr.reduce(function(acc, curr) {
        return acc + curr;
      })
      const time = secSum / totalCount;
      const avgTime = Math.round(time);
      return avgTime;
    }
    return null;
  } 
})();
