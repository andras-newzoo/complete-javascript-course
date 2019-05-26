
//// BUDGET CONTROLLER
const budgetController = (function() {

  const Expense = function(id, description, value) {
    this.id = id,
    this.description = description,
    this.value = value
  }

  const Income = function(id, description, value) {
    this.id = id,
    this.description = description,
    this.value = value
  }

  const calculateTotal = function(type){

    let sum = 0

    data.allItems[type].forEach(function(cur) {
      sum += cur.value
    })

    data.totals[type] = sum

  }

  const data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  }

  return {
    addItem: function(type, des, val) {
      let newItem, id

      if(data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 0
      }

      if(type === 'exp'){
        newItem = new Expense(id, des, val)
      } else if( type === 'inc') {
        newItem = new Income(id, des, val)
      }

      data.allItems[type].push(newItem)
      return newItem

    },
    deleteItem: function(type, id) {
      let ids, index

      ids = data.allItems[type].map(function(current) {
        return current.id;
      })

      index = ids.indexOf(id)

      if(index !== -1) {
        data.allItems[type].splice(index, 1)
      }

    },
    calculateBudget: function() {

      // Calculate income and expenses
      calculateTotal('exp')
      calculateTotal('inc')

      // Calculate budget
      data.budget = data.totals.inc - data.totals.exp

      // Calculate percentage spent
      if(data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)
      } else {
        data.percentage = -1
      }

    },
    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    },
    testing: function(){
      console.log(data)
    }
  }

})();





//// UI CONTROLLER
const uiController = (function() {

  var domStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value' ,
    percentageLabel: '.budget__expenses--percentage',
    container: '.container'
  }

  return {

    getInput: function() {

      return {
              type: document.querySelector(domStrings.inputType).value, // Will be either inc or exp
              description: document.querySelector(domStrings.inputDescription).value,
              value: parseFloat(document.querySelector(domStrings.inputValue).value)
      }

    },

    addListItem: function(obj, type) {
      let html, newHtml, element

      // Create HTML string with placeholder text
      if(type === 'inc') {
        element = domStrings.incomeContainer
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      } else if (type === 'exp') {
        element = domStrings.expensesContainer
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }

      // Replace the placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id)
      newHtml = newHtml.replace('%description%', obj.description)
      newHtml = newHtml.replace('%value%', obj.value)

      // Insert HTML into the domStrings
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)

    },

    clearFields: function() {
      let fields, fieldsArr

      fields = document.querySelectorAll(domStrings.inputDescription + ', ' + domStrings.inputValue)

      fieldsArr = Array.prototype.slice.call(fields)

      fieldsArr.forEach(function(current, index, array) {
        current.value = ""
      })

      fieldsArr[0].focus()
    },
    displayBudget: function(obj) {

      document.querySelector(domStrings.budgetLabel).textContent = obj.budget
      document.querySelector(domStrings.incomeLabel).textContent = obj.totalInc
      document.querySelector(domStrings.expensesLabel).textContent = obj.totalExp


      if(obj.percentage > 0) {
        document.querySelector(domStrings.percentageLabel).textContent = obj.percentage + '%'
      } else {
        document.querySelector(domStrings.percentageLabel).textContent = "---"
      }

    },
    getDOMStrings: function() {
      return domStrings
    }

  }

})()





//// GLOBAL APP CONTROLLER
const controller = (function(budgetCtrl, uiCtrl) {

  const setupEventListeners = function() {

    const domStrings = uiCtrl.getDOMStrings()

    document.querySelector(domStrings.inputBtn).addEventListener('click', ctrlAddItem)

    document.addEventListener('keypress', function(event) {

      if(event.keyCode === 13 || event.which === 13) {
        ctrlAddItem()
      }

    })

    document.querySelector(domStrings.container).addEventListener('click', ctrlDeleteItem)
  }

  const updateBudget = function() {

    // Calculate the budget
    budgetCtrl.calculateBudget()

    // Return the budget
    var budget = budgetCtrl.getBudget()

    // Display the budget
    uiCtrl.displayBudget(budget)

  }

  const ctrlAddItem = function() {

    let input, newItem

    // 1. Get input data
    input = uiCtrl.getInput();

    if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the budget CONTROLLER
      newItem = budgetCtrl.addItem(input.type, input.description, input.value)

      // 3. Add the new item to UI
      uiCtrl.addListItem(newItem, input.type)

      // 4. Clear the fields
      uiCtrl.clearFields()

      // 5. Calculate and update budget
      updateBudget()
    }

    }

  const ctrlDeleteItem = function(event) {
    let itemId, splitId, type, id

    itemId = event.target.parentNode.parentNode.parentNode.parentNode.id

    if(itemId) {

      splitId = itemId.split('-')
      type = splitId[0]
      id = parseInt(splitId[1])

      // 1. Delete the item from the data structure
      budgetCtrl.deleteItem(type, id)

      // 2. Delete the item from the UI


      // 3. Update and show the new budget

    }

  }

  return {
    init: function() {
      uiCtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      })
      setupEventListeners()
    }
  }

})(budgetController, uiController);

controller.init()





















//END
