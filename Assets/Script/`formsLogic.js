let errorMessage = alertHtml("Connection Problem!","It seems that you are offline or the connection is slow")
let slowConnection = alertHtml("Ohh no!","It seems that your connection is slow, Please wait!")

$(document).ready(function(){
    let submitBtn = $("#submit");

    $(submitBtn).submit(function(e){
        e.preventDefault();
        $forms = $(this)
        let timeOut = 10000;

        checkDeviceOnline(timeout).done((value)=>{
            let data = loadData($forms);
            ajaxSendForm(data);
        })
        .fail((error)=>{
            customAlert(errorMsg);
        })

    });

    

});

function postForm(data){
    $.ajax({
        type: "POST",
        url: "https://",
        contentType: "",
        dataType: 'json',
        data:{
            api_key: "",
            referrer: "",
            name: data.name,
            email: data.email,
            youtube: data.youtube,
            twitch: data.twitch,
            twitter: data.twitter,
            tiktok: data.tiktok,
        }
    })
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