# copy-excel-paste-markdown plugin for Inkdrop

It enables you to copy selected rows and columns in Excel and paste as Markdown Table in Inkdrop.

## Install

```sh
ipm install copy-excel-paste-markdown
```

## Usage

Select *"Plugins" → "Paste Excel as Markdown"* from menu to run this plugin's command `paste-excel-as-markdown`.
It converts copied Excel rows and columns into Markdown Table and paste it into the editor.
For example, when you copy below HTML on your browser:


![image](https://user-images.githubusercontent.com/5660191/86498023-69536200-bd5a-11ea-970b-61575385422d.png)

Clipboard text will be like this
```
animal	weight	color
dog	30lb	tan
dog	85lb	black
cat	18lb	calico
```

It will be pasted in Editor as:
```markdown
| animal | weight | color  |
|--------|--------|--------|
| dog    | 30lb   | tan    |
| dog    | 85lb   | black  |
| cat    | 18lb   | calico |
```

It will be viewed in preview mode as:

![image](https://user-images.githubusercontent.com/5660191/86497485-3a3bf100-bd58-11ea-934a-da2a1e0a272c.png)

## Fork of copy-excel-paste-markdown and inkdrop-paste-as-markdown

This plugin was based on [jonmagic/copy-excel-paste-markdown](https://github.com/jonmagic/copy-excel-paste-markdown) and [inkdropapp/inkdrop-paste-as-markdown](https://github.com/inkdropapp/inkdrop-paste-as-markdown) plugin.