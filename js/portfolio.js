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

  const scrollTo = (element, to, duration) => {
    // scroll an element to the top of another element in a duration
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
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
    scrollTo(document.documentElement, targetEl.offsetTop, 600);
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
      scrollTo(document.documentElement, about.offsetTop, 600);
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