import { CalcResult, calculate } from '../calcLogic/calculate.js';

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
  calcStore.history.push(calculate(calcStore.calcStr));
  renderCalcHist();
}

function renderCalcHist() {
  console.log(calcStore.history);
}

function renderCalcStr() {
  console.log(calcStore.calcStr);
}
