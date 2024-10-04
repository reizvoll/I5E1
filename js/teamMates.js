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

document.addEventListener("DOMContentLoaded", function () {
  createCards();
});


function createCards() {
  const memberFormDb = firebase.database().ref("member");

  memberFormDb.on("child_added", (snapshot) => {
    const memberObj = snapshot.val();

    const memberId = snapshot.key; //데이터의 고유 ID 가져오기

    const name = memberObj.name;
    const mbti = memberObj.mbti;
    const blog = memberObj.blog;
    const intro = memberObj.intro;
    const description = memberObj.description;
    const imgUrl = memberObj.imgUrl;

    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.classList.add("mycard");
    // cardDiv.dataset.index = i;

    cardDiv.innerHTML = `
      <p class="member-des">${intro}</p>
      <div class="card-content">
        <div class="card-image">
          <img src="${imgUrl}" alt="..." class="profile-pic">
        </div>
        <div class="card-body">
          <h5 class="card-title bold">${name}</h5>
          <span>${mbti}</span>
        </div>
      </div>`;

    // const teamCards = document.getElementById("team-cards");
    document.getElementById("team-cards").appendChild(cardDiv);

    // 모달1 X 버튼 눌렀을 때 모달창 숨기기
    const closebtn = document.querySelector("#close");

    closebtn.addEventListener("click", () => {
      modal_1.style.display = "none";
    });

    // 팀원 카드에 각각 첫번째 모달창 띄우기
    const modal_1 = document.querySelector(".modalFirst");

    cardDiv.addEventListener("click", (event) => {
      // 
      modal_1.style.display = "flex";

      //새로 카드 추가할 때
      document.getElementById("memberImg").src = imgUrl;
      document.getElementById("nameBox").innerText = name;
      document.getElementById("mbtiBox").innerText = mbti;
      document.getElementById("descriptionBox").innerText = description;

      document.getElementById("blogBtn").addEventListener("click", function () {
        location.href = blog; // 클릭 시 URL로 이동
      });

      //수정 창 떴을 때 저장되어 있던 값 불러오기
      document.getElementById("name").value = name;
      document.getElementById("mbti").value = mbti;
      document.getElementById("blog").value = blog;
      document.getElementById("intro").value = intro;
      // document.getElementById("imgInput").value=imgUrl;
      document.getElementById("description").value = description;

      document.getElementById("yes").addEventListener("click", () => {
        memberFormDb
          .child(memberId)
          .remove()
          .then(() => {
            console.log("데이터 삭제 완료");
            cardDiv.remove(); //UI 카드제거
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  });
}
