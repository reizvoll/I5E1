const members = [
  {
    description: "&#34유일무E리-다..쉽지않다&#34",
    name: "임지영",
    mbti: "ENTJ",
    image: "",
  },
  {
    description: "&#34일할땐 안 누워있어요&#34",
    name: "원윤선",
    mbti: "ISFP",
    image: "",
  },
  {
    description: "&#34기세로 간다&#34",
    name: "김진실",
    mbti: "INFP",
    image: "",
  },
  {
    description: "&#34겉핥기 개발자&#34",
    name: "박가나",
    mbti: "ISTJ",
    image: "",
  },
  {
    description: "&#34전역 1달차 따끈한 킹반인&#34",
    name: "박하은",
    mbti: "ISFJ",
    image: "",
  },
  {
    description: "&#34감자라 굴러가유&#34",
    name: "박채현",
    mbti: "INTJ",
    image: "",
  },
];

$(document).ready(function () {
  console.log("Checking reload");
  createCards();
});

// TODO
// 나중에 firebase에서 데이터 가져와서
// 카드 생성하는 방향으로 바꾸어야 함
function createCards() {
  members.forEach((member, i) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.classList.add("mycard");
    cardDiv.dataset.index = i;

    cardDiv.innerHTML = `
      <p class="member-des">${member.description}</p>
      <div class="card-content">
        <div class="card-image">
          <img src="./assets/Coding Potato.jpg" alt="..." class="profile-pic">
        </div>
        <div class="card-body">
          <h5 class="card-title bold">${member.name}</h5>
          <span>${member.mbti}</span>
        </div>
      </div>`;

    $("#team-cards").append(cardDiv);

    cardDiv.addEventListener("click", (event) => {
      console.log(cardDiv.dataset.index + "의 상세보기 페이지");
    });
  });
}
