$(function() {
    $("ul.nav li").on("click", function(event){
        $("ul.nav li.active").removeClass('active');
        $(this).addClass("active");
    });
});




