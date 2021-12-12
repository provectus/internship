window.addEventListener('DOMContentLoaded', () => {
  const colors = {
    Housing: '#bf80b8',
    Transportation: '#836eb3',
    Food: '#5967b3',
    Utilities: '#608cc7',
    Insurance: '#59c7c8',
    'Medical & Healthcare': '#68c398',
    Gym: '#b0d790',
    Gifts: '#fdc97d',
    Entertainment: '#f4ab76',
    Hobbies: '#f49279'
  };

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
      let categoryPercent = Math.round(categoryAmount[category._id] / totalAmount * 1000) / 10;
      let categorySum = categoryAmount[category._id];

      const item = document.createElement('div');
      item.classList.add('categories__item');
      item.innerHTML = `
      <div class="categories__item-title" style="background-color:${colors[category.title]};">
       <div class="categories__item-img">
          <img src="images/icon/${category.title}.png" alt="">
        </div>
        ${category.title}
      </div>
      <div class="categories__item-info">
        <div class="categories__item-bar">
          <div class="categories__item-fill" style="background-color:${colors[category.title]}; width:${categoryPercent}%;"></div>
        </div>
        <div class="categories__item-nums">
          <div class="categories__item-percent">${categoryPercent}%</div>
          <div class="categories__item-amount">${converAmount(categorySum, 2)} $</div>
        </div>
      </div>`

      categoriesList.append(item);
    });
  }

  function converAmount(num, digits) {
    let x = ('' + num).length;
    digits = Math.pow(10, digits)
    x -= x % 3;
    return Math.round(num * digits / Math.pow(10, x)) / digits + " kMGTPE"[x / 3]
  }

});