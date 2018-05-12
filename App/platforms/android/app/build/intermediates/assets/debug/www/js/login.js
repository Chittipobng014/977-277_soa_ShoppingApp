ons.ready(function () {
    var config = {
        apiKey: "AIzaSyCtTrU-eOn5EthGjKcDuoE0OSYDiRU0dmo",
        authDomain: "soa-shoppingapp.firebaseapp.com",
        projectId: "soa-shoppingapp",
    };
    firebase.initializeApp(config);
    var provider = new firebase.auth.FacebookAuthProvider();

    $("#signin").click(function () {
        firebase.auth().signInWithRedirect(provider).then(function(){
            return firebase.auth().getRedirectResult();
        }).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
            console.log(user.email);
            Service.getCustomers().then(function (message, customers) {
                var exist = false;
                console.log(message)
                customers.forEach(customer => {
                    if (user.email === customer.email) {
                        exist = true;
                    }                    
                });
                if (exist === true) {
                    ons.notification.toast('Welcome, ' + user.displayName, { timeout: 2000 }).then(function (name) {
                        window.location.replace('home.html?userid=' + user.email);
                    });
                } else {
                    ons.notification.toast('Welcome new user, ' + user.email, { timeout: 3000 }).then(function (name) {
                        var dataform = {
                            "address": "blank",
                            "email": user.email,
                            "lastname": user.displayName.split(' ')[1],
                            "name": user.displayName.split(' ')[0],
                            "password": "facebook",
                            "telno": "blank"
                        }
                        Service.addCustomer(dataform).then(function (message) {
                            console.log(message)
                            window.location.replace('home.html?userid=' + user.email);
                        })
                    });
                }
            })
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    })
})