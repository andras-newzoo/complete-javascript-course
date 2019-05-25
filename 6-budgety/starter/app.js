
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

  const data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
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
    expensesContainer: '.expenses__list'
  }

  return {

    getInput: function() {

      return {
              type: document.querySelector(domStrings.inputType).value, // Will be either inc or exp
              description: document.querySelector(domStrings.inputDescription).value,
              value: document.querySelector(domStrings.inputValue).value
      }

    },

    addListItem: function(obj, type) {
      let html, newHtml, element

      // Create HTML string with placeholder text
      if(type === 'inc') {
        element = domStrings.incomeContainer
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      } else if (type === 'exp') {
        element = domStrings.expensesContainer
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
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
  }

  const ctrlAddItem = function() {

    let input, newItem

    // 1. Get input data
    input = uiCtrl.getInput();

    // 2. Add the item to the budget CONTROLLER
    newItem = budgetCtrl.addItem(input.type, input.description, input.value)

    // 3. Add the new item to UI
    uiCtrl.addListItem(newItem, input.type)

    // Clear the fields
    uiCtrl.clearFields()

    // 4. Calculate the budget

    // 5. Display the budget on the UI

    }

  return {
    init: function() {
      console.log('App has started.')
      setupEventListeners()
    }
  }

})(budgetController, uiController);

controller.init()





















//END
