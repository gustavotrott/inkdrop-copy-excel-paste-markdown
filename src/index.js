import { pasteExcel } from './paste-excel'

module.exports = {
  activate() {
    this.subscription = inkdrop.commands.add(document.body, {
      'paste-excel-as-markdown': () => pasteExcel()
    })
  },

  deactivate() {
    this.subscription.dispose()
  }
}
