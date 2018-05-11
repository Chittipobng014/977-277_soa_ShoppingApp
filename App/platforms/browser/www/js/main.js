ons.platform.select('ios');
var products;
ons.ready(function () {
  Service.getProducts().then(function (message, productDatas) { // Get  all Products
    Service.getReviews().then(function (message, reviewDatas) {// Get all review
      console.log(reviewDatas)
      var sum = [];
      var count = 0;
      var sumRating = 0;
      var index = 0;    
      var flag = true; 
      while(index < productDatas.length) {
        while (flag === true) {
          for(i=0;i<reviewDatas.length;i++) {
            if (parseInt(productDatas[index].productID) === parseInt(reviewDatas[i].productID)) { 
              sum.push(reviewDatas[i].rating);
              count++
            }else{

            }
          }          
          var rating = sum.reduce(getSum)/count; //To summary rating
          var sumRating = rating.toFixed(1); // To fix the decimal
          flag = false; // To unlock the state
        }
        //Initial each product
        products = {
          productID: productDatas[index].productID,
          title: productDatas[index].title,
          picture: productDatas[index].picture,
          description: productDatas[index].description,
          price: productDatas[index].price,
          rating : sumRating
        }
        if (products.productID % 2) { // To Seperate column of product template
          var template = $('#productsTemplate').html();
          var rendered = Mustache.render(template, products);
          $('#resultsCol1').append(rendered); // To render the template to target
        } else {
          var template = $('#productsTemplate').html();
          var rendered = Mustache.render(template, products);
          $('#resultsCol2').append(rendered); // To render the template to target
        }
        index++;
        flag = true;
        count = 0;
        sumRating = 0;
        sum = [];
      }
    })
  });
})