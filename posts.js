
const postsWrapper = document.querySelector("#posts-wrapper");
const favoriteList = document.querySelector("#favorite-list");
const logout = document.querySelector('#logout');
// const posts = [
//   {
//     id: 1,
//     title: "Основы JavaScript",
//     description:
//       "Изучение базовых концепций языка программирования JavaScript для начинающих разработчиков.",
//   },
//   {
//     id: 2,
//     title: "Введение в React",
//     description:
//       "Первый шаг в освоении популярного фреймворка для создания пользовательских интерфейсов.",
//   },
//   {
//     id: 3,
//     title: "Советы по CSS",
//     description:
//       "Полезные приемы и лучшие практики для эффективной работы с каскадными таблицами стилей.",
//   },
//   {
//     id: 4,
//     title: "Базы данных для веб-разработки",
//     description:
//       "Обзор различных систем управления базами данных и их применение в веб-проектах.",
//   },
//   {
//     id: 5,
//     title: "Алгоритмы и структуры данных",
//     description:
//       "Важные алгоритмы и структуры данных, которые должен знать каждый программист.",
//   },
//   {
//     id: 6,
//     title: "Версионный контроль с Git",
//     description:
//       "Основы работы с системой контроля версий Git и популярные команды для ежедневного использования.",
//   },
//   {
//     id: 7,
//     title: "Оптимизация производительности веб-сайтов",
//     description:
//       "Техники и инструменты для ускорения загрузки и улучшения производительности веб-приложений.",
//   },
//   {
//     id: 8,
//     title: "Основы безопасности веб-приложений",
//     description:
//       "Ключевые принципы безопасности и распространенные уязвимости, которые следует избегать.",
//   },
//   {
//     id: 9,
//     title: "Работа с API",
//     description:
//       "Как создавать и использовать RESTful API для взаимодействия между различными системами.",
//   },
//   {
//     id: 10,
//     title: "Деплой приложений",
//     description:
//       "Процесс развертывания веб-приложений на различных хостинг-платформах и серверах.",
//   },
// ];

// localStorage.setItem('posts', JSON.stringify(posts));

const posts = JSON.parse(localStorage.getItem("posts"));
const favorites = JSON.parse(localStorage.getItem('favorites'));
// const favorites = [];


const renderFavorites = () => {
  const postsUi = postsWrapper.querySelectorAll('.post');
  let markup ='';
  favorites.forEach((postId) => {
    const post = posts.find((el) => el.id === postId);
    markup += `<li data-id='${post.id}' class=" bg-gray-300 rounded-3xl p-3 px-5 flex justify-between">
                <span>${post.title}</span>
                <button class='cursor-pointer delete-favorite'>✕</button>
             </li>`;
    for (const el of postsUi) {
      if (Number(el.dataset.id) === postId) {
        const btn = el.querySelector('button');
        btn.disabled = true;
        btn.textContent = 'Уже в избранном'
      }
    }
  });
  favoriteList.insertAdjacentHTML('beforeend', markup);
};

const renderPosts = () => {
  let markup = "";
  posts.forEach((post) => {
    markup += `<div data-id='${post.id}' class="border-2 rounded-3xl p-3 border-white w-80 min-h-70 flex gap-5 flex-col post">
      <h3 class="text-white text-xl font-bold text-center">${post.title}</h3>
      <p class="text-white text-center">${post.description}</p>
      <button class="mt-auto rounded-3xl bg-blue-700 text-white px-3 py-2 cursor-pointer hover:bg-blue-800 disabled:opacity-45 disabled:bg-blue-700 disabled:cursor-auto"">Добавить в избранное</button>
      </div>`;
  });
  postsWrapper.insertAdjacentHTML("afterbegin", markup);
};

document.addEventListener("DOMContentLoaded", () => {
  renderPosts();
  if (favorites && favorites.length > 0) {
  renderFavorites();
}

  postsWrapper.addEventListener("click", (e) => {
    if (e.target.matches(".post button")) {
      const id = Number(e.target.parentElement.dataset.id);

      let favorites = JSON.parse(localStorage.getItem("favorites"));
      if (!favorites) {
        favorites = [];
      }

      if (!favorites.includes(id)) {
        const post = posts.find((post) => id === post.id);
        if (post?.id) {
          favorites.push(id);
          localStorage.setItem("favorites", JSON.stringify(favorites));
          const favoritePostMarkup = `<li data-id='${post.id}' class=" bg-gray-300 rounded-3xl p-3 px-5 flex justify-between ">
                <span>${post.title}</span>
                <button class='cursor-pointer delete-favorite'>✕</button>
                </li>`;
          favoriteList.insertAdjacentHTML("afterbegin", favoritePostMarkup);
          e.target.disabled = true;
          e.target.textContent = "Уже в избранном";
        }
      }
    }
  });

  favoriteList.addEventListener("click", (e) => {
    if (e.target.matches(".delete-favorite")) {
      const id = Number(e.target.parentElement.dataset.id);
      let favorites = JSON.parse(localStorage.getItem("favorites"));
      if (!favorites) {
        alert(`Can't get favorites`);
        favoriteList.textContent = "";
      } else {
        const ind = favorites.indexOf(Number(id));
        if (ind !== -1) {
          favorites.splice(ind, 1);
          localStorage.setItem('favorites', JSON.stringify(favorites));
          e.target.parentElement.remove();
          const posts = postsWrapper.querySelectorAll(".post");
          for (const el of posts) {
            if (el.dataset.id == id) {
              const btn = el.querySelector("button");
              btn.disabled = false;
              btn.textContent = "Добавить в избранное";
            }
          }
        } else {
          alert("try again later");
        }
      }
    }
  });

  logout.addEventListener('click', () => {
    document.cookie = 'authUser' + '=; max-age=0';
    location.href = 'index.html';
  })
});
