  const deeplink = 'https://go.isclix.com/deep_link/5353514789844343379';
  let obj = {
    data: [],
    container: {
      'max-width': '100%',
      height: `220px`,
      'max-height': '450px'
    },
    captionFontCSS: {"font-size": "25px" },
    autoSlide: true,
    changeTime: 5000,
    showArrow: true,
    mode: 'slide' };
  
	fetch('https://data.polyxgo.com/api/v1/datax/sp_banners')
      .then(res => res.json())
      .then(data => {
      data = JSON.parse(data.value);
      console.log(data);
      Object.keys(data).forEach(key => {
        obj.data.push({"caption": data[key].title,"src":data[key].src,"link":`${deeplink}?url=${encodeURIComponent(data[key].url)}&utm_source=cbi&utm_medium=/p/ma-giam-gia.html_banner`,
                      })
        console.log(obj.data)
      })
    })
  console.log(obj)
  // https://codepen.io/PJCHENder/pen/KaaBGP
  
  if(screen.width > 0 && screen.width <= 640){obj.container.height = '135px'}
  else if(screen.width > 640 && screen.width <= 1500){obj.container.height = '340px'}
  
  //  Default CSS Setting
  let containerCSS = {
    'max-width': '980px',
    height: '390px' };
  
  containerCSS['max-width'] = obj.container['max-width'];
  containerCSS.height = obj.container.height;
  console.log(containerCSS);
  
  setTimeout(()=>{
    $('#view-slide').css(containerCSS);
    //  Loading Data
    if (Array.isArray(obj.data)) {
      let currentNumber = 0;
      let totalSlideNumber = obj.data.length - 1;
      //  如果只有一張圖片，隱藏左右箭頭
      if (totalSlideNumber == 0) {
        $('.slideButton').remove();
      }
      //  Default DOM setting
      obj.data.forEach((item, index) => {
        $("#slideItem").append('<a href=' + item.link + ' target="_blank"><div class="slideItem item' + index + '"></div></a>');
        //$('#slideCaption').append('<li>' + item.caption + '</li>');
        $('#slideNav').append('<li data-navitem="' + index + '"><div class="slideNavItem"></div></li>');
      });
      $('#slideNav').find('li').first().addClass('active');
      let slideWidth = $("#view-slide").width();
      let slideHeight = $("#view-slide").height();
      //  setting CSS to adjust slide
      $('.banner').css({
        'width': slideWidth * (totalSlideNumber + 1),
        'height': slideHeight });
      $('.slideItem').css({
        'width': slideWidth,
        'height': slideHeight });
      $('.caption').css('width', slideWidth);
      $('.caption').find('ul').css('width', slideWidth * (totalSlideNumber + 1));
      $('.caption').find('li').css('width', slideWidth);

      obj.data.forEach((item, index) => {
        $('.item' + index).css('background-image', 'url(' + item.src + ')');
      });

      //  SlideFunction
      let checkSlideNumber = (slideNumber, totalSlide) => {
        if (slideNumber < 0) {
          return totalSlide;
        } else if (slideNumber > totalSlide) {
          return 0;
        } else {
          return slideNumber;
        }
      };

      let changeSlide = () => {
        currentNumber = checkSlideNumber(currentNumber, totalSlideNumber);
        $('.banner').animate({
          'left': -slideWidth * currentNumber },
                             400);
        $('.caption ul').animate({
          'left': -slideWidth * currentNumber },
                                 400);
        $('.slideNav li').removeClass('active');
        $('.slideNav li:eq(' + currentNumber + ')').addClass('active');
      };

      //  slideArrowButton
      $('.slideButtonRight').on('click', () => {
        currentNumber++;
        changeSlide();
      });
      $('.slideButtonLeft').on('click', () => {
        currentNumber--;
        changeSlide();
      });

      //  slideNavButton
      $('.slideNav').find('li').on('click', function () {
        currentNumber = $(this).data('navitem');
        changeSlide();
      });

      //  SetInterval
      let changeTime = obj.changeTime || 3000;
      if (!(obj.autoSlide === false)) {
        let auto = () => {
          currentNumber++;
          changeSlide();
        };
        let clock = setInterval(auto, changeTime);

        //  Stop while hovering
        $('.banner, .slideButton').hover(() => clearInterval(clock), () => clock = setInterval(auto, changeTime));
      }

      //  Set Slide Show Mode
      let slideShowMode = obj.mode;
      let modeSlide = () => {
        $('.caption').addClass('mode-slide');
      };
      let modeCenter = () => {
        $('.caption').addClass('mode-center');
      };
      switch (slideShowMode) {
        case 'slide':
          modeSlide();
          break;
        case 'center':
          modeCenter();
          break;
        default:
          modeSlide();}
    }
    if (obj.showArrow) {
      if (obj.showArrow === false) $('.slideButton').remove();
    }
    //  setting customer caption font
    if (obj.captionFontCSS) {
      delete obj.captionFontCSS.width;
      $('.caption').find('li').css(obj.captionFontCSS);
    }
  }, 3000)
  

	//Resivepon
	var liSlideNav = document.querySelectorAll('div.slideNav > ul#slideNav > li');
	var liSlideNavDot = document.querySelectorAll('div.slideNav > ul#slideNav > li > .slideNavItem');
	if(liSlideNav.length > 16){
		for(let i=0; i<liSlideNav.length; i++ ){
			liSlideNav[i].style.paddingTop = '5px';
			liSlideNav[i].style.paddingBottom = '5px';
			liSlideNavDot[i].style.width = '5px';
			liSlideNavDot[i].style.height = '5px';
		}
	}
