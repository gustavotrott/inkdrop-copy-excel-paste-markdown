"use strict";

var _pasteExcel = require("./paste-excel");

module.exports = {
  activate() {
    this.subscription = inkdrop.commands.add(document.body, {
      'paste-excel-as-markdown': () => (0, _pasteExcel.pasteExcel)()
    });
  },

  deactivate() {
    this.subscription.dispose();
  }

};