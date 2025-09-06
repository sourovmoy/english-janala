// get button from server
const getData = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((lessons) => lessonsLoad(lessons.data));
};
// btn style remove
const btnStyleRemove = (id) => {
  const btns = document.querySelectorAll(".lessons-btn");
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });
  const btn = document.getElementById(`lesson-btn-${id}`);
  btn.classList.add("active");
};

const lessonsLoad = (info) => {
  const container = document.getElementById("lessons-container");
  container.innerHTML = "";
  info.forEach((data) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <button id="lesson-btn-${data.level_no}" onclick="lessonOFWords(${data.level_no})" class="btn lessons-btn border-[#422AD5] text-[#422AD5]"><i class="fa-solid fa-book-open"></i>Lesson-${data.level_no}
            
    </button>
    
    `;
    container.append(div);
  });
};
// spinner management
const spinner = (statement) => {
  if (statement == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("card-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("card-container").classList.remove("hidden");
  }
};

// click button to call the words function

const lessonOFWords = (id) => {
  spinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((trs) => trs.json())
    .then((words) => {
      btnStyleRemove(id);
      wordsLoad(words.data);
    });
};
const wordsLoad = (words) => {
  // for remove default
  const emptyContainer = document.getElementById("empty-container");
  emptyContainer.innerHTML = "";
  emptyContainer.classList.remove("py-20");
  // get the cards container
  const container = document.getElementById("card-container");
  container.innerHTML = "";

  // make a condition
  if (words.length == 0) {
    const div2 = document.createElement("div");
    div2.innerHTML = `
            <div class="py-10 flex justify-center">
              <img src="assets/alert-error.png" alt="" />
            </div>
            <p class="bangla text-[#79716B]">
              এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h3 class="bangla font-medium text-4xl pt-6">
              নেক্সট Lesson এ যান
            </h3>
         
      `;
    emptyContainer.append(div2);
    spinner(false);
    return;
  } else {
    // get all the word
    words.forEach((word) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="rounded-xl bg-white py-10 items-center">
              <div>
                <h4>${word.word ? word.word : "শব্দ পাওয়া যাই নি"}</h4>
                <p class="my-2">Meaning /Pronounciation</p>
                <h4 class="bangla">"${
                  word.meaning ? word.meaning : "অর্থ পাওয়া যাই নি "
                }/${
        word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যাই নি "
      }"</h4>
              </div>
              <div class="px-10 mt-10 flex justify-between">
                <button onclick="loadModalWord(${
                  word.id
                })" class="p-3 bg-[#1a91ff1a] rounded-md"
                  ><i class="fa-solid fa-circle-question"></i
                ></button>
                <button class="p-3 bg-[#1a91ff1a] rounded-md"
                  ><i class="fa-solid fa-volume-high"></i
                ></button>
              </div>
        </div>
      `;
      container.append(div);
    });
  }
  spinner(false);
};
// for modal words details wordsLoad
const loadModalWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((word) => showWord(word.data));
  const showModal = document.getElementById("show-modal");
  showModal.innerHTML = "";
  const showWord = (id) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="border-[#edf7ff] border-5 rounded-md p-5">
                <h3 class="text-lg text-left font-bold">
                ${
                  id.word ? id.word : "শব্দ পাওয়া যাই নি"
                }(<i class="fa-solid fa-microphone-lines"></i>: ${
      id.pronunciation ? id.pronunciation : "উচ্চারণ পাওয়া যাই নি"
    })
              </h3>
              <h5 class="text-left font-bold pt-4">Meaning</h5>
              <h6 class="text-left p-2 font-medium">${
                id.meaning ? id.meaning : "অর্থ পাওয়া যাই নি "
              }</h6>
              <h4 class="text-left font-bold pt-4 ">Example</h5>
              <h6 class="text-left p-2 font-medium">
                ${id.sentence ? id.sentence : "Sentence পাওয়া যাই নি"}
              </h6>
              <h4 class="text-left py-4 font-bold ">সমার্থক শব্দ গুলো</h5>
             <div class="flex gap-4"><p class=" bg-[#d7e4ef] rounded-md p-2">${
               id.synonyms[0] ? id.synonyms[0] : ""
             }</p>
               <p class=" bg-[#d7e4ef] rounded-md p-2">${
                 id.synonyms[1] ? id.synonyms[1] : ""
               }</p>
               <p class=" bg-[#d7e4ef] rounded-md p-2">${
                 id.synonyms[2] ? id.synonyms[2] : ""
               }</p>
            </div>
            </div>
            <div class="modal-action">
                <form method="dialog">
                  <!-- if there is a button in form, it will close the modal -->
                  <button class="btn btn-primary rounded-xl">
                    Complete Learning
                  </button>
                </form>
              </div>
    
    `;
    showModal.append(div);
  };

  // modal function call
  my_modal_5.showModal();
};

getData(); //button call function
