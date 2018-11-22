// Initial array of bands
const bands = ['Green Day', 'Foo Fighters', 'Linkin Park', 'Red Hot Chili Peppers', 'No Doubt', 'Pearl Jam', 'U2', 'Coldplay', 'Paramore', 'Deftones', 'Goo Goo Dolls', 'Metallica'];

// Get band images via ajax call
function getBandImages() {
  const band = $(this).attr('data-name');
  const queryURL = `https://api.giphy.com/v1/gifs/search?q=${band}&api_key=bmop7DR92LNMbtJ1rzRdKGOgtAC8twiu&limit=10&rating=g`;

  $.ajax({
    url: queryURL,
    method: 'GET',
  }).then((response) => {
    const bandDiv = $("<div class='band'>");

    for (let i = 0; i < response.data.length; i++) {
      const bandImages = $(`<img src="${response.data[i].images.fixed_height_still.url}" value="${band + `-` + i}" alt="${response.data[i].title}" title="${response.data[i].title}">`);
      const box = $("<div class='box'></div>");
      const fav = $('<div class="fav">&#10084&#xfe0e;</div>');
      fav.appendTo(box);
      bandImages.appendTo(box);
      bandDiv.append(box);
      // const bandRatings = $(`<p>Rated: ${response.data[i].rating}</p>`);
      // bandDiv.append(bandRatings);
    }

    $('#band-view').html(bandDiv);
  });
}

// Toggle image to be still or animated
$(document).on('click', 'img', function () {
  const keyword = '_s.gif';
  if ($(this).attr('src').includes(keyword)) {
    $(this).attr('src', $(this).attr('src').replace(keyword, '.gif'));
  } else {
    $(this).attr('src', $(this).attr('src').replace('.gif', keyword));
  }
});

// Let user add their 6 favorite images
$(document).on('click tap', '.fav', function () {
  if ($('.faved').length < 6) {
    $(this).toggle().next().addClass('faved').appendTo('#favs');
    
    let faved = {};
    $('.faved').each(function() {
        const img = $(this).attr('value');
        if (faved[img]) {
            $(this).remove();
        } else{
            faved[img] = true;
        }     
    });
  }
});

// Make buttons
function renderButtons() {
  $('#buttons-view').empty();
  for (let i = 0; i < bands.length; i++) {
    const newButton = $('<button>').attr('data-name', bands[i]).text(bands[i]);
    $('#buttons-view').append(newButton);
  }
}

// Add band
$('#add-band').on('click', (event) => {
  event.preventDefault();
  const band = $('#band-input').val().trim();
  if (band !== '' && !bands.includes(band)) {
    bands.push(band);
    renderButtons();
  }
});

// Band button click function
$(document).on('click', 'button', getBandImages);

// Insert buttons to the page
renderButtons();

// Background animation (for fun)
function musicLoop() {
  const $container = $('.container');
  const $musicNote = $("<div class='music-note'>&#9835</div>")
    .css({
      left: `${Math.random() * $container.width()}px`,
      top: -80,
    })
    .appendTo($container)
    .animate(
      {
        top: `${Math.random() * $container.height()}px`,
        opacity: 0,
      },
      5000,
      () => $musicNote.remove(),
    );
}

setInterval(musicLoop, 500);