"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseTSV = parseTSV;
exports.toMarkdownTable = toMarkdownTable;
exports.tsvToMarkdownTable = tsvToMarkdownTable;

// Parses tab-separated text as copied from Excel / Google Sheets.
// Cells containing tabs, line breaks or quotes are wrapped in double quotes,
// with inner quotes doubled (e.g. `"line 1\nline ""2"""`).
function parseTSV(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let i = 0;

  const endCell = () => {
    row.push(cell);
    cell = '';
  };

  const endRow = () => {
    endCell();
    rows.push(row);
    row = [];
  };

  while (i < text.length) {
    if (cell === '' && text[i] === '"') {
      const end = findClosingQuote(text, i + 1);

      if (end !== -1) {
        cell = text.slice(i + 1, end).replace(/""/g, '"');
        i = end + 1;
        continue;
      }
    }

    const ch = text[i];

    if (ch === '\t') {
      endCell();
      i++;
    } else if (ch === '\r' || ch === '\n') {
      endRow();
      i += ch === '\r' && text[i + 1] === '\n' ? 2 : 1;
    } else {
      cell += ch;
      i++;
    }
  }

  endRow();
  return rows;
} // Returns the index of the quote closing a quoted cell, or -1 when the cell
// is not really quoted (e.g. a plain value that merely starts with `"`).


function findClosingQuote(text, from) {
  let i = from;

  while (i < text.length) {
    if (text[i] === '"') {
      if (text[i + 1] === '"') {
        i += 2;
        continue;
      }

      const next = text[i + 1];
      const isCellEnd = next === undefined || next === '\t' || next === '\r' || next === '\n';
      return isCellEnd ? i : -1;
    }

    i++;
  }

  return -1;
}

function escapeCell(cell) {
  return cell.trim().replace(/\|/g, '\\|').replace(/\r\n|\r|\n/g, '<br>');
} // | Name         | Title | Email Address  |
// |--------------|-------|----------------|
// | Jane Atler   | CEO   | jane@acme.com  |
// | John Doherty | CTO   | john@acme.com  |


function toMarkdownTable(rows) {
  const columnCount = Math.max(...rows.map(row => row.length));
  const cells = rows.map(row => {
    const padded = row.map(escapeCell);

    while (padded.length < columnCount) padded.push('');

    return padded;
  });
  const widths = [];

  for (let col = 0; col < columnCount; col++) {
    // Markdown requires at least 3 dashes in the delimiter row
    widths.push(Math.max(3, ...cells.map(row => row[col].length)));
  }

  const lines = cells.map(row => '| ' + row.map((c, col) => c.padEnd(widths[col])).join(' | ') + ' |');
  const delimiter = '|' + widths.map(w => '-'.repeat(w + 2)).join('|') + '|';
  lines.splice(1, 0, delimiter);
  return lines.join('\n');
}

function tsvToMarkdownTable(text) {
  // Spreadsheets append a trailing line break; leading tabs are significant
  // (empty first cells), so only line breaks are stripped.
  const data = text.replace(/^[\r\n]+|[\r\n]+$/g, '');
  if (data.trim() === '') return null;
  return toMarkdownTable(parseTSV(data));
}