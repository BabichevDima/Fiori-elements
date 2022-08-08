sap.ui.define(
  [
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  function (Filter, FilterOperator) {
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
      onBeforeRebindTableExtension: function (oEvent) {
        var oItemsBinding  = oEvent.getParameter("bindingParams");
        var oCustomFilter  = this.oView.byId("project12::sap.suite.ui.generic.template.ObjectPage.view.Details::Categories--ProductID::Table::Toolbar::SearchField");
        var value          = oCustomFilter.getProperty("value").trim();

        if (value) {
          var oFilters = new Filter({
            filters: [
              new Filter('Name', FilterOperator.Contains, value),
              new Filter('Description', FilterOperator.Contains, value)
            ],
            and: false
          });

          if (!isNaN(value)) {
            oFilters.aFilters.push(
              new Filter('Price', FilterOperator.EQ, +value),
              new Filter('Rating', FilterOperator.EQ, +value)
            );
          }
          oItemsBinding.filters.push(oFilters);
        }
      },
    };
  }
);