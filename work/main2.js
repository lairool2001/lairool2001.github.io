var menuX1;
sizeSetIni();
menu_symbol = "..."

function sizeSetIni() {
    isMobile = false; //initiate as false
    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)

        ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;
    if (isMobile) {
        diplay_icon.innerHTML = "[[[[";
        if (window.screen.availWidth > 500) {
            menuX1 = 65;
        } else {
            menuX1 = 65 * 2;
        }
        menuX2 = 65
        //top_menu_content.style.marginBottom = "30px"
    } else {
        diplay_icon.innerHTML = "[[";
        menuX1 = 65;
        menuX2 = 30
        //top_menu_content.style.marginBottom = "8px"
    }
    //top_menu_content.style.height = menuX1 + "px"
}

window.onresize = function (event) {
    console.log("window.onresize")
    sizeSetIni()
    for (var i = 0; i < menu_deep; i++) {
        var div = $("#menu" + i)
        //newDiv.style.top = 100 * (i + 1) + "px"
        //console.log(menuX1)
        //newDiv.style.height = menuX1 + "px"
    }
};
//a00.style.height = (1) * menuX1 + "px";
$(function () {
    //$("#abc").html("123"); 
});

function menuIni() {
    menu_deep = 10;
    for (var i = 0; i < menu_deep; i++) {
        var br = document.createElement("br")
        a00.appendChild(br);
        var newDiv = document.createElement("div");
        //newDiv.style.top = 100 * (i + 1) + "px"
        newDiv.setAttributeNS(null, "id", "menu" + i);
        newDiv.style.display = "none";
        //newDiv.style.height = menuX1 + "px"
        newDiv.className = "top_menu_content";
        var rgb = (i + 1 * 3).toString(16);
        newDiv.style.backgroundColor = "#" + rgb + "" + rgb + "" + rgb;
        console.log(newDiv.style.backgroundColor);
        a00.appendChild(newDiv);
    }
}
menuIni()
m_index = 0;
top_menu_content.innerHTML = "";
for (var i = 0; i < pages.length; i++) {
    var page = pages[i];
    //console.log(i)
    page.index = i;
}
for (var i = 0; i < pages.length; i++) {
    var page = pages[i]
    if (page.type == undefined) {

    } else if (page.type == "menu") {

        page.show_name += menu_symbol
    }
}
for (var i = 0; i < one_menu.length; i++) {
    var index = one_menu[i];
    var page = pages[index];
    console.log(index);
    setLeyer(page, 0, null);
    //<a onclick="home_page()">首頁</a>／<a onclick="tip()">資源</a>
    top_menu_content.innerHTML += `<a id="menu_item_` + index + `" class="no_select_menu" onmousedown="set_page(` + index + `,event)"><ruby>` + page.show_name + `<rt>` + page.name + `</rt>` + `</ruby></a>`;
    sameDown(top_menu_content)
    m_index++;
    if (i < one_menu.length - 1) {
        top_menu_content.innerHTML += "／";
    }
}

function setLeyer(page, layer, parent) {
    console.log("set layer " + page.name + ":" + layer)
    page.layer = layer
    page.parent = parent
    if (page.childz == undefined) {
        return;
    }
    for (var i = 0; i < page.childz.length; i++) {
        setLeyer(pages[page.childz[i]], layer + 1, page);
    }
}

function sameDown(obj) {
    obj.ontouchstart = obj.onmousedown;
}


var loading;
load_page();
window.addEventListener('popstate', function (e) {
    load_page();
});

function load_page() {
    loading = true;
    if (typeof old_select_item === 'undefined') {
        old_select_item = null;
    }
    var found = false;
    if (location.search == "") {
        set_page(0);
        found = true;
    } else {
        var strUrl = location.search;
        var getPara, ParaVal;
        var aryPara = [];
        if (strUrl.indexOf("?") != -1) {
            var getSearch = strUrl.split("?");
            getPara = getSearch[1].split("&");
            for (i = 0; i < getPara.length; i++) {
                ParaVal = getPara[i].split("=");
                aryPara.push(ParaVal[0]);
                aryPara[ParaVal[0]] = ParaVal[1];
                console.log(aryPara[0]);
            }
            //alert(aryPara);
        }
        url = aryPara['url'];
        for (i = 0; i < pages.length; i++) {
            var page = pages[i];
            if (page.name == url) {
                set_page(i);
                found = true;
                break;
            }
        }
    }
    if (!found) {
        no_found();
    }
    loading = false;
}
var now_url = "";

function change_url(url) {
    var stateObj = {};
    if (!loading) {
        history.pushState(stateObj, "", "?url=" + url);
        console.log("change_url:" + url);
    }
}

function heredoc(fn) {
    return fn.toString().split('\n').slice(1, -1).join('\n') + '\n'
}

var old_p_number = -1;
previous_menu = null

//div1.style.top = menuX2 + (1) * menuX1 + "px";

