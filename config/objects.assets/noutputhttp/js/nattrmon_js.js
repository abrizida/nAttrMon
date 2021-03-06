var nattrmonCtgs = [];
var nattrmonAttrsOrig = {};
var nattrmonAttrs = [];
var nattrmonWarns = [];

function refresh(data) {
    var attrs      = data.attributes;
    var values     = data.values;
    var lastvalues = data.lastvalues;
    var warns      = data.warnings;

    nattrmonAttrsOrig = attrs;
    var tempattrs = [];

    var tempctgs = {};
    var tempattr = {};

    for(i in attrs) {
        if (values[i] != undefined) {
            attrs[i].val = values[i].val;
            attrs[i].moddate = values[i].date;
            attrs[i].lastval = lastvalues[i].val;
            attrs[i].lastmoddate = lastvalues[i].date;
        }
        if (tempctgs[attrs[i].category.join("/")] == undefined) {
            tempctgs[attrs[i].category.join("/")] = [ attrs[i] ];
        } else {
            tempctgs[attrs[i].category.join("/")].push(attrs[i]);
        }
        tempattrs.push(attrs[i]);
    }

    var ctgs = [];
    for(i in tempctgs) {
        ctgs.push({"name": i,
                   "attrs": tempctgs[i]
                  });
    }

    var tempwarns = {};
    for(i in warns) {
        tempwarns[i] = warns[i];
    }

    nattrmonCtgs = ctgs;
    nattrmonAttrs = tempattrs;
    nattrmonWarns = tempwarns;
}

function render(sce, aValue, aType) {
    // If undefined
    if (typeof aValue === 'undefined') {
        aValue = "not available";
        aType = "undefined";
    }

    // If object
    if (typeof aValue == 'object') {
        if (aValue instanceof Array && aValue.length > 0) {
            var out = "<table class=\"nattributetable\"><tr>";
            for(var i in aValue[0]) {
                out += "<th class=\"nattributetablehead\"><b>" + i + "</b></th>";
            }
            out += "</tr>";
            for(var x in aValue) {
                out += "<tr>";
                for(var y in aValue[x]) {
                	out += "<td class=\"nattributetablecell\">" + aValue[x][y] + "</td>";
                }
                out += "</tr>";
            }
            out += "</table>";
            aValue = out;
        } else {
            var out = "<table class=\"nattributetable\">";
            for(var i in aValue) {
                out += "<tr><td class=\"nattributetablecell\"><b>" + i + "</b></td><td class=\"nattributetablecell\">" + aValue[i] + "</td></tr>";
            }
            out += "</table>";
            aValue = out;
        }
    }

    switch(aType) {
        case "sem": return sce.trustAsHtml("<span style=\"background-color:"+ aValue +"\">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class=\"nattributevalue\"> - " + aValue + "</span>");
        case "desc": return sce.trustAsHtml("<span class=\"nattributedesc\">" + aValue + "</span>");
        case "date": return sce.trustAsHtml((new Date(aValue)).toLocaleString() + "");
        case "undefined": return sce.trustAsHtml("<span class=\"nattributevalueNA\">" + aValue + "</span>")
        default:
            return sce.trustAsHtml("<span class=\"nattributevalue\">" + aValue + "</span>");
    }
}