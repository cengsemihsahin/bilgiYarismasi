$(document).ready(function () {
    var cevaplar = new Array("b", "c", "d", "a", "a", "d", "c", "b", "b", "a", "c", "d", "b", "a", "d");
    var simdikiSorununuPuani = new Array(100, 500, 600, 450, 800, 5500, 550, 1000, 950, 300, 1150, 750, 350, 930, 1070);
    var gelenDeger = "bos";
    var yarismaBasladi = false;
    var zamanlayiciCalismaDurumu = false;
    var zamanlayiciCalismaDurumu2 = false;
    var x;
    var soruSirasi = 0;
    var tetikleninceGelen = "bos";
    var sure = 60000;
    var gecisTetik;
    var gecisHakki = false;
    var eskiCerceveSrc = -1;
    var temizlendi = false;
    var secenegeBasildi = false;
    var bilinenSoruAdedi = 0;
    var toplamPuan = 0;
    var yarismaBitti = false;
    var cevap;
    var ciftCevapKullaniliyor = false;
    var hak = false;
    //  --------------------------------------------------------------------------------------------------
    //  JOKERLERE BASILDI
    $("#yari_yariya_joker").click(function () { // YARI YARIYA BASILDI
        cevap = cevaplar[soruSirasi - 1];
        if (yarismaBasladi) {
            if (cevap == "a") {
                $("#b_secenegi").hide();
                $("#d_secenegi").hide();
            }
            else if (cevap == "b") {
                $("#c_secenegi").hide();
                $("#a_secenegi").hide();
            }
            else if (cevap == "c") {
                $("#b_secenegi").hide();
                $("#d_secenegi").hide();
            }
            else {
                $("#b_secenegi").hide();
                $("#a_secenegi").hide();
            }
            $("#yari_yariya_joker").hide();
        }
    });
    $("#cift_cevap_joker").click(function () { // CIFT CEVAP JOKER
        cevap = cevaplar[soruSirasi - 1];
        if (yarismaBasladi) {
            ciftCevapKullaniliyor = true;
            $("#cift_cevap_joker").hide();
        }
    });
    //  --------------------------------------------------------------------------------------------------
    //  SECENEKLERE BASILDI
    seceneklereBasildi("a");
    seceneklereBasildi("b");
    seceneklereBasildi("c");
    seceneklereBasildi("d");
    function seceneklereBasildi(secim) {
        $("#" + secim + "_secenegi").click(function () {
            if (cevaplar[soruSirasi - 1] == secim && !secenegeBasildi && $("#cerceve_id").attr("src") != "pages\\soru_gecisi.html") {
                $(this).html("DOGRU");
                //$(this).addClass(".dogru_renk");
                $(this).css({"background-color":"green"});
                bilinenSoruAdedi++;
                toplamPuan += simdikiSorununuPuani[soruSirasi - 1];
                secenegeBasildi = true;
            }
            else if (!secenegeBasildi && $("#cerceve_id").attr("src") != "pages\\soru_gecisi.html" && yarismaBasladi) {
                if (!ciftCevapKullaniliyor || (ciftCevapKullaniliyor && hak)) {
                    $(this).html("YANLIS");
                    //$(this).addClass(".yanlis_renk");
                    $(this).css({"background-color":"red"});
                    $("#" + cevaplar[soruSirasi - 1] + "_secenegi").html("DOGRU");
                    $("#" + cevaplar[soruSirasi - 1] + "_secenegi").css({"background-color":"green"});
                }
                else {
                    $(this).html("YANLIS");
                    $(this).css({"background-color":"red"});
                }
            }
            if (!ciftCevapKullaniliyor || (ciftCevapKullaniliyor && cevaplar[soruSirasi - 1] == secim) || (ciftCevapKullaniliyor && hak)) secenegeBasildi = true;
            else {
                secenegeBasildi = false;
                hak = true;
            }
        });
    }
    //  --------------------------------------------------------------------------------------------------
    //  SECENEKLERI TEMIZLE
    let hepCalistir8 = setTimeout(function tiki() {
        hepCalistir8 = setTimeout(tiki, 100);
        if (gecisHakki && $("#cerceve_id").attr("src") != "pages\\soruu" + eskiCerceveSrc + ".html" && !temizlendi) {
            secenegeBasildi = false;
            secenekleriTemizle("a");
            secenekleriTemizle("b");
            secenekleriTemizle("c");
            secenekleriTemizle("d");
            temizlendi = true;
        }
    }, 100);
    function secenekleriTemizle(temizlenecekSecenek) {
        $("#" + temizlenecekSecenek + "_secenegi").html(temizlenecekSecenek.toUpperCase());
        $("#" + temizlenecekSecenek + "_secenegi").css({"background-color":"khaki"});
    }
    //  --------------------------------------------------------------------------------------------------
    //  YARISMAYA BASLAYABILMEK ICIN
    $(".butonlar2").hide();
    $("#baslama_butonu").hide();
    $("#kronometreyiKapat").hide();
    let hepCalistir = setTimeout(function tik() {
        gelenDeger = localStorage.getItem("deger");
        if (gelenDeger == "true") {
            $(".butonlar2").show(3000);
            $("#baslama_butonu").show(3000);
            $("#kronometreyiKapat").show(3000);
            zamanlayiciCalismaDurumu = true;
        }
        else    hepCalistir = setTimeout(tik, 100);
    }, 100);
    if (zamanlayiciCalismaDurumu)  clearTimeout(hepCalistir);
    //  --------------------------------------------------------------------------------------------------
    //  BASLAMA BUTONUNA BASILDI
    $("#baslama_butonu").click(function () {    // ilk soru ve kronometre
        // BUTONUN GORUNUMUNU DEGISTIR
        if ($(this).attr("id") == "baslama_butonu") {
            soruSirasi = 0;
            soruSirasi++;
            soruGecisiniCalistir();
            yarismaBasladi = true;
            zamanlayiciyiCalistir();
            $(this).attr("id", "bitirme_butonu");
            $(this).html("YARISMAYI BITIR");
        }
        else if ($(this).attr("id") == "bitirme_butonu") {  // yarismayi bitir
            yarismayiBitir();
        }
        else {
            soruSirasi = 0;
            soruSirasi++;
            soruGecisiniCalistir();
            yarismaBasladi = true;
            zamanlayiciyiCalistir();
        }
    });
    //  KRONOMETRE ICIN
    $("#kronometreyiKapat").click(function () {
        clearInterval(zamanlayiciDurumu);
        $(this).hide(1000);
    });
    function zamanlayiciyiCalistir() {
        var suan = new Date();
        zamanlayiciDurumu = setInterval(() => zamaniGoster(suan), 1000);
    }
    function zamaniGoster(onceki) {
        var simdi = new Date();
        x = document.getElementsByClassName("kronometre");
        if (Math.floor((simdi - onceki) / 1000) >= 60) {
            x[0].innerHTML = "<b class=\"kronometre\">Kronometre: </b>"
                + Math.floor((simdi - onceki) / 1000 / 60)
                + " dakika "
                + Math.floor((simdi - onceki) / 1000 % 60)
                + " saniye</i>";
        }
        else {
            x[0].innerHTML = "<b class=\"kronometre\">Kronometre: </b>"
                + Math.floor((simdi - onceki) / 1000)
                + " saniye</i>";
        }
        gecenSure = x[0].innerHTML;
    }
    //  --------------------------------------------------------------------------------------------------
    //  YARISMAYI BITIR
    function yarismayiBitir() {
        secenegeBasildi = false;
        secenekleriTemizle("a");
        secenekleriTemizle("b");
        secenekleriTemizle("c");
        secenekleriTemizle("d");
        temizlendi = true;
        yarismaBitti = true;
        clearInterval(zamanlayiciDurumu);
        alert("YARISMAYI BITIRDINIZ!\nTOPLAM PUANINIZ: " + toplamPuan
            + "\nSORU BILME ORANI: " + bilinenSoruAdedi + "/15");
        window.location.reload();
    }
    //  --------------------------------------------------------------------------------------------------
    //  YARISMA BASLAYINCA SORU NUMARASINI GONDER
    if (yarismaBasladi) localStorage.setItem("soruNumarasi", soruSirasi);
    //  --------------------------------------------------------------------------------------------------
    //  SORU GECIS YONLENDIRME
    function soruGecisiniCalistir() {
        //alert(soruSirasi);
        //yarismaBasladi = !yarismaBasladi;
        localStorage.setItem("soruNumarasi", soruSirasi);
        if (soruSirasi < 15)   $("#cerceve_id").attr("src", "pages\\soru_gecisi.html");
    }
    //  --------------------------------------------------------------------------------------------------
    //  YENI SORU SURESINI BASLAT
    let hepCalistir3 = setTimeout(function tiki() {
        hepCalistir3 = setTimeout(tiki, 100);
        //alert($("#cerceve_id").attr("src"));
        if (yarismaBasladi /*&& ($("#cerceve_id").attr("src").length == 16 ||
            $("#cerceve_id").attr("src").length == 17)*/) {
            setTimeout(kalanZamaniCalistir, 4000);
            clearTimeout(hepCalistir3);
        }
    }, 100);
    function kalanZamaniCalistir() {
        //alert("kalan zaman calisti");
        let hepCalistir2 = setTimeout(function tikk() {
            //  soru puan degeri, top. puan, bilinen adet
            $("#bilinen_soru_adedi").html("<i id=\"bilinen_soru_adedi\">Bilinen soru adedi:<br><br>" + bilinenSoruAdedi + "/15</i>");
            $("#toplam_puan_durumu").html("<i id=\"toplam_puan_durumu\">Toplam puan:<br><br><br>" + toplamPuan + "</i>");
            $("#simdiki_sorunun_puani").html("<i id=\"simdiki_sorunun_puani\">Simdiki sorunun puani:<br><br>" + simdikiSorununuPuani[soruSirasi - 1] + "</i>");

            if (sure >= 0 && gecisHakki) {
                $("#soru_kalan_zaman").html("<i id=\"soru_kalan_zaman\">SORU ICIN KALAN SURE:<br>" +
                    Math.floor(sure / 1000) + " saniye</i>");
                sure -= 1000;
                //  sure bittiginde dogruyu goster ve kirmizi yaziyla sure bitti yaz
                if (sure == -1000) {
                    $("#soru_kalan_zaman").html("<i id=\"soru_kalan_zaman\">SORUYU YANITLAYAMADAN <i style=\"color: red;\">SURENIZ BITTI!</i>");
                    if (cevaplar[soruSirasi - 1] == "a") {
                        $("#a_secenegi").html("DOGRU");
                        $("#a_secenegi").css({"background-color":"green"});
                        $("#b_secenegi").html("YANLIS");
                        $("#b_secenegi").css({"background-color":"red"});
                        $("#c_secenegi").html("YANLIS");
                        $("#c_secenegi").css({"background-color":"red"});
                        $("#d_secenegi").html("YANLIS");
                        $("#d_secenegi").css({"background-color":"red"});
                    }
                    else if (cevaplar[soruSirasi - 1] == "b") {
                        $("#b_secenegi").html("DOGRU");
                        $("#b_secenegi").css({"background-color":"green"});
                        $("#a_secenegi").html("YANLIS");
                        $("#a_secenegi").css({"background-color":"red"});
                        $("#c_secenegi").html("YANLIS");
                        $("#c_secenegi").css({"background-color":"red"});
                        $("#d_secenegi").html("YANLIS");
                        $("#d_secenegi").css({"background-color":"red"});
                    }
                    else if (cevaplar[soruSirasi - 1] == "c") {
                        $("#c_secenegi").html("DOGRU");
                        $("#c_secenegi").css({"background-color":"green"});
                        $("#b_secenegi").html("YANLIS");
                        $("#b_secenegi").css({"background-color":"red"});
                        $("#a_secenegi").html("YANLIS");
                        $("#a_secenegi").css({"background-color":"red"});
                        $("#d_secenegi").html("YANLIS");
                        $("#d_secenegi").css({"background-color":"red"});
                    }
                    else {
                        $("#d_secenegi").html("DOGRU");
                        $("#d_secenegi").css({"background-color":"green"});
                        $("#b_secenegi").html("YANLIS");
                        $("#b_secenegi").css({"background-color":"red"});
                        $("#c_secenegi").html("YANLIS");
                        $("#c_secenegi").css({"background-color":"red"});
                        $("#a_secenegi").html("YANLIS");
                        $("#a_secenegi").css({"background-color":"red"});
                    }
                }
                if (secenegeBasildi) sure = -1;
            }
            else if (sure >= 0 && !gecisHakki && $("#cerceve_id").attr("src") != "pages\\soruu1.html") {
                if (soruSirasi == 15) {
                    $("#soru_kalan_zaman").html("<i id=\"soru_kalan_zaman\" style='color: red;'>Yarisma bitti, bilgileriniz getiriliyor..:<br>" +
                        Math.floor(sure / 15000) + " saniye</i>");
                }
                else {
                    $("#soru_kalan_zaman").html("<i id=\"soru_kalan_zaman\">SORU ICIN KALAN SURE:<br>" +
                        Math.floor(sure / 15000) + " saniye</i>");
                }
                sure -= 15000;
            }
            else {
                clearTimeout(hepCalistir2);
                //  SURE BITTI DOGRUYU GOSTER YENI SORUYA GEC
                //if (soruGecisiniCalistir())
                //$("#cerceve_id").attr("src", "pages\\soruu" + ++soruSirasi + ".html");
                if (!gecisHakki) {
                    eskiCerceveSrc = soruSirasi;
                    $("#cerceve_id").attr("src", "pages\\soruu" + ++soruSirasi + ".html");
                    temizlendi = false;
                }
                else if (gecisHakki && soruSirasi < 15) {
                    $("#cerceve_id").attr("src", "pages\\soru_gecisi.html");
                }
                if (soruSirasi >= 16) {

                    yarismayiBitir();
                }
                else    gecisHakki = !gecisHakki;
                sure = 60000;
                $("#a_secenegi").show();
                $("#b_secenegi").show();
                $("#c_secenegi").show();
                $("#d_secenegi").show();
                //alert(gecisHakki);
            }
            hepCalistir2 = setTimeout(tikk, 1000);
        }, 1000);
    }
    //  --------------------------------------------------------------------------------------------------
    //  CERCEVE SRC DEGISTIRME
    let hepCalistir5 = setTimeout(function tik() {  // sadece bir kez
        tetikleninceGelen = localStorage.getItem("cerSrcDegistir");
        gecisTetik = localStorage.getItem("gecisKapamaSuresi");
        //alert(gecisTetik);
        if (Number.isInteger(Number(tetikleninceGelen)) && sure != 60000 && Number(gecisTetik) == -1000) {
            if (!gecisHakki) {
                //alert(tetikleninceGelen);
                $("#cerceve_id").attr("src", "pages\\soruu" + Number(tetikleninceGelen) + ".html");
            }
            else {
                soruGecisiniCalistir();
            }
            gecisHakki = !gecisHakki;
            zamanlayiciCalismaDurumu2 = true;
        }
        else    hepCalistir5 = setTimeout(tik, 100);
    }, 100);
    if (zamanlayiciCalismaDurumu2)  clearTimeout(hepCalistir5);
});