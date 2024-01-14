$(document).ready(function () {
  const amenityDict = {};
  $('input[type=checkbox]').change(function () {
    if ($(this).is(':checked')) {
      amenityDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityDict[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(amenityDict).join(', '));
  });
  function handleApiStatus (response) {
    if (response.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  }
  $.get('http://0.0.0.0:5001/api/v1/status/', handleApiStatus);
});
