(function (doc, win) {
    var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                docEl.style.fontSize = 40 * (clientWidth / 750) + 'px';
            };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

function myAjax (type, data, url, sucFn) {
    sucFn = sucFn || function () {};
    $.ajax({
        url: url,
        type: type,
        data: data,
        cache: true,
        timeout: 30000,
        dataType: 'json',
        success: function (res, textStatus, XMLHttpRequest) {
            // window.myFn.option_loading();
            statusCode(res, sucFn);
        },
        error: function () {
            console.log('网络错误');
        }
    });
}

function statusCode (res, sucFn) {
    switch (parseInt(res.code)) {
        case 200:
            sucFn(res);
            break;
        case 10000:
            alert(res.msg)
            break;
        default:
            alert(res.msg);
            break;
    }
}