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

    // ----- 2. Данные друзей -----
    const friends = [
        { name: 'Мама', message: 'С днём рождения, Дочка! Ты — лучшая!', photo: 'img/friends/mama.jpg', video: 'video/friend1.mp4' },
        { name: 'Никита', message: 'Пусть мечты сбываются! Я тебя люблю!', photo: 'img/nikita.jpg', video: 'video/friend2.mp4', audio: 'audio/Nikita.ogg' },
        { name: 'Малика', message: 'Пусть будет только счастье! ❤️', photo: 'img/friends/angelina.jpg', video: 'video/friend5.mp4', audio: 'audio/friend5.ogg' },
        { name: 'Амалия', message: 'Ты — невероятная! Обнимаю)', photo: 'img/friends/malika.jpg', video: 'video/friend3.mp4' },
        { name: 'Эрика', message: 'Ты наше чудо!', photo: 'img/friends/erika.jpg', video: 'video/friend7.mp4', audio: 'audio/friend7.ogg' },
        { name: 'Ирина', message: 'Пусть жизнь будет сладкой, как мёд!', photo: 'img/friends/irina.jpg', video: 'video/friend4.mp4', audio: 'audio/friend4.ogg' },
        { name: 'Кира', message: 'Будь счастлива каждый миг!', photo: 'img/friends/kira.jpg', video: 'video/friend6.mp4', audio: 'audio/friend6.ogg' },
        { name: 'Катя', message: 'Поздравляю от всей души!', photo: 'img/friends/katya.jpg', video: 'video/friend8.mp4', audio: 'audio/friend8.ogg' }
    ];

    // ----- 3. Слайдер (с свайпом и волшебными переходами) -----
    const playBtn = document.getElementById('playSurprise');
    const sliderTrack = document.getElementById('sliderTrack');
    const sliderDots = document.getElementById('sliderDots');
    const slideCounter = document.getElementById('slideCounter');
    const sliderWrapper = document.getElementById('sliderWrapper');

    let currentIndex = 0;
    let isPlaying = false;
    let mediaTimeout = null;
    let totalSlides = friends.length;
    let currentVideo = null;
    let currentAudio = null;
    let isPaused = false;

    // Переменные для свайпа
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let isSwiping = false;
    const swipeThreshold = 40;

    // ----- Создание слайдов -----
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
            fallback.style.cssText = 'display:flex; align-items:center; justify-content:center; font-size:3rem; background:var(--gold); color:#fff; width:120px; height:120px; border-radius:50%; margin:0 auto 0.8rem; border:4px solid var(--gold);';
            this.parentNode.insertBefore(fallback, this);
        };
        img.addEventListener('click', function(e) {
            showToast(`💖 ${f.name} — ты в моём сердце!`);
            launchFirework(e.clientX, e.clientY);
        });
        card.appendChild(img);

        const name = document.createElement('div');
        name.className = 'friend-name';
        name.textContent = f.name;
        name.addEventListener('click', function() {
            showToast(`✨ ${f.name} желает тебе счастья!`);
            launchFirework();
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
            launchFirework();
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

    // ----- Функция перехода -----
    function goToSlide(index, animate = true) {
        if (index < 0 || index >= totalSlides) return;
        if (isPaused) return;

        currentIndex = index;
        const offset = -index * 100;

        if (animate) {
            sliderTrack.classList.add('magic-transition');
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    launchFirework(
                        Math.random() * window.innerWidth,
                        Math.random() * window.innerHeight * 0.3 + 50
                    );
                }, i * 150);
            }
        } else {
            sliderTrack.classList.remove('magic-transition');
        }

        sliderTrack.style.transform = `translateX(${offset}%)`;

        document.querySelectorAll('.slide').forEach((s, i) => {
            s.classList.remove('active');
            if (i === index) {
                setTimeout(() => {
                    s.classList.add('active');
                }, 50);
            }
        });

        document.querySelectorAll('.dot').forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });

        if (slideCounter) {
            slideCounter.textContent = `${index + 1} / ${totalSlides}`;
        }

        updateProgress(index);
        resetMediaOnSlide(index);
    }

    // ----- Прогресс-бар -----
    function updateProgress(index) {
        let progressBar = document.querySelector('.slider-progress-bar');
        if (!progressBar) {
            const progressContainer = document.createElement('div');
            progressContainer.className = 'slider-progress';
            progressContainer.innerHTML = '<div class="slider-progress-bar"></div>';
            const wrapper = document.getElementById('sliderWrapper');
            wrapper.insertBefore(progressContainer, wrapper.firstChild);
            progressBar = document.querySelector('.slider-progress-bar');
        }
        const percent = ((index + 1) / totalSlides) * 100;
        progressBar.style.width = percent + '%';
    }

    // ----- Свайп для мобильных -----
    sliderWrapper.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        isDragging = true;
        isSwiping = false;
    }, { passive: true });

    sliderWrapper.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const diffX = touch.clientX - startX;
        const diffY = touch.clientY - startY;
        if (Math.abs(diffX) > 10 && Math.abs(diffX) > Math.abs(diffY)) {
            isSwiping = true;
        }
    }, { passive: true });

    sliderWrapper.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;

        if (isSwiping) {
            const touch = e.changedTouches[0];
            const diffX = touch.clientX - startX;
            if (Math.abs(diffX) > swipeThreshold) {
                if (diffX < 0 && currentIndex < totalSlides - 1) {
                    pauseMedia();
                    goToSlide(currentIndex + 1);
                } else if (diffX > 0 && currentIndex > 0) {
                    pauseMedia();
                    goToSlide(currentIndex - 1);
                }
            }
            isSwiping = false;
        }
    }, { passive: true });

    // ----- Свайп для десктопа (мышь) -----
    sliderWrapper.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        startY = e.clientY;
        isDragging = true;
        isSwiping = false;
        sliderWrapper.style.cursor = 'grabbing';
    });

    sliderWrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const diffX = e.clientX - startX;
        const diffY = e.clientY - startY;
        if (Math.abs(diffX) > 10 && Math.abs(diffX) > Math.abs(diffY)) {
            isSwiping = true;
        }
    });

    sliderWrapper.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        sliderWrapper.style.cursor = 'grab';

        if (isSwiping) {
            const diffX = e.clientX - startX;
            if (Math.abs(diffX) > swipeThreshold) {
                if (diffX < 0 && currentIndex < totalSlides - 1) {
                    pauseMedia();
                    goToSlide(currentIndex + 1);
                } else if (diffX > 0 && currentIndex > 0) {
                    pauseMedia();
                    goToSlide(currentIndex - 1);
                }
            }
            isSwiping = false;
        }
    });

    // ----- Колесико мыши -----
    let wheelTimeout = null;
    sliderWrapper.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (wheelTimeout) return;

        const delta = e.deltaY;
        if (delta > 20 && currentIndex < totalSlides - 1) {
            pauseMedia();
            goToSlide(currentIndex + 1);
            wheelTimeout = setTimeout(() => { wheelTimeout = null; }, 800);
        } else if (delta < -20 && currentIndex > 0) {
            pauseMedia();
            goToSlide(currentIndex - 1);
            wheelTimeout = setTimeout(() => { wheelTimeout = null; }, 800);
        }
    }, { passive: false });

    // ----- Пауза медиа -----
    function pauseMedia() {
        if (currentVideo) {
            currentVideo.pause();
        }
        if (currentAudio) {
            currentAudio.pause();
        }
        isPaused = true;
        clearTimeout(mediaTimeout);
        mediaTimeout = setTimeout(() => {
            isPaused = false;
            if (currentVideo && !currentVideo.ended) {
                currentVideo.play().catch(() => {});
            }
        }, 3000);
    }

    // ----- Сброс медиа -----
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
            if (mediaBlock) {
                mediaBlock.classList.add('visible');
                launchFirework(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight * 0.2 + 50
                );
            }
            setTimeout(() => {
                if (video && !isPaused) {
                    video.muted = false;
                    video.play().catch(e => console.warn('Видео не запустилось:', e));
                    video.onended = function() {
                        if (audio && !isPaused) {
                            audio.play().catch(e => console.warn('Аудио не запустилось:', e));
                            audio.onended = function() {
                                if (currentIndex < totalSlides - 1 && !isPaused) {
                                    goToSlide(currentIndex + 1);
                                } else if (currentIndex === totalSlides - 1) {
                                    finishSurprise();
                                }
                            };
                        } else {
                            if (currentIndex < totalSlides - 1 && !isPaused) {
                                goToSlide(currentIndex + 1);
                            } else if (currentIndex === totalSlides - 1) {
                                finishSurprise();
                            }
                        }
                    };
                } else if (audio && !isPaused) {
                    audio.play().catch(e => console.warn('Аудио не запустилось:', e));
                    audio.onended = function() {
                        if (currentIndex < totalSlides - 1 && !isPaused) {
                            goToSlide(currentIndex + 1);
                        } else if (currentIndex === totalSlides - 1) {
                            finishSurprise();
                        }
                    };
                } else if (!video && !audio) {
                    setTimeout(() => {
                        if (currentIndex < totalSlides - 1 && !isPaused) {
                            goToSlide(currentIndex + 1);
                        } else if (currentIndex === totalSlides - 1) {
                            finishSurprise();
                        }
                    }, 2000);
                }
            }, 400);
        }, 1000);
    }

    // ----- Завершение сюрприза -----
    function finishSurprise() {
        document.body.style.overflow = '';
        playBtn.textContent = '🎉 Все поздравления просмотрены!';
        playBtn.style.background = '#B8A898';
        playBtn.disabled = true;

        const finalSlide = document.createElement('div');
        finalSlide.className = 'slide';
        finalSlide.innerHTML = `
            <div class="friend-card" style="background: #FFF8F0; border-color: var(--gold);">
                <div class="friend-name" style="font-size: 2.8rem;">💖 Спасибо всем! 💖</div>
                <div class="friend-greeting" style="font-size: 1.6rem;">Ты — самая любимая!</div>
                <div style="margin: 1rem 0; font-size: 2.2rem; font-family: 'Great Vibes', cursive; color: var(--gold-dark);">#КоролеваВладислава 👑</div>
                <div style="font-size: 1.2rem; color: #a67c4e;">С днём рождения!</div>
            </div>
        `;
        sliderTrack.appendChild(finalSlide);
        goToSlide(totalSlides);
        for (let i = 0; i < 8; i++) {
            setTimeout(() => launchFirework(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight * 0.5 + 80
            ), i * 400);
        }
    }

    // ----- Запуск -----
    playBtn.addEventListener('click', function() {
        if (isPlaying) return;
        isPlaying = true;
        document.body.style.overflow = 'hidden';
        playBtn.style.display = 'none';
        goToSlide(0, false);
        resetMediaOnSlide(0);
        const hint = document.querySelector('.swipe-hint');
        if (hint) {
            setTimeout(() => {
                hint.style.opacity = '0';
                setTimeout(() => { hint.style.display = 'none'; }, 500);
            }, 5000);
        }
        for (let i = 0; i < 4; i++) {
            setTimeout(() => launchFirework(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight * 0.4 + 80
            ), i * 400);
        }
    });

    // ----- 4. Переключение фото -----
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
            launchFirework(e.clientX, e.clientY);
        } else {
            img.classList.add('switching');
            setTimeout(() => {
                img.src = 'img/childhood.jpg';
                img.classList.remove('switching');
            }, 300);
            isAdult = false;
            showToast('🌸 И снова маленькая принцесса!');
            launchConfetti(20);
            launchFirework(e.clientX, e.clientY);
        }
    });

    // ----- 5. Конфетти -----
    function launchConfetti(count) {
        const colors = ['#E8B84B', '#F5D06A', '#FF6B6B', '#FFB8B8', '#FFD93D', '#6BCB77', '#4D96FF'];
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

    // ----- 6. Салюты -----
    function launchFirework(x, y) {
        const container = document.getElementById('fireworks-container');
        if (!container) return;

        const cx = x || Math.random() * window.innerWidth;
        const cy = y || Math.random() * window.innerHeight * 0.5 + 80;
        const colors = ['#E8B84B', '#F5D06A', '#FF6B6B', '#FFB8B8', '#FFD93D', '#6BCB77', '#4D96FF', '#FF8A8A', '#FFD700', '#FF69B4'];

        const particleCount = 30 + Math.floor(Math.random() * 30);
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            const size = Math.random() * 6 + 3;
            const angle = Math.random() * Math.PI * 2;
            const distance = 40 + Math.random() * 140;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance - 30;

            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.left = cx + 'px';
            particle.style.top = cy + 'px';
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            particle.style.boxShadow = `0 0 ${size * 2}px ${particle.style.background}`;
            particle.style.animationDuration = (0.8 + Math.random() * 0.8) + 's';
            particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';

            container.appendChild(particle);
            setTimeout(() => particle.remove(), 2000);
        }

        for (let i = 0; i < 12; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'firework-sparkle';
            const size = Math.random() * 4 + 2;
            const angle = Math.random() * Math.PI * 2;
            const distance = 15 + Math.random() * 70;

            sparkle.style.width = size + 'px';
            sparkle.style.height = size + 'px';
            sparkle.style.background = '#FFE88A';
            sparkle.style.left = (cx + Math.cos(angle) * distance) + 'px';
            sparkle.style.top = (cy + Math.sin(angle) * distance) + 'px';
            sparkle.style.borderRadius = '50%';
            sparkle.style.boxShadow = '0 0 10px #FFE88A';
            sparkle.style.animationDuration = (1 + Math.random() * 0.8) + 's';

            container.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 2000);
        }
    }

    // ----- 7. Интерактивные слова -----
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
                star.style.color = ['#E8B84B', '#F5D06A', '#FFD93D', '#FF6B6B'][Math.floor(Math.random() * 4)];
                document.body.appendChild(star);
                setTimeout(() => star.remove(), 1500);
            }
            launchFirework(e.clientX, e.clientY);
        });
    });

    // ----- 8. Моя песня -----
    const playMySongBtn = document.getElementById('playMySong');
    const myAudio = document.getElementById('myAudio');
    const vinylRecord = document.getElementById('vinylRecord');

    if (playMySongBtn && myAudio) {
        let isSongPlaying = false;

        playMySongBtn.addEventListener('click', function() {
            if (!isSongPlaying) {
                myAudio.play().catch(e => console.warn('Аудио не запустилось:', e));
                vinylRecord.classList.add('playing');
                this.textContent = '⏸ Пауза';
                isSongPlaying = true;
                showToast('🎵 Слушай песню от Никиты!');
                launchConfetti(20);
                for (let i = 0; i < 4; i++) {
                    setTimeout(() => launchFirework(
                        Math.random() * window.innerWidth,
                        Math.random() * window.innerHeight * 0.5 + 100
                    ), i * 500);
                }

                myAudio.onended = function() {
                    vinylRecord.classList.remove('playing');
                    playMySongBtn.textContent = '🎵 Включить песню';
                    isSongPlaying = false;
                    showToast('💖 Песня закончилась, но моя любовь к тебе — вечна!');
                    launchConfetti(30);
                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => launchFirework(
                            Math.random() * window.innerWidth,
                            Math.random() * window.innerHeight * 0.4 + 100
                        ), i * 400);
                    }
                };
            } else {
                myAudio.pause();
                vinylRecord.classList.remove('playing');
                this.textContent = '🎵 Включить песню';
                isSongPlaying = false;
            }
        });
    }

    // ----- 9. Свиток предсказаний -----
    const predictions = [
        { text: 'В этом году тебя ждёт невероятное путешествие, полное радости и открытий!', from: 'Судьба' },
        { text: 'Твоя улыбка озарит мир ярче солнца, и все мечты сбудутся.', from: 'Звёзды' },
        { text: 'Ты встретишь много новых друзей, которые принесут в твою жизнь свет и счастье.', from: 'Вселенная' },
        { text: 'Любовь будет окружать тебя каждый день, как самый тёплый плед.', from: 'Сердце' },
        { text: 'Твой талант раскроется в новом деле, и ты достигнешь высот!', from: 'Вдохновение' },
        { text: 'Каждый день будет приносить маленькое чудо – просто оглянись вокруг.', from: 'Магия' },
        { text: 'Ты станешь ещё сильнее и мудрее, а все трудности обернутся опытом.', from: 'Жизнь' },
        { text: 'Счастье придёт в твой дом и останется там навсегда.', from: 'Домовой' },
        { text: 'Твоя мечта обязательно сбудется, просто верь в неё.', from: 'Мечта' },
        { text: 'Ты подаришь миру столько тепла, сколько сама получаешь от близких.', from: 'Сердце' },
        { text: 'Новый год жизни начнётся с яркой, счастливой ноты!', from: 'Муза' },
        { text: 'Пусть каждый твой шаг будет лёгким, а дорога – освещена золотом.', from: 'Золотой свет' }
    ];

    const scrollIcon = document.getElementById('scrollIcon');
    const scrollResult = document.getElementById('scrollResult');
    const predictionText = document.getElementById('predictionText');
    const predictionFrom = document.getElementById('predictionFrom');
    const historyList = document.getElementById('historyList');
    let usedIndices = [];

    function getRandomPrediction() {
        if (usedIndices.length >= predictions.length) {
            usedIndices = [];
            historyList.innerHTML = '';
        }
        let idx;
        do {
            idx = Math.floor(Math.random() * predictions.length);
        } while (usedIndices.includes(idx));
        usedIndices.push(idx);
        return predictions[idx];
    }

    if (scrollIcon) {
        scrollIcon.addEventListener('click', function() {
            const pred = getRandomPrediction();
            predictionText.textContent = pred.text;
            predictionFrom.textContent = `— ${pred.from}`;
            scrollResult.classList.add('show');
            const li = document.createElement('li');
            li.innerHTML = `<span class="highlight">${pred.from}</span>: ${pred.text}`;
            historyList.appendChild(li);
            historyList.scrollTop = historyList.scrollHeight;
            launchConfetti(10);
            showToast(`✨ Предсказание от ${pred.from} ✨`);
            launchFirework();
        });
    }

    // ----- 10. ГАЛЕРЕЯ ПОЖЕЛАНИЙ -----
    const wishes = [
        { text: 'Будь счастлива каждый день, как этот!', from: 'Мама' },
        { text: 'Пусть все твои мечты сбываются!', from: 'Никита' },
        { text: 'Ты — самое лучшее, что случилось с нами!', from: 'Подруги' },
        { text: 'Сияй ярче всех звёзд на небе!', from: 'Семья' },
        { text: 'Пусть удача всегда идёт с тобой рядом!', from: 'Друзья' },
        { text: 'Любви тебе бесконечной и искренней!', from: 'Сердце' },
        { text: 'Ты достойна самого лучшего в этом мире!', from: 'Вселенная' },
        { text: 'С днём рождения, наша королева! 👑', from: 'Все' }
    ];

    const wishesGrid = document.getElementById('wishesGrid');
    const wishesComplete = document.getElementById('wishesComplete');
    let openedWishes = 0;
    const totalWishes = wishes.length;

    wishes.forEach((wish, index) => {
        const star = document.createElement('div');
        star.className = 'wish-star';
        star.dataset.index = index;
        star.innerHTML = `
            <span class="star-icon">⭐</span>
            <span class="star-label">${wish.from}</span>
            <div class="wish-text">${wish.text}</div>
            <div class="wish-from">— ${wish.from}</div>
        `;
        star.addEventListener('click', function() {
            if (!this.classList.contains('opened')) {
                this.classList.add('opened');
                openedWishes++;
                showToast(`✨ Пожелание от ${wish.from}: ${wish.text}`);
                launchConfetti(15);
                launchFirework();
                if (openedWishes === totalWishes) {
                    wishesComplete.style.display = 'block';
                    launchConfetti(40);
                    showToast('🎉 Ты открыла все пожелания! Ты — самая любимая!');
                    for (let i = 0; i < 8; i++) {
                        setTimeout(() => launchFirework(
                            Math.random() * window.innerWidth,
                            Math.random() * window.innerHeight * 0.5 + 100
                        ), i * 400);
                    }
                }
            }
        });
        wishesGrid.appendChild(star);
    });

    // ----- 11. Тосты -----
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

    // ----- 12. МАГИЧЕСКАЯ МУЗЫКА ДЛЯ СВИТКА -----
    const predictionsSection = document.getElementById('predictions');
    const magicAudio = document.getElementById('magicAudio');
    let isMagicMusicPlaying = false;

    if (predictionsSection && magicAudio) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!isMagicMusicPlaying) {
                        magicAudio.play().catch(e => {
                            console.warn('Автозапуск музыки заблокирован:', e);
                            showToast('🎵 Нажми на свиток, чтобы включить волшебную музыку!');
                        });
                        isMagicMusicPlaying = true;
                        showToast('🎵 Волшебная музыка свитка начинает играть...');
                        setTimeout(() => launchFirework(
                            Math.random() * window.innerWidth,
                            Math.random() * window.innerHeight * 0.3 + 50
                        ), 300);
                    }
                } else {
                    if (isMagicMusicPlaying) {
                        magicAudio.pause();
                        magicAudio.currentTime = 0;
                        isMagicMusicPlaying = false;
                        showToast('🔇 Волшебная музыка стихла...');
                    }
                }
            });
        }, {
            threshold: 0.25
        });

        observer.observe(predictionsSection);

        if (scrollIcon) {
            scrollIcon.addEventListener('click', function() {
                if (!isMagicMusicPlaying) {
                    magicAudio.play().catch(e => console.warn('Не удалось запустить музыку:', e));
                    isMagicMusicPlaying = true;
                }
            });
        }

        document.addEventListener('click', function() {
            if (isMagicMusicPlaying && magicAudio.paused) {
                magicAudio.play().catch(e => console.warn('Не удалось запустить музыку:', e));
            }
        }, { once: true });
    }

    // ----- 13. Автоматический фейерверк -----
    setInterval(() => {
        if (Math.random() > 0.6) {
            launchFirework(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight * 0.4 + 60
            );
        }
    }, 10000);

    // ----- Инициализация -----
    goToSlide(0, false);
    console.log('Сайт готов! С Днём Рождения, Владислава! 👑');

    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => launchFirework(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight * 0.4 + 100
            ), i * 500);
        }
    }, 1000);
})();