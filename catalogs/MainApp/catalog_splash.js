function on_loaded() {
    timeout(2.8, function() {
        controller.action("subview", { "subview":"V_HOME" })
    })
}
