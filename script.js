const circle = document.getElementById('circle');
const circle2 = document.getElementById('circle2');
const secOne = document.getElementById('secOne');
let isDragging = false;
let startX = 0;


function handleDragMove(e) {
    const currentX = e.clientX || e.touches[0].clientX;
    const newLeft = Math.min(Math.max(currentX - startX, 0), window.innerWidth - circle.offsetWidth);
    circle.style.left = newLeft + 'px';

    const circleRightEdge = newLeft + circle.offsetWidth;
    const circle2LeftEdge = circle2.offsetLeft;

    if (circleRightEdge >= circle2LeftEdge) {
        secOne.classList.add('active');
    }
}

circle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
    startX = e.clientX - circle.offsetLeft;
    window.addEventListener('mousemove', handleDragMove);
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    window.removeEventListener('mousemove', handleDragMove);
});

circle.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX - circle.offsetLeft;
    window.addEventListener('touchmove', handleDragMove);
});

window.addEventListener('touchend', () => {
    isDragging = false;
    window.removeEventListener('touchmove', handleDragMove);
});



// Տարեթիվը, մինչև որը պետք է հաշվի առնել մնացած ժամանակը
const targetDate = new Date("March 25, 2025 00:00:00").getTime();

const countdownElement = document.getElementById('countdown');

// Ֆունկցիա, որը հաշվարկում է մնացած ժամանակը
function updateCountdown() {
    const now = new Date().getTime();
    const remainingTime = targetDate - now;

    // Կանխատեսել օրերը, ժամերը, րոպեները և վայրկյանները
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    // Նշանակել հաշվարկը HTML-ում
    countdownElement.innerHTML = `<div>${days} <br/> օր</div>:<div>${hours}<br/> ժամ</div>:<div>${minutes}<br/>  րոպե</div>:<div>${seconds} <br/> վայրկյան</div> `;

    // Երբ ժամանակը ավարտվում է
    if (remainingTime < 0) {
        clearInterval(countdownInterval);  // Դադարեցնում ենք հաշվելու ընթացիկ միջնադիրը
        countdownElement.innerHTML = "Հարսանիքը արդեն տեղի է ունեցել!";
    }
}

// Դրա համար պետք է մի անգամվա միջմիջօրեական տևողություն
const countdownInterval = setInterval(updateCountdown, 1000);


// Գրանցում ենք scroll իրադարձություն, որպեսզի հետևենք, երբ sectionTwoCenter դիվը տեսանելի է դառնում
window.addEventListener('scroll', function () {
    const sectionTwoCenter = document.querySelector('.sectionTwoCenter');

    // Ստուգում ենք, եթե sectionTwoCenter դիվը տեսանելի է էկրանին
    const sectionPosition = sectionTwoCenter.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Երբ sectionTwoCenter-ի վրա մնացած տարածությունը ներառում է 80% պատուհանից, սկսում ենք անիմացիան
    if (sectionPosition <= windowHeight * 0.8) { // 80%-ում դիվը տեսանելի կլինի
        sectionTwoCenter.classList.add('visible');
    } else {
        sectionTwoCenter.classList.remove('visible'); // Եթե դուրս է գալիս տեսադաշտից՝ վերադառնալ դեպի սկզբնական վիճակ
    }
});

// Գրանցում ենք page load իրադարձություն՝ չհաղթահարելու առաջվա անիմացիան:
document.addEventListener('DOMContentLoaded', function () {
    const sectionTwoCenter = document.querySelector('.sectionTwoCenter');

    // Ստուգում ենք, եթե sectionTwoCenter արդեն ցույց է տալիս պատուհանից առաջ
    const sectionPosition = sectionTwoCenter.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionPosition <= windowHeight * 0.8) { // Եթե այն արդեն երևում է, ապա ավելացնում ենք visible
        sectionTwoCenter.classList.add('visible');
    }
});





// Ստեղծում ենք scroll իրադարձության համար, որպեսզի հետևենք, երբ imageTwo տարրը տեսանելի է դառնում
window.addEventListener('scroll', function () {
    const imageTwo = document.querySelector('.imageTwo');

    // Ստուգում ենք, եթե imageTwo տարրը տեսանելի է էկրանին
    const imagePosition = imageTwo.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Երբ imageTwo-ի վրա մնացած տարածությունը ներառում է 80% պատուհանից, սկսում ենք անիմացիան
    if (imagePosition <= windowHeight * 0.8) { // 80%-ում տարրը տեսանելի կլինի
        imageTwo.style.transition = 'opacity 3s, transform 2s'; // Տևողությունը սահմանվում է 2 վայրկյան
        imageTwo.style.opacity = '1'; // Թափանցիկից մգանալ
        imageTwo.style.transform = 'rotate(-10deg)'; // Կրճված ռոտացիա
    } else {
        imageTwo.style.opacity = '0'; // Եթե դուրս է գալիս տեսադաշտից՝ վերադառնալ սկզբնական վիճակին
        imageTwo.style.transform = 'rotate(0deg)'; // Վերադառնալ սկզբնական ռոտացիային
    }
});

