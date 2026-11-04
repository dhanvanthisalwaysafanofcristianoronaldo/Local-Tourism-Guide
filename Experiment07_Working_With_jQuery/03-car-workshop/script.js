// Experiment 07 - Program 3: Car Body Workshop using jQuery.
// This program changes the CSS of the car parts when buttons are clicked.

$(document).ready(function () {

  // Keep track of the current style choice for each customizable part.
  let bodyColorIndex = 0;
  let glassColorIndex = 0;
  let tyreSizeIndex = 0;
  let tyreColorIndex = 0;

  // Arrays contain the alternative styles used by the workshop buttons.
  let bodyColors = ["#80df24", "#e53935", "#2878d0", "#f4b400", "#8e44ad"];
  let glassColors = ["#9bd8ed", "#b7d7ff", "#c5f1d2", "#f4d6a0"];
  let tyreSizes = [48, 58, 68];
  let tyreColors = ["#152b5c", "#222222", "#777777", "#a0522d"];

  // Change the car body colour.
  $("#changeCarColor").click(function () {
    bodyColorIndex = (bodyColorIndex + 1) % bodyColors.length;

    // jQuery .css() changes the selected element's CSS background colour.
    $("#body").css("background-color", bodyColors[bodyColorIndex]);
    $("#status").text("Car body colour changed.");
  });

  // Change the glass tint.
  $("#changeGlassColor").click(function () {
    glassColorIndex = (glassColorIndex + 1) % glassColors.length;
    $("#glass").css("background-color", glassColors[glassColorIndex]);
    $("#status").text("Glass tint changed.");
  });

  // Change the size of both tyres together.
  $("#changeTyreSize").click(function () {
    tyreSizeIndex = (tyreSizeIndex + 1) % tyreSizes.length;
    let newSize = tyreSizes[tyreSizeIndex];

    // Update tyre width and height with the selected size.
    $(".wheel").css({
      "width": newSize + "px",
      "height": newSize + "px"
    });

    $("#status").text("Tyre size changed to " + newSize + " pixels.");
  });

  // Change the colour of both tyres.
  $("#changeTyreColor").click(function () {
    tyreColorIndex = (tyreColorIndex + 1) % tyreColors.length;
    $(".wheel").css("background-color", tyreColors[tyreColorIndex]);
    $("#status").text("Tyre colour changed.");
  });

  // Restore the initial design and reset all indexes.
  $("#resetCar").click(function () {
    bodyColorIndex = 0;
    glassColorIndex = 0;
    tyreSizeIndex = 0;
    tyreColorIndex = 0;

    $("#body").css("background-color", bodyColors[0]);
    $("#glass").css("background-color", glassColors[0]);
    $(".wheel").css({
      "width": tyreSizes[0] + "px",
      "height": tyreSizes[0] + "px",
      "background-color": tyreColors[0]
    });

    $("#status").text("Car restored to its original design.");
  });
});
