window.addEventListener('DOMContentLoaded', () => {

  customSelect('expenses__form-select--category', 'category__item');
  customSelect('expenses__form-select--user', 'user__item');


  const categories = {};

  getCategories();

  getExpenses('default', 'default', '');
  expensesFilter();


  function getCategories() {
    fetch('http://localhost:5000/categories')
      .then(response => response.json())
      .then(data => {
        for (item of data) {
          categories[item._id] = item.title;
        }

      })
      .catch(e => console.log(e));
  }

  function getExpenses(currentCategory, currentUserFilter, searchInput) {
    fetch('http://localhost:5000/expenses')
      .then(response => response.json())
      .then(async data => {

        if (currentCategory != 'default') {
          for (let i = 0; i < data.length; i++) {
            if (categories[data[i].category] != currentCategory) {
              data.splice(i, 1);
              i--;
            }
          }
        }

        if (currentUserFilter == 'From last date') {
          data.sort((a, b) => {
            let dateA = new Date(a.date);
            let dateB = new Date(b.date);
            return dateB - dateA;
          });
        } else if (currentUserFilter == 'From first date') {
          data.sort((a, b) => {
            let dateA = new Date(a.date);
            let dateB = new Date(b.date);
            return dateA - dateB;
          });
        } else if (currentUserFilter == 'By amount ASC') {
          data.sort((a, b) => {
            return a.amount - b.amount;
          });
        } else if (currentUserFilter == 'By amount DESC') {
          data.sort((a, b) => {
            return b.amount - a.amount;
          });
        }

        if (searchInput) {
          const inputSearch = document.querySelector('.expenses__form-input');
          const dataClone = data.slice();

          for (let i = 0; i < dataClone.length; i++) {
            if (dataClone[i].description.toLowerCase() != searchInput.toLowerCase()) {
              dataClone.splice(i, 1);
              i--;
            }
          }

          if (dataClone.length != 0) {
            renderExpensesItem(dataClone);
            return;
          }

          inputSearch.value = '';
          inputSearch.placeholder = 'not found!';
        }

        renderExpensesItem(data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  function expensesFilter() {
    const filterCategory = document.querySelectorAll('.category__item');
    const filterUser = document.querySelectorAll('.user__item');
    const inputSearch = document.querySelector('.expenses__form-input');
    const formSearch = document.querySelector('.expenses__form-search');

    let currentCategory = 'default';
    let currentUserFilter = 'default';
    let searchValue = '';

    filterCategory.forEach(item => {
      item.addEventListener('click', () => {
        currentCategory = item.getAttribute('data-text');
        getExpenses(currentCategory, currentUserFilter, searchValue);
      });
    });

    filterUser.forEach(item => {
      item.addEventListener('click', () => {
        currentUserFilter = item.getAttribute('data-text');
        getExpenses(currentCategory, currentUserFilter, searchValue);
      });
    });

    formSearch.addEventListener('submit', (e) => {
      e.preventDefault();
      searchValue = inputSearch.value;
      getExpenses(currentCategory, currentUserFilter, searchValue);
    });
  }


  function renderExpensesItem(data) {
    // console.log(data);

    $('#pagination').pagination({
      dataSource: data,
      pageSize: 30,
      showGoInput: true,
      showGoButton: true,
      callback: function (data, pagination) {
        expensesBuilding(pagination.pageNumber, this.pageSize);
      }
    })

    function expensesBuilding(currentPage, pageSize) {
      const list = document.querySelector('.expenses__list');
      let loopStart = pageSize * --currentPage;
      list.innerHTML = '';

      for (let i = loopStart; i < loopStart + pageSize && i < data.length; i++) {
        const item = document.createElement('div');
        item.classList.add('expenses__item');
        item.innerHTML = `
  <div class="expenses__item-number">${i + 1}</div>
    <div class="expenses__item-descr">${data[i].description}</div>
    <div class="expenses__item-amount">${data[i].amount}$</div>
    <div class="expenses__item-date">${dateBuilding(data[i].date)}</div>
    <div class="expenses__item-category">${categories[data[i].category]}</div>
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

    function dateBuilding(date) {
      const userdate = new Date(date);
      let year = userdate.getFullYear(),
        month = userdate.getMonth(),
        day = userdate.getDay()

      if (month < 10) month = `0${month}`;

      if (day < 10) day = `0${day}`;

      return `${year}-${month}-${day}`;
    }
  }

  // CUSTOM HTML SELECT
  function customSelect(elemetClass, elementItem) {
    let selectParent, selElement, selSelected, selItems, selItem;
    selectParent = document.getElementsByClassName(elemetClass);

    for (let i = 0; i < selectParent.length; i++) {
      selElement = selectParent[i].getElementsByTagName("select")[0];

      selSelected = document.createElement("DIV");
      selSelected.setAttribute("class", "select-selected");
      selSelected.innerHTML = selElement.options[selElement.selectedIndex].innerHTML;
      selectParent[i].appendChild(selSelected);
      selItems = document.createElement("DIV");
      selItems.setAttribute("class", "select-items select-hide");

      for (let j = 1; j < selElement.length; j++) {
        selItem = document.createElement("DIV");
        selItem.innerHTML = selElement.options[j].innerHTML;
        selItem.classList.add(elementItem);
        selItem.setAttribute('data-text', `${selElement.options[j].getAttribute('value')}`);

        selItem.addEventListener("click", function () {
          let sameAsSelected, select, prevSelect;
          select = this.parentNode.parentNode.getElementsByTagName("select")[0];
          prevSelect = this.parentNode.previousSibling;

          for (let i = 0; i < select.length; i++) {
            if (select.options[i].innerHTML == this.innerHTML) {
              select.selectedIndex = i;
              prevSelect.innerHTML = this.innerHTML;
              sameAsSelected = this.parentNode.getElementsByClassName("same-as-selected");
              for (let k = 0; k < sameAsSelected.length; k++) {
                sameAsSelected[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          prevSelect.click();
        });
        selItems.appendChild(selItem);
      }
      selectParent[i].appendChild(selItems);
      selSelected.addEventListener("click", function (e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }

    function closeAllSelect(elmnt) {
      let selectParent, sameAsSelected, arrNo = [];
      selectParent = document.getElementsByClassName("select-items");
      sameAsSelected = document.getElementsByClassName("select-selected");

      for (let i = 0; i < sameAsSelected.length; i++) {
        if (elmnt == sameAsSelected[i]) {
          arrNo.push(i)
        } else {
          sameAsSelected[i].classList.remove("select-arrow-active");
        }
      }
      for (let i = 0; i < selectParent.length; i++) {
        if (arrNo.indexOf(i)) {
          selectParent[i].classList.add("select-hide");
        }
      }
    }

    document.addEventListener("click", closeAllSelect);
  }

});
