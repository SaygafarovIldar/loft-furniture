$(document).ready(function() {
    /** sliders start **/
    var heroSlider = new Swiper('#hero_slider', {
        slidesPerView: 1,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    var swiper = new Swiper(".product-slider__bottom", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
      });

      var swiper2 = new Swiper(".product-slider__top", {
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        thumbs: {
          swiper: swiper,
        },
      });
      /** sliders end **/

    /** price range slider start */ 
    if(document.querySelector('#price_range_slider')) {
        let slider = document.querySelector('#price_range_slider');
        let snapValues = [
            document.querySelector('#price_from'),
            document.querySelector('#price_to')
        ];
    
        noUiSlider.create(slider, {
            start: [2000, 100000],
            connect: true,
            range: {
                'min': 2000,
                'max': 102000
            }
        });
    
        slider.noUiSlider.on('update', function (values, handle) {
            snapValues[handle].innerHTML = values[handle];
        });
    }
    /** price range slider end */ 
 
    /** select dropdowns start */ 
    $('#catalog_sort').select2({
        theme: 'sort',
        placeholder: 'Сортировать',
    });

    function formatState (state) {
        if (!state.id) {
          return state.text;
        }

        var colorValue = state.id;
        var $state = $(
          `<span class="filter-colors__color filter-colors__color--${colorValue} mr-0"></span>`
        );
        return $state;
      };

    $("#product_colors").select2({
        theme: 'product-info',
        templateResult: formatState,
        templateSelection: formatState
    });

    $('#product_quantity').select2({
        theme: 'product-info-quantiiy',
    });

    $("#product_sizes").select2({
        theme: 'product-info-sizes',
    });
    /** select dropdowns start */ 

    /* click for multiple items start */
    function multipleClickTrigger(className) {
        const clickableElements = document.querySelectorAll(`.${className}`);
        if(clickableElements.length > 1) {
            for (let i = 0; i < clickableElements.length; i++) {
                const clickedElement = clickableElements[i];
                clickedElement.addEventListener('click', () => {
                    clickedElement.classList.toggle('clicked');
                });
            }
        }
    }
    multipleClickTrigger('filter-categories__title');
    multipleClickTrigger('js-filter-colors__color');
    /* click for multiple items end */

    function tabClick() {
        const arrTabsButtons = document.querySelectorAll('.product-characteristics__tab');
        const arrTabsContent = document.querySelectorAll('.product-characteristics__content');

        // loop for tabs buttons 
        arrTabsButtons.forEach(element => {
            element.addEventListener('click', () => {
                // getting data attribute from each button and tabs content ids
                let elementData = element.getAttribute('data-tab');
                let tabsContent =  document.querySelector(elementData);

                if(!element.classList.contains('product-characteristics__tab--active')) {
                    arrTabsButtons.forEach(item => {
                        item.classList.remove('product-characteristics__tab--active');
                    });
                    arrTabsContent.forEach(item => {
                        if(!item.classList.contains('product-characteristics__content--hidden')) {
                            item.classList.add('product-characteristics__content--hidden');
                        }
                        item.classList.remove('product-characteristics__content--visible');
                    });

                    tabsContent.classList.add('product-characteristics__content--visible');
                    tabsContent.classList.remove('product-characteristics__content--hidden');
                    element.classList.add('product-characteristics__tab--active');
                }
            });
        });
    }
    tabClick();
});

/* close modal windows */
function closeModalWindow(className) {
    document.querySelector(`.${className}`).classList.remove('opened');
    document.querySelector('body').classList.remove('no-overflow');
}
/* open modal windows */
function openModalWindow(className) {
    const modalWindows = document.querySelector(`.${className}`);
    if(!modalWindows.classList.contains('opened')) {
        modalWindows.classList.add('opened');
        document.querySelector('body').classList.add('no-overflow');
    }
}
