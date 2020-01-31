
function createLink(show, insideUrl) {
    var f = "set_page('" + insideUrl + "')";
    var r = "<a class='link' ontouchstart=\"" + f + "\" onmousedown=\"" + f + "\">" + show + "</a>"
    console.log(r);
    return r;
}