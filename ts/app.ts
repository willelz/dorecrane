import cranes, { line } from "./crane";

type searchResult = { name: string; range: number; weight: number };

const selectCrane = (range: number, weight: number) => {
  let result: searchResult[] = [];
  for (const crane of cranes) {
    let justLine: line = { range: 0, maxLoad: 0 };
    for (const line of crane.GrossRatedLoad) {
      if (line.range >= range || line.maxLoad <= weight) break;
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
  result += "<table><tr><th>型式</th><th>作業半径(M)</th><th>重さ(t)</th></tr>";
  for (const line of sr) {
    result += `<tr><td>${line.name}</td><td>${line.range}</td><td>${
      line.weight
    }</td></tr>`;
  }
  result += "</table>";
  return result;
};

const execute = () => {
  const range = getNumberById("range");
  const weight = getNumberById("weight");
  const str = selectCrane(range, weight);
  const table = createTable(str);

  const result = document.getElementById("result");
  result.innerHTML = table;
};

const executeButton = document.getElementById("execute_button");
executeButton.onclick = execute;
