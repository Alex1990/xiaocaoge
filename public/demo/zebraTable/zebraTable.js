function zebraTable(){
    var tbody = document.getElementById("tbody");
    var rows = tbody.getElementsByTagName("tr");
    for (var i=0; i<rows.length; i++) {
        if(i%2 == 0) {
            rows[i].style.backgroundColor = "#eee";
        } 
    }
}

window.onload = zebraTable;