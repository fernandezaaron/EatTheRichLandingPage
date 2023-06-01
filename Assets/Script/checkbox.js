function toggleInput(checkboxNum) {
    var input = document.getElementById("input"+checkboxNum);
    var checkbox = document.getElementById("checkbox"+checkboxNum);

    if(checkbox.checked){
        input.disabled = false;
        input.required = true;

        switch(checkboxNum){
            case 1:
                input.placeholder = "Enter Youtube Handle";
                input.value = "@";
                checkHandleInput(input);
                console.log(input.value.length);
                break;
            case 2:
                input.placeholder = "Enter Twitch Username";
                break;
            case 3:
                input.placeholder = "Enter Twitter Handle";
                input.value = "@";
                checkHandleInput(input);
                break;
            case 4:
                input.placeholder = "Enter TikTok Handle";
                input.value = "@";
                checkHandleInput(input);
                break;
        }
        // input.removeAttribute("disabled");
       
    }
    else{
        input.disabled = true;
        input.required = false;
        input.placeholder = "";
        input.value = "";
        // input.setAttribute("disabled", '');
    }

}

function checkHandleInput(input){
    if(!input.value.startsWith("@") || input.value.length===1){
        input.setCustomValidity("Empty");
        console.log("true");
      }else{
        input.setCustomValidity("");
        console.log("false");
      }
      $(input).on("input", function() {
        console.log(this.value.length);
  
        if(!this.value.startsWith("@") ||this.value.length===1){
          this.setCustomValidity("Empty");
          console.log("true");
        }else{
          this.setCustomValidity("");
          console.log("false");
        }
      });
}

