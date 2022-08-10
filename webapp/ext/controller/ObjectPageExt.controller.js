sap.ui.define(
  ["sap/ui/model/json/JSONModel", "sap/m/MessageBox", "sap/m/MessageToast"],
  function (JSONModel, MessageBox, MessageToast) {
    "use strict";

    var sDeleteProduct              = "project12::sap.suite.ui.generic.template.ObjectPage.view.Details::Categories--ProductID::deleteEntry";
    var sDeleteProducts             = "project12::sap.suite.ui.generic.template.ObjectPage.view.Details::Categories--delete";
    var sDeleteProductOnObjectPage  = "project12::sap.suite.ui.generic.template.ObjectPage.view.Details::Products--delete";
    var sCreateProduct              = "project12::sap.suite.ui.generic.template.ObjectPage.view.Details::Categories--ProductID::addEntry";
    return {
      onAfterRendering: function () {
        if (this.oView.byId(sDeleteProduct)) {
          this.oView.byId(sDeleteProduct).setVisible(false);
        }

        setTimeout(() => {
          if (this.oView.byId(sDeleteProducts)) {
            this.oView.byId(sDeleteProducts).setVisible(false);
          }
        }, 0);

        if (this.oView.byId(sDeleteProductOnObjectPage)) {
          this.oView.byId(sDeleteProductOnObjectPage).setVisible(false);
        }

        if (this.oView.byId(sCreateProduct)) {
          this.oView.byId(sCreateProduct).setVisible(false);
        }
      },

      onInit: function () {
        this.getOwnerComponent().getRouter().getRoute();
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
        var sURL = this.getOwnerComponent()
          .getRouter()
          .getHashChanger()
          .getHash()
          .split("/")[0];
        var oNewProduct = this.getView().getModel("newProduct").oData;
        var oODataModel = this.getView().getModel();

        oODataModel.read(`/${sURL}/Products`, {
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

        // oODataModel.refresh();
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
