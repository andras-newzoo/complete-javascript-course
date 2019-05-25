
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
    inputBtn: '.add__btn'
  }

  return {

    getInput: function() {

      return {
              type: document.querySelector(domStrings.inputType).value, // Will be either inc or exp
              description: document.querySelector(domStrings.inputDescription).value,
              value: document.querySelector(domStrings.inputValue).value
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
  }

  const ctrlAddItem = function() {

    let input, newItem

    // 1. Get input data
    input = uiCtrl.getInput();

    // 2. Add the item to the budget CONTROLLER
    newItem = budgetCtrl.addItem(input.type, input.description, input.value)

    // 3. Add the new item to UI

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
