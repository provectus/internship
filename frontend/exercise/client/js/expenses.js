window.addEventListener('DOMContentLoaded', () => {
  const colors = {
    Housing: '#e1cfe5',
    Transportation: '#bab0d7',
    Food: '#8f95c7',
    Utilities: '#b1c7e6',
    Insurance: '#bde5e7',
    'Medical & Healthcare': '#c2e0d2',
    Gym: '#e1edd7',
    Gifts: '#fefacb',
    Entertainment: '#fee4cd',
    Hobbies: '#fcddc9'
  };

  const categories = {};
  getCategories();

  function getCategories() {
    fetch('http://localhost:5000/categories')
      .then(response => response.json())
      .then(data => {
        for (item of data) {
          categories[item._id] = item.title;
        }

        createCustomSelect('expenses__form-select--category', 'category__item');
        createCustomSelect('expenses__form-select--user', 'user__item');
        getExpenses('default', 'default', '');
        runExpensesFilter();
      })
      .catch(() => document.location = 'error.html');
  }

  function getExpenses(currentCategory, currentUserFilter, searchInput) {
    fetch('http://localhost:5000/expenses')
      .then(response => response.json())
      .then(data => {

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
            renderExpenses(dataClone);
            return;
          }

          inputSearch.value = '';
          inputSearch.placeholder = 'not found!';
        }

        renderExpenses(data);
      })
      .catch(() => {
        document.location = 'error.html'
      });
  }

  function runExpensesFilter() {
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

  function renderExpenses(data) {
    $('#pagination').pagination({
      dataSource: data,
      pageSize: 20,
      showGoInput: true,
      showGoButton: true,
      callback: function (data, pagination) {
        createExpenses(pagination.pageNumber, this.pageSize);
        openAddOrEditPopUp();
        openDeletePopUp();
      }
    })

    function createExpenses(currentPage, pageSize) {
      const list = document.querySelector('.expenses__list');
      const expenseForm = document.querySelector('.expenses__form');

      document.querySelector('.expenses__form-add').remove();
      const btn = document.createElement('botton');
      btn.innerHTML = 'add new';
      btn.classList.add('expenses__form-add');
      expenseForm.prepend(btn);

      let loopStart = pageSize * --currentPage;
      list.innerHTML = '';

      for (let i = loopStart; i < loopStart + pageSize && i < data.length; i++) {
        const item = document.createElement('div');
        item.classList.add('expenses__item');
        item.style.background = `linear-gradient(90deg, ${colors[categories[data[i].category]]} 0%, rgba(212,212,247,1) 100%)`;
        item.innerHTML = `
  <div class="expenses__item-number">${i + 1}</div>
    <div class="expenses__item-descr">${data[i].description}</div>
    <div class="expenses__item-amount">${data[i].amount}$</div>
    <div class="expenses__item-date">${buildDate(data[i].date)}</div>
    <div class="expenses__item-category">${categories[data[i].category]}</div>
    <div class="expenses__item-action">
      <button class="expenses__item-edit" data-category="${data[i].category}" data-id="${data[i]._id}">EDIT</button>
      <button class="expenses__item-delete" data-id="${data[i]._id}">
        <img class="expenses__item-icon" src="images/icon/cross.png" alt="" />
      </button>
    </div>
  `
        list.append(item);
      }
    }

    function buildDate(date) {
      const userdate = new Date(date);
      let year = userdate.getFullYear(),
        month = userdate.getMonth(),
        day = userdate.getDay()

      if (month < 10) month = `0${month}`;

      if (day < 10) day = `0${day}`;

      return `${year}-${month}-${day}`;
    }
  }

  function createCustomSelect(elemetClass, elementItem) {
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

  function openAddOrEditPopUp() {
    const popUp = document.querySelector('.pop-up-expense');
    const popUpContent = document.querySelector('.pop-up-expense__content');
    const closeBtn = document.querySelector('.pop-up-expense__close-btn');
    const form = document.querySelector('.pop-up-expense__form');
    const categorySelect = document.querySelector('.pop-up-expense__category--select select');
    const categoryOptions = categorySelect.querySelectorAll('option');
    const dateInput = document.querySelector('.pop-up-expense__date--input');
    const descrInput = document.querySelector('.pop-up-expense__descr--input');
    const amountInput = document.querySelector('.pop-up-expense__amount--input');
    const userMessage = document.querySelector('.pop-up-expense__form-message');
    const addBtn = document.querySelector('.expenses__form-add');
    const editBtns = document.querySelectorAll('.expenses__item-edit');

    let scrollTop = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );

    let id;
    let categoryId;
    let methodAPI;

    function formSubmit(e) {
      e.preventDefault();
      if (checkFields(categorySelect, descrInput, amountInput)) {
        postNewExpense(categorySelect, dateInput, descrInput, amountInput, methodAPI, id);
      } else {
        userMessage.innerHTML = 'Incorrect data!';
        userMessage.style.color = 'red';
        userMessage.style.display = 'block';
      }
    }

    function overlayClose(e) {
      if (e.target == popUp) {
        form.reset();
        popUp.style.display = 'none';
        document.body.style.overflow = 'unset';
      }
    }

    function btnClose() {
      form.reset();
      popUp.style.display = 'none';
      document.body.style.overflow = 'unset';
    }

    addBtn.addEventListener('click', () => {
      popUp.style.display = 'block';
      popUp.style.height = `${scrollTop}px`;
      popUpContent.style.marginTop = `calc(${window.pageYOffset}px + ${document.documentElement.clientHeight / 2 - 250}px)`;
      document.body.style.overflow = 'hidden';
      methodAPI = 'POST';

      form.addEventListener('submit', formSubmit);
      popUp.addEventListener('click', overlayClose);
      closeBtn.addEventListener('click', btnClose);
    });

    editBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        id = this.getAttribute('data-id');
        categoryId = this.getAttribute('data-category');
        methodAPI = 'PUT';
        categoryOptions.forEach(item => {
          if (item.value == 'Choose category') {
            item.removeAttribute('selected');
          }

          if (item.value == categories[categoryId]) {
            item.setAttribute('selected', 'selected')
          }
        });
        categorySelect.setAttribute('disabled', 'disabled');
        popUp.style.display = 'block';
        popUp.style.height = `${scrollTop}px`;
        popUpContent.style.marginTop = `calc(${window.pageYOffset}px + ${document.documentElement.clientHeight / 2 - 250}px)`;
        document.body.style.overflow = 'hidden';

        form.addEventListener('submit', formSubmit);
        popUp.addEventListener('click', overlayClose);
        closeBtn.addEventListener('click', btnClose);
      });
    });
  }

  function checkFields(categorySelect, descrInput, amountInput) {
    if (categorySelect.value == 'Choose category' || descrInput.value.length > 15 ||
      amountInput.value <= 0 || amountInput.value > 10000000 || isNaN(amountInput.value)) {
      return false;
    }

    return true;
  }

  function postNewExpense(categorySelect, dateInput, descrInput, amountInput, methodAPI, id) {
    let userCategory;
    for (const property in categories) {
      if (categorySelect.value == categories[property]) {
        userCategory = property;
      }
    }

    const expense = {
      amount: amountInput.value,
      date: dateInput.value,
      description: descrInput.value,
      category: userCategory
    };

    if (methodAPI == 'POST') {
      id = '';
    } else {
      delete categories.category;
    }

    fetch(`http://localhost:5000/expenses/${id}`, {
      method: methodAPI,
      body: JSON.stringify(expense),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        location.reload();
      })
      .catch(e => { document.location = 'error.html' });
  }

  function openDeletePopUp() {
    const deleteBtns = document.querySelectorAll('.expenses__item-delete');
    const cancelBtn = document.querySelector('.pop-up-delete__cancel');
    const yesBtn = document.querySelector('.pop-up-delete__yes');
    const popUp = document.querySelector('.pop-up-delete');
    const popUpContent = document.querySelector('.pop-up-delete__content');
    const closeBtn = document.querySelector('.pop-up-delete__close');

    let scrollTop = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );

    let id;

    deleteBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        popUp.style.display = 'block';
        popUp.style.height = `${scrollTop}px`;
        popUpContent.style.marginTop = `calc(${window.pageYOffset}px + ${document.documentElement.clientHeight / 2 - 150}px)`;
        document.body.style.overflow = 'hidden';
        id = this.getAttribute('data-id');

        yesBtn.addEventListener('click', () => {
          deleteExpenseByID(id);
        });

        popUp.addEventListener('click', (e) => {
          if (e.target == popUp) {
            popUp.style.display = 'none';
            document.body.style.overflow = 'unset';
          }
        });

        cancelBtn.addEventListener('click', () => {
          popUp.style.display = 'none';
          document.body.style.overflow = 'unset';
        });

        closeBtn.addEventListener('click', () => {
          popUp.style.display = 'none';
          document.body.style.overflow = 'unset';
        });
      });
    });
  }

  function deleteExpenseByID(id) {
    fetch(`http://localhost:5000/expenses/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        location.reload();
      })
      .catch(() => document.location = 'error.html')
  }

});
