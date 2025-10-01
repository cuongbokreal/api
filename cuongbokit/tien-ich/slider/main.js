    const slidesEl = document.getElementById('slides');
    const thumbnailsEl = document.getElementById('thumbnails');
    const sliderEl = document.getElementById('slider');

    let current = 0;
    let timer;
    const slideDuration = 5000;

    function updateUI(){
      const slideNodes = slidesEl.querySelectorAll('.slide');
      const thumbNodes = thumbnailsEl.querySelectorAll('.thumbnail');
      slideNodes.forEach((s,i)=> s.classList.toggle('active', i===current));
      thumbNodes.forEach((t,i)=> t.classList.toggle('active', i===current));
    }
    function next(){ current=(current+1)%images.length; updateUI(); }
    function prev(){ current=(current-1+images.length)%images.length; updateUI(); }
    function goTo(i){ current=i; updateUI(); }

    function startTimer(){ stopTimer(); timer=setInterval(next, slideDuration); }
    function stopTimer(){ clearInterval(timer); }
    function resetTimer(){ stopTimer(); startTimer(); }

    images.forEach((src,i)=>{
      const slide=document.createElement('div');
      slide.className='slide';
      const img=document.createElement('img');
      img.src=src;
      img.alt=`Slide ${i+1}`;
      img.onerror=function(){ this.src='https://placehold.co/800x600/374151/fff?text=Image+Unavailable'; };
      slide.appendChild(img);
      slidesEl.appendChild(slide);

      const thumb=document.createElement('img');
      thumb.src=src;
      thumb.alt=`Thumbnail ${i+1}`;
      thumb.className='thumbnail';
      thumb.addEventListener('click',()=>{ goTo(i); resetTimer(); });
      thumbnailsEl.appendChild(thumb);
    });

    document.getElementById('next').addEventListener('click',()=>{ next(); resetTimer(); });
    document.getElementById('prev').addEventListener('click',()=>{ prev(); resetTimer(); });

    sliderEl.addEventListener('mouseenter', stopTimer);
    sliderEl.addEventListener('mouseleave', startTimer);

    // Swipe support
    let startX=0, endX=0;
    const swipeThreshold=50;
    slidesEl.addEventListener('touchstart',e=>{ startX=e.touches[0].clientX; endX=startX; stopTimer(); });
    slidesEl.addEventListener('touchmove',e=>{ endX=e.touches[0].clientX; });
    slidesEl.addEventListener('touchend',()=>{
      const deltaX=startX-endX;
      if(Math.abs(deltaX)>swipeThreshold){ deltaX>0?next():prev(); resetTimer(); }
      else startTimer();
    });

    updateUI();
    startTimer();
  });
