
const memberFormDb = firebase.database().ref("member");



// 모달 열기 함수 정의
function openModal(memberId, imgUrl, name, mbti, blog, intro, description, cardDiv) {
  console.log(memberId,"오픈모달함수(1)");
  const modal_1 = document.querySelector(".modalFirst"); 
  window.currentMemberId = memberId; // 선택된 멤버의 ID 저장
  console.log("선택된 멤버 ID:", window.currentMemberId);

  // 모달 보이기
  modal_1.style.display = "flex";

  // 기존 데이터 모달에 채우기
  document.getElementById("memberImg").src = imgUrl;
  document.getElementById("nameBox").innerText = name;
  document.getElementById("mbtiBox").innerText = mbti;
  document.getElementById("descriptionBox").innerText = description;

  // 블로그 버튼 클릭 시 URL로 이동
  document.getElementById("blogBtn").addEventListener("click", function () {
    location.href = blog;
  });

  // 수정 창의 이미지 및 값 설정
  document.getElementById("imgPreview").src = imgUrl;
  document.getElementById("name").value = name;
  document.getElementById("mbti").value = mbti;
  document.getElementById("blog").value = blog;
  document.getElementById("intro").value = intro;
  document.getElementById("description").value = description;

  // 'yes' 버튼 클릭 시 데이터 삭제
const yesBtn = document.getElementById("yes");

yesBtn.removeEventListener("click", handleDelete); // 기존 리스너 제거

console.log(memberId, "리스너 제거 이후(2)");

yesBtn.addEventListener("click", handleDelete);

function handleDelete() {
  if (window.currentMemberId) {
    memberFormDb.child(window.currentMemberId).remove()
      .then(() => {
        document.querySelector(".modalThird").style.display = "none";
        document.querySelector(".modalFirst").style.display = "none";
        console.log("삭제 완료:", window.currentMemberId);
        location.reload();
        
      })
      .catch((error) => {
        console.log("삭제 중 오류: ", error);
      });
  }
}

}

// 모달1 X 버튼 클릭 시 모달 닫기
const closebtn = document.querySelector("#close");
closebtn.addEventListener("click", () => {
  const modal_1 = document.querySelector(".modalFirst");
  modal_1.style.display = "none";
});

// 카드 생성 및 이벤트 리스너 추가
function createCards() {
  

  memberFormDb.on("child_added", (snapshot) => {
    const memberObj = snapshot.val();
    const memberId = snapshot.key;

    const name = memberObj.name;
    const mbti = memberObj.mbti;
    const blog = memberObj.blog;
    const intro = memberObj.intro;
    const description = memberObj.description;
    const imgUrl = memberObj.imgUrl || "./images/no_image.png";

    const cardDiv = document.createElement("div");
    cardDiv.className = "card mycard";

    cardDiv.innerHTML = `
      <p class="member-des"><span>" </span>${intro}<span> "</span></p>
      <div class="card-content">
        <div class="card-image">
          <img src="${imgUrl}" alt="..." class="profile-pic">
        </div>
        <div class="card-body">
          <h5 class="card-title bold">${name}</h5>
          <span>${mbti}</span>
        </div>
      </div>`;

    document.getElementById("team-cards").appendChild(cardDiv);

    // 카드 클릭 시 모달 열기
    cardDiv.addEventListener("click", () => {
      openModal(memberId, imgUrl, name, mbti, blog, intro, description, cardDiv);
    });
  });
}

// 페이지 로드 시 카드 생성
document.addEventListener("DOMContentLoaded", function () {
  createCards();
});
