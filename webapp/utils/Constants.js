sap.ui.define([], function () {
  "use strict";
  return {
    returnConstant: function () {
      var oConst = {
        sDeleteProductButton:
          "project12::sap.suite.ui.generic.template.ObjectPage.view.Details::Categories--ProductID::deleteEntry",
        sDeleteProductsButton:
          "project12::sap.suite.ui.generic.template.ObjectPage.view.Details::Categories--delete",
        sDeleteProductButtonOnObjectPage:
          "project12::sap.suite.ui.generic.template.ObjectPage.view.Details::Products--delete",
        sCreateProductButton:
          "project12::sap.suite.ui.generic.template.ObjectPage.view.Details::Categories--ProductID::addEntry",
        sDeleteProductButtonOnListReport:
          "project12::sap.suite.ui.generic.template.ListReport.view.ListReport::Categories--deleteEntry",
      };

      return Object.freeze(oConst);
    },
  };
});
