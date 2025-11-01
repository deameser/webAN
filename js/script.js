document.addEventListener('DOMContentLoaded', function() {
    const selectLang = document.getElementById('langSelect');
    if(selectLang)
    {
        const saved = localStorage.getItem("lang") || "ko";
        selectLang.value = saved;
        setLanguage(saved);

        // 드롭다운이 바뀔 때마다 실행
        selectLang.addEventListener("change", function () {
            const lang = this.value;
            setLanguage(lang);
            localStorage.setItem("lang", lang);
        });
    }
    
    var btn = document.getElementById('goTopBtn');
    if (btn)
    {btn.addEventListener('click', function (e) {
        // 다른 핸들러가 막는 거부터 차단
        e.preventDefault();
        e.stopImmediatePropagation();

        // 스크롤할 가능성 있는 애들 전부 0으로
        var targets = [
            document.scrollingElement,
            document.documentElement,
            document.body,
            document.querySelector('.intro-container'),
            document.querySelector('.container'),
            document.querySelector('main')
        ];

        targets.forEach(function (el) {
            if (!el) return;
            // 부드럽게 되는 애는 이렇게
            try {
                el.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (err) {
                // 안 되는 애는 그냥 강제로
                el.scrollTop = 0;
            }
        });

        // 브라우저 기본 스크롤도 한 번 더
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, true); // ← 여기 중요
    }
})

function setLanguage(lang)
{
    const current = translations[lang];

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        const text = current[key];
        if(text)
        {
            el.textContent = text;
        }
    });
}
function goBack()
{
  window.location.href = './index.html';
  /*
    if (window.history.length > 1) 
    {
        history.back();
        return;
    }
    */
}

function scrollToTop(e) {
    e.preventDefault();

    // 1) 진짜로 스크롤이 나는 요소를 찾는다
    const scrollTarget =
        document.querySelector('.intro-container') ||
        document.querySelector('.container') ||
        document.documentElement;

    scrollTarget.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}