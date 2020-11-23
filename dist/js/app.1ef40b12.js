/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "b635");
/******/ })
/************************************************************************/
/******/ ({

/***/ "b635":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./style.css
// extracted by mini-css-extract-plugin

// CONCATENATED MODULE: ./src/routes.js

const MAIN_SCREEN = document.querySelector('.mainScreen');
const FIN_SCREEN = document.querySelector('.finishedScreen');
const routes = {
  'main': '/',
  'finished': '/finished'
};
// CONCATENATED MODULE: ./src/finished.js

const CONSOLE_BTN = document.querySelector('.consoleBtn');
const RESTART_BTN = document.querySelector('.restart');
const FIN_TIME = document.querySelector('.finalTime');
const FIN_SCORE = document.querySelector('.finalScore');
let currUrl = document.URL;
RESTART_BTN.addEventListener('click', restartGame);
const locationObserver = new MutationObserver(function () {
  if (history.state !== null) {
    renderFinal();
  }
});
locationObserver.observe(document.body, {
  attributes: true,
  childList: true,
  subtree: true
});

window.onpopstate = function () {
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
// CONCATENATED MODULE: ./src/index.js




(function () {
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
  TIMER.addEventListener('DOMSubtreeModified', function () {
    timeOver();
  });
  INPUT.addEventListener('keyup', checkVal);
  const observer = new MutationObserver(list => {
    if (START_BTN.textContent === '초기화') {
      checkEndGame();
    }
  });
  observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true
  }); // 실행: getData함수 실행해서 wordList를 받아옴
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
  } // 게임 리셋


  function endGame() {
    clear();
    renderReset();
    goToFinished();
  } // 실행: 시작 버튼을 눌렀을 때 버튼 텍스트에 따라서 함수 실행


  function toggle() {
    if (START_BTN.textContent === '시작') {
      return startGame();
    }

    if (START_BTN.textContent === '초기화') {
      return endGame();
    }
  } // 실행: 푼 문제수가 10개가 되면 calcTime, endGame 함수 실행


  function checkEndGame() {
    totalCount = splicedCount(orgLength, wordList.length);

    if (totalCount === 10) {
      endGame();
      return true;
    }

    return false;
  } // 실행: clearInterval


  function clear() {
    clearInterval(Interval);
  } // 실행: pushState로 완료 페이지로 이동


  function goToFinished() {
    history.pushState({
      'finalScore': SCORE.textContent,
      'finalTime': calcTime(spentSecArr)
    }, null, routes['finished']);
    MAIN_SCREEN.classList.add('hidden');
    FIN_SCREEN.classList.remove('hidden');
    return null;
  } // 연산: 인덱스에 해당하는 time을 받아서 -1 씩 하면서 0이 되면 끝


  function timerOn() {
    return Interval = window.setInterval(() => {
      TIMER.textContent -= 1;
    }, 1000);
  } // 실행


  function timeOver() {
    if (Number(TIMER.textContent) === 0) {
      removeUsed(wordList, randomIdx);
      renderScore(SCORE.textContent - 1);
      renderResult();
    }
  }

  function renderResult() {
    renderWord(wordList);
  } // 연산: wordList 의 배열 길이에 맞춘, 랜덤 숫자 생성


  function makeRandom(length) {
    randomIdx = Math.floor(Math.random() * length);
    return randomIdx;
  } // 연산: 새로만든 랜덤 숫자를 인덱스로 받아서 splice로 원 배열에서 없애버린다. 


  function removeUsed(list, index) {
    list.splice(index, 1);
    return list;
  } // 연산: 엔터쳤을 때 일치하는지 확인


  function checkVal(e) {
    let match = INPUT.value.toLowerCase() === WORD.textContent.toLowerCase();

    if (e.keyCode === 13 && match) {
      let spentSec = getSpentSec(wordList, randomIdx, TIMER.textContent);
      storeSpentSec(spentSec);
      removeUsed(wordList, randomIdx);
      renderResult();
      return true;
    }

    if (e.keyCode === 13 && !match) {
      INPUT.value = '';
      return false;
    }
  } // 렌더: score를 리턴


  function renderScore(newScore) {
    SCORE.textContent = newScore;
    return SCORE.textContent;
  } // 렌더: 다음 문제의 정보를 렌더한다. 


  function renderWord(list) {
    let randomIdx = makeRandom(list.length);
    INPUT.value = '';
    WORD.textContent = list[randomIdx].text;
    TIMER.textContent = list[randomIdx].second;
  } // 렌더: 제시단어 변경하는동안 렌더하는 함수, 버튼 텍스트 변경


  function renderBtn() {
    START_BTN.textContent = '초기화';
    return null;
  } // 렌더: 단어, 타이머, 버튼 텍스트 리셋 


  function renderReset() {
    INPUT.value = '';
    START_BTN.textContent = '시작';
    WORD.textContent = '문제 단어';
    TIMER.textContent = 10;
    return null;
  } // 연산: 푼 문제수를 계산해서 리턴


  function splicedCount(orgLength, mutatedLength) {
    return orgLength - mutatedLength;
  } // 연산: 현재 TIMER 남은 시간을 가져와서 계산


  function getSpentSec(list, idx, leftSec) {
    const spentSec = list[idx].second - leftSec;
    return spentSec;
  } // 연산: spentSecArr에 소요시간 저장


  function storeSpentSec(spentSec) {
    spentSecArr.push(spentSec);
    return spentSecArr;
  } // 연산: 평균 소요시간 계산


  function calcTime(spentSecArr) {
    if (0 < spentSecArr.length) {
      const secSum = spentSecArr.reduce(function (acc, curr) {
        return acc + curr;
      });
      const time = secSum / totalCount;
      const avgTime = Math.round(time);
      return avgTime;
    }

    return null;
  }
})();

/***/ })

/******/ });