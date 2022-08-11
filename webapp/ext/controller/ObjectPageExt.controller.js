sap.ui.define(
  [
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "project12/utils/Constants",
    "sap/suite/ui/generic/template/extensionAPI/extensionAPI",
  ],
  function (Filter, FilterOperator, JSONModel, MessageBox, MessageToast, Constants, extensionAPI) {
    "use strict";

    return {
      onInit: function () {
        extensionAPI.getExtensionAPIPromise(this.getView()).then(
          function (oExtensionAPI) {
            oExtensionAPI.attachPageDataLoaded(
              function () {
                this.getView()
                  .byId(Constants.sDeleteProductsButton)
                  .setVisible(false);
              }.bind(this)
            );
          }.bind(this)
        );
      },

      onAfterRendering: function () {
        if (this.oView.byId(Constants.sDeleteProductButton)) {
          this.oView.byId(Constants.sDeleteProductButton).setVisible(false);
        }
        if (this.oView.byId(Constants.sDeleteProductButtonOnObjectPage)) {
          this.oView.byId(Constants.sDeleteProductButtonOnObjectPage).setVisible(false);
        }
        if (this.oView.byId(Constants.sCreateProductButton)) {
          this.oView.byId(Constants.sCreateProductButton).setVisible(false);
        }
      },

      onBeforeRebindTableExtension: function (oEvent) {
        var oItemsBinding  = oEvent.getParameter("bindingParams");
        var oCustomFilter  = this.oView.byId(Constants.sSearchFieldOnObjectPage);
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

      _setNewProductModel: function () {
        var oNewProduct = new JSONModel({
          Name: null,
          Description: null,
          ReleaseDate: null,
          DiscontinuedDate: null,
          Rating: 0,
          Price: null,
        });

        this.getView().setModel(oNewProduct, "newProduct");
      },

      openDialog: function () {
        this._setNewProductModel();
        var oView = this.getView();

        if (!this.oDialog) {
          this.oDialog = sap.ui.xmlfragment(
            oView.getId(),
            `project12.ext.fragments.Dialog`,
            this
          );
          oView.addDependent(this.oDialog);
        }

        this._setIDProduct();
        this.oDialog.open();
      },

      _setIDProduct: function () {
        var oNewProduct = this.getView().getModel("newProduct").oData;
        var oODataModel = this.getView().getModel();

        oODataModel.read(`/Products`, {
          success: function (mData) {
            oNewProduct.ID = mData.results.length;
          },
          error: function () {
            MessageBox.error("Error!!!");
          },
        });
      },

      onCreateProductPress: function () {
        var sURL = this.getOwnerComponent()
          .getRouter()
          .getHashChanger()
          .getHash()
          .split("/")[0];
        var oNewProduct = this.getView().getModel("newProduct").oData;
        var oODataModel = this.getView().getModel();

        oODataModel.create(`/${sURL}/Products`, oNewProduct, {
          success: function () {
            MessageToast.show("Product was successfully created!");
          },
          error: function () {
            MessageBox.error("Error while creating product!");
          },
        });

        this.onDialogClosePress();
      },

      onDialogClosePress: function () {
        var oODataModel = this.getView().getModel();
        oODataModel.refresh();
        this.oDialog.close();
      },
    };
  }
);