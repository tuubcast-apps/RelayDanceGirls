const sheets = require("gdrive-sheets"),
      contents = require("contents"),
      conf = include("config.js")

function on_update(handler) {
    sheets.fetch_data(conf.sheet_key, conf.sheet_no).then(function(data) {
        if ((data[0] || {})[conf.unique_key] && !contents.contains(data[0][conf.unique_key])) {
            handler({ "type":"new" })
        }
    })
}
