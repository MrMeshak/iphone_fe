import { CalcResult, calculate } from '../calcLogic/calculate.js';
import { toDisplayCalcStr } from './helpers/toDispCalcStr.js';

export interface ICalcStore {
  calcStr: string;
  history: CalcResult[];

  actions: {
    appendCalcStr: (str: string) => void;
    clearCalcStr: () => void;
    backSpaceCalcStr: () => void;
    evaluateCalcStr: () => void;
  };
}

const calcStore: ICalcStore = {
  calcStr: '',
  history: [],

  actions: {
    appendCalcStr: appendCalcStr,
    clearCalcStr: clearCalcStr,
    backSpaceCalcStr: backSpaceCalcStr,
    evaluateCalcStr: evaluateCalcStr,
  },
};

export const actions = calcStore.actions;

function appendCalcStr(str: string) {
  calcStore.calcStr += str;
  renderCalcStr();
}

function clearCalcStr() {
  calcStore.calcStr = '';
  renderCalcStr();
}

function backSpaceCalcStr() {
  calcStore.calcStr = calcStore.calcStr.slice(0, -1);
  renderCalcStr();
}

function evaluateCalcStr() {
  const calcResult = calculate(calcStore.calcStr);
  calcStore.history.push(calcResult);
  renderCalcHist(calcResult);
  clearCalcStr();
}

function renderCalcHist(calcResult: CalcResult) {
  if (!calcResult) {
    return;
  }
  const calcStrTextNode = document.createTextNode(
    toDisplayCalcStr(calcResult.calcStr)
  );
  let resultTextNode: Text;
  if (
    calcResult.__typename === 'ICalcEmptyCalcStr' ||
    calcResult.__typename === 'ICalcInvalidCalcStr' ||
    calcResult.__typename === 'ICalcError'
  ) {
    resultTextNode = document.createTextNode('=[!]');
  } else {
    resultTextNode = document.createTextNode(
      '=' + Number(calcResult.result?.toFixed(5)).toString() || '=undefined'
    );
  }

  const calcHist = document.querySelector('#calcHist');
  const calcHistCard = document.createElement('div');
  const calcHistCardCalcStr = document.createElement('span');
  const calcHistCardResult = document.createElement('span');
  calcHistCard.classList.add('calc-hist__card');
  calcHistCardCalcStr.classList.add('calc-hist__card__calcStr');
  calcHistCardResult.classList.add('calc-hist__card__result');
  calcHistCardCalcStr.appendChild(calcStrTextNode);
  calcHistCardResult.appendChild(resultTextNode);
  calcHistCard.appendChild(calcHistCardCalcStr);
  calcHistCard.appendChild(calcHistCardResult);
  calcHist?.appendChild(calcHistCard);
  console.log(calcStore.history);
}

function renderCalcStr() {
  const textNode = document.createTextNode(toDisplayCalcStr(calcStore.calcStr));
  const display = document.querySelector('#calcDispStr');
  if (display?.innerHTML) {
    display.innerHTML = '';
  }
  display?.appendChild(textNode);
  console.log(calcStore.calcStr);
}
