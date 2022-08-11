sap.ui.define(
  ["sap/ui/model/json/JSONModel",
  "sap/m/MessageBox",
  "sap/m/MessageToast",
  "project12/utils/Constants"],
  function (JSONModel, MessageBox, MessageToast, Constants) {
    "use strict";

    return {

      // onBeforeRendering: function () {
      //   this.oView.byId(Constants.returnConstant().sDeleteProductsButton)?.setVisible(false);
      // },

      onAfterRendering: function () {
        this.oView.byId(Constants.returnConstant().sDeleteProductButton)?.setVisible(false);
        this.oView.byId(Constants.returnConstant().sDeleteProductButtonOnObjectPage)?.setVisible(false);
        this.oView.byId(Constants.returnConstant().sCreateProductButton)?.setVisible(false);

        setTimeout(() => {
          if (this.oView.byId(Constants.returnConstant().sDeleteProductsButton)) {
            this.oView.byId(Constants.returnConstant().sDeleteProductsButton)?.setVisible(false);
          }
        }, 0);
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
