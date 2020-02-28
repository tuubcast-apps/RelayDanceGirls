Contents = (function() {
    return {};
})();

Contents.values = function(category, location, length, sortkey, sortorder) {
    return controller.catalog().values("showcase", "contents", category, null, [ location, length ], [ sortkey, sortorder ]);
}

Contents.value = function(content_id) {
    return controller.catalog().value("showcase", "contents", "S_CONTENTS_" + content_id);
}

Contents.submit = function(content_id, data) {
    controller.catalog().submit("showcase", "contents", "S_CONTENTS_" + content_id, data);
}

Contents.categorize = function(content_id, category) {
    controller.catalog().categorize("showcase", "contents", "S_CONTENTS_" + content_id, [ category ], null);
}

Contents.uncategorize = function(content_id, category) {
    controller.catalog().categorize("showcase", "contents", "S_CONTENTS_" + content_id, null, [ category ]);
}

Contents.contains = function(content_id) {
    if (controller.catalog().value("showcase", "contents", "S_CONTENTS_" + content_id)) {
        return true;
    }

    return false;
}

__MODULE__ = Contents;
