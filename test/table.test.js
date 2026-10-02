const test = require('node:test')
const assert = require('node:assert')
const { parseTSV, tsvToMarkdownTable } = require('../lib/table')

test('converts copied cells into an aligned table', () => {
  const text =
    'animal\tweight\tcolor\r\ndog\t30lb\ttan\r\ncat\t18lb\tcalico\r\n'
  assert.strictEqual(
    tsvToMarkdownTable(text),
    [
      '| animal | weight | color  |',
      '|--------|--------|--------|',
      '| dog    | 30lb   | tan    |',
      '| cat    | 18lb   | calico |'
    ].join('\n')
  )
})

test('keeps empty leading cells', () => {
  assert.deepStrictEqual(parseTSV('\tQ1\tQ2\nA\t1\t2'), [
    ['', 'Q1', 'Q2'],
    ['A', '1', '2']
  ])
})

test('pads rows with missing cells', () => {
  assert.strictEqual(
    tsvToMarkdownTable('a\tb\nc'),
    ['| a   | b   |', '|-----|-----|', '| c   |     |'].join('\n')
  )
})

test('handles quoted cells with line breaks and quotes', () => {
  assert.deepStrictEqual(parseTSV('"line 1\nline ""2"""\tx\ny\tz'), [
    ['line 1\nline "2"', 'x'],
    ['y', 'z']
  ])
  assert.match(tsvToMarkdownTable('"a\nb"\tc'), /^\| a<br>b \| c   \|$/m)
})

test('does not treat a stray leading quote as quoting', () => {
  assert.deepStrictEqual(parseTSV('"abc\tdef'), [['"abc', 'def']])
})

test('escapes pipes', () => {
  assert.match(tsvToMarkdownTable('a|b\tc'), /a\\\|b/)
})

test('returns null for empty clipboard', () => {
  assert.strictEqual(tsvToMarkdownTable(''), null)
  assert.strictEqual(tsvToMarkdownTable('\r\n'), null)
})
