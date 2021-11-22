var getUrlParameter = function getUrlParameter(sParam) {
            var sPageURL = window.location.search.substring(1),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                }
            }
        };
        const accessKey = "5353514789844343379";
        var jsMain = document.getElementById('atScript6626');
        var source = getUrlParameter('utm_source');
        var medium = getUrlParameter('utm_medium');
        var campaign = getUrlParameter('utm_campaign');
            if (source != undefined){ jsMain.setAttribute("data-utm-source", source) }
            if (medium != undefined){ jsMain.setAttribute("data-utm-medium", medium) }
            if (campaign != undefined){ jsMain.setAttribute("data-utm-campaign",campaign) }
        var updateTime = new Date();
        jsMain.setAttribute("data-utm-content", `clickTime:${updateTime.toLocaleTimeString()} ngày ${updateTime.toLocaleDateString()}`);
