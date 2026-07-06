# 🎂 С Днём Рождения, любимая! — Интерактивная поздравительная открытка

> Волшебный интерактивный сайт-поздравление для Влады на её 22-летие. Создан с любовью как личный подарок.

![Версия](https://img.shields.io/badge/version-1.0.0-gold)
![Лицензия](https://img.shields.io/badge/license-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## ✨ Демо

Откройте `index.html` в любом современном браузере.

> 💡 **Совет:** Для наилучшего восприятия откройте сайт на весь экран и включите звук.

---

## 📖 О проекте

Это интерактивная поздравительная открытка, созданная специально для Влады в честь её 22-летия. Сайт сочетает в себе **волшебный дизайн**, **интерактивные элементы** и **персональные поздравления** от близких людей.

### 🎯 Основные возможности

- ✨ **Магическая атмосфера** — золотые акценты, парящие частицы, волшебные анимации
- 📸 **Интерактивное фото** — клик на детское фото переключает на взрослое
- 🎵 **Личная песня** — аудиоплеер с вращающейся виниловой пластинкой
- 📜 **Свиток предсказаний** — кликабельный свиток с персональными предсказаниями
- ⭐ **Галерея пожеланий** — звёзды, открывающие тёплые слова от близких
- 🎁 **Сюрприз от близких** — слайдер с видео- и аудиопоздравлениями от 8 человек
- 🎆 **Салюты и фейерверки** — магические вспышки при каждом взаимодействии

---

## 🛠️ Использованные технологии

### 📌 Frontend

| Технология | Применение |
|------------|------------|
| **HTML5** | Структура страницы, семантическая разметка |
| **CSS3** | Дизайн, анимации, адаптивность, магические эффекты |
| **JavaScript (Vanilla)** | Логика, интерактив, управление медиа, салюты |
| **Google Fonts** | Стилизованные шрифты (Great Vibes, Cormorant Garamond, Dancing Script) |
| **Intersection Observer API** | Автозапуск музыки при скролле до нужной секции |
| **Web Audio API** | Управление аудиоплеерами |

### 🎨 Дизайн-система

```css
:root {
    --gold: #E8B84B;
    --gold-light: #F5D06A;
    --gold-pale: #FCE8B8;
    --gold-dark: #C9A040;
    --bg-light: #FFF8F0;
    --bg-warm: #FDF0E8;
    --bg-rose: #FFF0EC;
    --bg-lavender: #F5F0FF;
    --text-dark: #3A2A2A;
}
📁 Структура проекта
text
поздравление/
├── index.html                          # Главная страница
├── css/
│   └── style.css                       # Все стили и анимации
├── js/
│   └── script.js                       # Вся логика и интерактив
├── img/
│   ├── childhood.jpg                   # Фото Влады в детстве
│   ├── vlada.jpg                       # Взрослое фото Влады
│   └── friends/                        # Фото друзей
│       ├── mama.jpg
│       ├── nikita.jpg
│       ├── angelina.jpg
│       ├── malika.jpg
│       ├── erika.jpg
│       ├── irina.jpg
│       ├── kira.jpg
│       └── katya.jpg
├── video/                              # Видеопоздравления от друзей
│   ├── friend1.mp4
│   ├── friend2.mp4
│   └── ...
└── audio/                              # Аудиопоздравления
    ├── my_song.mp3                     # Личная песня
    ├── magicbook.mp3                   # Музыка для свитка
    ├── Nikita.ogg
    └── ...
🎬 Фрагменты кода
1. Создание карточки с поздравлением
javascript
friends.forEach((f, index) => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    if (index === 0) slide.classList.add('active');

    const card = document.createElement('div');
    card.className = 'friend-card';

    // Фото
    const img = document.createElement('img');
    img.className = 'friend-photo';
    img.src = f.photo;
    img.alt = f.name;
    card.appendChild(img);

    // Имя
    const name = document.createElement('div');
    name.className = 'friend-name';
    name.textContent = f.name;
    card.appendChild(name);

    // Сообщение
    const msg = document.createElement('div');
    msg.className = 'friend-message';
    msg.textContent = f.message;
    card.appendChild(msg);

    // Видео
    if (f.video) {
        const video = document.createElement('video');
        video.src = f.video;
        video.controls = true;
        video.muted = true;
        card.appendChild(video);
    }

    slide.appendChild(card);
    sliderTrack.appendChild(slide);
});
2. Волшебный слайдер с автопереходом
javascript
function resetMediaOnSlide(index) {
    // Сброс текущих медиа
    if (currentVideo) {
        currentVideo.pause();
        currentVideo.currentTime = 0;
        currentVideo.onended = null;
    }

    const video = mediaBlock.querySelector('video');
    const audio = mediaBlock.querySelector('audio');

    // Автопереход после завершения
    const onMediaEnd = function() {
        if (autoTransitionEnabled && currentIndex < totalSlides - 1) {
            goToSlide(currentIndex + 1);
        } else if (autoTransitionEnabled && currentIndex === totalSlides - 1) {
            finishSurprise();
        }
    };

    video.onended = function() {
        if (audio) {
            audio.play();
            audio.onended = onMediaEnd;
        } else {
            onMediaEnd();
        }
    };
}
3. Волшебный салют
javascript
function launchFirework(x, y) {
    const cx = x || Math.random() * window.innerWidth;
    const cy = y || Math.random() * window.innerHeight * 0.5 + 80;
    const colors = ['#E8B84B', '#F5D06A', '#FF6B6B', '#FFD93D', '#6BCB77'];

    const particleCount = 30 + Math.floor(Math.random() * 30);
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        const angle = Math.random() * Math.PI * 2;
        const distance = 40 + Math.random() * 140;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - 30;

        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = cx + 'px';
        particle.style.top = cy + 'px';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');

        container.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
    }
}
4. Автозапуск музыки при скролле
javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (!isMagicMusicPlaying) {
                magicAudio.play();
                isMagicMusicPlaying = true;
                showToast('🎵 Волшебная музыка свитка начинает играть...');
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
}, { threshold: 0.25 });

observer.observe(predictionsSection);
🎨 Кастомные шрифты
html
<!-- Подключение в index.html -->
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Dancing+Script:wght@400;500;600;700&family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Tangerine:wght@400;700&display=swap" rel="stylesheet" />
css
/* Использование в CSS */
h1, h2, h3, .friend-name, .song-title, .scroll-label {
    font-family: 'Great Vibes', cursive;
}

.section-subtitle, .friend-greeting, .friend-message {
    font-family: 'Cormorant Garamond', serif;
}
🚀 Установка и запуск
1. Клонирование репозитория
bash
git clone https://github.com/ваш-username/pozdravlenie.git
cd pozdravlenie
2. Локальный запуск
Просто откройте файл index.html в браузере:

bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
3. Заполнение контента
Фото — замените файлы в папке img/:

childhood.jpg — детское фото Влады

vlada.jpg — взрослое фото Влады

friends/*.jpg — фото друзей

Видео — добавьте видео в папку video/:

friend1.mp4 ... friend8.mp4

Аудио — добавьте аудио в папку audio/:

my_song.mp3 — ваша песня

magicbook.mp3 — музыка для свитка

*.ogg — аудиопоздравления от друзей

Данные — отредактируйте массив friends в js/script.js:

javascript
const friends = [
    { 
        name: 'Мама', 
        message: 'С днём рождения, Дочка! Ты — лучшая!', 
        photo: 'img/friends/mama.jpg', 
        video: 'video/friend1.mp4' 
    },
    // Добавьте остальных друзей
];
📱 Адаптивность
Сайт полностью адаптирован для всех устройств:

Устройство	Разрешение	Особенности
📱 Телефоны	≤ 420px	Уменьшенные элементы, скрытые подписи на кнопках
📱 Планшеты	421-768px	Оптимизированные размеры, адаптивная сетка
💻 Десктоп	≥ 769px	Полный функционал, все эффекты
🎯 Особенности реализации
Функция	Описание
Автопереключение слайдов	После завершения видео/аудио происходит автоматический переход к следующему поздравлению
Свайп-навигация	На мобильных устройствах работает перелистывание пальцем
Волшебные переходы	Слайды переключаются с эффектом пружины (cubic-bezier)
Салюты при действиях	Клики и события сопровождаются цветными фейерверками
Intersection Observer	Музыка включается при скролле до нужной секции
🤝 Вклад в проект
Если вы хотите улучшить проект:

Форкните репозиторий

Создайте ветку с новыми функциями

Внесите изменения

Отправьте Pull Request

📝 Лицензия
Проект распространяется под лицензией MIT.

💖 Благодарности
Владе — за вдохновение и любовь ❤️

Всем друзьям — за тёплые поздравления

Тебе — за то, что используешь этот проект

📞 Контакты
Если у вас есть вопросы или предложения:

📧 Email: ваш-email@example.com

🌐 GitHub: ваш-username

Сделано с любовью ❤️ для самого дорогого человека

✨ «Пусть каждый день приносит радость, счастье и исполнение желаний. Твоя улыбка — лучшее украшение этого мира. Сияй!»

text

---

## 📝 Что входит в README.md

| Раздел | Описание |
|--------|----------|
| **Заголовок и бейджи** | Информация о версии, лицензии, технологиях |
| **О проекте** | Краткое описание и основные возможности |
| **Технологии** | Список использованных технологий с пояснением |
| **Структура** | Полная структура папок и файлов |
| **Фрагменты кода** | Примеры ключевых функций с пояснениями |
| **Установка** | Инструкция по запуску и настройке |
| **Адаптивность** | Информация о поддержке устройств |
| **Особенности** | Ключевые фишки проекта |
| **Лицензия и контакты** | Стандартная информация |

---

