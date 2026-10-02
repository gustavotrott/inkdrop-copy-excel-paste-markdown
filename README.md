# copy-excel-paste-markdown plugin for Inkdrop

It enables you to copy selected cells in Excel and paste as markdown table in Inkdrop.

## Install

```sh
ipm install copy-excel-paste-markdown
```

Or search for `copy-excel-paste-markdown` in *Preferences → Plugins*.

## Usage

Select *"Plugins" → "Paste Excel as Markdown"* from the menu, or right-click in the editor and choose *"Paste Excel as Markdown"*, to run this plugin's command `paste-excel-as-markdown`.
It converts copied cells from Excel (or Google Sheets, Numbers, etc.) into a Markdown table and pastes it into the editor.

Supports Inkdrop v4, v5 and v6.

Cells containing `|` are escaped and line breaks inside a cell are converted to `<br>`.

You can also bind the command to a shortcut in your `keymap.json` (`keymap.cson` on Inkdrop v5 and earlier):

```json
{
  ".CodeMirror": {
    "cmd-alt-v": "paste-excel-as-markdown"
  }
}
```

For example, 

- You copy below cells:

![image](https://user-images.githubusercontent.com/5660191/86498023-69536200-bd5a-11ea-970b-61575385422d.png)

- Clipboard text will be like this
```
animal	weight	color
dog	30lb	tan
dog	85lb	black
cat	18lb	calico
```


- You call the plugin:

![plugins_paste_excel](https://user-images.githubusercontent.com/5660191/86499457-b555d500-bd61-11ea-9443-3415dadbebab.gif)


- It will be pasted in Editor as:
```markdown
| animal | weight | color  |
|--------|--------|--------|
| dog    | 30lb   | tan    |
| dog    | 85lb   | black  |
| cat    | 18lb   | calico |
```

- It will be viewed in preview mode as:

![image](https://user-images.githubusercontent.com/5660191/86497485-3a3bf100-bd58-11ea-934a-da2a1e0a272c.png)

## Fork of copy-excel-paste-markdown and inkdrop-paste-as-markdown

This plugin was based on [jonmagic/copy-excel-paste-markdown](https://github.com/jonmagic/copy-excel-paste-markdown) and [inkdropapp/inkdrop-paste-as-markdown](https://github.com/inkdropapp/inkdrop-paste-as-markdown) plugin.
## Development

```sh
npm install
npm run build   # compile src/ to lib/
npm test        # build and run the table conversion tests
ipm link        # symlink into Inkdrop for local testing
```

To release: `npm version <patch|minor|major>`, push with tags, then `ipm publish` (requires [`@inkdropapp/ipm-cli`](https://www.npmjs.com/package/@inkdropapp/ipm-cli) and `ipm configure`).