function set_page(p, event) {
    if (event != undefined) {
        event.stopPropagation();
        event.preventDefault();
    }

    if (typeof p == "number") {
        console.log('set_page(' + p + ')');
        menu_item = document.getElementById("menu_item_" + p);
        var page = pages[p];
        div1.style.display = "none";
        if (page.script != undefined) {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = page.script; //要載入的js
            head.appendChild(script);
        }
        if (page.type == undefined) {
            window.scrollTo(0, 0);

            div1.innerHTML = page.html;
            change_url(page.name);
            previous_menu = null;
			
			
			var imgz=document.querySelectorAll("img")
			console.log(imgz)
			for(var i=0;i<imgz.length;i++){
				let img=imgz[i];
				//img.setAttribute("width","512")
				//img.setAttribute("height","512")
				img.onload=()=>{
					img.style.opacity=1
					img.style.visibility="visible"
				}
			}

            for (var i = 0; i < page.layer; i++) {
                var menu2 = this["menu" + i]
                menu2.style.display = "inline"
            }
            for (var i = page.layer; i < menu_deep; i++) {
                var menu2 = this["menu" + i]
                menu2.style.display = "none"
            }
        } else {
            switch (page.type) {
                case "menu":
                    if (loading) {
                        div1.innerHTML = "此頁面為選單，請選擇上面的子項目"
                    }
                    //console.log(page.layer)
                    var menu = this["menu" + page.layer];
                    if (p == old_p_number) {
                        if (menu.style.display == "none") {
                            menu.style.display = "inline"
                        } else {
                            menu.style.display = "none"
                        }
                    } else {

                        menu.style.display = "inline"
                        console.log(menu)
                        //menu.style.display = "inline"
                        menu.innerHTML = ""
                        //div1.innerHTML = "1123<br/><br/><br/>123";
                        for (var i = 0; i < page.childz.length; i++) {
                            var page2 = pages[page.childz[i]];
                            page2.layer = page.layer + 1;
                            menu.innerHTML += `<a id="menu_item_` + page2.index + `" class="no_select_menu" onmousedown="set_page('` + page2.name + `')"><ruby>` + page2.show_name + `<rt>` + page2.name + `</rt>` + `</ruby></a>`;
                            sameDown(menu)
                            m_index++;
                            //menu.innerHTML += page2.show_name + " ";
                            if (i < page.childz.length - 1) {
                                menu.innerHTML += "／";
                            }
                            //console.log(menu.innerHTML);
                        }
                    }
                    for (var i = 0; i < page.layer; i++) {
                        var menu2 = this["menu" + i]
                        menu2.style.display = "inline"
                    }
                    for (var i = page.layer + 1; i < menu_deep; i++) {
                        var menu2 = this["menu" + i]
                        menu2.style.display = "none"
                    }
                    change_url(page.name)
                    previous_menu = menu;
                    break;
            }
        }
        var parent = page
        for (var i = page.layer - 1; i >= 0; i--) {
            var page2 = parent
            var childz = parent.parent.childz
            var menu2 = this["menu" + i]
            menu2.innerHTML = ""
            for (var j = 0; j < childz.length; j++) {
                var page3 = pages[childz[j]]
                menu2.innerHTML += `<a id="menu_item_` + page3.index + `" class="no_select_menu" onmousedown="set_page('` + page3.name + `')"><ruby>` + page3.show_name + `<rt>` + page3.name + `</rt>` + `</ruby></a>`;
                if (j < childz.length - 1) {
                    menu2.innerHTML += "／";
                }
                sameDown(menu2)
            }
            parent = page2.parent
        }
        //console.log(top_menu_content.offsetTop)
        var top = top_menu_content.offsetTop + top_menu_content.offsetHeight + 10
        for (var i = 0; i < menu_deep; i++) {
            var menu = this["menu" + i];
            if (menu.style.display != "none") {
                top += menu.offsetHeight
            } else {
                break
            }
        }
        var top2 = a00.offsetTop + a00.offsetHeight + 10
        if(isMobile){
            div2.style.top = 0 + "px"
        }else{
            div2.style.top = top + "px"
        }
        a00.style.height = (top - 10) + "px"
        //console.log(div1.style.top)
        //div1.style.top = a00.style.height;
        div1.style.display = "block";
        if (old_select_item != undefined) {
            old_select_item.className = "no_select_menu";
        }

        menu_item = document.getElementById("menu_item_" + p);
        if (menu_item != null) {
            menu_item.className = "select_menu";
        }

        //console.log(menu_item);
        old_select_item = menu_item;
        //console.log(old_select_item);
        old_p_number = p;

    } else if (typeof p == "string") {
        for (i = 0; i < pages.length; i++) {
            var page = pages[i];
            if (page.name == p) {
                set_page(i);
                break;
            }
        }
    }
}

function no_found() {
    div1.innerHTML = `<p>沒有這個頁面喔!</p>`;
    var top = top_menu_content.offsetTop + top_menu_content.offsetHeight + 10
    if (!isMobile) {
        div2.style.top = top + "px"
    } else {
        div2.style.top = 20 + "px"
    }
    a00.style.height = (top - 10) + "px"
    change_url("no_found");
}

function diplay_icon_mouse_down() {
    var top = top_menu_content.offsetTop + top_menu_content.offsetHeight + 10
    if (a00.style.display != 'none') {
        a00.style.display = "none";
        //a00_old_top = a00.style.top
        div2.oldTop = div2.style.top
        //div1.style.top = diplay_icon.offsetHeight + "px"
        div2.style.top = 0 + "px"
    } else {
        div2.style.top = top
        a00.style.display = "block";
        //a00.style.top = a00_old_top
    }
    event.stopPropagation();
    event.preventDefault();
}
