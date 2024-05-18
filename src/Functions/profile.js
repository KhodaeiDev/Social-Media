const $ = document;

const tabs = [
  {
    id: 1,
    title: "Posts",
    items: [
      {
        cover: "/images/feed-3.jpg",
        caption:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque mollitia deleniti cum similique unde atque sapiente! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque mollitia deleniti cum similique unde atque sapiente! 💖🙌",
      },
      {
        cover: "/images/feed-1.jpg",
        caption:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque mollitia deleniti cum similique unde atque sapiente! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque mollitia deleniti cum similique unde atque sapiente! 💖🙌",
      },
      {
        cover: "/images/feed-4.jpg",
        caption:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque mollitia deleniti cum similique unde atque sapiente! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque mollitia deleniti cum similique unde atque sapiente! 💖🙌",
      },
    ],
  },
  {
    id: 2,
    title: "Reels",
    items: [
      { cover: "/images/feed-1.jpg" },
      { cover: "/images/feed-2.jpg" },
      { cover: "/images/feed-3.jpg" },
      { cover: "/images/feed-4.jpg" },
      { cover: "/images/feed-5.jpg" },
      { cover: "/images/feed-6.jpg" },
    ],
  },
  {
    id: 3,
    title: "Pictures",
    items: [],
  },
  {
    id: 4,
    title: "Reposts",
    items: [],
  },
];

let currentTab = "Posts";

// Elements
const buttonsContainer = $.querySelector("#buttons-container");
const feedsContainer = $.querySelector("#feeds-container");

// Modal
const modal = $.querySelector("#modal-card");
const modalScreen = $.querySelector("#modal");

const followingsButton = $.querySelector("#followings");
const closeButton = $.querySelector("#close-button");

const sendVerificationButton = $.querySelector(".send-verification");

sendVerificationButton.addEventListener("click", (event) => {
  modalOpenHandler();
  modal.innerHTML = "";
  modal.insertAdjacentHTML(
    "afterbegin",
    `
    <header id="modal-header" class="w-full pb-4 flex items-center justify-between">
    <div></div>
    <div class="pl-5">
        Verify Email
    </div>
    <button onclick="modalCloseHandler()" id="close-button" class="max-w-max flex-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    </button>
</header>
<main class="px-4 my-2 border-b">
<p class="font-Poppins-SemiBold text-sm">
 Email address <span class="requre-symbol">*</span>
</p>
<input type="email" placeholder="example@yahoo.com" class="email-input"/>
</main>
<footer class="mt-2">
<button onclick="codeSentHandler()" id="send-verify-code">
Send verification
</button>
</footer>

`
  );
});

const codeSentHandler = (event) => {
  modalOpenHandler();
  modal.innerHTML = "";
  modal.insertAdjacentHTML(
    "afterbegin",
    `
    <header id="modal-header" class="w-full pb-4 flex items-center justify-between">
    <div></div>
    <div class="pl-5">
    Enter the code
    </div>
    <button onclick="modalCloseHandler()" id="close-button" class="max-w-max flex-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    </button>
</header>
<main class="px-4 my-2 border-b">
<div class="alert success">
<span>
Code sent successfully !
</span>
</div>
<p class="font-Poppins-SemiBold text-sm">
 Verification code <span class="requre-symbol">*</span>
</p>
<input type="email" placeholder="*****" class="email-input text-center"/>
</main>
<footer class="mt-2">
<button onclick="verifyCodeHandler()" id="send-verify-code">
VERIFY
</button>
</footer>
`
  );
};

const redirector = () => {
  console.log("hi");
  window.location.reload();
};

const successfullyVerification = () => {
  modalOpenHandler();
  modal.innerHTML = "";
  modal.insertAdjacentHTML(
    "afterbegin",
    `
    <header id="modal-header" class="w-full pb-4 flex items-center justify-between">
    <div></div>
    <div class="pl-5">
    Successful
    </div>
    <button onclick="modalCloseHandler()" id="close-button" class="max-w-max flex-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    </button>
</header>
<main class="px-4 my-2 border-b">
    <div class="alert success" > Verification was successfully ! </div>
</main>
<footer class="mt-2">
<button onclick="redirector()"  id="send-verify-code">
CONTINUE
</button>
</footer>
`
  );
};

