//Pagination
const expensesList = document.querySelector('.expenses__list');
const pagination = document.querySelector('.pagination');

getExpenses();

function getExpenses() {
  fetch('http://localhost:5000/expenses')
    .then(response => response.json())
    .then(data => {
      renderExpensesItem(data, 1);
    })
    .catch(e => {
      console.log(e);
    });
}

function dateBuilding(date) {
  const userdate = new Date(date);
  let year = userdate.getFullYear(),
    month = userdate.getMonth(),
    day = userdate.getDay()

  if (month < 10) month = `0${month}`;

  if (day < 10) day = `0${day}`;

  return `${year}-${month}-${day}`;
}

async function getCategoryById(id) {
  const title = await fetch('http://localhost:5000/categories')
    .then(response => response.json())
    .then(data => {
      for (category of data) {
        if (category._id == id) {
          return category.title;
        }
      }
    })
    .catch(e => console.log(e));

  return title;
}

function renderExpensesItem(data) {
  $('#pagination').pagination({
    dataSource: data,
    pageSize: 20,
    showGoInput: true,
    showGoButton: true,
    callback: function (data, pagination) {
      expensesBuilding(pagination.pageNumber, this.pageSize);
    }
  })

  async function expensesBuilding(currentPage, pageSize) {
    const list = document.querySelector('.expenses__list');
    let loopStart = pageSize * currentPage;
    let categoryTitle;

    currentPage--;
    list.innerHTML = '';

    for (let i = loopStart; i < loopStart + pageSize; i++) {
      await getCategoryById(data[i].category).then(result => { categoryTitle = result });

      const item = document.createElement('div');
      item.classList.add('expenses__item');
      item.innerHTML = `
  <div class="expenses__item-number">${i + 1}</div>
    <div class="expenses__item-descr">${data[i].description}</div>
    <div class="expenses__item-amount">${data[i].amount}$</div>
    <div class="expenses__item-date">${dateBuilding(data[i].date)}</div>
    <div class="expenses__item-category">${categoryTitle}</div>
    <div class="expenses__item-action">
      <button class="expenses__item-edit">EDIT</button>
      <button class="expenses__item-delete">
        <img class="expenses__item-icon" src="images/icon/cross.png" alt="" />
      </button>
    </div>
  `
      list.append(item);
    }
  }
}






