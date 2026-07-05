(function() {
    'use strict';

    // ----- 1. Генерация фоновых частиц -----
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

    // ----- 2. Данные друзей (замените на свои) -----
    // Убедитесь, что пути к видео и аудио файлам соответствуют реальным именам в папках
    const friends = [
        { name: 'Анна', message: 'С днём рождения, подруга! Ты — солнце!', video: 'video/friend1.mp4', audio: 'audio/friend1.mp3' },
        { name: 'Мария', message: 'Пусть мечты сбываются!', video: 'video/friend2.mp4', audio: 'audio/friend2.mp3' },
        { name: 'Екатерина', message: 'Ты — невероятная! Обнимаю)', video: 'video/friend3.mp4', audio: 'audio/friend3.mp3' },
        { name: 'Ольга', message: 'Пусть жизнь будет сладкой, как мёд!', video: 'video/friend4.mp4', audio: 'audio/friend4.mp3' },
        { name: 'Ирина', message: 'Самой красивой невесте! ❤️', video: 'video/friend5.mp4', audio: 'audio/friend5.mp3' },
        { name: 'Татьяна', message: 'Будь счастлива каждый миг!', video: 'video/friend6.mp4', audio: 'audio/friend6.mp3' },
        { name: 'Наталья', message: 'Люблю тебя! Ты — чудо!', video: 'video/friend7.mp4', audio: 'audio/friend7.mp3' },
        { name: 'Светлана', message: 'Поздравляю от всей души!', video: 'video/friend8.mp4', audio: 'audio/friend8.mp3' }
    ];

    // ----- 3. Создаём карточки друзей -----
    const grid = document.getElementById('surpriseGrid');

    friends.forEach((f, index) => {
        const card = document.createElement('div');
        card.className = 'friend-card';
        card.style.animationDelay = (index * 0.1) + 's';

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

        grid.appendChild(card);
    });

    // ----- 4. Кнопка "Включить сюрприз" -----
    const playBtn = document.getElementById('playSurprise');
    let surprisePlayed = false;

    playBtn.addEventListener('click', function() {
        if (!surprisePlayed) {
            surprisePlayed = true;
            grid.classList.add('visible');

            // Запускаем все видео и аудио
            const videos = grid.querySelectorAll('video');
            const audios = grid.querySelectorAll('audio');

            videos.forEach(v => {
                v.muted = false;      // разрешаем звук
                v.play().catch(e => console.warn('Не удалось запустить видео:', e));
            });

            audios.forEach(a => {
                a.play().catch(e => console.warn('Не удалось запустить аудио:', e));
            });

            playBtn.textContent = '🎉 Спасибо, друзья!';
            playBtn.style.background = '#8b6b4a';
        }
    });

    // ----- 5. (Опционально) можно добавить другие эффекты -----
    console.log('Сайт готов! С Днём Рождения!');
})();