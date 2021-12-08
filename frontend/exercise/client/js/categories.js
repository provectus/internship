window.addEventListener('DOMContentLoaded', () => {
  const categoryAmount = {};
  let totalAmount = 0;
  getCategories();

  function getCategories() {
    fetch('http://localhost:5000/categories')
      .then(response => response.json())
      .then(async data => {

        console.log(data);

        for (item of data) {
          categoryAmount[item._id] = 0;
        }

        await getExpsenses();
        renderCategories(data);
      })
      .catch(() => document.location = 'error.html');
  }

  async function getExpsenses() {
    await fetch('http://localhost:5000/expenses')
      .then(response => response.json())
      .then(data => {
        data.forEach(expense => {
          categoryAmount[expense.category] += expense.amount;
          totalAmount += expense.amount;
        });
        console.log(categoryAmount);
        console.log(totalAmount);
      })
      .catch(() => {
        document.location = 'error.html'
      });
  }

  function renderCategories(data) {
    const categoriesList = document.querySelector('.categories__items');
    categoriesList.innerHTML = '';
    data.forEach(category => {
      const item = document.createElement('div');
      item.classList.add('categories__item');
      item.innerHTML = `
      <div class="categories__item-title">${category.title}</div>
      <div class="categories__item-info">
        <div class="categories__item-percent">${Math.round(categoryAmount[category._id] / totalAmount * 100)}%</div>
        <div class="categories__item-bar">
          <div class="categories__item-fill"></div>
        </div>
        <div class="categories__item-amount">${categoryAmount[category._id]}$</div>
      </div>`

      categoriesList.append(item);
    });
  }


});