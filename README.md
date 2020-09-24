# sleep-saver

Google Apps Script to remove Google calendar notifications from midnight events.

## How to use

```bash
npm install -g @google/clasp
git clone git@github.com:blue-jam/sleep-saver.git
cd sleep-saver
clasp login # A browser opens for authentication
clasp create sleep-saver
gedit appsscript.json # Replace "Asia/Tokyo" with your timezone
clasp push
```

Then, [create a time-based trigger](https://script.google.com/home/triggers).

## How to upload the script from CLI

```
clasp login
clasp push --watch
```
