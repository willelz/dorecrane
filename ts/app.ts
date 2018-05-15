import "../node_modules/purecss/build/base-min.css";
import "../node_modules/purecss/build/forms-min.css";
import "../node_modules/purecss/build/tables-min.css";
import "../node_modules/purecss/build/buttons-min.css";
import "../style.css";
import cranes, { line } from "./crane";

type searchResult = { name: string; range: number; weight: number };

const selectCrane = (range: number, weight: number) => {
  let result: searchResult[] = [];
  for (const crane of cranes) {
    let justLine: line = { range: 0, maxLoad: 0 };
    for (const line of crane.GrossRatedLoad) {
      if (line.range > range || line.maxLoad <= weight) break;
      justLine = line;
    }
    result.push({
      name: crane.name,
      range: justLine.range,
      weight: justLine.maxLoad
    });
  }
  return result;
};

const getNumberById = (id: string) => {
  const element = <HTMLInputElement>document.getElementById(id);
  return Number(element.value);
};

const createTable = (sr: searchResult[]) => {
  let result: string = "";
  result +=
    '<table class="pure-table pure-table-horizontal"><thead><tr><th>型式</th><th>作業半径(M)</th><th>定格総荷重(t)</th></tr></thead><tbody>';
  for (const line of sr) {
    result += `<tr><td>${line.name}</td><td>${line.range}</td><td>${
      line.weight
    }</td></tr>`;
  }
  result += "</tbody></table>";
  return result;
};

const execute = () => {
  let range = getNumberById("range");
  if (range < 3) range = 3;
  const weight = getNumberById("weight");
  const str = selectCrane(range, weight);
  const table = createTable(str);

  const result = document.getElementById("result");
  if (!result) throw new Error("no result");
  result.innerHTML = table;
};

const executeButton = document.getElementById("execute_button");
if (!executeButton) throw new Error("no executeButton");
executeButton.onclick = execute;
