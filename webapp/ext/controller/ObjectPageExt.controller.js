sap.ui.define([], function () {
  "use strict";
  return {
    onAfterRendering: function () {
      if (this.oView.byId("project12::sap.suite.ui.generic.template.ObjectPage.view.Details::Categories--ProductID::deleteEntry")) {
        this.oView.byId("project12::sap.suite.ui.generic.template.ObjectPage.view.Details::Categories--ProductID::deleteEntry").setVisible(false);
      }

      setTimeout(()=>{
        if (this.oView.byId("project12::sap.suite.ui.generic.template.ObjectPage.view.Details::Categories--delete")) {
          this.oView.byId("project12::sap.suite.ui.generic.template.ObjectPage.view.Details::Categories--delete").setVisible(false);
        }
      }, 0)

      if (this.oView.byId("project12::sap.suite.ui.generic.template.ObjectPage.view.Details::Products--delete")) {
        this.oView.byId("project12::sap.suite.ui.generic.template.ObjectPage.view.Details::Products--delete").setVisible(false);
      }
    },
  };
});