// Սկզբնական կարգավորում `imageTwo`-ի համար թափանցիկ լինելու համար
window.addEventListener('DOMContentLoaded', function () {
    const imageTwo = document.querySelector('.imageTwo');
    imageTwo.style.opacity = '0'; // Թաքնված է սկզբում
    imageTwo.style.transform = 'rotate(-50deg)'; // Սկզբնական դիրքը
});



const sectionFour = document.querySelector('.sectionFour');
const hrElements = sectionFour.querySelectorAll('hr');
const pElements = sectionFour.querySelectorAll('p');

const sectionFive = document.querySelector('.sectionFife');
const sectionFivePElements = sectionFive.querySelectorAll('p');

function checkVisibility() {
    const windowHeight = window.innerHeight;

    // Ստուգում ենք sectionFour-ի տեսանելիությունը
    const sectionFourPosition = sectionFour.getBoundingClientRect().top;
    if (sectionFourPosition <= windowHeight * 0.9) {
        sectionFour.classList.add('visible');
    } else {
        sectionFour.classList.remove('visible');
    }

    // sectionFour-ի hr տարրերի opacity փոփոխություն
    hrElements.forEach((hr) => {
        const hrPosition = hr.getBoundingClientRect().top;
        const opacity = 1 - (hrPosition / windowHeight);

        if (hrPosition <= windowHeight * 0.9) {
            hr.style.opacity = Math.min(opacity, 1);
        } else {
            hr.style.opacity = '0';
        }
    });

    // sectionFour-ի p տարրերի opacity փոփոխություն
    pElements.forEach((p) => {
        const pPosition = p.getBoundingClientRect().top;
        const opacity = 1 - (pPosition / windowHeight);

        if (pPosition <= windowHeight * 0.9) {
            p.style.opacity = Math.min(opacity, 1);
        } else {
            p.style.opacity = '0';
        }
    });

    // sectionFive-ի p տարրերի opacity փոփոխություն
    sectionFivePElements.forEach((p) => {
        const pPosition = p.getBoundingClientRect().top;
        const opacity = 1 - (pPosition / windowHeight);

        if (pPosition <= windowHeight * 0.9) {
            p.style.opacity = Math.min(opacity, 1);
        } else {
            p.style.opacity = '0';
        }
    });
}



// Ստեղծում ենք listener-ը սքրոլի դեպքի համար
window.addEventListener('scroll', checkVisibility);


// Գրանցում ենք scroll իրադարձություն, որպեսզի հետևենք, երբ imgDiv տարրը տեսանելի է դառնում
window.addEventListener('scroll', function () {
    const imgDiv = document.querySelector('#imgDiv');

    // Ստուգում ենք, եթե imgDiv տարրը տեսանելի է էկրանին
    const imgDivPosition = imgDiv.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Երբ imgDiv-ի վրա մնացած տարածությունը ներառում է 80% պատուհանից, սկսում ենք անիմացիան
    if (imgDivPosition <= windowHeight * 0.9) { // 80%-ում տարրը տեսանելի կլինի
        // Փոխում ենք opacity և աստիճանաբար մուգ ենք դարձնում
        imgDiv.style.transition = 'opacity 3s ease-in-out';  // Ավելացնում ենք անցման ժամանակ
        imgDiv.style.opacity = '1'; // Դարձնում ենք մուգ
    } else {
        imgDiv.style.opacity = '0'; // Վերադառնում ենք սկզբնական վիճակին
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const secOne = document.getElementById('secOne');
    const body = document.body;

    body.style.overflow = 'hidden';

    document.getElementById('circle').addEventListener('mouseup', function () {
        if (secOne.classList.contains('active')) {
            body.style.overflow = 'auto';
        }
    });

    document.getElementById('circle').addEventListener('touchend', function () {
        if (secOne.classList.contains('active')) {
            body.style.overflow = 'auto';
        }
    });
});
