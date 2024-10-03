// ###########################################################################
// ###########################################################################
// ###########################################################################
// Images
// Remove width and height from images that have it in their HTML code
// this ensures that images stay responsive
jQuery(document).ready(function ($) {
  $("img").removeAttr("width height");
});

// ###########################################################################
// ###########################################################################
// ###########################################################################
// Alert Messages
$(".alert-msg .close").click(function () {
  $(this)
    .parent()
    .animate(
      {
        opacity: "0",
      },
      400
    )
    .slideUp(400);
  return false;
});

// ###########################################################################
// ###########################################################################
// ###########################################################################
// Accordions
$(".accordion-title").click(function () {
  $(".accordion-title").removeClass("active");
  $(".accordion-content").slideUp("normal");
  if ($(this).next().is(":hidden") == true) {
    $(this).addClass("active");
    $(this).next().slideDown("normal");
  }
});
$(".accordion-content").hide();
$(".default").show(); //Asim  Added
// ###########################################################################
// ###########################################################################
// ###########################################################################
// Toggles
$(".toggle-title").click(function () {
  $(this).toggleClass("active").next().slideToggle("fast");
  return false;
});

// ###########################################################################
// ###########################################################################
// ###########################################################################
// Tabs
$(".tab-wrapper").tabs({
  event: "click",
});

// ###########################################################################
// ###########################################################################
// ###########################################################################
// FitVids - Media Such as Vimeo, Youtube etc.
$(".mediabox").fitVids();

// ###########################################################################
// ###########################################################################
// ###########################################################################
// Show / Hide Topbar
$("#slideit").click(function () {
  $("div#slidepanel").slideDown("slow");
});
$("#closeit").click(function () {
  $("div#slidepanel").slideUp("slow");
});
// Switch buttons from "+" to "-" on click
$("#openpanel a").click(function () {
  $("#openpanel a").toggle();
});

// ###########################################################################
// ###########################################################################
// ###########################################################################
// Scroll to top Button
jQuery("#scrolltotop").click(function () {
  jQuery("body,html").animate(
    {
      scrollTop: 0,
    },
    600
  );
});

jQuery(window).scroll(function () {
  if (jQuery(window).scrollTop() > 150) {
    jQuery("#scrolltotop").addClass("visible");
  } else {
    jQuery("#scrolltotop").removeClass("visible");
  }
});

// ###########################################################################
// ###########################################################################
// ###########################################################################
// Mobile Menu based on:
// "Convert a Menu to a Dropdown for Small Screens" from Chris Collier - http://css-tricks.com/convert-menu-to-dropdown/
// "Submenu's with a dash" Daryn St. Pierre - http://jsfiddle.net/bloqhead/Kq43X/

// Create the dropdown base
$('<form id="mobilemenu"><select /></form>').appendTo("#topnav");
// Create default option "Go to..." or something else
$("<option />", {
  // selected: "selected",
  value: "",
  text: "MENU",
}).appendTo("#topnav select");
// Populate dropdown with menu items
$("#topnav a").each(function () {
  var el = $(this);
  // Modified here to add puffer to menu items depending on which level they are
  if ($(el).parents(".sub-menu .sub-menu .sub-menu").length >= 1) {
    $("<option />", {
      value: el.attr("href"),
      text: "- - - " + el.text(),
    }).appendTo("#topnav select");
  } else if ($(el).parents(".sub-menu .sub-menu").length >= 1) {
    $("<option />", {
      value: el.attr("href"),
      text: "- - " + el.text(),
    }).appendTo("#topnav select");
  } else if ($(el).parents(".sub-menu").length >= 1) {
    $("<option />", {
      value: el.attr("href"),
      text: "- " + el.text(),
    }).appendTo("#topnav select");
  } else {
    $("<option />", {
      value: el.attr("href"),
      text: el.text(),
    }).appendTo("#topnav select");
  }
});
// Make the dropdown menu actually work
$("#topnav select").change(function () {
  if ($(this).find("option:selected").val() !== "#") {
    window.location = $(this).find("option:selected").val();
  }
});
// End Mobile Menu

///Them Change code Start
$(document).ready(function () {
  $(".themeButton").click(function () {
    $(".theme_link").attr(
      "href",
      "layout/styles/colours/" + $(this).attr("title") + ".css"
    );
    $("head").append(
      "<style>.ColouredList li:before{color:" +
        $(this).attr("title") +
        ";} </style>"
    );
    // if (confirm("Would you like to save this theme?")) {
    saveTheme($(this).attr("title"));
    //  }
  });
});

var xmlHttpTHEME;

