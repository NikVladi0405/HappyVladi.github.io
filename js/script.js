(function() {
    'use strict';

    // ----- 1. Фоновые частицы и шары -----
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 80 + 20;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDuration = (Math.random() * 10 + 8) + 's';
        p.style.animationDelay = (Math.random() * 5) + 's';
        particlesContainer.appendChild(p);
    }

    const ballsContainer = document.getElementById('floating-balls');
    for (let i = 0; i < 10; i++) {
        const ball = document.createElement('div');
        ball.className = 'ball';
        const size = Math.random() * 60 + 20;
        ball.style.width = size + 'px';
        ball.style.height = size + 'px';
        ball.style.left = Math.random() * 100 + '%';
        ball.style.top = Math.random() * 100 + '%';
        ball.style.animationDuration = (Math.random() * 6 + 6) + 's';
        ball.style.animationDelay = (Math.random() * 4) + 's';
        ball.style.opacity = Math.random() * 0.2 + 0.05;
        ballsContainer.appendChild(ball);
    }

    // ----- 2. Данные друзей (ваши изменения) -----
    const friends = [
        { name: 'Мама', message: 'С днём рождения, Дочка! Ты — лучшая!', photo: 'img/friends/mama.jpg', video: 'video/friend1.mp4' },
        { name: 'Никита', message: 'Пусть мечты сбываются! Я тебя люблю!', photo: 'img/nikita.jpg', video: 'video/friend2.mp4', audio: 'audio/Nikita.ogg' },
        { name: 'Малика', message: 'Пусть будет только счастье! ❤️', photo: 'img/friends/angelina.jpg', video: 'video/friend5.mp4', audio: 'audio/friend5.mp3' },
        { name: 'Амалия', message: 'Ты — невероятная! Обнимаю)', photo: 'img/friends/malika.jpg', video: 'video/friend3.mp4' },
        { name: 'Эрика', message: 'Ты наше чудо!', photo: 'img/friends/erika.jpg', video: 'video/friend7.mp4', audio: 'audio/friend7.mp3' },
        { name: 'Ирина', message: 'Пусть жизнь будет сладкой, как мёд!', photo: 'img/friends/irina.jpg', video: 'video/friend4.mp4', audio: 'audio/friend4.mp3' },
        { name: 'Кира', message: 'Будь счастлива каждый миг!', photo: 'img/friends/kira.jpg', video: 'video/friend6.mp4', audio: 'audio/friend6.mp3' },
        { name: 'Катя', message: 'Поздравляю от всей души!', photo: 'img/friends/katya.jpg', video: 'video/friend8.mp4', audio: 'audio/friend8.mp3' }
    ];

    // ----- 3. DOM-элементы для слайдера -----
    const playBtn = document.getElementById('playSurprise');
    const sliderTrack = document.getElementById('sliderTrack');
    const sliderDots = document.getElementById('sliderDots');
    const slideCounter = document.getElementById('slideCounter');
    const sliderNav = document.getElementById('sliderNav');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const skipBtn = document.getElementById('skipBtn');

    let currentIndex = 0;
    let isPlaying = false;
    let mediaTimeout = null;
    let totalSlides = friends.length;
    let currentVideo = null;
    let currentAudio = null;

    // ----- 4. Создание слайдов -----
    friends.forEach((f, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        if (index === 0) slide.classList.add('active');

        const card = document.createElement('div');
        card.className = 'friend-card';

        const img = document.createElement('img');
        img.className = 'friend-photo';
        img.src = f.photo || 'img/default-avatar.jpg';
        img.alt = f.name;
        img.loading = 'lazy';
        img.onerror = function() {
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'friend-photo fallback';
            fallback.textContent = f.name.charAt(0);
            fallback.style.cssText = 'display:flex; align-items:center; justify-content:center; font-size:3rem; background:var(--gold); color:#fff; width:130px; height:130px; border-radius:50%; margin:0 auto 0.8rem; border:4px solid var(--gold);';
            this.parentNode.insertBefore(fallback, this);
        };
        img.addEventListener('click', function(e) {
            showToast(`💖 ${f.name} — ты в моём сердце!`);
        });
        card.appendChild(img);

        const name = document.createElement('div');
        name.className = 'friend-name';
        name.textContent = f.name;
        name.addEventListener('click', function() {
            showToast(`✨ ${f.name} желает тебе счастья!`);
        });
        card.appendChild(name);

        const sub = document.createElement('div');
        sub.className = 'friend-greeting';
        sub.textContent = `💌 Поздравление от ${f.name}`;
        card.appendChild(sub);

        const msg = document.createElement('div');
        msg.className = 'friend-message';
        msg.textContent = f.message;
        msg.addEventListener('click', function() {
            showToast(`📝 "${f.message}"`);
        });
        card.appendChild(msg);

        const mediaBlock = document.createElement('div');
        mediaBlock.className = 'media-block';
        mediaBlock.dataset.index = index;

        if (f.video) {
            const video = document.createElement('video');
            video.src = f.video;
            video.controls = true;
            video.muted = true;
            video.preload = 'auto';
            video.playsInline = true;
            video.width = 280;
            video.dataset.index = index;
            mediaBlock.appendChild(video);
        }

        if (f.audio) {
            const audio = document.createElement('audio');
            audio.src = f.audio;
            audio.controls = true;
            audio.preload = 'auto';
            audio.dataset.index = index;
            mediaBlock.appendChild(audio);
        }

        card.appendChild(mediaBlock);
        slide.appendChild(card);
        sliderTrack.appendChild(slide);

        const dot = document.createElement('button');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.dataset.index = index;
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });

    // ----- 5. Функции слайдера -----
    function goToSlide(index, animate = true) {
        if (index < 0 || index >= totalSlides) return;
        currentIndex = index;
        const offset = -index * 100;
        sliderTrack.style.transition = animate ? 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none';
        sliderTrack.style.transform = `translateX(${offset}%)`;

        document.querySelectorAll('.slide').forEach((s, i) => {
            s.classList.toggle('active', i === index);
        });
        document.querySelectorAll('.dot').forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
        slideCounter.textContent = `${index + 1} / ${totalSlides}`;
        prevBtn.disabled = (index === 0);
        nextBtn.disabled = (index === totalSlides - 1);

        resetMediaOnSlide(index);
    }

    function resetMediaOnSlide(index) {
        if (currentVideo) { currentVideo.pause(); currentVideo.currentTime = 0; }
        if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
        clearTimeout(mediaTimeout);

        const slides = document.querySelectorAll('.slide');
        const slide = slides[index];
        const mediaBlock = slide.querySelector('.media-block');
        const video = mediaBlock ? mediaBlock.querySelector('video') : null;
        const audio = mediaBlock ? mediaBlock.querySelector('audio') : null;

        if (mediaBlock) mediaBlock.classList.remove('visible');

        currentVideo = video;
        currentAudio = audio;

        mediaTimeout = setTimeout(() => {
            if (mediaBlock) mediaBlock.classList.add('visible');
            setTimeout(() => {
                if (video) {
                    video.muted = false;
                    video.play().catch(e => console.warn('Видео не запустилось:', e));
                    video.onended = function() {
                        if (audio) {
                            audio.play().catch(e => console.warn('Аудио не запустилось:', e));
                            audio.onended = function() {
                                if (currentIndex < totalSlides - 1) {
                                    goToSlide(currentIndex + 1);
                                } else {
                                    finishSurprise();
                                }
                            };
                        } else {
                            if (currentIndex < totalSlides - 1) {
                                goToSlide(currentIndex + 1);
                            } else {
                                finishSurprise();
                            }
                        }
                    };
                } else if (audio) {
                    audio.play().catch(e => console.warn('Аудио не запустилось:', e));
                    audio.onended = function() {
                        if (currentIndex < totalSlides - 1) {
                            goToSlide(currentIndex + 1);
                        } else {
                            finishSurprise();
                        }
                    };
                } else {
                    setTimeout(() => {
                        if (currentIndex < totalSlides - 1) {
                            goToSlide(currentIndex + 1);
                        } else {
                            finishSurprise();
                        }
                    }, 2000);
                }
            }, 300);
        }, 1200);
    }

    function finishSurprise() {
        document.body.style.overflow = '';
        playBtn.textContent = '🎉 Все поздравления просмотрены!';
        playBtn.style.background = '#8b6b4a';
        playBtn.disabled = true;
        sliderNav.style.display = 'none';
        const finalSlide = document.createElement('div');
        finalSlide.className = 'slide';
        finalSlide.innerHTML = `
            <div class="friend-card" style="background: #fff5e6; border-color: var(--gold);">
                <div class="friend-name" style="font-size: 2.6rem;">💖 Спасибо всем! 💖</div>
                <div class="friend-greeting" style="font-size: 1.6rem;">Ты — самая любимая!</div>
                <div style="margin: 1rem 0; font-size: 2rem; font-family: 'Dancing Script', cursive; color: var(--gold-dark);">#КоролеваВладислава 👑</div>
                <div style="font-size: 1.2rem; color: #a67c4e;">С днём рождения!</div>
            </div>
        `;
        sliderTrack.appendChild(finalSlide);
        goToSlide(totalSlides);
        document.querySelector('.slider-controls').style.display = 'none';
        document.querySelector('.slider-dots').style.display = 'none';
    }

    playBtn.addEventListener('click', function() {
        if (isPlaying) return;
        isPlaying = true;
        document.body.style.overflow = 'hidden';
        playBtn.style.display = 'none';
        sliderNav.style.display = 'flex';
        goToSlide(0, false);
        resetMediaOnSlide(0);
    });

    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            if (currentVideo) { currentVideo.pause(); currentVideo.currentTime = 0; }
            if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
            clearTimeout(mediaTimeout);
            goToSlide(currentIndex - 1);
            resetMediaOnSlide(currentIndex);
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentIndex < totalSlides - 1) {
            if (currentVideo) { currentVideo.pause(); currentVideo.currentTime = 0; }
            if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
            clearTimeout(mediaTimeout);
            goToSlide(currentIndex + 1);
            resetMediaOnSlide(currentIndex);
        }
    });

    skipBtn.addEventListener('click', function() {
        if (currentIndex < totalSlides - 1) {
            if (currentVideo) { currentVideo.pause(); currentVideo.currentTime = 0; }
            if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
            clearTimeout(mediaTimeout);
            goToSlide(currentIndex + 1);
            resetMediaOnSlide(currentIndex);
        } else {
            finishSurprise();
        }
    });

    // ----- 6. Переключение фото детство/взрослая -----
    const childhoodPhoto = document.getElementById('childhoodPhoto');
    const img = childhoodPhoto.querySelector('img');
    let isAdult = false;

    if (!img.dataset.adult) {
        img.dataset.adult = 'img/vlada.jpg';
    }

    childhoodPhoto.addEventListener('click', function(e) {
        const adultSrc = img.dataset.adult;
        if (!isAdult) {
            img.classList.add('switching');
            setTimeout(() => {
                img.src = adultSrc;
                img.classList.remove('switching');
            }, 300);
            isAdult = true;
            showToast('🌹 А вот и взрослая Влада! Какая красивая!');
            launchConfetti(20);
        } else {
            img.classList.add('switching');
            setTimeout(() => {
                img.src = 'img/childhood.jpg';
                img.classList.remove('switching');
            }, 300);
            isAdult = false;
            showToast('🌸 И снова маленькая принцесса!');
            launchConfetti(20);
        }
    });

    // ----- 7. Конфетти -----
    function launchConfetti(count) {
        const colors = ['#d4af37', '#f0d080', '#ff6b6b', '#ffb8b8', '#ffd93d', '#6bcb77', '#4d96ff'];
        for (let i = 0; i < count; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            const size = Math.random() * 8 + 4;
            piece.style.width = size + 'px';
            piece.style.height = size + 'px';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.left = (Math.random() * 100) + '%';
            piece.style.top = '-10px';
            piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            piece.style.transform = `rotate(${Math.random() * 360}deg)`;
            piece.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
            piece.style.animationDelay = (Math.random() * 1) + 's';
            document.body.appendChild(piece);
            setTimeout(() => piece.remove(), 3000);
        }
    }

    // ----- 8. Игра "Переверни карточку" -----
    let openedCards = 0;
    const totalCards = document.querySelectorAll('.memory-card').length;
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const secretMsg = document.getElementById('secretMessage');

    document.querySelectorAll('.memory-card').forEach(card => {
        card.addEventListener('click', function() {
            if (!this.classList.contains('flipped')) {
                this.classList.add('flipped');
                openedCards++;
                updateProgress();
                const secret = this.dataset.secret || 'Секрет!';
                showToast(`💌 ${secret}`);
                if (openedCards === totalCards) {
                    secretMsg.style.display = 'block';
                    launchConfetti(40);
                    showToast('🎉 Ты открыла все секреты! Ты — супер!');
                }
            }
        });
    });

    function updateProgress() {
        const percent = (openedCards / totalCards) * 100;
        progressBar.style.width = percent + '%';
        progressText.textContent = `${openedCards} / ${totalCards}`;
    }

    // ----- 9. Интерактивные слова -----
    document.querySelectorAll('.interactive-word').forEach(word => {
        word.addEventListener('click', function(e) {
            const toast = this.dataset.toast || '✨ Магия!';
            showToast(toast);
            for (let i = 0; i < 8; i++) {
                const star = document.createElement('div');
                star.className = 'star-burst';
                star.textContent = ['✦', '✧', '✶', '✵', '✴'][Math.floor(Math.random() * 5)];
                star.style.left = (e.clientX + (Math.random() - 0.5) * 80) + 'px';
                star.style.top = (e.clientY + (Math.random() - 0.5) * 80) + 'px';
                star.style.color = ['#d4af37', '#f0d080', '#ffd93d', '#ff6b6b'][Math.floor(Math.random() * 4)];
                document.body.appendChild(star);
                setTimeout(() => star.remove(), 1500);
            }
        });
    });

    // ----- 10. Викторина -----
    const quizData = [
        { question: 'Какого числа день рождения у Влады?', options: ['7 июля', '8 июня', '9 августа'], correct: 0 },
        { question: 'Какое любимое блюдо Влады?', options: ['Пицца', 'Суши', 'Паста'], correct: 1 },
        { question: 'Какой цвет больше всего любит Влада?', options: ['Розовый', 'Золотой', 'Синий'], correct: 1 },
        { question: 'Где Влада и Никита познакомились?', options: ['В университете', 'В парке', 'На работе'], correct: 0 }
    ];
    let currentQuiz = 0;
    let quizScore = 0;
    const quizQuestion = document.getElementById('quizQuestion');
    const quizOptions = document.getElementById('quizOptions');
    const quizResult = document.getElementById('quizResult');
    const quizNextBtn = document.getElementById('quizNextBtn');

    function loadQuiz() {
        const q = quizData[currentQuiz];
        quizQuestion.textContent = q.question;
        quizOptions.innerHTML = '';
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.textContent = opt;
            btn.dataset.idx = idx;
            btn.addEventListener('click', () => checkAnswer(btn, idx));
            quizOptions.appendChild(btn);
        });
        quizResult.style.display = 'none';
        quizNextBtn.style.display = 'none';
        quizResult.textContent = '';
    }

    function checkAnswer(btn, idx) {
        const correct = quizData[currentQuiz].correct;
        const allBtns = quizOptions.querySelectorAll('button');
        allBtns.forEach(b => b.disabled = true);

        if (idx === correct) {
            btn.classList.add('correct');
            quizScore++;
            showToast('✅ Правильно! Ты знаешь Владу!');
        } else {
            btn.classList.add('wrong');
            allBtns[correct].classList.add('correct');
            showToast('❌ Не совсем так, но теперь ты знаешь!');
        }
        quizResult.style.display = 'block';
        quizResult.textContent = `Правильных ответов: ${quizScore} из ${currentQuiz + 1}`;
        if (currentQuiz < quizData.length - 1) {
            quizNextBtn.style.display = 'inline-block';
            quizNextBtn.textContent = 'Следующий вопрос';
        } else {
            quizNextBtn.style.display = 'inline-block';
            quizNextBtn.textContent = '🎉 Узнать результат!';
        }
    }

    quizNextBtn.addEventListener('click', function() {
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            const total = quizData.length;
            const percent = Math.round((quizScore / total) * 100);
            let message = '';
            if (percent === 100) message = 'Ты знаешь Владу на 100%! Ты — лучшая подруга! ❤️';
            else if (percent >= 75) message = 'Ты очень хорошо знаешь Владу! Молодец! ✨';
            else if (percent >= 50) message = 'Неплохо, но ты можешь узнать её ещё лучше! 😉';
            else message = 'Наверное, ты не Влада 😂, но спасибо за участие!';
            quizQuestion.textContent = '🎊 Ты прошла викторину!';
            quizOptions.innerHTML = '';
            quizResult.style.display = 'block';
            quizResult.textContent = `Твой результат: ${quizScore} из ${total} (${percent}%). ${message}`;
            quizNextBtn.style.display = 'none';
            launchConfetti(30);
            showToast('🎉 Спасибо за участие в викторине!');
        }
    });
    loadQuiz();

    // ----- 11. Сбор сердечек -----
    let heartsCollected = 0;
    const heartCountDisplay = document.getElementById('heartCount');
    const heartsDisplay = document.getElementById('heartsDisplay');

    function generateHearts() {
        heartsDisplay.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            const span = document.createElement('span');
            span.className = 'hearts-collect';
            span.textContent = i < heartsCollected ? '❤️' : '🖤';
            span.dataset.index = i;
            span.addEventListener('click', function() {
                if (this.textContent === '🖤') {
                    this.textContent = '❤️';
                    heartsCollected++;
                    heartCountDisplay.textContent = heartsCollected;
                    showToast('❤️ Сердечко собрано!');
                    if (heartsCollected === 10) {
                        showToast('🎉 Ты собрала все сердечки! Ты — королева сердец! 👑');
                        launchConfetti(50);
                    }
                }
            });
            heartsDisplay.appendChild(span);
        }
    }
    generateHearts();

    // ----- 12. Тосты -----
    function showToast(text) {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = text;
        toast.classList.add('show');
        clearTimeout(toast._hideTimer);
        toast._hideTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // ----- Инициализация -----
    goToSlide(0, false);
    sliderNav.style.display = 'none';
    console.log('Сайт готов! С Днём Рождения, Владислава! 👑');
})();