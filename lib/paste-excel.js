"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pasteExcel = pasteExcel;

var _electron = require("electron");

var _table = require("./table");

function replaceSelection(editor, text) {
  if (editor.cm) {
    // Inkdrop v4/v5: CodeMirror 5 instance
    editor.cm.replaceSelection(text);
  } else {
    // Inkdrop v6+: the active editor is a CodeMirror 6 EditorView
    editor.dispatch(editor.state.replaceSelection(text), {
      userEvent: 'input.paste',
      scrollIntoView: true
    });
  }
}

function pasteExcel() {
  const editor = inkdrop.getActiveEditor();
  if (!editor) return false;
  const md = (0, _table.tsvToMarkdownTable)(_electron.clipboard.readText());
  if (md === null) return false;
  replaceSelection(editor, md);
  return true;
}