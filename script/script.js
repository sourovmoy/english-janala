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
    const li = document.createElement("li");
    li.innerHTML = `
    <button class="btn border-[#422AD5] text-[#422AD5]">
              <span><img src="assets/fa-book-open.png" alt="" /></span
              >Lesson-${data.level_no}
            
    </button>
    
    `;
    container.append(li);
  });
};

getData();
