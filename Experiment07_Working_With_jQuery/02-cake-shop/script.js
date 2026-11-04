// Experiment 07 - Program 2: Cake Shop Order Calculator using jQuery.

$(document).ready(function () {

  // Run the purchase calculation when the Place Order button is clicked.
  $("#placeOrder").click(function () {

    // Get each cake quantity from the corresponding input field.
    let colorQty = Number($("#colorQty").val());
    let brownQty = Number($("#brownQty").val());
    let milkyQty = Number($("#milkyQty").val());
    let blackForestQty = Number($("#blackForestQty").val());

    // Clear any error message from the previous order.
    $("#message").text("");

    // Store quantities in an array to validate them together.
    let quantities = [colorQty, brownQty, milkyQty, blackForestQty];

    // Quantity must be a whole number and cannot be negative.
    let invalidQuantity = quantities.some(function (quantity) {
      return !Number.isInteger(quantity) || quantity < 0;
    });

    if (invalidQuantity) {
      $("#message").text("Please enter whole-number quantities that are zero or more.");
      $("#totalPrice").text("Rs.0");
      $("#billDetails").text("Please correct the quantities and place the order again.");
      return;
    }

    // Cake prices copied from the Experiment 07 cake-shop reference:
    // Color Cake = Rs.300, Brown Cake = Rs.200,
    // Milky Cake = Rs.250, Black Forest Cake = Rs.500.
    let colorPrice = 300;
    let brownPrice = 200;
    let milkyPrice = 250;
    let blackForestPrice = 500;

    // Calculate the line total for each selected cake.
    let colorTotal = colorQty * colorPrice;
    let brownTotal = brownQty * brownPrice;
    let milkyTotal = milkyQty * milkyPrice;
    let blackForestTotal = blackForestQty * blackForestPrice;

    // Add all line totals to get the final purchase price.
    let total = colorTotal + brownTotal + milkyTotal + blackForestTotal;

    // Display the final total and an item-wise purchase bill.
    $("#totalPrice").text("Rs." + total.toFixed(2));
    $("#billDetails").html(
      "Color Cake: " + colorQty + " × Rs." + colorPrice + " = Rs." + colorTotal.toFixed(2) + "<br>" +
      "Brown Cake: " + brownQty + " × Rs." + brownPrice + " = Rs." + brownTotal.toFixed(2) + "<br>" +
      "Milky Cake: " + milkyQty + " × Rs." + milkyPrice + " = Rs." + milkyTotal.toFixed(2) + "<br>" +
      "Black Forest Cake: " + blackForestQty + " × Rs." + blackForestPrice + " = Rs." + blackForestTotal.toFixed(2)
    );
  });

  // Calculate the sample bill on page load.
  // 2 Color + 1 Brown + 2 Milky + 1 Black Forest = Rs.1,650.
  $("#placeOrder").trigger("click");
});
