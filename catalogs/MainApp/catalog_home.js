const sheets = require("gdrive-sheets"),
      contents = require("contents"),
      conf = include("config.js")

var __recent_contents = []
var __played_contents = []

function on_loaded() {
    sheets.fetch_data(conf.sheet_key, conf.sheet_no).then(function(data) {
        data.forEach(function(datum) {
            if (datum[conf.unique_key] && !contents.contains(datum[conf.unique_key])) {
                contents.submit(datum[conf.unique_key], datum);
                contents.categorize(datum[conf.unique_key], "recent");

                if ("hot" in datum && datum["hot"] === yes) {
                    contents.categorize(datum[conf.unique_key], "hot");
                }

                __recent_contents.push(datum);
            }
        });

        __recent_contents.sort(function() {
            return 0.5 - Math.random();
        });

        if (__recent_contents.length > 0) {
            view.object("showcase.contents").action("reload")
            controller.action("toast", { 
                "message":controller.catalog().string("Updated with the latest contents.") 
            })
        }

        view.object("section.update").action("hide");
    }, function(reason) {
        view.object("section.update").action("hide");
    })
}

function feed_contents(keyword, location, length, sortkey, sortorder, handler) {
    var values = __recent_contents.slice(0, length)

    if (values.length == 0) {
        values = contents.values("recent", 0, length, null, 'random')
        values.forEach(function(value) {
            contents.uncategorize("recent", value[conf.unique_key])
        })
    } else {
        __recent_contents.splice(0, values.length)
    }

    if (values.length == 0) {
        values = []

        while (values.length < length) {
            candidates = contents.values(null, 0, length, null, 'random')
            candidates.forEach(function(candidate) {
                if (!__played_contents.includes(candidate[conf.unique_key])) {
                    values.push(candidate)
                }
            })

            if (candidates.length == 0) {
                break
            }
        }
    }

    if (__played_contents.length > 0) {
        timeout(1.0, function() {
            handler(values)
        })    
    } else {
        handler(values)
    }

    values.forEach(function(value) {
        __played_contents.unshift(value[conf.unique_key])
    })
}

function zoom_in() {
    controller.catalog().submit("subcatalog", null, "home", { "appearance":"magnified" })
    view.object("showcase.contents").action("appearance", { "appearance":"magnified" })
    view.object("btn.zoom_in").action("hide")
    view.object("btn.zoom_out").action("show")

    controller.action("toast", {
        "message":controller.catalog().string("Video is zoomed in.")
    })
}

function zoom_out() {
    controller.catalog().submit("subcatalog", null, "home", { "appearance":"normal" })
    view.object("showcase.contents").action("appearance", { "appearance":"normal" })
    view.object("btn.zoom_out").action("hide")
    view.object("btn.zoom_in").action("show")

    controller.action("toast", {
        "message":controller.catalog().string("Video size is restored to normal.")
    })
}
