window.addEventListener('DOMContentLoaded', async () => {
  const categoryAmount = {};
  const categories = {}
  const categoriesMonthAmount = {
    'Housing': {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0
    },
    'Transportation': {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0
    },
    'Food': {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0
    },
    'Utilities': {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0
    },
    'Insurance': {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0
    },
    'Medical & Healthcare': {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0
    },
    'Gym': {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0
    },
    'Gifts': {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0
    },
    'Entertainment': {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0
    },
    'Hobbies': {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0
    }
  };

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

  const colorsNormal = {
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

  let totalAmount = 0;

  await getCategories();
  await getExpsenses();
  renderTopCategories();

  async function getCategories() {
    await fetch('http://localhost:5000/categories')
      .then(response => response.json())
      .then(async data => {
        for (item of data) {
          categoryAmount[item._id] = 0;
          categories[item._id] = item.title;
        }

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

          const currentDate = new Date(expense.date);
          categoriesMonthAmount[categories[expense.category]][currentDate.getMonth()] += expense.amount;
        });
        renderLastExpenses(data);
      })
      .catch(() => {
        document.location = 'error.html'
      });
  }

  function renderTopCategories() {
    const list = document.querySelector('.info-categories');

    const maxAmounts = Object.values(categoryAmount).sort((a, b) => {
      return b - a;
    });

    const maxCategoryId = [];

    for (let i = 0; i < 3; i++) {
      for (key in categoryAmount) {
        if (categoryAmount[key] == maxAmounts[i]) {
          maxCategoryId.push(key);
        }
      }
    };

    for (let i = 0; i < 3; i++) {
      let categoryPercent = Math.round(categoryAmount[maxCategoryId[i]] / totalAmount * 1000) / 10;
      let categorySum = categoryAmount[maxCategoryId[i]];

      const item = document.createElement('div');
      item.classList.add('info-categories__item');
      item.innerHTML = `
        <div class="info-categories__item-name">${categories[maxCategoryId[i]]}</div>
          <div class="info-categories__item-content">
            <div class="info-categories__item-img">
             <img src="./images/icon/${categories[maxCategoryId[i]]}.png" alt="">
            </div>
            <div class="info-categories__item-info">
              <div class="info-categories__item-bar">
                 <div class="info-categories__item-fill" style="background-color:${colorsNormal[categories[maxCategoryId[i]]]}; width:${categoryPercent}%;"></div>
              </div>
            <div class="info-categories__item-nums">
              <div class="info-categories__item-percent">${categoryPercent}%</div>
              <div class="info-categories__item-amount">${converAmount(categorySum, 2)} $</div>
            </div>
          </div>
        </div>
      `;
      list.append(item);
    }
  }

  function converAmount(num, digits) {
    let x = ('' + num).length;
    digits = Math.pow(10, digits)
    x -= x % 3;
    return Math.round(num * digits / Math.pow(10, x)) / digits + " kMGTPE"[x / 3]
  }

  function renderLastExpenses(data) {
    const list = document.querySelector('.info-expenses__items');

    data.sort((a, b) => {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);
      return dateB - dateA;
    });

    for (let i = 0; i < 5; i++) {
      const item = document.createElement('div');
      item.classList.add('info-expenses__item');
      item.style.background = `linear-gradient(90deg, ${colors[categories[data[i].category]]} 0%, rgba(212,212,247,1) 100%)`;
      item.innerHTML = `
        <div class="info-expenses__item-number">${i + 1}</div>
        <div class="info-expenses__item-descr">${data[i].description}</div>
        <div class="info-expenses__item-amount">${data[i].amount}$</div>
        <div class="info-expenses__item-date">${buildDate(data[i].date)}</div>
        <div class="info-expenses__item-category">${categories[data[i].category]}</div>
      `;
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

  const canvasDoughnut = document.getElementById('doughnutChart');
  const doughnutChart = new Chart(canvasDoughnut, {
    type: 'doughnut',
    data: {
      labels: Object.values(categories),
      datasets: [{
        data: Object.values(categoryAmount),
        backgroundColor: [
          '#bf80b8',
          '#836eb3',
          '#5967b3',
          '#608cc7',
          '#59c7c8',
          '#68c398',
          '#b0d790',
          '#fdc97d',
          '#f4ab76',
          '#f49279'
        ],
        hoverOffset: 4
      }],
    },
    options: {
      plugins: {
        legend: {
          position: 'left',
          labels: {
            boxWidth: 20,
            boxHeight: 20,
            usePointStyle: true,
          },
          title: {
            display: true,
            text: 'Categoties chart',
            color: '#4b32c3',
            font: {
              size: 20
            }
          }
        }
      }
    }
  });

  const canvasLine = document.getElementById('lineChart');
  const lineChart = new Chart(canvasLine, {
    type: 'line',
    data: {
      labels: ["January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"],
      datasets: [{
        data: Object.values(categoriesMonthAmount['Housing']),
        label: "Housing",
        borderColor: '#bf80b8',
        backgroundColor: '#e1cfe5',
        borderWidth: 2,
        fill: false,
      }, {
        data: Object.values(categoriesMonthAmount['Transportation']),
        label: "Transportation",
        borderColor: '#836eb3',
        backgroundColor: '#bab0d7',
        borderWidth: 2,
        fill: false,
        hidden: true,
      }, {
        data: Object.values(categoriesMonthAmount['Food']),
        label: "Food",
        borderColor: '#5967b3',
        backgroundColor: '#8f95c7',
        borderWidth: 2,
        fill: false,
        hidden: true,
      }, {
        data: Object.values(categoriesMonthAmount['Utilities']),
        label: "Utilities",
        borderColor: '#608cc7',
        backgroundColor: '#b1c7e6',
        borderWidth: 2,
        fill: false,
        hidden: true,
      }, {
        data: Object.values(categoriesMonthAmount['Insurance']),
        label: "Insurance",
        borderColor: '#59c7c8',
        backgroundColor: '#bde5e7',
        borderWidth: 2,
        fill: false,
        hidden: true,
      }, {
        data: Object.values(categoriesMonthAmount['Medical & Healthcare']),
        label: "Medical & Healthcare",
        borderColor: '#68c398',
        backgroundColor: '#c2e0d2',
        borderWidth: 2,
        fill: false,
        hidden: true,
      }, {
        data: Object.values(categoriesMonthAmount['Gym']),
        label: "Gym",
        borderColor: '#b0d790',
        backgroundColor: '#e1edd7',
        borderWidth: 2,
        fill: false,
        hidden: true,
      }, {
        data: Object.values(categoriesMonthAmount['Gifts']),
        label: "Gifts",
        borderColor: '#fdc97d',
        backgroundColor: '#fefacb',
        borderWidth: 2,
        fill: false,
        hidden: true,
      }, {
        data: Object.values(categoriesMonthAmount['Entertainment']),
        label: "Entertainment",
        borderColor: '#f4ab76',
        backgroundColor: '#fee4cd',
        borderWidth: 2,
        fill: false,
        hidden: true,
      }, {
        data: Object.values(categoriesMonthAmount['Hobbies']),
        label: "Hobbies",
        borderColor: '#f49279',
        backgroundColor: '#fcddc9',
        borderWidth: 2,
        fill: false,
        hidden: true,
      }],
    },
    options: {
      scales: {
        y: {
          ticks: {
            callback: function (value) {
              return value + '$';
            }
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            boxWidth: 20,
            usePointStyle: true
          },
          title: {
            display: true,
            text: 'Monthly statistics',
            color: '#4b32c3',
            font: {
              size: 20
            }
          }
        }
      }
    }
  });
});