$(document).ready(function () {
  const amenityDict = {};
  $("input[type=checkbox]").change(function () {
    if ($(this).is(":checked")) {
      amenityDict[$(this).data("id")] = $(this).data("name");
    } else {
      delete amenityDict[$(this).data("id")];
    }
    $(".amenities h4").text(Object.values(amenityDict).join(", "));
  });

  function handleApiStatus(response) {
    if (response.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  }

  // Send a POST request to the places_search endpoint
  $.ajax({
    type: "POST",
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    contentType: "application/json",
    data: JSON.stringify({}), // Empty dictionary as the request body
    success: function (data) {
      // Loop through the results and create article tags for each place
      for (const place of data) {
        const placeHTML = `<article>
                              <!-- Add your HTML structure for each place here -->
                              <div>${place.name}</div>
                              <div>${place.description}</div>
                              <!-- Add more details as needed -->
                           </article>`;
        $(".places").append(placeHTML);
      }
    },
    error: function (error) {
      console.error("Error fetching places:", error);
    },
  });

  // Check API status on page load
  $.get("http://0.0.0.0:5001/api/v1/status/", handleApiStatus);
});
