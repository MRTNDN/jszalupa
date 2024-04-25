const calculateButton1 = document.getElementById("calculate-buttoncode");
calculateButton1.addEventListener("click", () => {
  main1_(); // вызываем функцию main1_
});

// Классы для контроллеров и модулей с суффиксом "1"
class Controller1 {
  constructor(name, DI, UI, DO, AO, VO, cost) {
    this.name = name;
    this.DI = DI;
    this.UI = UI;
    this.DO = DO;
    this.AO = AO;
    this.VO = VO;
    this.cost = cost;
  }
}

class Module1 {
  constructor(name, DI, UI, DO, VO, cost) {
    this.name = name;
    this.DI = DI;
    this.UI = UI;
    this.DO = DO;
    this.VO = VO;
    this.cost = cost;
  }
}

// Контроллеры и модули с суффиксом "1"
const controllers1 = [
  new Controller1("HD1407", 6, 8, 3, 2, 2, 105500),
  new Controller1("HD1407E", 6, 8, 3, 2, 2, 126000),
  new Controller1("HD1407S", 6, 8, 3, 2, 2, 112500),
  new Controller1("HD0904", 3, 6, 2, 0, 2, 65800),
];

const modules1 = [
  new Module1("HM0004", 0, 0, 0, 4, 37100),
  new Module1("HM0008", 0, 0, 8, 0, 40750),
  new Module1("HM0704", 3, 4, 2, 2, 53850),
  new Module1("HM0800", 0, 8, 0, 0, 46700),
  new Module1("HM1405", 14, 0, 5, 0, 49050),
];

// Функция выбора контроллера с суффиксом "1"
function selectController1(isCheckbox1Checked, isCheckbox2Checked) {
  if (!isCheckbox1Checked && !isCheckbox2Checked) {
    return controllers[0]; // HD1407
  } else if (isCheckbox1Checked && !isCheckbox2Checked) {
    return controllers[2]; // HD1407S
  } else if (!isCheckbox1Checked && isCheckbox2Checked) {
    return controllers[1]; // HD1407E
  } else if (isCheckbox1Checked && isCheckbox2Checked) {
    showAlert("так нельзя.");
    return null; // Возвращаем null, чтобы обозначить ошибку
  }
}
// Функция поиска самой дешевой комбинации контроллера и модулей
function findCheapestCombination1(controller1, requiredDI1, requiredUI1, requiredDO1, requiredAO1) {
  let cheapestCost1 = Infinity;
  let bestCombination1 = null;

  for (let numModules1 = 0; numModules1 <= 10; numModules1++) {
    const maxCombinations1 = Math.pow(modules1.length, numModules1);

    for (let i = 0; i < maxCombinations1; i++) {
      let totalDI1 = controller1.DI;
      let totalUI1 = controller1.UI;
      let totalDO1 = controller1.DO;
      let totalAO1 = controller1.AO;
      let totalCost1 = controller1.cost;
      const selectedModules1 = [];

      for (let j = 0; j < numModules1; j++) {
        const moduleIndex1 = (i >> (j * 2)) % modules1.length;
        const module1 = modules1[moduleIndex1];
        selectedModules1.push(module1);
        totalCost1 += module1.cost;

        totalDI1 += module1.DI;
        totalUI1 += module1.UI;
        totalDO1 += module1.DO;
        totalAO1 += module1.VO;
      }

      if (
        totalDI1 >= requiredDI1 &&
        totalUI1 >= requiredUI1 &&
        totalDO1 >= requiredDO1 &&
        totalAO1 >= requiredAO1
      ) {
        if (totalCost1 < cheapestCost1) {
          cheapestCost1 = totalCost1;
          bestCombination1 = {
            controller1,
            modules1: selectedModules1,
            totalCost1,
          };
        }
      }
    }
  }

  return bestCombination1;
}

// Главная функция с суффиксом "1"
function main1_() {
  // Проверяем флажки
  const isCheckbox1Checked1 = document.getElementById("checkbox1").checked;
  const isCheckbox2Checked1 = document.getElementById("checkbox2").checked;

  const selectedController1 = selectController1(isCheckbox1Checked1, isCheckbox2Checked1);

  if (!selectedController1) {
    console.error("Контроллер не найден");
    return;
  }

  const requiredDI1 = parseInt(document.getElementById("inputDI").value);
  const requiredUI1 = parseInt(document.getElementById("inputUI").value);
  const requiredDO1 = parseInt(document.getElementById("inputDO").value);
  const requiredAO1 = parseInt(document.getElementById("inputAO").value);

  const cheapestCombination1 = findCheapestCombination1(
    selectedController1,
    requiredDI1,
    requiredUI1,
    requiredDO1,
    requiredAO1
  );

  const resultDiv1 = document.getElementById("result-container");

  if (cheapestCombination1) {
    let resultHTML1 = `<h2>Самая подходящая комбинация:</h2>`;
    resultHTML1 += `<p>Контроллер: ${cheapestCombination1.controller1.name}</p>`;
    resultHTML1 += `<ul>`;
    cheapestCombination1.modules1.forEach((module1) => {
      resultHTML1 += `<li>${module1.name}</li>`;
    });
    resultHTML1 += `</ul>`;
    resultDiv1.innerHTML = resultHTML1;
  } else {
    resultDiv1.textContent = "Не удалось найти подходящую комбинацию.";
  }
}

function showAlert1(message1) {
  alert(message1); 
}

function calculate1() {
  main1_(); 
}
