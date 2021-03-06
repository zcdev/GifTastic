// Initial array of bands
const bands = [
  'Green Day',
  'Foo Fighters',
  'Linkin Park',
  'Red Hot Chili Peppers',
  'No Doubt',
  'Pearl Jam',
  'U2',
  'Coldplay',
  'Paramore',
  'Deftones',
  'Goo Goo Dolls',
  'Metallica',
];

const favorites = [];
let bandImage = '';
let bandTitle = '';

// Get band images via ajax call
function getBandImages() {
  const band = $(this).attr('data-name');
  const queryURL = `https://api.giphy.com/v1/gifs/search?q=${band}&api_key=bmop7DR92LNMbtJ1rzRdKGOgtAC8twiu&limit=10&rating=g`;
  const listImages = [];
  const listTitles = [];

  $.ajax({
    url: queryURL,
    method: 'GET',
  }).then((response) => {
    const bandDiv = $("<div class='band'>");

    // Get band images and titles
    for (let i = 0; i < response.data.length; i++) {
      bandImage = response.data[i].images.fixed_height_still.url;
      bandTitle = response.data[i].title + i;
      listImages.push(bandImage);
      listTitles.push(bandTitle);
    }
    // If images are duplicated, remove them
    let index;
    for (let j = 0; j < favorites.length; j++) {
      index = listTitles.indexOf(favorites[j]);
      if (index > -1) {
        listTitles.splice(index, 1);
        listImages.splice(index, 1);
      }
    }

    // Render images after removing duplicates
    for (let k = 0; k < listTitles.length; k++) {
      const imageSrc = $('<img>');
      const box = $("<div class='box'></div>");
      const fav = $('<button class="fav">&#10084&#xfe0e;</button>');

      imageSrc.attr('data', listTitles[k]);
      imageSrc.attr('src', listImages[k]);
      fav.appendTo(box);
      imageSrc.appendTo(box);
      bandDiv.append(box);
    }

    // Let user add their 6 favorite images
    $(document).on('click', '.fav', function () {
      if ($('.faved').length < 6) {
        $(this)
          .hide()
          .next()
          .addClass('faved')
          .appendTo('#favs');

        $('.faved').each(function () {
          favorites.push($(this).attr('data'));
        });
      }
    });

    $('#band-view').html(bandDiv);
  });
}

// Toggle image to be still or animated
$(document).on('click', 'img', function () {
  const keyword = '_s.gif';
  if (
    $(this)
      .attr('src')
      .includes(keyword)
  ) {
    $(this).attr(
      'src',
      $(this)
        .attr('src')
        .replace(keyword, '.gif'),
    );
  } else {
    $(this).attr(
      'src',
      $(this)
        .attr('src')
        .replace('.gif', keyword),
    );
  }
});

// Make buttons
function renderButtons() {
  $('#buttons-view').empty();
  for (let i = 0; i < bands.length; i++) {
    const newButton = $('<button>')
      .attr('data-name', bands[i])
      .text(bands[i]);
    $('#buttons-view').append(newButton);
  }
}

// Add band
$('#add-band').on('click', (event) => {
  event.preventDefault();
  const band = $('#band-input')
    .val()
    .trim();
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
