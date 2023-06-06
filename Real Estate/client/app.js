function onPageLoad() {
    var url = "http://127.0.0.1:5000/get_location_names";
    
    $.get(url, function(data, status) {
        
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");

            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }

    });
    
}

function getBathValue() {
    var uiBathrooms = document.getElementsByName("uibath")
    for(var i in uiBathrooms) {
        if(uiBathrooms[i].checked) {
            return parseInt(i)+1;
        }
    }
    return -1;
}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK")
    for( var i in uiBHK ) {
        if (uiBHK[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1

}

function onClickedEstimatePrice(){
    var sqft = document.getElementById("uiSqft")
    var bhk = getBHKValue();
    var Bathrooms = getBathValue;
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url = "http://127.0.0.1:5000/predict_home_price";
    
    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: Bathrooms,
        location: location.value
    }, function( data, status ) {
        
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Dollars</h2>";

    });
}


window.onload = onPageLoad;