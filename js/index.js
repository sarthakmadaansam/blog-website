  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
   var firebaseConfig = {
    apiKey: "AIzaSyBqGRjTf5Fb4aocxopHmQGq8qxz7Mph67o",
    authDomain: "fir-webapp-827cb.firebaseapp.com",
    databaseURL: "https://fir-webapp-827cb-default-rtdb.firebaseio.com",
    projectId: "fir-webapp-827cb",
    storageBucket: "fir-webapp-827cb.appspot.com",
    messagingSenderId: "367315628111",
    appId: "1:367315628111:web:f98da6242ef2a641ea7a3a",
    measurementId: "G-WPYPTWW8R0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



  firebase.auth.Auth.Persistence.LOCAL;

  $("#btn-login").click(function()
  {
      var email = $("#email").val();
      var password = $("#password").val();

      if(email != "" && password != "")
      {
        var result = firebase.auth().signInWithEmailAndPassword(email, password);
        result.catch(function(error)
        {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message: " + errorMessage);
        });
      }
      else
      {
          window.alert("please fill out all the field");
      }

  });


  $("#btn-signup").click(function()
  {
      var email = $("#email").val();
      var password = $("#password").val();
      var cPassword = $("#confirmPassword").val();

      if(email != "" && password != "" && cPassword != "")
      {
        if(password == cPassword)
        {
          var result = firebase.auth().createUserWithEmailAndPassword(email, password);
        result.catch(function(error)
        {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message: " + errorMessage);
        });
        }
        else
        {
          window.alert("Password and confirm password do not match.");
        }
      }
      else
      {
          window.alert("please fill out all the field");
      }

  });


  $("#btn-resetPassword").click(function()
  {
     var auth = firebase.auth();
     var email = $("#email").val();

     if(email != "")
     {
       auth.sendPasswordResetEmail(email).then(function()
       {

        window.alert("Email Sent");

       }).catch(function(error)
       {

        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
        window.alert("Message: " + errorMessage);

       });
     }
     else
     {
       window.alert("Please write your email first.");
     }

  });


  $("#btn-logout").click(function()
  {
     firebase.auth().signOut();
  });

  $("#btn-update").click(function()
  {
     var phone = $("#phone").val();
     var address = $("#address").val();
     var bio = $("#bio").val();
     var fName = $("#firstName").val();
     var secondName = $("#secondName").val();
     var country = $("#country").val();
     var gender = $("#gender").val();

    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);

    if(phone != "" && address != "" && bio != "" && fName != "" && secondName != "" && country != "" && gender != "" )
    {
      var userData = 
      {
        "phone": phone,
        "address": address,
        "bio": bio,
        "firstName": fName,
        "secondName": secondName,
        "country": country,
        "gender": gender,
      };

      usersRef.set(userData, function(error)
      {
        if(error)
        {
          var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
        window.alert("Message: " + errorMessage);

        }
        else
        {
          window.location.href = "MainPage.html";
        }
      });

    }
    else
    {
      window.alert("Form is Incomplete fill all the details");
    }

  });

  function switchView(view)
  {
    $.get({
      url:view,
      cache:false,
    })
    .then(function(data)
    {
      $("#container").html(data);
    });
  }