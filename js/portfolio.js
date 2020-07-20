(() => {
  let elements;
  let windowHeight;
  let navBar;
  let lastPos;
  let positionFromTop;
  const sections = [];
  
  //  let offset = navBar.offsetTop;
  // const navrect = navBar.getBoundingClientRect();

  const checkVisible = () => {
    // check if an element is in the viewport then remove the hidden class and
    // add the class set in the cssclass data attribute
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var positionFromTop = elements[i].getBoundingClientRect().top;

      if (positionFromTop - windowHeight <= 0) {
        element.classList.add(element.dataset.cssclass);
        element.classList.remove('hidden');
      }
    }
  }

Math.inOutQuintic = function(t, b, c, d) {
  var ts = (t/=d)*t,
  tc = ts*t;
  return b+c*(6*tc*ts + -15*ts*ts + 10*tc);
};

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
var requestAnimFrame = (function(){
  return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
})();

function scrollTo(element, to, duration) {
  const start = element.scrollTop;
  const change = to - start;
  const increment = 20;
  let currentTime = 0;
  duration = (typeof(duration) === 'undefined') ? 500 : duration;
  const animateScroll = function() {
    // increment the time
    currentTime += increment;
    // find the value with the quadratic in-out easing function
    const val = Math.inOutQuintic(currentTime, start, change, duration);
    element.scrollTop = val;

    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimFrame(animateScroll);
    }
  };
  animateScroll();
}




  const checkNav = () => {
    // check if the navigation has reached the top then add the fixed class
    const height = navBar.getBoundingClientRect().height;
    const pos = document.documentElement.scrollTop;

    if (pos >= positionFromTop + height && lastPos < pos) {
      navBar.classList.add('fixed');
    }
    if (pos < positionFromTop && lastPos > pos) {
      navBar.classList.remove('fixed');
    }
    lastPos = pos;
  }

  const checkActiveSection = () => {
    const height = navBar.getBoundingClientRect().height;
    let activeSection;
    sections.forEach(s => {
      if (s.getBoundingClientRect().y - height <= 0) {
        activeSection = s;
      }
    });
    const activeNav = document.querySelector(`.nav-link[data-target='${activeSection.id}']`);

    if (!activeNav.classList.contains('active')) {
      const oldActive = document.querySelector('.nav-link.active');
      oldActive && oldActive.classList.remove('active');
      activeNav.classList.add('active');
    }
  }

  const onScroll = () => {
    // do this when the window scrolls
    checkVisible();
    checkNav();
    checkActiveSection();
  }

  const clickNav = (e) => {
    const targetId = e.target.dataset.target;
    const targetEl = document.getElementById(targetId);
    scrollTo(document.documentElement, targetEl.offsetTop, 300);
  }

  const init = () => {
    const downButton = document.getElementById('down-button');
    navBar = document.querySelector('nav');
    positionFromTop = navBar.offsetTop;
    elements = document.querySelectorAll('.hidden');
    windowHeight = window.innerHeight;
    about = document.getElementById('about');
    window.addEventListener('scroll', onScroll);
    downButton.onclick = () => {
      scrollTo(document.documentElement, about.offsetTop, 300);
    };
    document.querySelectorAll('.nav-link').forEach(n => {
        n.onclick = clickNav;
      }
    );
    document.querySelectorAll('section').forEach(s => {sections.push(s)});
    checkVisible();
  };

  const winLoad = (callback) => {
    if (document.readyState === 'complete') {
      callback();
    } else {
      window.addEventListener('load', callback);
    }
  };

  winLoad(init);
})();