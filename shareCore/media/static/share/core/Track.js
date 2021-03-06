// __BEGIN_LICENSE__
// Copyright (C) 2008-2010 United States Government as represented by
// the Administrator of the National Aeronautics and Space Administration.
// All Rights Reserved.
// __END_LICENSE__

geocamShare.core.Track = new Class(
{
    Extends: geocamShare.core.ExtentFeature,

    getThumbnailUrl: function (width) {
        return geocamShare.core.settings.MEDIA_URL + "share/gpsTrack.png";
    },

    getSizePixels: function () {
        return [320, 240]; // size of gpsTrack.png bogus thumbnail
    },

    getLine: function () {
        result = ''
            + '    <LineString>\n'
            + '      <coordinates>\n';
        for (var i=0; i < this.length; i++) {
            var pt = track[i];
            result += '        ' + pt[0] + ',' + pt[1] + ',' + pt[2] + '\n'
        }
        result += ''
            + '      </coordinates>\n'
            + '    </LineString>\n';
        return result;
    },
    
    getKml: function () {
        var iconUrl = geocamShare.core.getHostUrl() + this.getIconMapUrl();
        result = ''
	    + '<Placemark id="' + this.uuid + '">\n'
	    + '  <Style>\n'
	    + '    <IconStyle>\n'
	    + '      <Icon>\n'
	    + '        <href>' + iconUrl + '</href>'
	    + '      </Icon>\n'
	    + '    </IconStyle>\n'
	    + '    <LineStyle>\n'
	    + '      <color>ff0000ff</color>\n'
	    + '      <width>4</width>\n'
	    + '    </LineStyle>\n'
	    + '  </Style>\n'
	    + '  <MultiGeometry>\n';
        var coords = this.geometry.geometry;
        for (var i=0; i < coords.length; i++) {
            result += this.getLine(coords[i]);
        }
        result += ''
            + '  </MultiGeometry>\n'
	    + '</Placemark>\n';
        
        return result;
    }
    
});

