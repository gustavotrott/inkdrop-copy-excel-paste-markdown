import { clipboard } from 'electron'

function columnWidth(rows, columnIndex) {
  return Math.max.apply(null, rows.map(function(row) {
    return typeof row[columnIndex] != 'undefined' ? row[columnIndex].length : 0;
  }))
}

export function pasteExcel() {
  const data = clipboard.readText().trim()
  var rows = data.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(function(row) {
    return row.split("\t")
  })
  var columnWidths = rows[0].map(function(column, columnIndex) {
    return columnWidth(rows, columnIndex)
  })
  var markdownRows = rows.map(function(row, rowIndex) {
    // | Name         | Title | Email Address  |
    // |--------------|-------|----------------|
    // | Jane Atler   | CEO   | jane@acme.com  |
    // | John Doherty | CTO   | john@acme.com  |
    // | Sally Smith  | CFO   | sally@acme.com |
    return "| " + row.map(function(column, index) {
      return column + Array(columnWidths[index] - column.length + 1).join(" ")
    }).join(" | ") + " |"
    row.map

  })
  markdownRows.splice(1, 0, "|" + columnWidths.map(function(width, index) {
    return Array(columnWidths[index] + 3).join("-")
  }).join("|") + "|")

  // https://www.w3.org/TR/clipboard-apis/#the-paste-action
  // When pasting, the drag data store mode flag is read-only, hence calling
  // setData() from a paste event handler will not modify the data that is
  // inserted, and not modify the data on the clipboard.

  const md = markdownRows.join("\n")

  const { cm } = inkdrop.getActiveEditor()
  cm.replaceSelection(md)
  return true
}
