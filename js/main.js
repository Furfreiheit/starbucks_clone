
/*search*/
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click',function(){
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus',function(){
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener('blur',function(){
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

/*scroll */
const badgeEl = document.querySelector('header .badges');
const topTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function(){
  console.log(window.scrollY);
  if(window.scrollY > 500){
    //badge none
    //gsap.to(요소, 지속시간, 옵션)
    gsap.to(badgeEl, .6, {
      opacity:0,
      display: 'none' //실제적으로 요소를 안보여지게 하기위해 : 링크가 걸렸을 경우 클릭되어버리는 현상을 방지
    });

    //show the top btn
    gsap.to(topTopEl, .2,{
      x: 0
    });
  }else {
    //badge block
    gsap.to(badgeEl, .6, {
      opacity:1,
      display: 'block'
    });

    //hide to top btn
    gsap.to(topTopEl, .2,{
      x: 100
    });
  }
},300));//_.throttle(함수, 시간)

topTopEl.addEventListener('click', function(){
  gsap.to(window, .7, { //window: page
    scrollTo:0
  });
});






/*fade-in*/
const fadeEls =document.querySelectorAll('.visual .fade-in');

fadeEls.forEach(function(fadeEl, index){ //반복적인 처리
  gsap.to(fadeEl, 1, {
    delay:(index + 1) * .7, //0.7, 1.4, 2.1, 2.7 다음 요소들에 적용되는 시간
    opacity:1
  })
});

/*Swiper*/
//new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true
}); //new:생성자(클래스)

new Swiper('.promotion .swiper-container', {
  slidesPerView:3, //한번에 보여줄 슬라이드 갯수
  splaceBetween: 10, //슬라이드 사이 여백
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  loop:true,
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: '.promotion .swiper-pagination', //페이져
    clickable: true //사용자가 페이져를 직접 제어할수 있는가    
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
}); 
new Swiper('.awards .swiper-container', {
  slidesPerView:5, 
  splaceBetween: 30, 
  autoplay: true,
  loop: true,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
}); 

/* promotion */
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function(){
  isHidePromotion = !isHidePromotion //  !: 반대 값으로 만들어줌
  if(isHidePromotion){ // true
    //숨김처리
    promotionEl.classList.add('hdie');
  }else{
    //보이게 처리
    promotionEl.classList.remove('hdie');
  }
});

/*floating */
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
function floatingObject(selector, delay, size) {
  gsap.to(
    selector, //선택자
    random(1.5,2.5), // 동작시간
    { //옵션
    y:size,
    repeat: -1,
    yoyo:true, //둥둥효과
    ease: "power1.inOut",
    delay: random(0,delay)
  });
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

/* scroll magic */
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl){
  new ScrollMagic
  .Scene({
    triggerElement: spyEl, //보여짐 여부를 감시할 요소 지정
    triggerHook: .8
  })
  .setClassToggle(spyEl, 'show')
  .addTo(new ScrollMagic.Controller());//html class
});

/* foonter year */
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); //2022