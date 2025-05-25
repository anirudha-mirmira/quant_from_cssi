
if (typeof console === "undefined" || typeof console.log === "undefined") {
	console = {};
	console.log = function() {};
}

jQuery(document).ready(function($){
	var w = 760,
		h = 520,
		menu = $('#masthead');

	$('html').removeClass('no-js');

	$('.hamburger').on('click', function (e){
		e.preventDefault();

		$('body').toggleClass('menu-open');
	});

	if ($('#splash').length) {
		$('#splash').height($(window).height());
	}

	$(".tabs").tabs();

	// Ascensor Settings
	var ascensor = jQuery('#content').ascensor({
		time: 1000,
		childType: 'section',
		swipeNavigation: false,
		easing: 'easeInOutQuint',
		loop: false,
		direction: 'y',
		keyNavigation: false
	});
	var ascensorInstance = jQuery('#content').data('ascensor');

	// Add class to the active menu item
	jQuery(".links-to-floor-li a:eq(" + ascensor.data("current-floor") + ")").addClass("active");

	// Menu click event
	jQuery('body')
		.find('.links-to-floor-li a')
		.on("click", function (e) {
			"use strict";

			e.preventDefault();

			// Get the id of the floor
			var floornumber = jQuery(this).data('id');

			// Remove class from all menu items
			jQuery('body').find('.links-to-floor-li a').removeClass("active");

			// Add class to the active menu item
			jQuery(this).addClass("active");

			// Close modal menu
			jQuery("body").removeClass("menu-open");

			// Scroll the page
			ascensorInstance.scrollToFloor(floornumber - 1);

			// Set page hash - this needs to be last!
			window.location.hash = jQuery(this).attr('href').replace('#', '');
		});

	jQuery('body')
		.find('.links-to-floor')
		.on("click", function (e) {
			"use strict";

			e.preventDefault();

			// Get the id of the floor
			var floornumber = jQuery(this).data('id');

			// Remove class from all menu items
			jQuery('body').find('.links-to-floor-li a').removeClass("active");

			// Add class to the active menu item
			jQuery('body').find('.links-to-floor-li a[data-id=' + floornumber + ']').addClass("active");

			// Close modal menu
			jQuery("body").removeClass("menu-open");

			// Scroll the page
			ascensorInstance.scrollToFloor(floornumber - 1);

			// Set page hash - this needs to be last!
			window.location.hash = jQuery(this).attr('href').replace('#', '');
		});

	var hash = window.location.hash.substr(1);

	if (window.location.hash) {
		// Get the active page information from the page link and add/remove required classes
		var smenu = jQuery(".menu a").filter('[href="#' + hash + '"]');

		jQuery('body').find('.menu a').removeClass("active");

		smenu.addClass("active");

		// Scroll the page
		var floornumber = jQuery(".active").data('id');
		ascensorInstance.scrollToFloor(floornumber - 1);
	}

	$('#talk-filter').on('keyup', function(e){
		var filter, txtValue, found;

		filter = $(this).val().toUpperCase();

		$('.talk-sessions tbody tr').each(function(i, tr){
			found = false;

			$(this).find('td').each(function(k, td){
				txtValue = $(this).text();

				if (txtValue && txtValue.toUpperCase().indexOf(filter) > -1) {
					found = true;
				}
			});

			if (found) {
				$(tr).removeClass('hide');
			} else {
				$(tr).addClass('hide');
			}
		});

		$('.talk-tab').each(function(i, tr){
			$(this).find('span').addClass('hide').text('');

			if (filter) {
				var count = 0;

				$($(this).attr('href')).find('tbody tr').each(function(i, tr){
					if (!$(tr).hasClass('hide')) {
						count++;
					}
				});

				if (count) {
					$(this).find('span').text(count).removeClass('hide');
				}
			}
		});
	});

	/*$(".dialog").dialog({
		autoOpen: false,
		modal: true,
		width: 550
	});*/
	$('.talk-abstract').on('click', function(e){
		e.preventDefault();

		if ($($(this).attr('href')).length) {
			var markup = $($(this).attr('href')).html(),
				title = $($(this).attr('href')).attr('title');
			//$($(this).attr('href')).dialog('open');
			$('<div id="#dlg"></div>').dialog({
				modal: true,
				width: 550,
				//position: { my: "center top", at: "center top", of: window },
				title: title,
				open: function () {
					$(this).html(markup);
				},
				close: function () {
					$("#dlg").remove();
				}
			});
		}
	});
});

 const carousels = {
    1: { index: 0, id: "carousel-1" },
    2: { index: 0, id: "carousel-2" },
    3: { index: 0, id: "carousel-3" },
  };

  function getCardsPerSlide() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 3;
  }

  function updateCarousel(num) {
    const carouselData = carousels[num];
    const carousel = document.getElementById(carouselData.id);
    const cardWidth = carousel.children[0].offsetWidth;
    const offset = -carouselData.index * cardWidth;
    carousel.style.transform = `translateX(${offset}px)`;
  }

  function nextSlide(num) {
    const carouselData = carousels[num];
    const carousel = document.getElementById(carouselData.id);
    const total = carousel.children.length;
    const visible = getCardsPerSlide();
    if (carouselData.index + visible < total) {
      carouselData.index++;
      updateCarousel(num);
    }
  }

  function prevSlide(num) {
    const carouselData = carousels[num];
    if (carouselData.index > 0) {
      carouselData.index--;
      updateCarousel(num);
    }
  }

  function showTab(index) {
    const tabs = document.querySelectorAll(".tab-content");
    const buttons = document.querySelectorAll(".tab-button");
    tabs.forEach((tab, i) => {
      tab.classList.toggle("active", i === index);
      buttons[i].classList.toggle("active", i === index);
    });
    // Update carousel in the shown tab
    updateCarousel(index + 1);
  }

  window.addEventListener("resize", () => {
    for (const key in carousels) updateCarousel(parseInt(key));
  });

  window.addEventListener("load", () => {
    for (const key in carousels) updateCarousel(parseInt(key));
  });