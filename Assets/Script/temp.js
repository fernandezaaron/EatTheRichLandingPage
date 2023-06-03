let errorMessage = alertHtml("Connection Problem!","It seems that you are offline or the connection is slow")
let slowConnection = alertHtml("Ohh no!","It seems that your connection is slow, Please wait!")
let checkboxAlert = alertHtml("Check the terms of service checkbox", "Please check on the Terms of Service Box")

$(document).ready(function(){
    // let submitBtn = $("#submit-form");
    console.log("submitted");

    $("#submit-form-influencers").submit(function(e){
        e.preventDefault();
        $forms = $(this)
        let timeout = 10000;

        checkDeviceOnline(timeout)
        .done((value) => {
          let data = loadData($forms);
          postForm(data);
            
        })
        .fail((error) => {
          customAlert(errorMsg);
          setTimeout(function() {
          $("#submit-button").prop("disabled", false); 
          $(".buttonImageSubmit").attr("src", "/Assets/Images/ETR_web_button_submit.png");
          }, 2000);
        })
    });

    $("#submit-form-players").submit(function(e){
      e.preventDefault();
      $forms = $(this)
      let timeout = 10000;

      checkDeviceOnline(timeout)
      .done((value) => {
        let data = loadData($forms);
        postPlayersForm(data);
      })
      .fail((error) => {
        customAlert(errorMsg);
        setTimeout(function() {
        $("#submit-button").prop("disabled", false); 
        $(".buttonImageSubmit").attr("src", "/Assets/Images/ETR_web_button_submit.png");
        }, 2000);
       
      })
  });

    submitButton();
    // inputValidity("#email","Please enter a valid email")

   
});

function submitButton(){
  $("#submitBtn").click(function(e) {
    $("#submit-button").click();    
    if(isFilled()) {
      $("#submit-button").prop("disabled", true);
      $(".buttonImageSubmit").attr("src", "/Assets/Images/ETR_web_button_submit_pressed.png");
    }
    else{
      alert('Please fill out all required fields before submitting.');
      e.preventDefault();
    }
    
  });
}

function isFilled(){
  var formFilled = true;
  var requiredFields = $('form').find('[required]');

  requiredFields.each(function(){
    if($(this).val() === '' || ($(this).val().startsWith("@") && $(this).val().length===1)){
      formFilled = false;
      return false;
    }
  });

  var termsCheckbox = $('#checkbox-terms');
  if (!termsCheckbox.is(':checked')) {
    formFilled = false;
    customAlert(checkboxAlert);
  }

  return formFilled;
}

function postForm(data){
    $.ajax({
        type: "POST",
        url: "https://sendy.monstronauts.com/subscribe",
        contentType: "application/x-www-form-urlencoded",
        dataType: 'json',
        data:{
            api_key: "8bQQyZdQC8J7O2qad8lz",
            list: "x3HscDkCk3PGJCsdfKW3ZA",
            referrer: "https://eattherichgame.com/register/influencer",
            gdpr: "true",
            hp: "",
            boolean: "true",
            name: data.name,
            email: data.email,
            YouTube: data.youtube,
            Twitch: data.twitch,
            Twitter: data.twitter,
            TikTok: data.tiktok,
        },
        success: function(response){
          window.location.href = "../registeredPageInfluencers";
        },
        error: function(xhr, status, error){
          window.location.href = "../registeredPageInfluencers";
        }
    })

}
// https://sendy-staging.monstronauts.com/uploads/1685507649.png
function postPlayersForm(data){
  $.ajax({
    type: "POST",
    url: "https://sendy.monstronauts.com/subscribe",
    contentType: "application/x-www-form-urlencoded",
    dataType: 'json',
    data:{
        api_key: "8bQQyZdQC8J7O2qad8lz", 
        list: "vgWJKCnS8USYbyBti7YUcw",
        referrer: "https://eattherichgame.com/register/player",
        gdpr: "true",
        hp: "",
        boolean: "true",
        name: data.name,
        email: data.email,
    },
    success: function(response){
      window.location.href = "../registeredpage";
    },
    error: function(xhr, status, error){
      window.location.href = "../registeredpage";
    }
})
}
function loadData($forms){
  let serializedData  = $forms.serializeArray();
  let data = serializedData.reduce(function(obj, item) {
    obj[item.name] = item.value;
    return obj;
  }, {});
  return data
}

function checkNetworkStatus() {
    let deferred = $.Deferred();
    $.ajax({
      url: "", 
      type: "GET",
      timeout: 5000, 
      success: function () {
        deferred.resolve();
      },
      error: function(xhr, textStatus, errorThrown) {
        deferred.reject();
      }
    })
    return deferred.promise();
  }
  function periodicallyCheckNetwork() {
    setInterval(function() {
      if(IS_ONLINE)
        checkNetworkStatus();
        console.log(isOnline)
    }, 1000);
  }

  function checkDeviceOnline(timeout) {
    let deferred = $.Deferred();
  
    checkNetworkStatus()
      .done(() => {
        deferred.resolve();
      })
      .fail(() => {
        detachSubmitButtonEvent();
        customAlert(slowConnection,10000);
        setTimeout(() => {
      
          checkNetworkStatus()
            .done(() => {
              attachSubmitButtonEvent();
              deferred.resolve();
            })
            .fail(() =>{
              attachSubmitButtonEvent();
              deferred.reject("Check Internet Connection");
            })
          
        }, timeout);
      });
  
    return deferred.promise();
  }

function inputValidity(element,onMismatch,onEmpty=""){
    $(element).on("input", function() {
      
      if (this.validity.typeMismatch) {
        this.setCustomValidity(onMismatch);
      }
      else {
        this.setCustomValidity(onEmpty);
      } 
    });
  }






function alertHtml(title,message){
    return `
    <div class="alert-fixed alert alert-warning alert-dismissible fade show" role="alert">
      <strong>${title}</strong> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `
  }

  function customAlert(html,timeout=5000){
    $('body').append(html);
    setTimeout(function() {
      $('.alert').alert('close');
    }, timeout);
  }