var commissionRate30 = {
    20: 10,
    21: 10,
    22: 10,
    23: 9,
    24: 9,
    25: 9,
    26: 8,
    27: 8,
    28: 8,
    29: 7,
    30: 7,
    31: 7,
    32: 7,
    33: 6,
    34: 6,
    35: 5,
    36: 5,
    37: 4,
    38: 3,
    39: 3,
};

var commissionRate40 = {
    10: 10,
    11: 10,
    12: 10,
    13: 9,
    14: 9,
    15: 9,
    16: 8,
    17: 8,
    18: 8,
    19: 7,
    20: 7,
    21: 7,
    22: 7,
    23: 6,
    24: 6,
    25: 5,
    26: 5,
    27: 4,
    28: 3,
    29: 3,
}

window.onload = function() {
    var form = document.getElementById("form");
    var totalDisplay = document.getElementById("total");
    var discountDisplay = document.getElementById("discountTotal");
    var commissionPercentDisplay = document.getElementById("percentCommission");
    var commissionDisplay = document.getElementById("moneyCommission");
    var sundayCheck = document.getElementById("sunday");
    var managerCheck = document.getElementById("manager");

    function calculate() {
        var total = 0;
        var temp;
        for(var i = 1; i <= 8; i++) {
            temp = document.getElementById("room" + i).value;
            if(temp == '') {
                temp = 0;
            }
            total += parseFloat(temp);
        }
        temp = document.getElementById("soldPrice").value;
        if(temp == '') {
            temp = 0;
        }
        var soldPrice = parseFloat(temp);
        temp = document.querySelector('input[name="discount"]:checked').value;
        if(temp == '') {
            temp = 0;
        }
        var discount = parseFloat(temp);
        totalDisplay.innerHTML = total;
        var percentOffPrice = (1-(discount/100)) * total;
        discountDisplay.innerHTML = Math.round(percentOffPrice*100)/100;
        var discountAfter = Math.round((1 - soldPrice/percentOffPrice)*100);

        var commissionPercent;
        if(sundayCheck.checked) {
            commissionPercent = 12;
        }
        else if(discount === 30) {
            if(discountAfter > 39) {
                commissionPercent = 3;
            }
            else if(discountAfter < 20) {
                commissionPercent = 10;
            }
            else {
                commissionPercent = commissionRate30[discountAfter];
            }
        }
        else if(discount === 40) {
            if(discountAfter > 29) {
                commissionPercent = 3;
            }
            else if(discountAfter < 10) {
                if(managerCheck.checked) {
                    commissionPercent = 12;
                }
                else {
                    commissionPercent = 10;
                }
            }
            else {
                commissionPercent = commissionRate40[discountAfter];
                if(managerCheck.checked && commissionPercent == 10) {
                    commissionPercent = 11;
                }
            }
        }
        commissionPercentDisplay.innerHTML = commissionPercent;
        commissionDisplay.innerHTML = Math.round(soldPrice*commissionPercent)/100;
    }

    if(form.addEventListener){
        form.addEventListener("submit", calculate, false);  //Modern browsers
    }else if(form.attachEvent){
        form.attachEvent('onsubmit', calculate);            //Old IE
    }

    document.querySelector("form").addEventListener("submit", function(e){
        e.preventDefault();    //stop form from submitting
    });

    var clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", function() {
        for(var i = 1; i <= 8; i++) {
            document.getElementById("room" + i).value = '';
        }
        document.getElementById("soldPrice").value = '';
        totalDisplay.innerHTML = '';
        discountDisplay.innerHTML = '';
        commissionPercentDisplay.innerHTML = '';
        commissionDisplay.innerHTML = '';
        document.getElementById("percent30").checked = true;
        sundayCheck.checked = false;
        managerCheck.checked = false;
    }, false)
}


