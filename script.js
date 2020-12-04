let list = [
  {
    name: "mikee",
    hasPicked: false,
    beenPicked: false,
  },
  {
    name: "kyle",
    hasPicked: false,
    beenPicked: false,
  },
  {
    name: "mk",
    hasPicked: false,
    beenPicked: false,
  },
];

const init = () => {
  const main = document.createElement("div");
  main.classList.add("table-contianer");
  main.id = "table-contianer";
  main.appendChild(createTable());
  document.body.appendChild(main);
};

const createTable = () => {
  const table = document.createElement("table");
  table.classList.add("content-table");
  table.id = "table";
  table.appendChild(createTableContent(list));
  return table;
};

const updateTable = () => {
  const container = document.getElementById("table-contianer");
  container.childNodes[0].remove();
  container.appendChild(createTable());
};

const createTableContent = (data) => {
  const fragment = document.createDocumentFragment();
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const tableRow = document.createElement("tr");
  const list = ["Name", "Has Picked", "remove"];

  list.forEach((element) => {
    const tableHeading = document.createElement("th");
    tableHeading.innerHTML = element;
    tableRow.appendChild(tableHeading);
  });
  thead.appendChild(tableRow);
  fragment.appendChild(thead);

  data.forEach((element) => {
    const tableRow = document.createElement("tr");
    const button = document.createElement("button");
    button.innerHTML = "Remove";
    button.classList.add("paid-button");
    button.addEventListener("click", () => {
      data.splice(data.indexOf(element), 1);
      localStorage.setItem("listOfDebt", data.map(JSON.stringify).join(""));
      updateTable();
    });

    for (const data of Object.values(element)) {
      const tableData = document.createElement("td");
      tableData.innerHTML = data;
      tableRow.appendChild(tableData);
    }

    tableRow.appendChild(button);
    tbody.appendChild(tableRow);
  });
  fragment.appendChild(tbody);
  return fragment;
};

const form = document.getElementById("testing");

form.addEventListener("click", (element) => {
  if (element.target.tagName == "INPUT" && element.target.value == "Add") {
    const name = form[0].value;

    if (name != "") {
      list.push({
        name: name,
        hasPicked: false,
        beenPicked: false,
      });
      updateTable();
    }
  }
});

const pick = () => {
  const result = document.querySelector(".result");

  if (list.length) {
    const randomIndex = Math.floor(Math.random() * 100) % list.length;
    const picked = list.splice(randomIndex, 1)[0];
    result.childNodes[1].textContent = picked.name;
    console.log(picked);
    updateTable();
  } else {
    result.childNodes[1].textContent = "That is all";
  }
};

window.addEventListener("DOMContentLoaded", init);
