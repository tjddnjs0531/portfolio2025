/* header */
const headerSlide = gsap.timeline({
    scrollTrigger: {
        trigger: "#visual",
        pin: false
    }
});

headerSlide.to('#header', {
    top: "0",
    duration: 0.3,
    ease: 'power1.out'
}, 0)


let prevScrollTop = 0;
document.addEventListener("scroll", function () {
	const nowScrollTop = window.scrollY;
	console.log(nowScrollTop);

	if (nowScrollTop > prevScrollTop) {
		// 아래로 스크롤할 때
		document.getElementById('header').classList.add('active');
	} else {
		// 위로 스크롤할 때
		document.getElementById('header').classList.remove('active');
	}
	// prevScrollTop 갱신
	prevScrollTop = nowScrollTop;
});



/* background effect */
const FogEffect = {
    fogWrap: null,
    currentX: 0,
    currentY: 0,
    speed: window.innerWidth < 768 ? 2 : 4, // 모바일에서는 속도 감소
    isRender: false,

    init() {
        this.fogWrap = document.querySelector('#fogWrap');
        if (!this.fogWrap) return;

        const rect = this.fogWrap.getBoundingClientRect();
        this.currentX = rect.left;
        this.currentY = rect.top;

        document.addEventListener('mousemove', (event) => {
            this.isRender = true;
            this.x = event.clientX;
            this.y = event.clientY;
        });

        this.animate();
    },

    animate() {
        if (this.isRender) {
            let dx = this.x - this.currentX;
            let dy = this.y - this.currentY;
            let distance = Math.sqrt(dx ** 2 + dy ** 2);

            if (distance > 5) { // 너무 작은 움직임은 무시
                let moveX = (dx / distance) * this.speed;
                let moveY = (dy / distance) * this.speed;

                this.currentX += moveX;
                this.currentY += moveY;

                gsap.to(this.fogWrap, {
                    x: this.currentX,
                    y: this.currentY,
                    duration: 0.4, // 부드러운 이동
                    ease: "power2.out"
                });
            }
        }

        requestAnimationFrame(() => this.animate());
    }
};

FogEffect.init();




/* visual text typing */
gsap.registerPlugin(TextPlugin);  // TextPlugin 등록

const text = "코드를 디자인하고, 디자인을 현실로 만듭니다"; // 타이핑할 텍스트
const typingElement = document.getElementById("typing");

// GSAP로 타이핑 효과
gsap.to(typingElement, {
  duration: text.length * 0.125,  // 텍스트 길이에 비례하여 애니메이션 시간 설정
  text: text,  // 타이핑할 텍스트
  ease: "none",  // 타이핑 효과의 부드러움
});


//slogun
const slogunAni01 = gsap.timeline({
	scrollTrigger: {
		trigger: "#about",
		pin: false,
		scrub: false,
		start: 'center',
	}
}).to('#slogun p', { y: "0%", duration: 1, ease: 'power1.out' });
  
// slogun 텍스트 배경 그라디언트 애니메이션
const slogunAni02 = gsap.timeline({
scrollTrigger: {
	trigger: "#slogun",
	pin: true,
	scrub: 2,
	start: 'top',
}
})
.to('#slogun .s_txt01', { backgroundSize: "200% 100%", duration: 2.5, ease: 'power1.out' })
.to('#slogun .s_txt02', { backgroundSize: "200% 100%", duration: 2.5, ease: 'power1.out' })
.to('#slogun .s_txt03', { backgroundSize: "200% 100%", duration: 2.5, ease: 'power1.out' });


const projectTitle = gsap.timeline({
	scrollTrigger: {
		trigger: "#project",
		pin: false,
		// markers: true,
		scrub: false,
		toggleActions: "play reverse play reverse",
		start: 'top 50%',
		end: 'bottom'
	}
});

projectTitle.to('#project .title span', {
	y: "0%",
	opacity: 1,
	duration: 1,
	ease: 'back.out',
	stagger: 0.02
}, 0)


const contactTitle = gsap.timeline({
	scrollTrigger: {
		trigger: "#project",
		pin: false,
		// markers: true,
		scrub: false,
		toggleActions: "play reverse play reverse",
		start: 'top',
		end: 'bottom'
	}
});

contactTitle.to('#contact .title span', {
	y: "0%",
	opacity: 1,
	duration: 1,
	ease: 'back.out',
	stagger: 0.02
}, 0)


// Intersection Observer 설정
const fadeInBoxes = document.querySelectorAll('.fade-in-box');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 요소가 화면에 보이면
      const target = entry.target;
      if (target.classList.contains('delay')) {
        // 'delay' 클래스가 있으면 지연을 추가
        const delayTime = target.getAttribute('data-delay') || 0; // data-delay 속성에서 딜레이 시간(초) 가져오기, 기본값은 0초
        setTimeout(() => {
          target.classList.add('visible');
        }, delayTime * 1000); // 딜레이 시간은 초 단위로 설정
      } else {
        // 'delay' 클래스가 없으면 바로 visible 클래스를 추가
        target.classList.add('visible');
      }
    } else {
      // 요소가 화면에서 벗어나면 'visible' 클래스를 제거
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.5, // 요소가 50% 이상 보일 때 애니메이션 시작
});

// 각 fade-in-box에 대해 옵저버 등록
fadeInBoxes.forEach(box => {
  observer.observe(box);
});
