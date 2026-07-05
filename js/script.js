(function() {
    'use strict';

    // ----- 1. Фоновые частицы -----
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
    const friends = [
        { name: 'Мама', message: 'С днём рождения, Дочка! Ты — солнце!', video: 'video/friend1.mp4', audio: 'audio/friend1.mp3' },
        { name: 'Никита', message: 'Пусть мечты сбываются!', video: 'video/friend2.mp4', audio: 'audio/Nikita.ogg' },
        { name: 'Малика', message: 'Ты — невероятная! Обнимаю)', video: 'video/friend3.mp4', audio: 'audio/friend3.mp3' },
        { name: 'Ирина', message: 'Пусть жизнь будет сладкой, как мёд!', video: 'video/friend4.mp4', audio: 'audio/friend4.mp3' },
        { name: 'Ангелина', message: 'Самой красивой невесте! ❤️', video: 'video/friend5.mp4', audio: 'audio/friend5.mp3' },
        { name: 'Кира', message: 'Будь счастлива каждый миг!', video: 'video/friend6.mp4', audio: 'audio/friend6.mp3' },
        { name: 'Эрика', message: 'Люблю тебя! Ты — чудо!', video: 'video/friend7.mp4', audio: 'audio/friend7.mp3' },
        { name: 'Катя', message: 'Поздравляю от всей души!', video: 'video/friend8.mp4', audio: 'audio/friend8.mp3' }
    ];

    // ----- 3. Элементы DOM -----
    const playBtn = document.getElementById('playSurprise');
    const sliderTrack = document.getElementById('sliderTrack');
    const currentSlideSpan = document.getElementById('currentSlide');
    const totalSlidesSpan = document.getElementById('totalSlides');
    const sliderNav = document.getElementById('sliderNav');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');

    let currentIndex = 0;
    let isPlaying = false;
    let isAudioPlaying = false;
    let mediaElements = []; // сохраняем ссылки на видео/аудио для управления

    // ----- 4. Создание слайдов -----
    friends.forEach((f, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        if (index === 0) slide.classList.add('active');

        const card = document.createElement('div');
        card.className = 'friend-card';

        // Имя
        const name = document.createElement('div');
        name.className = 'name';
        name.textContent = f.name;
        card.appendChild(name);

        // Сообщение
        const msg = document.createElement('div');
        msg.className = 'message';
        msg.textContent = f.message;
        card.appendChild(msg);

        // Видео
        if (f.video) {
            const video = document.createElement('video');
            video.src = f.video;
            video.controls = true;
            video.muted = true;       // для автозапуска (потом уберём)
            video.preload = 'auto';
            video.playsInline = true;
            video.width = 280;
            card.appendChild(video);
        }

        // Аудио
        if (f.audio) {
            const audio = document.createElement('audio');
            audio.src = f.audio;
            audio.controls = true;
            audio.preload = 'auto';
            card.appendChild(audio);
        }

        slide.appendChild(card);
        sliderTrack.appendChild(slide);
    });

    totalSlidesSpan.textContent = friends.length;

    // ----- 5. Функции управления слайдером -----
    function goToSlide(index) {
        if (index < 0 || index >= friends.length) return;
        currentIndex = index;
        const offset = -index * 100;
        sliderTrack.style.transform = `translateX(${offset}%)`;
        // Обновляем активный класс
        document.querySelectorAll('.slide').forEach((s, i) => {
            s.classList.toggle('active', i === index);
        });
        // Обновляем индикатор
        currentSlideSpan.textContent = index + 1;
        // Обновляем кнопки
        prevBtn.disabled = (index === 0);
        nextBtn.disabled = (index === friends.length - 1);
    }

    // Переключение на следующий слайд (автоматически или по кнопке)
    function nextSlide() {
        if (currentIndex < friends.length - 1) {
            goToSlide(currentIndex + 1);
            // При переходе на новый слайд запускаем его видео (если ещё не запущено)
            const slide = document.querySelectorAll('.slide')[currentIndex];
            const video = slide.querySelector('video');
            const audio = slide.querySelector('audio');
            // Останавливаем предыдущие медиа
            if (video) { video.pause(); video.currentTime = 0; }
            if (audio) { audio.pause(); audio.currentTime = 0; }
            // Запускаем видео нового слайда
            if (video) {
                video.muted = false;
                video.play().catch(e => console.warn('Не удалось запустить видео:', e));
                // Ожидаем окончания видео -> затем аудио
                video.onended = function() {
                    if (audio) {
                        audio.play().catch(e => console.warn('Не удалось запустить аудио:', e));
                        // после окончания аудио переходим дальше
                        audio.onended = function() {
                            // Если есть следующий слайд, переходим, иначе завершаем
                            if (currentIndex < friends.length - 1) {
                                nextSlide();
                            } else {
                                finishSurprise();
                            }
                        };
                    } else {
                        // если аудио нет, сразу переход
                        if (currentIndex < friends.length - 1) {
                            nextSlide();
                        } else {
                            finishSurprise();
                        }
                    }
                };
            } else if (audio) {
                // если видео нет, сразу аудио
                audio.play().catch(e => console.warn('Не удалось запустить аудио:', e));
                audio.onended = function() {
                    if (currentIndex < friends.length - 1) {
                        nextSlide();
                    } else {
                        finishSurprise();
                    }
                };
            } else {
                // если нет медиа, просто переходим
                if (currentIndex < friends.length - 1) {
                    nextSlide();
                } else {
                    finishSurprise();
                }
            }
        } else {
            finishSurprise();
        }
    }

    function finishSurprise() {
        // Разблокируем скролл, показываем сообщение
        document.body.style.overflow = '';
        playBtn.textContent = '🎉 Все поздравления просмотрены!';
        playBtn.style.background = '#8b6b4a';
        playBtn.disabled = true;
        sliderNav.style.display = 'none';
        // Показываем финальный текст
        const finalMsg = document.createElement('div');
        finalMsg.className = 'slide';
        finalMsg.innerHTML = `<div class="friend-card" style="background: #fff5e6; border-color: #d4af37;">
            <div class="name" style="font-size: 2rem;">Спасибо всем!</div>
            <div class="message" style="font-size: 1.4rem;">Ты — самая любимая!</div>
        </div>`;
        sliderTrack.appendChild(finalMsg);
        goToSlide(friends.length); // индекс последнего слайда
        document.querySelector('.slider-progress').style.display = 'none';
        sliderNav.style.display = 'none';
    }

    // ----- 6. Запуск сюрприза -----
    playBtn.addEventListener('click', function() {
        if (isPlaying) return;
        isPlaying = true;

        // Блокируем скролл
        document.body.style.overflow = 'hidden';

        // Скрываем кнопку запуска
        playBtn.style.display = 'none';

        // Показываем навигацию
        sliderNav.style.display = 'flex';

        // Переходим к первому слайду
        goToSlide(0);

        // Запускаем видео первого слайда
        const firstSlide = document.querySelector('.slide');
        const video = firstSlide.querySelector('video');
        const audio = firstSlide.querySelector('audio');

        if (video) {
            video.muted = false;
            video.play().catch(e => console.warn('Не удалось запустить видео:', e));
            video.onended = function() {
                if (audio) {
                    audio.play().catch(e => console.warn('Не удалось запустить аудио:', e));
                    audio.onended = function() {
                        // после аудио переходим к следующему, если есть
                        if (currentIndex < friends.length - 1) {
                            nextSlide();
                        } else {
                            finishSurprise();
                        }
                    };
                } else {
                    // если аудио нет, сразу переход
                    if (currentIndex < friends.length - 1) {
                        nextSlide();
                    } else {
                        finishSurprise();
                    }
                }
            };
        } else if (audio) {
            audio.play().catch(e => console.warn('Не удалось запустить аудио:', e));
            audio.onended = function() {
                if (currentIndex < friends.length - 1) {
                    nextSlide();
                } else {
                    finishSurprise();
                }
            };
        } else {
            // нет медиа – переходим сразу
            if (currentIndex < friends.length - 1) {
                nextSlide();
            } else {
                finishSurprise();
            }
        }
    });

    // ----- 7. Ручное управление (кнопки) -----
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            // Останавливаем текущие медиа
            const slide = document.querySelectorAll('.slide')[currentIndex];
            const video = slide.querySelector('video');
            const audio = slide.querySelector('audio');
            if (video) { video.pause(); video.currentTime = 0; }
            if (audio) { audio.pause(); audio.currentTime = 0; }
            goToSlide(currentIndex - 1);
            // Запускаем видео на новом слайде (по логике, оно должно запускаться автоматически при переходе)
            // Но мы можем упростить: просто переключаем слайд, а видео запустится по клику на кнопку "Включить сюрприз"? 
            // В нашем случае лучше, чтобы при ручном переключении видео не запускалось автоматически, чтобы не сбивать последовательность.
            // Поэтому для ручного режима мы просто переключаем слайд, но не запускаем медиа.
            // Однако, если пользователь нажал "Включить сюрприз", то автоматический режим уже запущен.
            // В этом режиме кнопки "назад" мы можем заблокировать, чтобы не нарушать логику.
        }
    });

    nextBtn.addEventListener('click', function() {
        // Если мы в автоматическом режиме, nextSlide() уже вызывается по окончании аудио.
        // Но пользователь может нажать вручную, если захочет пропустить.
        // Вызовем nextSlide() принудительно.
        if (isPlaying && currentIndex < friends.length - 1) {
            // Останавливаем текущие медиа, чтобы не мешали
            const slide = document.querySelectorAll('.slide')[currentIndex];
            const video = slide.querySelector('video');
            const audio = slide.querySelector('audio');
            if (video) { video.pause(); video.currentTime = 0; }
            if (audio) { audio.pause(); audio.currentTime = 0; }
            nextSlide();
        }
    });

    // Изначально показываем первую карточку (без автозапуска)
    goToSlide(0);
    // Скрываем навигацию до запуска
    sliderNav.style.display = 'none';

    console.log('Сайт готов! С Днём Рождения!');
})();