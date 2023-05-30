function toggleInput(checkboxNum) {
    var input = document.getElementById("input"+checkboxNum);
    var checkbox = document.getElementById("checkbox"+checkboxNum);

    if(checkbox.checked){
        input.disabled = false;
        switch(checkboxNum){
            case 1:
                input.placeholder = "Enter Youtube Channel";
                break;
            case 2:
                input.placeholder = "Enter Twitch Handle";
                break;
            case 3:
                input.placeholder = "Enter Twitter Handle";
                break;
            case 4:
                input.placeholder = "Enter TikTok Handle";
                break;
        }
        // input.removeAttribute("disabled");
    }
    else{
        input.disabled = true;
        input.placeholder = "";
        // input.setAttribute("disabled", '');
    }

}
