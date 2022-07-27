sap.ui.define([
    "sap/ui/model/Filter",
    "sap/ui/comp/smartfilterbar/SmartFilterBar",
    "sap/m/ComboBox",
    "sap/ui/model/FilterOperator"
], function (Filter, SmartFilterBar, ComboBox, FilterOperator) {
    "use strict";
    return {
        onInit: function () {
            this.oView.byId("project12::sap.suite.ui.generic.template.ListReport.view.ListReport::Categories--deleteEntry").setVisible(false);
        },

        getCustomAppStateDataExtension: function (oCustomData) {
            if (oCustomData) {
                var oCustomField = this.oView.byId("categoryFilter");
                if (oCustomField) {
                    oCustomData.Name = oCustomField.getSelectedKey();
                }
            }
        },
        restoreCustomAppStateDataExtension: function (oCustomData) {
            if (oCustomData) {
                if (oCustomData.Name) {
                    var oComboBox = this.oView.byId("categoryFilter");
                    oComboBox.setSelectedKey(
                        oCustomData.Name
                    );
                }
            }
        },
        onBeforeRebindTableExtension: function (oEvent) {
            var customFilter          = this.oView.byId("project12::sap.suite.ui.generic.template.ListReport.view.ListReport::Categories--listReportFilter-btnBasicSearch");
            var value                 = customFilter.getProperty("value").trim();
            var oBindingParams        = oEvent.getParameter("bindingParams");
            oBindingParams.parameters = oBindingParams.parameters || {};

            var oSmartTable     = oEvent.getSource();
            var oSmartFilterBar = this.byId(oSmartTable.getSmartFilterId());
            if (oSmartFilterBar instanceof SmartFilterBar) {
                var oCustomControl = oSmartFilterBar.getControlByKey("CategoryFilter");
                if (oCustomControl instanceof ComboBox) {
                    var vCategory = oCustomControl.getSelectedKey();

                    if (value) {
                        var oFilters = new Filter({
                          filters: [
                            new Filter('Name', FilterOperator.Contains, value)
                          ],
                          and: false
                        });
                        if (!isNaN(value)) {
                          oFilters.aFilters.push(
                            new Filter('ID', FilterOperator.EQ, +value)
                          );
                        }
                        oBindingParams.filters.push(oFilters);
                      }
                     if (vCategory) {
                        oBindingParams.filters.push(new Filter("Name", FilterOperator.Contains , vCategory));
                    }
                    switch (vCategory) {
                        case "Food":
                            oBindingParams.filters.push(new Filter("Name", "EQ", "Food"));
                            break;
                        case "Beverages":
                            oBindingParams.filters.push(new Filter("Name", "EQ", "Beverages"));
                            break;
                        case "Electronics":
                            oBindingParams.filters.push(new Filter("Name", "EQ", "Electronics"));
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    };
});