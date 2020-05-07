$(document).ready(function () {
    localStorage.setItem("deger", false);
    $("#bilgi_okuma_durumu").click(function () {
        $(this).hide(7000);
        $(this).prop("checked", true);  // isaretli kalmasi icin
        $("#bilgi_durumu").hide(7000);
        localStorage.setItem("deger", true);
    });
});