function GetXmlHttpObject() {
  var xmlHttp = null;
  try {
    // Firefox, Opera 8.0+, Safari
    xmlHttp = new XMLHttpRequest();
  } catch (e) {
    // Internet Explorer
    try {
      xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
  return xmlHttp;
}

function saveTheme(val) {
  xmlHttpTHEME = GetXmlHttpObject();
  if (xmlHttpTHEME == null) {
    alert("Your browser does not support AJAX!");
    return;
  }
  var url = "_Include/MultiPurposeAJAXFunctions.ashx?operation=saveTheme";
  xmlHttpTHEME.onreadystatechange = updatesaveTheme;
  xmlHttpTHEME.open("POST", url, true);
  xmlHttpTHEME.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded"
  );
  xmlHttpTHEME.send("theme=" + val);
}

function updatesaveTheme() {
  if (xmlHttpTHEME.readyState == 4) {
    var responseString = xmlHttpTHEME.responseText;

    if (responseString != "") {
      //alert("Theme Saved Successfully!");
      // gf_DisplayUpdateAddMessage('Theme Saved Successfully!', 'MID');
    }
  }
}

///Them Change code END

// #########################################pagging code starts#############################################

$(document).ready(function () {
  var GBL_COUNT = 30;
  $("#GBL_divList ul li").css("display", "none");
  var n = Math.ceil($("#GBL_divList ul li").length / GBL_COUNT);

  var str =
    "<li class='prev'><a href='#'><span class='icon-chevron-left'></span></a></li>";
  for (i = 1; i <= n; i++) {
    str += "<li class='GBL_pagenum'><a href='#'>" + i + "</a></li>";
  }
  str +=
    "<li class='next'><a href='#'><span class='icon-chevron-right'></span></a></li>";
  $("#GBL_pages").html(str);

  //Function To Change Page On pageClick*****************************************************************************
  $(".GBL_pagenum").click(function () {
    var c = $(this).text() * GBL_COUNT; //Get The index of Last Photo To be Displayed
    showListItem(c);
  });
  //End of Function To Change Page On pageClick*****************************************************************************

  //Function To Change Page On PrevClick*****************************************************************************
  $(".prev").click(function () {
    var c = (parseInt($(".current").text()) - 1) * GBL_COUNT; //Get The index of Last Photo To be Displayed
    if (c > 0) {
      showListItem(c);
    }
  });
  //End of Function To Change Page On pageClick*****************************************************************************

  //Function To Change Page On NextClick*****************************************************************************
  $(".next").click(function () {
    var c = (parseInt($(".current").text()) + 1) * GBL_COUNT; //Get The index of Last Photo To be Displayed
    if (c <= $(".GBL_pagenum").length * GBL_COUNT) {
      showListItem(c);
    }
  });
  //End of Function To Change Page On pageClick*****************************************************************************

  //Generic Function to show pics*********************************************************************************************
  function showListItem(lastPicIndex) {
    var i;

    //remove current class from active page
    $(".current").html("<a href='#'>" + $(".current strong").text() + "</a>");
    $(".current").removeClass("current");

    //add active class to new active page
    $(
      ".GBL_pagenum:nth-child(" + (parseInt(lastPicIndex / GBL_COUNT) + 1) + ")"
    ).addClass("current");
    $(".current").html("<strong>" + $(".current a").text() + "</strong>");

    //hide all photos
    $("#GBL_divList ul li").css("display", "none");

    //show photoes for this page
    for (i = lastPicIndex; i > parseInt(lastPicIndex) - GBL_COUNT; i--) {
      //if last index greater than number of pics set it to last pic
      if (i > $("#GBL_divList ul li").length) {
        i = $("#GBL_divList ul li").length;
      }

      //show pic
      $("#GBL_divList ul li:nth-child(" + i + ")").css("display", "table");
    }
  }
  //End of Generic Function to show pics*********************************************************************************************

  //set first page as default
  $(".GBL_pagenum:first").trigger("click");
});

//paging code ends

//Asim Search Function start
function qs() {
  var f = document.formSear;
  var qe = f.searWords.value;
  if (window.encodeURIComponent) qe = encodeURIComponent(qe);
  if (f.area)
    if (f.area.value == 2) {
      document.location = "http://www.google.com/search?q=" + qe;
      return false;
    }
  var pt = document.location.href;
  var iq = pt.indexOf("?");
  if (iq != -1) pt = pt.substring(0, iq);
  if (f.action) if (f.action != "") pt = f.action;
  var ue = pt + "?searWords=" + qe;
  if (f.search) ue += "&search=" + f.search.value;
  if (f.match) ue += "&match=" + f.match.value;
  document.location = ue;
  return false;
}

//Asim Search Function END

// handle scroll
$(document).scroll(function () {
  if ($(this).scrollTop() > 185) {
    $(".row2").css("position", "sticky");
    $(".row2").css("top", "0");
    $(".row2").css("text-align", "center");
    $(".row2").css("z-index", "10");
  } else {
    $(".row2").css("position", "static");
  }
});
