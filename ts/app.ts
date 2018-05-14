import cranes, { line } from "./crane";

const selectCrane = (range: number, weight: number) => {
  let candidate: string[] = [];
  for (const crane of cranes) {
    let justLine: line = { range: 0, maxLoad: 0 };
    for (const line of crane.GrossRatedLoad) {
      if (line.range >= range || line.maxLoad <= weight) break;
      justLine = line;
    }
    const res = `${crane.name} : 作業半径${justLine.range}M時の定格荷重は${
      justLine.maxLoad
    }トン`;
    candidate.push(res);
  }
  return candidate;
};

const getNumberById = (id: string) => {
  const element = <HTMLInputElement>document.getElementById(id);
  return Number(element.value);
};

const execute = () => {
  const range = getNumberById("range");
  const weight = getNumberById("weight");
  const str = selectCrane(range, weight);

  const result = document.getElementById("result");
  result.innerText = str.join("\n");
};

const executeButton = document.getElementById("execute_button");
executeButton.onclick = execute;
