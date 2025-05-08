const $ = document;

let hashtags = [];

const hashtagInput = $.querySelector("#post-hashtags");
const hashtagsWrapper = $.querySelector("#hashtags-wrap");
const uploadBtn = $.querySelector("#upload-button");
const modal = $.querySelector("#modal-card");
const modalScreen = $.querySelector("#modal");
const verifyNeedButton = $.querySelector("#send-verification-request");

const modalCloseHandler = () => {
  modalScreen.classList.remove("visible");
};
const modalOpenHandler = () => {
  modalScreen.classList.add("visible");
};

modal.addEventListener("click", (event) => {
  event.stopPropagation();
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

modalScreen.addEventListener("click", (event) => {
  modalCloseHandler();
});

const hashtagCleaner = (event) => {
  let splitter = event.target.value.split(",");
  splitter = splitter.filter((tag) => tag.trim() !== ""); // Remove empty tags
  hashtagInput.value = "";
  console.log(splitter);
  hashtags.push(...splitter); // Push individual tags instead of the array
  pushElements(hashtags); // Update the displayed hashtags
};

const pushElements = (elements) => {
  hashtagsWrapper.innerHTML = "";
  elements.forEach((element) => {
    hashtagsWrapper.insertAdjacentHTML(
      "beforeend",
      `
            <a href="#" class="hashtag-link">
                #${element}
            </a>`
    );
  });
};

hashtagInput.addEventListener("keyup", (event) => {
  if (event.target.value.includes(",")) {
    hashtagCleaner(event);
  }
});

verifyNeedButton.addEventListener("click", (event) => {
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
