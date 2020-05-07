$(document).ready(function () {
    //
    //  GELEN SORU SIRASI
    var gelenSoruNumarasi = localStorage.getItem("soruNumarasi");
    var suree = 4000;
    let hepCalistir = setTimeout(function tik() {
        if (suree >= 0) {
            $("#sayac").html("<p id=\"sayac\">Soru " + Math.floor(suree / 1000) + " sn sonra geliyor...</p>");
            suree -= 1000;
        }
        else {  // sure bitti
            //alert(suree);
            clearTimeout(hepCalistir);
            yeniSoruyaYonlendir(gelenSoruNumarasi);
        }
        hepCalistir = setTimeout(tik, 1000);
    }, 1000);
    function yeniSoruyaYonlendir(num) {
        //$(location).attr("href", "soruu" + Number(num) + ".html");
        localStorage.setItem("tetik", num);
        setTimeout(function () {
            localStorage.setItem("gecisKapamaSuresi", suree);
        }, 5000);

        //localStorage.setItem("cerSrcDegistir", Number(num));
    }
});