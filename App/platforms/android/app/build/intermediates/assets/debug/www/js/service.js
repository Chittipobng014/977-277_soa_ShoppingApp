function getSum(total, num) {
    return total + num;
}
var Service = {
    getProducts : function(){
        var deferred = new $.Deferred();
        $.ajax({
            url: "https://productapi977377.herokuapp.com/Products.php/api/products",
            cache: false,
            type: "GET",
            success: function(data){
             if (data) {
                var json = JSON.parse(data)              
                deferred.resolve("Done", json)
             }else{
                deferred.resolve("Error")
             }
            }
        });
        return deferred.promise();
    },
    getReviews : function(){
        var deferred = new $.Deferred();
        $.ajax({
            url: "https://pacific-peak-27279.herokuapp.com/api/ProductReview",
            cache: false,
            type: "GET",
            success: function(data){
                if (data) {  
                    deferred.resolve("Done", data)
                 }else{
                    deferred.resolve("Error")
                 }
            }
        });
        return deferred.promise();
    },
    getCustomers : function(){
        var deferred = new $.Deferred();
        $.ajax({
            url: "https://customer-api-shopping.herokuapp.com/api/customers/",
            cache: false,
            type: "GET",
            success: function(data){
             if (data) {
                 deferred.resolve("Done", data)
             }else{
                 deferred.resolve("Error")
             }
            }
        });
        return deferred.promise();
    },
    getLogistic : function(){
        var deferred = new $.Deferred();
        $.ajax({
            url: "http://servicelogistics20180505020236.azurewebsites.net/api/Logistics",
            cache: false,
            type: "GET",
            success: function(data){
             if (data) {
                 deferred.resolve("Done", data)
             }else{
                 deferred.resolve("Error")
             }
            }
        });
        return deferred.promise();
    },
    getProductsById : function(id){
        var deferred = new $.Deferred();
        $.ajax({
            url: "https://productapi977377.herokuapp.com/Products.php/api/products",
            cache: false,
            type: "GET",
            success: function(data){
             if (data) {
                 var json = JSON.parse(data)
                 deferred.resolve("Done", json[id-1])
             }else{
                 deferred.resolve("Error")
             }
            }
        });
        return deferred.promise();
    },
    addCustomer : function(data){
        var deferred = new $.Deferred();
        $.ajax({
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            url : "https://customer-api-shopping.herokuapp.com/api/customers/",
            type : "POST",
            data : JSON.stringify(data),
            dataType : "json",
            success: function(data) {
                if (data) {
                    deferred.resolve("Done")
                }else{
                    deferred.resolve("Fail")
                }
            }
        })
        return deferred.promise();
    }
}