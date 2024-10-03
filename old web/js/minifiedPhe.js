$(document).ready(function () {
    var strDivisions = "";
   
    $("#LblDivisions").removeClass("DispNo");
    $("#LblDIrectorate").removeClass("DispNo");
    $("#mainDv").removeClass("DispNo");
    $("#mainDirectorate").removeClass("DispNo");
    var strDirectorate="";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        url: "/CMS/CodeBehind/SetRetriveData.asmx/RetrieveDivisionsToDisplay",
        success: function (data) {
            var xmlDocDetails = jQuery.parseXML(data.d);
            
            $(xmlDocDetails).find('NewDataSet').each(function () {
                $(this).find('Table').each(function () {
                    if ($(this).find('DivsionName').text() == "Chief Engineer") {
                        strDirectorate += "<div class=\"col-md-4 ALngTxtPubInfo ddnntitle sidebar ContentStyle\" title=\"" + $.trim($(this).find('DivsionName').text()) + "\" data-id=\"" + $.trim($(this).find('DivsionName').text()) + "\" onclick='askDivsions(this)'>" +
                            // "<a class=\"ALngTxtPubInfo\" href=\"DivisionAndSubDivisions.aspx\" target=#>"+
                            "<div class=\"col-xs-12 chopChar sidebarVB\" id=DivSion" + $.trim($(this).find('DivsionID').text()) + ">" + $.trim($(this).find('DivsionName').text()) + "</div>" +
                            //  "</a>"+
                            "</div>";
                    }

                    if ($(this).find('DivsionName').text() != "Chief Engineer") {
                        strDivisions += "<div class=\"col-md-4 ALngTxtPubInfo ddnntitle sidebar ContentStyle\" title=\"" + $.trim($(this).find('DivsionName').text()) + "\" data-id=\"" + $.trim($(this).find('DivsionName').text()) + "\" onclick='askDivsions(this)'>" +
                            // "<a class=\"ALngTxtPubInfo\" href=\"DivisionAndSubDivisions.aspx\" target=#>"+
                            "<div class=\"col-xs-12 chopChar sidebarVB\" id=DivSion" + $.trim($(this).find('DivsionID').text()) + ">" + $.trim($(this).find('DivsionName').text()) + "</div>" +
                            //  "</a>"+
                            "</div>";
                    }
                    
                });
            });
            $('#mainDirectorate').append(strDirectorate);
            $('#mainDv').append(strDivisions);
        }
    });
});
 
    function askDivsions(idd) {
      //  debugger;
         var dataIdVal = $(idd).data("id");
       //  alert(dataIdVal);
        var strDivisionsAndSubDiv = "";
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "JSON",
            url: "/CMS/CodeBehind/SetRetriveData.asmx/RetrieveDivisionWithSubDivisionsToDisplay",
            data: "{'DivsionName': '" + dataIdVal + "'}",
            success: function (data) {
               var xmlDocDetails = jQuery.parseXML(data.d);
                $(xmlDocDetails).find('NewDataSet').each(function () {
                    $(this).find('Table').each(function () {
                        $("#LblDivisions").addClass("DispNo");
                        $("#mainDv").addClass("DispNo");
                        $("#LblDIrectorate").addClass("DispNo");
                        $("#mainDirectorate").addClass("DispNo");
                        $("#LblDivisionAndSubDivision").removeClass("DispNo");
                        $("#mainDivsionsAndSubDiv").removeClass("DispNo");
                        if (($(this).find('SubDivisionName').text() == "N/A") || ($(this).find('SubDivisionName').text() == "NULL")) {
                            strDivisionsAndSubDiv += "<div class=\"col-md-4 ddnntitle ALngTxtPubInfo sidebar ContentStyle\" title=\"" + $.trim($(this).find('DivsionName').text()) + "\" data-id=\"" + $.trim($(this).find('DivisionalInfoID').text()) + "\" onclick='RetriveDivsionSubDiv(this)'>" +
                                "<div class=\"col-xs-12 chopChar  sidebarVB\" id=DivSion" + $.trim($(this).find('DivisionalInfoID').text()) + ">" + $.trim($(this).find('DivisionName').text()) + "</div>" +
                                "</div>";
                        }
                        else if (($(this).find('SubDivisionName').text() != "N/A") || ($(this).find('SubDivisionName').text() != "NULL")) {
                            strDivisionsAndSubDiv += "<div class=\"col-md-4 ddnntitle ALngTxtPubInfo sidebar ContentStyle\" title=\"" + $.trim($(this).find('SubDivisionName').text()) + "\" data-id=\"" + $.trim($(this).find('DivisionalInfoID').text()) + "\" onclick='RetriveDivsionSubDiv(this)'>" +
                                "<div class=\"col-xs-12 chopChar  sidebarVB\" id=DivSion" + $.trim($(this).find('DivisionalInfoID').text()) + ">" + $.trim($(this).find('SubDivisionName').text()) + "</div>" +
                                "</div>";
                        }
                        else {
                            strDivisionsAndSubDiv += "Data Not Available";
                        }

                    });
                });

                $('#mainDivsionsAndSubDiv').append(strDivisionsAndSubDiv);
              //  window.location = "DivisionAndSubDivisions.aspx";
            }
        });
    }

    function RetriveDivsionSubDiv(idd) {
        //  debugger;
        var dataIdVal = $(idd).data("id");
        var str = "";
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "JSON",
            url: "/CMS/CodeBehind/SetRetriveData.asmx/RetrieveInfoOfDivisionOrSubDivisionsToDisplay",
            data: "{'DivisionalInfoID': '" + dataIdVal + "'}",
            success: function (data) {
                var xmlDocDetails = jQuery.parseXML(data.d);
                $(xmlDocDetails).find('NewDataSet').each(function () {
                    $(this).find('Table').each(function () {
                        $("#LblDivisions").addClass("DispNo");
                        $("#mainDv").addClass("DispNo");
                        $("#LblDivisionAndSubDivision").addClass("DispNo");
                        $("#mainDivsionsAndSubDiv").addClass("DispNo");
                        $("#LblDetailOfDivisionAndSubDivision").removeClass("DispNo");
                        $("#DetailOfDivsionsAndSubDiv").removeClass("DispNo");
                        str += "<div class=\"col-md-12 col-xs-12 PubInfoALngTxt sidebarVB  sidebar ContentStyle\" data-id=\"" + $.trim($(this).find('DivisionalInfoID').text()) + "\"><br>";
                        if (($(this).find('DivisionName').text() != "N/A") || ($(this).find('DivisionName').text() == "NULL")) {
                            var asa = $.trim($(this).find('DivisionName').text());
                            if (asa.length > 5) {
                                str += "<div class=\"col-xs-12 smNopadding form-group\">" +
                                    "<div class=\"col-xs-12 smNopadding col-md-4 LblAling\">Division </div>" +
                                    "<div class=\"col-xs-12 col-md-1  LblAling\">: </div>"+
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('DivisionName').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                        }
                        if (($(this).find('DivisionAdress').text() != "N/A") || ($(this).find('DivisionAdress').text() == "NULL")) {
                            var asa = $.trim($(this).find('DivisionAdress').text());
                            if (asa.length > 5) {
                                str += "<div class=\"col-xs-12 smNopadding form-group\">" +
                                    "<div class=\"col-xs-12 col-md-4 smNopadding LblAling\">Division Location </div>" +
                                    "<div class=\"col-xs-12 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('DivisionAdress').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                        }
                        if (($(this).find('SubDivisionName').text() != "N/A") || ($(this).find('SubDivisionName').text() == "NULL")) {
                            var asa = $.trim($(this).find('SubDivisionName').text());
                            if (asa.length > 5) {
                                str += "<div class=\"col-xs-12 smNopadding form-group\">" +
                                    "<div class=\"col-xs-12 smNopadding col-md-4 LblAling\">Sub Division </div>" +
                                    "<div class=\"col-xs-12 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('SubDivisionName').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                        }
                        if (($(this).find('SubDivisionAdress').text() != "N/A") || ($(this).find('SubDivisionAdress').text() == "NULL")) {
                            var asa = $.trim($(this).find('SubDivisionAdress').text());
                            if (asa.length > 5) {
                                str += "<div class=\"col-xs-12 smNopadding form-group\">" +
                                    "<div class=\"col-xs-10 smNopadding col-md-4 LblAling\">Sub Division Location </div>" +
                                    "<div class=\"col-xs-12 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('SubDivisionAdress').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                           
                        }
                        if (($(this).find('Xen').text() != "0") || ($(this).find('AEE').text() != "0") || ($(this).find('AE').text() != "0") || ($(this).find('JE').text() != "0") || ($(this).find('HD').text() != "0") || ($(this).find('DM').text() != "0")) {
                            str += "<div class=\" col-xs-12 OutDv\"><h2>Strength Of Technical Staff</h2></div>";
                            if ($(this).find('Xen').text() != "0") {
                                str += "<div class=\"col-md-4 col-xs-12 smNopadding form-group clrBdrMain\">" +
                                    "<div class=\"col-xs-8 col-md-5  LblAling\">Xen </div>" +
                                    "<div class=\"col-xs-1 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('Xen').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                            if ($(this).find('AEE').text() != "0") {
                                str += "<div class=\"col-md-4 col-xs-12 smNopadding form-group clrBdrMain\">" +
                                    "<div class=\"col-xs-8 col-md-5 LblAling\">AEE </div>" +
                                    "<div class=\"col-xs-1 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('AEE').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                            if ($(this).find('AE').text() != "0") {
                                str += "<div class=\"col-md-4 col-xs-12 smNopadding form-group clrBdrMain\">" +
                                    "<div class=\"col-xs-8 col-md-5 LblAling\">AE </div>" +
                                    "<div class=\"col-xs-1 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('AE').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                            if ($(this).find('JE').text() != "0") {
                                str += "<div class=\"col-md-4 col-xs-12 smNopadding form-group clrBdrMain\">" +
                                    "<div class=\"col-xs-8 col-md-5 LblAling\">JE </div>" +
                                    "<div class=\"col-xs-1 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('JE').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                            if ($(this).find('HD').text() != "0") {
                                str += "<div class=\"col-md-4 col-xs-12 smNopadding form-group clrBdrMain\">" +
                                    "<div class=\"col-xs-8 col-md-5 LblAling\">HD </div>" +
                                    "<div class=\"col-xs-1 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('HD').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                            if ($(this).find('DM').text() != "0") {
                                str += "<div class=\"col-md-4 col-xs-12 smNopadding form-group clrBdrMain\">" +
                                    "<div class=\"col-xs-8 col-md-5 LblAling\">DM </div>" +
                                    "<div class=\"col-xs-1 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('DM').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }

                        }
                        if (($(this).find('Sr_Asstt').text() != "0") || ($(this).find('Jr_Asstt').text() != "0") || ($(this).find('Peon').text() != "0") || ($(this).find('DTP').text() != "0")) {
                            str += "<div class=\" col-xs-12 OutDv\"><h2>Strength Of Ministrial Staff</h2></div>";
                            if ($(this).find('Sr_Asstt').text() != "0") {
                                str += "<div class=\"col-md-6 col-xs-12 smNopadding form-group clrBdrMain\">" +
                                    "<div class=\"col-xs-8 col-md-5 LblAling\">Sr_Asstt </div>" +
                                    "<div class=\"col-xs-1 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('Sr_Asstt').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                            if ($(this).find('Jr_Asstt').text() != "0") {
                                str += "<div class=\"col-md-6 col-xs-12 smNopadding form-group clrBdrMain\">" +
                                    "<div class=\"col-xs-8 col-md-5 LblAling\">Jr_Asstt </div>" +
                                    "<div class=\"col-xs-1 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('Jr_Asstt').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                            if ($(this).find('Peon').text() != "0") {
                                str += "<div class=\"col-md-6 col-xs-12 smNopadding form-group clrBdrMain\">" +
                                    "<div class=\"col-xs-8 col-md-5 LblAling\">Peon </div>" +
                                    "<div class=\"col-xs-1 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('Peon').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                            if ($(this).find('DTP').text() != "0") {
                                str += "<div class=\"col-md-6 col-xs-12 smNopadding form-group clrBdrMain\">" +
                                    "<div class=\"col-xs-8 col-md-5 LblAling\">DTP </div>" +
                                    "<div class=\"col-xs-1 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('DTP').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                        }
                        if (($(this).find('ALM').text() != "0") || ($(this).find('Helper').text() != "0") || ($(this).find('WS').text() != "0")) {
                            str += "<div class=\" col-xs-12 OutDv\"><h2>Strength Of Field Staff</h2></div>";
                            if ($(this).find('ALM').text() != "0") {
                                str += "<div class=\"col-md-4 col-xs-12 smNopadding form-group clrBdrMain\">" +
                                    "<div class=\"col-xs-8 col-md-5 LblAling\">ALM </div>" +
                                    "<div class=\"col-xs-1 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('ALM').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                            if ($(this).find('Helper').text() != "0") {
                                str += "<div class=\"col-md-4 col-xs-12 smNopadding form-group clrBdrMain\">" +
                                    "<div class=\"col-xs-8 col-md-5 LblAling\">Helper </div>" +
                                    "<div class=\"col-xs-1 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('Helper').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                            if ($(this).find('WS').text() != "0") {
                                str += "<div class=\"col-md-4 col-xs-12 smNopadding form-group clrBdrMain\">" +
                                    "<div class=\"col-xs-8 col-md-5 LblAling\">WS </div>" +
                                    "<div class=\"col-xs-1 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('WS').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                        }
                        if (($(this).find('OnGoingSchemes').text() != "0") || ($(this).find('ClosedSchemes').text() != "0")) {
                            str += "<div class=\" col-xs-12 OutDv\"><h2>Schemes</h2></div>";
                            if ($(this).find('OnGoingSchemes').text() != "0") {
                                str += "<div class=\"col-md-6 col-xs-12 smNopadding form-group clrBdrMain\">" +
                                    "<div class=\"col-xs-8 col-md-8 LblAling\">On Going Schemes </div>" +
                                    "<div class=\"col-xs-1 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('OnGoingSchemes').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                            if ($(this).find('ClosedSchemes').text() != "0") {
                                str += "<div class=\"col-md-6 col-xs-12 smNopadding form-group clrBdrMain\">" +
                                    "<div class=\"col-xs-8 col-md-8 LblAling\">Closed Schemes </div>" +
                                    "<div class=\"col-xs-1 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('ClosedSchemes').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                        }
                        if (($(this).find('Blocks').text() != "0") || ($(this).find('Villages').text() != "0") || ($(this).find('Hab').text() != "0")) {
                            str += "<div class=\"col-xs-12 OutDv\"><h2>Area Covered</h2></div>";
                            if ($(this).find('Blocks').text() != "0") {
                                str += "<div class=\"col-md-4 col-xs-12 smNopadding form-group clrBdrMain\">" +
                                    "<div class=\"col-xs-8 col-md-5 LblAling\">Blocks </div>" +
                                    "<div class=\"col-xs-1 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('Blocks').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                            if ($(this).find('Villages').text() != "0") {
                                str += "<div class=\"col-md-4 col-xs-12 smNopadding form-group clrBdrMain\">" +
                                    "<div class=\"col-xs-8 col-md-5 LblAling\">Villages </div>" +
                                    "<div class=\"col-xs-1 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('Villages').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                            if ($(this).find('Hab').text() != "0") {
                                str += "<div class=\"col-md-4 col-xs-12 smNopadding form-group clrBdrMain\">" +
                                    "<div class=\"col-xs-8 col-md-5 LblAling\">Hab </div>" +
                                    "<div class=\"col-xs-1 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('Hab').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                        }
                        if (($(this).find('Functional').text() != "0") || ($(this).find('NonFunctional').text() != "0")) {
                            str += "<div class=\"col-xs-12 OutDv\"><h2>Filtration Plants</h2></div>";

                            if ($(this).find('Functional').text() != "0") {
                                str += "<div class=\"col-md-6 col-xs-12 smNopadding form-group clrBdrMain\">" +
                                    "<div class=\"col-xs-8 col-md-8 LblAling\">Functional </div>" +
                                    "<div class=\"col-xs-1 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('Functional').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                            if ($(this).find('NonFunctional').text() != "0") {
                                str += "<div class=\"col-md-6 col-xs-12 smNopadding form-group clrBdrMain\">" +
                                    "<div class=\"col-xs-8 col-md-8 LblAling\">Non Functional </div>" +
                                    "<div class=\"col-xs-1 col-md-1 LblAling\">: </div>" +
                                    "<asp:TextBox ID=txt_AEE CssClass=\"form-control\">" + $.trim($(this).find('NonFunctional').text()) + "</asp: TextBox >" +
                                    "</div>";
                            }
                        }
                       
                        str += "</div>";
                    });
                });

                $('#DetailOfDivsionsAndSubDiv').append(str);
                 
            }
        });
    }