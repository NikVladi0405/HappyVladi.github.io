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

📊 Общая статистика
Файл	Количество строк	Размер (приблизительно)
index.html	~310 строк	~12 KB
css/style.css	~1,850 строк	~45 KB
js/script.js	~1,350 строк	~38 KB
ИТОГО	~3,510 строк	~95 KB
📄 Подробная статистика по каждому файлу
1. index.html – ~310 строк
text
Структура:
├── DOCTYPE и head (шрифты, мета-теги)     ~30 строк
├── body                                    ~280 строк
│   ├── Фоновые элементы (частицы, шары)    ~10 строк
│   ├── Декоративные углы                   ~10 строк
│   ├── Секция 1: Приветствие              ~40 строк
│   ├── Секция 2: Моя песня                ~45 строк
│   ├── Секция 3: Свиток предсказаний      ~30 строк
│   ├── Секция 4: Галерея пожеланий        ~25 строк
│   ├── Секция 5: Сюрприз от близких       ~50 строк
│   ├── Секция 6: Скачать все поздравления ~30 строк
│   ├── Секция 7: Финал                    ~20 строк
│   └── Подключение скриптов               ~5 строк
└── Закрывающие теги                        ~10 строк
2. css/style.css – ~1,850 строк
text
Структура:
├── Переменные (root)                       ~20 строк
├── Глобальные сбросы и настройки          ~30 строк
├── Декоративные углы                      ~25 строк
├── Шрифты и типографика                   ~40 строк
├── Фоновые элементы (частицы, шары)       ~45 строк
├── Секция 1: Hero (приветствие)          ~180 строк
│   ├── Фото-рамка                        ~80 строк
│   ├── Подсказка на фото                 ~30 строк
│   └── Текстовая рамка                   ~70 строк
├── Секция 2: Моя песня                   ~120 строк
│   ├── Виниловая пластинка               ~50 строк
│   └── Текст песни                       ~30 строк
├── Магическая кнопка                     ~40 строк
├── Секция 3: Свиток предсказаний         ~100 строк
├── Секция 4: Галерея пожеланий           ~80 строк
├── Секция 5: Сюрприз от близких          ~500 строк
│   ├── Кнопка с магией                   ~60 строк
│   ├── Слайдер                          ~120 строк
│   ├── Декоративные линии               ~40 строк
│   ├── Карточка друга                   ~80 строк
│   ├── Медиа-блок                       ~50 строк
│   ├── Индикаторы (точки)               ~40 строк
│   └── Управление (кнопки)              ~110 строк
├── Секция 6: Скачать все поздравления    ~100 строк
├── Секция 7: Финал                       ~50 строк
├── Тосты, конфетти, звёзды, салюты      ~100 строк
├── Адаптивность (медиа-запросы)          ~400 строк
│   ├── 768px                             ~250 строк
│   └── 420px                             ~150 строк
└── Закрывающие скобки                    ~20 строк
3. js/script.js – ~1,350 строк
text
Структура:
├── IFFE обёртка                           ~5 строк
├── 1. Фоновые частицы и шары              ~40 строк
├── 2. Данные друзей                       ~20 строк
├── 3. Слайдер (основные переменные)      ~25 строк
├── 4. Создание слайдов                   ~100 строк
├── 5. Функции слайдера                   ~40 строк
├── 6. Сброс медиа (с автопереходом)      ~80 строк
├── 7. Завершение сюрприза                ~40 строк
├── 8. Запуск сюрприза                    ~25 строк
├── 9. Кнопки навигации                   ~30 строк
├── 10. Переключение фото                  ~35 строк
├── 11. Конфетти                           ~30 строк
├── 12. Салюты (fireworks)                 ~70 строк
├── 13. Интерактивные слова                ~30 строк
├── 14. Моя песня (плеер)                  ~50 строк
├── 15. Свиток предсказаний                ~60 строк
├── 16. Галерея пожеланий                  ~60 строк
├── 17. Тосты                              ~20 строк
├── 18. Магическая музыка для свитка       ~45 строк
├── 19. Автоматический фейерверк          ~10 строк
├── 20. СКАЧИВАНИЕ ВСЕХ ФАЙЛОВ             ~90 строк
│   ├── getAllFiles()                     ~15 строк
│   ├── downloadFile()                    ~25 строк
│   ├── downloadAllFiles()                ~40 строк
│   └── Обработчики                       ~10 строк
├── 21. Обновление количества файлов      ~10 строк
├── Инициализация                          ~15 строк
└── Закрытие IFFE                          ~5 строк
📈 Сравнительная таблица
Файл	Строки	% от общего	Основное назначение
style.css	1,850	~53%	Визуальное оформление, анимации, адаптивность
script.js	1,350	~38%	Логика, интерактив, медиа-управление
index.html	310	~9%	Структура, разметка, подключение ресурсов
🎯 Ключевые блоки кода
Самые большие блоки в style.css:

Секция 5 (Сюрприз от близких) – ~500 строк

Адаптивность (медиа-запросы) – ~400 строк

Секция 1 (Hero) – ~180 строк

Самые большие блоки в script.js:

Создание слайдов – ~100 строк

Скачивание всех файлов – ~90 строк

Сброс медиа (с автопереходом) – ~80 строк

Салюты (fireworks) – ~70 строк

📝 Примечания
Общее количество строк: ~3,510 (без учёта пустых строк и комментариев)

С учётом пустых строк и комментариев: ~4,200 строк

Объём кода: ~95 KB (минифицированный ~65 KB)

Время разработки (оценка): 72 часа