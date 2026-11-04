// Experiment 07 - Program 1: Budget Calculator using jQuery.

// Wait until the HTML document has been completely loaded before
// selecting elements or attaching event handlers.
$(document).ready(function () {

  // Run the calculation when the user clicks the Evaluate button.
  $("#evaluateButton").click(function () {

    // Read the total amount and convert it from a string to a number.
    let amount = parseFloat($("#amount").val());

    // Read the four percentage values entered by the user.
    let roomPercent = parseFloat($("#roomPercent").val());
    let accessoriesPercent = parseFloat($("#accessoriesPercent").val());
    let emergencyPercent = parseFloat($("#emergencyPercent").val());
    let savingsPercent = parseFloat($("#savingsPercent").val());

    // Clear any error message from the previous calculation.
    $("#message").text("");

    // Validate that the total amount is a positive number.
    if (isNaN(amount) || amount <= 0) {
      $("#message").text("Please enter an amount greater than zero.");
      return;
    }

    // Check that every percentage is a valid number between 0 and 100.
    let percentages = [roomPercent, accessoriesPercent, emergencyPercent, savingsPercent];
    let invalidPercentage = percentages.some(function (value) {
      return isNaN(value) || value < 0 || value > 100;
    });

    if (invalidPercentage) {
      $("#message").text("Enter valid percentages between 0 and 100.");
      return;
    }

    // The sample in the manual allocates the complete amount.
    // Therefore, the four percentage values must add up to exactly 100%.
    let percentageTotal =
      roomPercent + accessoriesPercent + emergencyPercent + savingsPercent;

    if (Math.abs(percentageTotal - 100) > 0.000001) {
      $("#message").text(
        "The percentages must add up to 100%. Current total: " +
        percentageTotal.toFixed(2) + "%. Please correct the values."
      );
      // Clear the old displayed results when the input is not a valid split.
      $("#roomResult, #accessoriesResult, #emergencyResult, #savingsResult")
        .text("Rs.0.00");
      return;
    }

    // Calculate the amount assigned to each budget category.
    let roomRent = amount * roomPercent / 100;
    let accessories = amount * accessoriesPercent / 100;
    let emergency = amount * emergencyPercent / 100;
    let savings = amount * savingsPercent / 100;

    // Update the result boxes using jQuery's .text() method.
    $("#roomResult").text("Rs." + roomRent.toFixed(2));
    $("#accessoriesResult").text("Rs." + accessories.toFixed(2));
    $("#emergencyResult").text("Rs." + emergency.toFixed(2));
    $("#savingsResult").text("Rs." + savings.toFixed(2));
  });

  // Automatically show the example calculation when the page opens.
  // The default values match the sample shown in the lab manual:
  // Rs.15,000 divided as 50%, 20%, 20%, and 10%.
  $("#evaluateButton").trigger("click");
});