const failureVerification = () => {
  modalOpenHandler();
  modal.innerHTML = "";
  modal.insertAdjacentHTML(
    "afterbegin",
    `
    <header id="modal-header" class="w-full pb-4 flex items-center justify-between">
    <div></div>
    <div class="pl-5">
    Failed
    </div>
    <button onclick="modalCloseHandler()" id="close-button" class="max-w-max flex-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    </button>
</header>
<main class="px-4 my-2 border-b">
    <div class="alert error" > Verification was failure ! </div>
</main>
<footer class="mt-2">
<button onclick="redirector()"   id="send-verify-code">
CONTINUE
</button>
</footer>
`
  );
};

const verifyCodeHandler = (OTP) => {
  if (OTP) {
    successfullyVerification();
  } else {
    failureVerification();
  }
};

const tabsFunc = () => {
  buttonsContainer.innerHTML = "";
  feedsContainer.innerHTML = "";
  tabs.forEach((element) => {
    buttonsContainer.insertAdjacentHTML(
      "beforeend",
      `<button onclick="changePage('${
        element.title
      }')" class='profile-feed__button ${
        currentTab === element.title ? "isActive" : ""
      }'>
        ${element.title}
    </button>`
    );

    if (currentTab === element.title) {
      if (element.items.length && element.title === "Posts") {
        feedsContainer.className = "";
        element.items.forEach((item) => {
          // نمایش محتوای هر آیتم
          feedsContainer.insertAdjacentHTML(
            "beforeend",
            `
                <article class="profile-feed-card">
                <div>
                    <header>
                        <img src="/images/profile-1.jpg" alt="profile picture"
                            class="feed-profile-picture">
                    </header>
                </div>
                <div class="w-full">
                    <main>
                        <h5 class="feed-username">
                            <span><strong>
                                    Mehran Khodaei
                                </strong></span>
                        </h5>

                    </main>
                    <footer>
                        <div>
                            <img class="feed-image" src="${item.cover}" alt="">
                        </div>
                        <div class="feed-card-content">

                            <div class="feed-buttons">
                                <button class="max-w-max">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                </button>
                                <button class="max-w-max">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                    </svg>

                                </button>
                                <button class="max-w-max">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                    </svg>
                                </button>
                            </div>
                            <div class="text-sm my-2">
                                <span>
                                    Liked by
                                </span>
                                <span>
                                    <strong>
                                        rad_front
                                    </strong>
                                </span>
                                <span>
                                    and
                                </span>
                                <span>
                                    <strong>
                                        2,923
                                        others
                                    </strong>
                                </span>
                            </div>
                            <div>
                                <p class="text-gray-700">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque mollitia
                                    deleniti
                                    cum similique unde atque sapiente!
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque mollitia
                                    deleniti
                                    cum similique unde atque sapiente! 💖🙌
                                </p>
                            </div>
                            <div class="mt-1">
                                <button class="text-xs max-w-max text-gray-500">
                                    View all 294 comments ..
                                </button>
                            </div>
                        </div>
                    </footer>
                </div>
            </article>
        `
          );
        });
      }
      if (element.items.length && element.title === "Reels") {
        element.items.forEach((item) => {
          // نمایش محتوای هر آیتم
          feedsContainer.className =
            "flex items-center reels_container flex-wrap gap-3 mt-5";
          feedsContainer.insertAdjacentHTML(
            "beforeend",
            `
                    <article class="reel">
                    <div class="reel-details">
                        <div>
                            <span class="text-sm">
                            <img src="/images/video.svg" class="w-9  "/>
        
                            </span>
                        </div>
                        <div class="flex items-center gap-1 text-xs">
                            <span class="flex-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </span>
                            <span>
                                29k
                            </span>
        
                        </div>
                    </div>
                    <div class="reel-shade">
        
                    </div>
                    <img src="${item.cover}" alt="" class="content">
                </article>
        `
          );
        });
      }
    }
  });
  const emptySections = tabs.filter((element) => !element.items.length);

  emptySections.forEach((element) => {
    if (element.title === currentTab) {
      feedsContainer.className = "";
      feedsContainer.insertAdjacentHTML(
        "beforeend",
        `
            <div class="its-empty">
            <div class="font-Poppins-Bold text-lg text-gray-900">
                Aww, Nothing to show :(
            </div>
            <div>
                <img src="/images/notfound.png" class="not-found-image" alt="">
            </div>
            </div>
    `
      );
    }
  });
};

// tabsFunc();

const changePage = (title) => {
  currentTab = title;
  // tabsFunc();
};
