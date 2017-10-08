//<![CDATA[
$(document).ready(function () {
    // $('#zip').jpostal({
    //  postcode : [
    //    '#zip'
    //  ],
    //  address : {
    //    '#address1'  : '%3%4',
    //    '#address2'  : '%5'
    //  }
    // });
});

var getViewPort = function () {
    var width, heiht;
    if (self.innerHeight) {
        width = self.innerWidth;
        height = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) {
        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight;
    } else if (document.body) {
        width = document.body.clientWidth;
        height = document.body.clientHeight;
    }
    return { width: width, height: height };
}

var observe = function (element, event, observer) {
    if (element.addEventListener) {
        element.addEventListener(event, observer, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + event, observer);
    }
};
//]]>

function act(action) {
    document.f_freeprev.postback_action.value = action;
    document.f_freeprev.submit();
}

$(document).ready(function () {
    $('#next').click(function () {
        resetInfo();
        var zipcode = document.getprintdata.zipcode.value;
        document.getprintdata.zipcode.value = zenTohanNumericHyphen(zipcode);
        document.easyprev.usertype.value = $('input[name="usertype"]:checked').val();
        SetItemsToFlashValue(onSaveFinished);
    });

    $('input,textarea').change(function () {
        isReloaded = true;
    });
});

function reflectedPreview() {
    var zipcode = document.getprintdata.zipcode.value;
    document.getprintdata.zipcode.value = zenTohanNumericHyphen(zipcode);
    ReflectedInThePreview();
    isReloaded = false;
}

function zenTohanNumericHyphen(str) {
    return str.replace(/[０-９－]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
    });
}


$(function () {
    var zoomSize = 100;
    var range = 20;
    var minzoomSize = 100;
    var maxzoomSize = 300;

    $('#reduction').prop('disabled', true);
    $('#imageSize').html('倍率' + zoomSize + '%');

    $('#reduction').click(function () {
        zooming(-range);
        $('#magnification').prop('disabled', false);
    });

    $('#magnification').click(function () {
        zooming(range);
        $('#reduction').prop('disabled', false);
    });

    function zooming(val) {
        zoomSize += val;
        $('#W2PPreview10').css({ 'width': zoomSize + '%', 'height': zoomSize + '%', 'position': 'relative' });
        $('#imageSize').html('倍率' + zoomSize + '%');

        var leftpos = ($('#W2PPreview10').width() - $('#mainPreviewArea').width()) / 2;
        $('#mainPreviewArea').scrollLeft(leftpos);

        if (zoomSize >= maxzoomSize) {
            $('#magnification').prop('disabled', true);
        } else if (minzoomSize >= zoomSize) {
            $('#reduction').prop('disabled', true);
        }
    }
});