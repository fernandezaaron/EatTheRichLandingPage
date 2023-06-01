$(document).ready(function(){
    $("#back-button-player").click(function(e){
        e.preventDefault();
        window.location.href = "../../register/player.html";
        console.log("click");
    });
});

$(document).ready(function(){
    $("#back-button-influencer").click(function(e){
        e.preventDefault();
        window.location.href = "../../register/influencer.html";
        console.log("click");
    });
});
