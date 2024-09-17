function imageListEventSPlain() {
    $('.JustShowEventsImgListParent').each(function () {
        // alert("#"+ this.id);
        var pageSizeEvtImgList = 8, pageIndexLocEvtImgList = 1, pDiv = "#" + this.id + " ";
        var sizeEVtImsg = 100;
        $(pDiv + ".JustShowEventsImgList," + pDiv + ".RofrewardEvents," + pDiv + ".RobackwardEvents").mouseover(function () {
            $(pDiv + '.RofrewardEvents').addClass("AddColoHover");
            $(pDiv + '.RobackwardEvents').addClass("AddColoHover");
            $(pDiv + '.RrofrewardEvticon').addClass("ColorIconsCs");
            $(pDiv + '.RrobackwardEvticon').addClass("ColorIconsCs");
        });
        $(pDiv + ".JustShowEventsImgList," + pDiv + ".RofrewardEvents," + pDiv + ".RobackwardEvents").mouseout(function () {
            $(pDiv + '.RofrewardEvents').removeClass("AddColoHover");
            $(pDiv + '.RobackwardEvents').removeClass("AddColoHover");
            $(pDiv + '.RrofrewardEvticon').addClass("ColorIconsCs");
            $(pDiv + '.RrobackwardEvticon').addClass("ColorIconsCs");
        });
        //if (screen.width > 999) {
        //    sizeEVtImsg = Math.ceil(parseInt($.trim($(pDiv + '#getEventImgListparamTerFrmDB').html())) / 100) * (100 / parseInt($.trim($(pDiv + '#getEventImgListparamTerFrmDB').html())));
        //}
        //else if (screen.width > 666) {
        //    sizeEVtImsg = 50;
        //}
        sizeEVtImsg = 100;
        $(pDiv + '.JustShowEventsImgList').css("width", (sizeEVtImsg - 0.50).toString() + "%");

        if ($(pDiv + '.JustShowEventsImgList').length > pageSizeEvtImgList) {
            pageIndexLocEvtImgList = 1;
            createSliderPagerEvtImgList(pDiv);

            $(pDiv + '.RobackwardEvents').click(function (e) {
                pageIndexLocEvtImgList--;
                createSliderPagerEvtImgList(pDiv);
                $(pDiv + '.JustShowEventsImgList' + pageIndexLocEvtImgList.toString()).removeClass('slideInLeft animated').addClass('slideInLeft animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $(this).removeClass('slideInLeft animated');
                });
            });
            $(pDiv + '.RofrewardEvents').click(function (e) {

                pageIndexLocEvtImgList++;
                createSliderPagerEvtImgList(pDiv);
                $('.JustShowEventsImgList' + ((pageIndexLocEvtImgList + parseInt($.trim($('#getEventImgListparamTerFrmDB').html())) - 1)).toString()).removeClass('slideInRight animated').addClass('slideInRight animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $(this).removeClass('slideInRight animated');
                });
            });
        }
        else {
            $(pDiv + '.RobackwardEvents,' + pDiv + '.RofrewardEvents').hide();
            $(pDiv + '.JustShowEventsImgList').show();
        }


        function createSliderPagerEvtImgList(pId) {
            $(pId + '.JustShowEventsImgList').hide();

            pageSizeEvtImgList = 8;
            if (pageIndexLocEvtImgList > 1) {
                pageSizeEvtImgList = 8;
                $(pId + '.RobackwardEvents').show();
            }
            else {
                $(pId + '.RobackwardEvents').hide();
                $(pId + '.RofrewardEvents').show();
            }
            if (pageIndexLocEvtImgList > 1 && pageIndexLocEvtImgList > $(pId + '.JustShowEventsImgList').length - pageSizeEvtImgList - 1) {
                $(pId + '.RofrewardEvents').hide();
            }
            else {
                $(pId + '.RofrewardEvents').show();
            }
            var totaLoca = pageIndexLocEvtImgList + pageSizeEvtImgList;
            var stIndx = (totaLoca - pageSizeEvtImgList);

            if (pageIndexLocEvtImgList > 1) {
                for (lpLp = stIndx; lpLp < stIndx + Math.ceil(pageSizeEvtImgList); lpLp++) {

                    $(pId + '.JustShowEventsImgList' + (lpLp).toString()).css('display', '-webkit-inline-box');
                }
            }
            else {
                for (var lp = 1; lp < totaLoca; lp++) {
                    // console.log(lp);
                    $(pId + '.JustShowEventsImgList' + lp.toString()).css('display', '-webkit-inline-box');
                }
            }
        }
    });
}
$(document).ready(function () {
    try {
        $('#menu').slicknav();
        var text = "";
        var i;
        for (i = 1; i < 10; i++) {
            text += "<div class=\"gal-item col-md-4 col-sm-4 col-xs-6\">" +
                "<img id=EvtHkmDlgUtv" + i + " src=\"BGallery/" + i + ".jpg\" class=\"img-responsive GaleryCssOuter EvtHkmDlgUtv\">" +
                "</div>";
        }
        // console.log(text);
        document.getElementById("ImpNewPhotoThumNail").innerHTML = text;
        // imageListEventSPlain();
        $('#ImpNewPhotoThumNail .EvtHkmDlgUtv').click(function () {
            showNexPhoto("#" + this.id);

            function showNexPhoto(idA) {
                var showURLToDislay = $.trim($(idA).attr("FLD256"));
                var showURL = $.trim($(idA).attr("FLD256"));
                if (showURL.indexOf("http") < 0 && showURL.length > 5) {
                    showURL = "http://" + showURL;
                }
                var fld788 = $.trim($(idA).attr("FLD788"));
                var clasNMEE = $.trim($(idA).attr("FLD677"));
                if (clasNMEE.length < 2 && fld788 == "1000") {
                    clasNMEE = "globe";
                }

                var htmSpnAL = "<span class=\"direcRev sourceSpnThimb\">" +
                    "<a>" +
                    "<i class=\"fa fa-" + clasNMEE + "\"></i>" + showURLToDislay + "</a></span>";
                $('#Div3UTUEIMGSlide').html("<div id=robackwardEvt class=\"RowEvtFrwdNewLft\"><span class=robackwards><i id=robackwardEvticon class=\"glyphicon glyphicon-chevron-left GalIconColorArrow\"></i></span></div>" +
                    "<img class=img-responsive src=\"" + $(idA).attr("src") + "\" />" +
                    "<div id=rofrewardEvt class=\"RowEvtFrwdNew\"><span class=rofrewards><i id=rofrewardEvticon class=\"iconClass glyphicon glyphicon-chevron-right GalIconColorArrow\"></i></span></div>");

                $('#rofrewardEvt,#robackwardEvt').hide()
                $('#Div3UTUEIMGSlide').mouseenter(function () {
                    $('#rofrewardEvt,#robackwardEvt').show();
                });
                $('#Div3UTUEIMGSlide').mouseleave(function () {
                    $('#rofrewardEvt,#robackwardEvt').hide();
                });

                var totl = $('#ImpNewPhotoThumNail .EvtHkmDlgUtv').length;
                var courntIndex = idA.split('EvtHkmDlgUtv')[1];

                $('#rofrewardEvt,#robackwardEvt').unbind('click');

                $('#robackwardEvt').click(function () {
                    courntIndex--;
                    courntIndex = courntIndex > 0 ? courntIndex : totl;
                    showNexPhoto("#EvtHkmDlgUtv" + courntIndex);
                });

                $('#rofrewardEvt').click(function () {
                    courntIndex++;
                    courntIndex = courntIndex > totl ? 1 : courntIndex;
                    showNexPhoto("#EvtHkmDlgUtv" + courntIndex);
                });

                $(document).unbind('keyup');

                $(document).keyup(function (event) {
                    if (event.keyCode == 39 || event.keyCode == 40) {
                        courntIndex++;
                        courntIndex = courntIndex > totl ? 1 : courntIndex;
                        showNexPhoto("#EvtHkmDlgUtv" + courntIndex);
                    }
                    if (event.keyCode == 37 || event.keyCode == 38) {
                        courntIndex--;
                        courntIndex = courntIndex > 0 ? courntIndex : totl;
                        showNexPhoto("#EvtHkmDlgUtv" + courntIndex);
                    }
                });

            }
        });

        $(".ClearDataOFModal").click(function () {
            $('#AllContent').html("");
        });
    }
    catch (er) { }
});
