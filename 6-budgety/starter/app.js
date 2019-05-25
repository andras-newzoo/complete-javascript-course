
//// BUDGET CONTROLLER
const budgetController = (function() {



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

  const domStrings = uiCtrl.getDOMStrings()

  const ctrlAddItem = function() {

    // 1. Get input data
    const input = uiCtrl.getInput();
    console.log(input)

    // 2. Add the item to the budget CONTROLLER

    // 3. Add the new item to UI

    // 4. Calculate the budget

    // 5. Display the budget on the UI

    }

  document.querySelector(domStrings.inputBtn).addEventListener('click', ctrlAddItem)

  document.addEventListener('keypress', function(event) {

    if(event.keyCode === 13 || event.which === 13) {
      ctrlAddItem()
    }



  })

})(budgetController, uiController);























//END
