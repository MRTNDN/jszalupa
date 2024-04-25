const calculateButton = document.getElementById("calculate-button");
calculateButton.addEventListener("click", () => {
  main();
});


// Классы для контроллеров и модулей
class Controller {
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

class Module {
  constructor(name, DI, UI, DO, VO, cost) {
    this.name = name;
    this.DI = DI;
    this.UI = UI;
    this.DO = DO;
    this.VO = VO;
    this.cost = cost;
  }
}

// Контроллеры и модули
const controllers = [
  new Controller("HD1407", 6, 8, 3, 2, 2, 105500),
  new Controller("HD1407E", 6, 8, 3, 2, 2, 126000),
  new Controller("HD1407S", 6, 8, 3, 2, 2, 112500),
  new Controller("HD0904", 3, 6, 2, 0, 2, 65800),
];

const modules = [
  new Module("HM0004", 0, 0, 0, 4, 37100),
  new Module("HM0008", 0, 0, 8, 0, 40750),
  new Module("HM0704", 3, 4, 2, 2, 53850),
  new Module("HM0800", 0, 8, 0, 0, 46700),
  new Module("HM1405", 14, 0, 5, 0, 49050),
];

// Функция выбора контроллера на основе флажков
function selectController(isCheckbox1Checked, isCheckbox2Checked) {
  if (!isCheckbox1Checked && !isCheckbox2Checked) {
    return controllers[0]; // HD1407
  } else if (isCheckbox1Checked && !isCheckbox2Checked) {
    return controllers[2]; // HD1407S
  } else if (!isCheckbox1Checked && isCheckbox2Checked) {
    return controllers[1]; // HD1407E
  } else if (isCheckbox1Checked && isCheckbox2Checked) {
    showAlert("так нельзя.");
    return null; // Возвращаем null, чтобы обозначить ошибку
  } else {
    return null; // Если нет подходящего контроллера
  }
}

// Функция поиска самой дешевой комбинации контроллера и модулей
function findCheapestCombination(controller, requiredDI, requiredUI, requiredDO, requiredAO) {
  let cheapestCost = Infinity;
  let bestCombination = null;

  for (let numModules = 0; numModules <= 10; numModules++) {
    const maxCombinations = Math.pow(modules.length, numModules);

    for (let i = 0; i < maxCombinations; i++) {
      let totalDI = controller.DI;
      let totalUI = controller.UI;
      let totalDO = controller.DO;
      let totalAO = controller.AO;
      let totalCost = controller.cost;
      const selectedModules = [];

      // Перебираем все комбинации модулей
      for (let j = 0; j < numModules; j++) {
        const moduleIndex = (i >> (j * 2)) % modules.length;
        const module = modules[moduleIndex];
        selectedModules.push(module);
        totalCost += module.cost;

        totalDI += module.DI;
        totalUI += module.UI;
        totalDO += module.DO;
        totalAO += module.VO; // Используем VO как AO
      }

      if (
        totalDI >= requiredDI &&
        totalUI >= requiredUI &&
        totalDO >= requiredDO &&
        totalAO >= requiredAO
      ) {
        if (totalCost < cheapestCost) {
          cheapestCost = totalCost;
          bestCombination = {
            controller,
            modules: selectedModules,
            totalCost,
          };
        }
      }
    }
  }

  return bestCombination;
}

// Главная функция
function main() {
  // Проверяем флажки
  const isCheckbox1Checked = document.getElementById("checkbox1").checked;
  const isCheckbox2Checked = document.getElementById("checkbox2").checked;

  // Выбираем контроллер на основе состояния флажков
  const selectedController = selectController(isCheckbox1Checked, isCheckbox2Checked);

  if (!selectedController) {
    console.error("Контроллер не найден");
    return;
  }

  // Получаем требования к портам
  const requiredDI = parseInt(document.getElementById("inputDI").value);
  const requiredUI = parseInt(document.getElementById("inputUI").value);
  const requiredDO = parseInt(document.getElementById("inputDO").value);
  const requiredAO = parseInt(document.getElementById("inputAO").value);

  // Ищем самую дешевую комбинацию контроллера и модулей
  const cheapestCombination = findCheapestCombination(
    selectedController,
    requiredDI,
    requiredUI,
    requiredDO,
    requiredAO
  );

  const resultDiv = document.getElementById("result-container");
  
  if (cheapestCombination) {
    let resultHTML = `<h2>Самая дешевая комбинация:</h2>`;
    resultHTML += `<p>Контроллер: ${cheapestCombination.controller.name} (DI: ${cheapestCombination.controller.DI}, UI: ${cheapestCombination.controller.UI}, DO: ${cheapestCombination.controller.DO}, AO: ${cheapestCombination.controller.AO}, VO: ${cheapestCombination.controller.VO})</p>`;
    resultHTML += `<ul>`;
    cheapestCombination.modules.forEach((module) => {
      resultHTML += `<li>${module.name} - Стоимость: ${module.cost} (DI: ${module.DI}, UI: ${module.UI}, DO: ${module.DO}, VO: ${module.VO})</li>`;
    });
    resultHTML += `</ul>`;
    resultHTML += `<p>Общая стоимость: ${cheapestCombination.totalCost}</p>`;
    resultDiv.innerHTML = resultHTML;
  } else {
    resultDiv.textContent = "Не удалось найти подходящую комбинацию.";
  }
}
function showAlert(message) {
  alert(message); // Выводим сообщение
}
