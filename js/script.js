(function() {
    'use strict';

    // ----- 1. Частицы -----
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

    // ----- 2. Данные друзей (первый — мама) -----
    // Для каждого можно указать фото (положите в img/friends/ с тем же именем, например, mama.jpg)
    const friends = [
        { name: 'Мама', message: 'С днём рождения, Дочка! Ты — солнце!', photo: 'img/friends/mama.jpg', video: 'video/friend1.mp4', audio: 'audio/friend1.mp3' },
        { name: 'Никита', message: 'Пусть мечты сбываются!', photo: 'img/friends/nikita.jpg', video: 'video/nikita.mp4', audio: 'audio/Nikita.ogg' },
        { name: 'Малика', message: 'Ты — невероятная! Обнимаю)', photo: 'img/friends/malika.jpg', video: 'video/friend3.mp4', audio: 'audio/friend3.mp3' },
        { name: 'Ирина', message: 'Пусть жизнь будет сладкой, как мёд!', photo: 'img/friends/irina.jpg', video: 'video/friend4.mp4', audio: 'audio/friend4.mp3' },
        { name: 'Ангелина', message: 'Самой красивой невесте! ❤️', photo: 'img/friends/angelina.jpg', video: 'video/friend5.mp4', audio: 'audio/friend5.mp3' },
        { name: 'Кира', message: 'Будь счастлива каждый миг!', photo: 'img/friends/kira.jpg', video: 'video/friend6.mp4', audio: 'audio/friend6.mp3' },
        { name: 'Эрика', message: 'Люблю тебя! Ты — чудо!', photo: 'img/friends/erika.jpg', video: 'video/friend7.mp4', audio: 'audio/friend7.mp3' },
        { name: 'Катя', message: 'Поздравляю от всей души!', photo: 'img/friends/katya.jpg', video: 'video/friend8.mp4', audio: 'audio/friend8.mp3' }
    ];

    // ----- 3. DOM-элементы -----
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
    let autoPlayTimer = null;
    let mediaTimeout = null;
    let totalSlides = friends.length;

    // Храним ссылки на текущие медиа-элементы для управления
    let currentVideo = null;
    let currentAudio = null;

    // ----- 4. Создание слайдов и точек -----
    friends.forEach((f, index) => {
        // Слайд
        const slide = document.createElement('div');
        slide.className = 'slide';
        if (index === 0) slide.classList.add('active');

        const card = document.createElement('div');
        card.className = 'friend-card';

        // Фото
        const img = document.createElement('img');
        img.className = 'friend-photo';
        img.src = f.photo || 'img/default-avatar.jpg'; // если фото нет
        img.alt = f.name;
        img.loading = 'lazy';
        // Если фото не загрузится, покажем инициалы
        img.onerror = function() {
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'friend-photo fallback';
            fallback.textContent = f.name.charAt(0);
            fallback.style.cssText = 'display:flex; align-items:center; justify-content:center; font-size:3rem; background:#d4af37; color:#fff;';
            this.parentNode.insertBefore(fallback, this);
        };
        card.appendChild(img);

        // Имя
        const name = document.createElement('div');
        name.className = 'friend-name';
        name.textContent = f.name;
        card.appendChild(name);

        // Подпись "Поздравление от ..."
        const sub = document.createElement('div');
        sub.className = 'friend-greeting';
        sub.textContent = `💌 Поздравление от ${f.name}`;
        card.appendChild(sub);

        // Сообщение (дополнительно)
        const msg = document.createElement('div');
        msg.className = 'friend-message';
        msg.textContent = f.message;
        msg.style.cssText = 'font-size:1rem; color:#5a4a4a; margin:0.2rem 0 0.5rem;';
        card.appendChild(msg);

        // Блок для медиа (видео и аудио)
        const mediaBlock = document.createElement('div');
        mediaBlock.className = 'media-block';
        mediaBlock.dataset.index = index;

        // Видео
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

        // Аудио
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

        // Точка
        const dot = document.createElement('button');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.dataset.index = index;
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });

    // ----- 5. Функции управления слайдером -----
    function goToSlide(index, animate = true) {
        if (index < 0 || index >= totalSlides) return;
        currentIndex = index;
        const offset = -index * 100;
        sliderTrack.style.transition = animate ? 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none';
        sliderTrack.style.transform = `translateX(${offset}%)`;

        // Обновляем активный класс
        document.querySelectorAll('.slide').forEach((s, i) => {
            s.classList.toggle('active', i === index);
        });

        // Обновляем точки
        document.querySelectorAll('.dot').forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });

        // Счётчик
        slideCounter.textContent = `${index + 1} / ${totalSlides}`;

        // Кнопки
        prevBtn.disabled = (index === 0);
        nextBtn.disabled = (index === totalSlides - 1);

        // Сброс медиа на новом слайде (будет запущено автоматически)
        resetMediaOnSlide(index);
    }

    // Сброс и подготовка медиа на слайде
    function resetMediaOnSlide(index) {
        // Останавливаем всё, что играло
        if (currentVideo) { currentVideo.pause(); currentVideo.currentTime = 0; }
        if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
        clearTimeout(mediaTimeout);

        // Находим слайд
        const slides = document.querySelectorAll('.slide');
        const slide = slides[index];
        const mediaBlock = slide.querySelector('.media-block');
        const video = mediaBlock ? mediaBlock.querySelector('video') : null;
        const audio = mediaBlock ? mediaBlock.querySelector('audio') : null;

        // Скрываем медиа-блок
        if (mediaBlock) mediaBlock.classList.remove('visible');

        // Сохраняем ссылки
        currentVideo = video;
        currentAudio = audio;

        // Запускаем процесс: сначала показываем фото и надпись, через 1.5 сек показываем видео
        mediaTimeout = setTimeout(() => {
            if (mediaBlock) mediaBlock.classList.add('visible');
            // Запускаем видео через небольшую задержку для плавности
            setTimeout(() => {
                if (video) {
                    video.muted = false;
                    video.play().catch(e => console.warn('Видео не запустилось:', e));
                    // По окончании видео -> аудио
                    video.onended = function() {
                        if (audio) {
                            audio.play().catch(e => console.warn('Аудио не запустилось:', e));
                            audio.onended = function() {
                                // Аудио окончено -> переход на следующий слайд
                                if (currentIndex < totalSlides - 1) {
                                    goToSlide(currentIndex + 1);
                                } else {
                                    finishSurprise();
                                }
                            };
                        } else {
                            // если аудио нет, переходим сразу
                            if (currentIndex < totalSlides - 1) {
                                goToSlide(currentIndex + 1);
                            } else {
                                finishSurprise();
                            }
                        }
                    };
                } else if (audio) {
                    // если видео нет, сразу аудио
                    audio.play().catch(e => console.warn('Аудио не запустилось:', e));
                    audio.onended = function() {
                        if (currentIndex < totalSlides - 1) {
                            goToSlide(currentIndex + 1);
                        } else {
                            finishSurprise();
                        }
                    };
                } else {
                    // нет медиа – через 2 секунды переходим
                    setTimeout(() => {
                        if (currentIndex < totalSlides - 1) {
                            goToSlide(currentIndex + 1);
                        } else {
                            finishSurprise();
                        }
                    }, 2000);
                }
            }, 300);
        }, 1200); // пауза перед появлением видео
    }

    // Завершение сюрприза
    function finishSurprise() {
        document.body.style.overflow = '';
        playBtn.textContent = '🎉 Все поздравления просмотрены!';
        playBtn.style.background = '#8b6b4a';
        playBtn.disabled = true;
        sliderNav.style.display = 'none';
        // Показываем финальный слайд
        const finalSlide = document.createElement('div');
        finalSlide.className = 'slide';
        finalSlide.innerHTML = `
            <div class="friend-card" style="background: #fff5e6; border-color: #d4af37;">
                <div class="friend-name" style="font-size: 2.4rem;">💖 Спасибо всем! 💖</div>
                <div class="friend-greeting" style="font-size: 1.5rem;">Ты — самая любимая!</div>
                <div style="margin-top: 1rem; font-size: 1.2rem; color: #a67c4e;">С днём рождения!</div>
            </div>
        `;
        sliderTrack.appendChild(finalSlide);
        goToSlide(totalSlides); // переходим на последний добавленный
        document.querySelector('.slider-controls').style.display = 'none';
        document.querySelector('.slider-dots').style.display = 'none';
    }

    // ----- 6. Запуск сюрприза по кнопке -----
    playBtn.addEventListener('click', function() {
        if (isPlaying) return;
        isPlaying = true;

        // Блокируем скролл
        document.body.style.overflow = 'hidden';

        // Скрываем кнопку
        playBtn.style.display = 'none';

        // Показываем навигацию
        sliderNav.style.display = 'flex';

        // Переходим к первому слайду (без анимации)
        goToSlide(0, false);

        // Запускаем медиа для первого слайда
        resetMediaOnSlide(0);
    });

    // ----- 7. Ручное управление -----
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            // Останавливаем текущие медиа
            if (currentVideo) { currentVideo.pause(); currentVideo.currentTime = 0; }
            if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
            clearTimeout(mediaTimeout);
            goToSlide(currentIndex - 1);
            // Запускаем медиа на новом слайде
            resetMediaOnSlide(currentIndex);
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentIndex < totalSlides - 1) {
            // Останавливаем текущие медиа
            if (currentVideo) { currentVideo.pause(); currentVideo.currentTime = 0; }
            if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
            clearTimeout(mediaTimeout);
            goToSlide(currentIndex + 1);
            resetMediaOnSlide(currentIndex);
        }
    });

    skipBtn.addEventListener('click', function() {
        // Пропустить текущее поздравление и перейти к следующему
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

    // Инициализация: первый слайд без автозапуска
    goToSlide(0, false);
    sliderNav.style.display = 'none';

    console.log('Сайт готов! С Днём Рождения!');
})();