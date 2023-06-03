$(document).ready(function(){
    $("#back-button-player").click(function(e){
        e.preventDefault();
        $('#bb-active').addClass("submit-pressed");
        $('#bb-pressed').removeClass("submit-active");
        // $(".buttonImageSubmit").attr("src", "Assets/Images/ETR_web_button_submit_pressed.png");

        window.location.href = "register/player";
    });
});

$(document).ready(function(){
    $("#back-button-influencer").click(function(e){
        e.preventDefault();
        $('#bb-active').addClass("submit-pressed");
        $('#bb-pressed').removeClass("submit-active");
        // $(".buttonImageSubmit").attr("src", "Assets/Images/ETR_web_button_submit_pressed.png");

        window.location.href = "register/influencer";
    });
});
