
//// BUDGET CONTROLLER
const budgetController = (function() {



})();





//// UI CONTROLLER
const uiController = (function() {



})()





//// GLOBAL APP CONTROLLER
const controller = (function(budgetCtrl, UICtrl) {

  const ctrlAddItem = function() {

    // 1. Get input data

    // 2. Add the item to the budget CONTROLLER

    // 3. Add the new item to UI

    // 4. Calculate the budget

    // 5. Display the budget on the UI

    }

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem)

  document.addEventListener('keypress', function(event) {

    if(event.keyCode === 13 || event.which === 13) {
      ctrlAddItem()
    }

  })

})(budgetController, uiController);























//END
