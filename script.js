// get button from server
const getData = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((lessons) => lessonsLoad(lessons.data));
};

const lessonsLoad = (info) => {
  const container = document.getElementById("lessons-container");
  container.innerHTML = "";
  info.forEach((data) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <button onclick="lessonOFWords(${data.level_no})" class="btn border-[#422AD5] text-[#422AD5]">
              <span><img src="assets/fa-book-open.png" alt="" /></span
              >Lesson-${data.level_no}
            
    </button>
    
    `;
    container.append(div);
  });
};
// click button to call the words function

const lessonOFWords = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((trs) => trs.json())
    .then((words) => wordsLoad(words.data));
};
const wordsLoad = (words) => {
  const emptyContainer = document.getElementById("empty-container");
  emptyContainer.innerHTML = "";
  const container = document.getElementById("card-container");
  container.innerHTML = "";

  words.forEach((word) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="rounded-xl bg-white py-10 items-center">
              <div>
                <h4>${word.word}</h4>
                <p class="my-2">Meaning /Pronounciation</p>
                <h4 class="bangla">"${word.meaning}/${word.pronunciation}"</h4>
              </div>
              <div class="px-10 mt-10 flex justify-between">
                <span class="p-3 bg-[#1a91ff1a] rounded-md"
                  ><i class="fa-solid fa-circle-question"></i
                ></span>
                <span class="p-3 bg-[#1a91ff1a] rounded-md"
                  ><i class="fa-solid fa-volume-high"></i
                ></span>
              </div>
            </div>
    `;
    container.append(div);
  });
};

getData(); //button call function
