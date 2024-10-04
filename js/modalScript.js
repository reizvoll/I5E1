
window.currentMemberId = null; //멤버데이터 ID값 저장 전역변수
const menuBtn1 = document.getElementById("menuBtn1");
const menu1 = document.getElementById("menu1");

const createBtn = document.getElementById("createBtn");

createBtn.addEventListener("click", () => {
// 카드 추가 버튼 클릭 시 내용 지우기
  document.getElementById('name').value="";
  document.getElementById('mbti').value="";
  document.getElementById('blog').value="";
  document.getElementById('intro').value="";
  document.getElementById('description').value="";
  document.getElementById("imgPreview").src ="./images/no_image.png";
  window.currentMemberId = null;
  modal_2.style.display = "flex";
});




// 메뉴 버튼 클릭 시 메뉴 보이기
menuBtn1.addEventListener("click", function (e) {
  console.log("clicked");
  menu1.style.display = "flex";
});

// 수정 버튼 클릭 시 처리
const modal_1 = document.querySelector(".modalFirst");

const modal_2 = document.querySelector(".modalSecond");
const btnOpenModal_2 = document.querySelector(".btnOpenModal_2");

btnOpenModal_2.addEventListener("click", () => {
  modal_1.style.display = "none";
  modal_2.style.display = "flex";
});

// 메뉴 외부 클릭 시 메뉴 숨기기
document.addEventListener("click", function (e) {
  if (!menu1.contains(e.target) && e.target !== menuBtn1) {
    menu1.style.display = "none";
  }
});


// 모달2 X 버튼 눌렀을 때 모달창 숨기기
const closebtn2 = document.querySelector("#close2");

closebtn2.addEventListener("click", () => {
  modal_2.style.display = "none";
});

// 두번째 모달창 등록버튼 눌렀을 때 창 꺼지기
const closeRegister = document.querySelector("#register");

closeRegister.addEventListener("click", () => {
  modal_2.style.display = "none";
});

// 첫번째 모달창 삭제 버튼 클릭 시 처리
const modal_3 = document.querySelector(".modalThird");
const btnOpenModal_3 = document.querySelector(".btn-open-modalThird");

btnOpenModal_3.addEventListener("click", () => {
  modal_3.style.display = "flex";
});

// 3번째 모달창 X 아이콘 클릭 시 처리
const closebtn3 = document.querySelector("#close3");

closebtn3.addEventListener("click", () => {
  modal_3.style.display = "none";
});

//아니오 버튼 눌렀을 때 창 꺼지기
const noBtn = document.querySelector("#no");

noBtn.addEventListener("click", () => {
  modal_3.style.display = "none";
});

//네 버튼 눌렀을 때
document.getElementById("yes").addEventListener("click", function () {
  alert("삭제되었습니다.");
  modal_3.style.display = "none";
  modal_1.style.display = "none";
});

//멤버 카드 제출 관련 기능

//멤버 db초기화
const memberFormDb = firebase.database().ref("member");

//이미지 저장용 스토리지
const Imgstorage = firebase.storage();

let imgUrl = ""; // 이미지 url을 저장할 전역 변수


document.getElementById("memberForm").addEventListener("submit", memberSubmit);

function memberSubmit(e) {
  e.preventDefault(); // 새로고침 방지
  var name = getElementVal("name");
  var mbti = getElementVal("mbti");
  var blog = getElementVal("blog");
  var intro = getElementVal("intro");
  var description = getElementVal("description");

  // db에 값 넣는 함수 (현재 멤버 ID를 전달)
  saveMember(name, mbti, blog, intro, description, imgUrl, window.currentMemberId);
}


const saveMember = (name, mbti, blog, intro, description, imgUrl, currentMemberId) => {
  if (currentMemberId) {
    // 수정 (memberId 있을 때)
    memberFormDb.child(currentMemberId).once("value").then((snapshot) => {
      const existingData = snapshot.val(); // 기존 데이터 가져오기
      const updatedData = {
        name: name,
        mbti: mbti,
        blog: blog,
        intro: intro,
        description: description,
        imgUrl: imgUrl || existingData.imgUrl, // imgUrl가 비어있으면 기존 imgUrl 사용
      };
      return memberFormDb.child(currentMemberId).update(updatedData);
    }).then(() => {
      console.log("멤버 정보 수정 완료");
      location.reload(); 
    }).catch((error) => {
      console.log("수정 중 오류: ", error);
    });
  } else {
    // 새로운 멤버 등록
    var newMember = memberFormDb.push();
    newMember.set({
      name: name,
      mbti: mbti,
      blog: blog,
      intro: intro,
      description: description,
      imgUrl: imgUrl,
    }).then(() => {
      console.log("새로운 멤버 등록 완료");
      
    }).catch((error) => {
      console.log("등록 중 오류: ", error);
    });
  }
};


// 사진 스토어에 업로드
document.getElementById("imgSmt").addEventListener("click", submitImg);

function submitImg(e) {
  e.preventDefault();

  //사용자가 올린 파일 집어오기
  var file = document.querySelector("#imgInput").files[0];

  if (file) {
    //파이어베이스 스토리지에 저장할 경로 설정
    var storageRef = Imgstorage.ref();
    var saveLocation = storageRef.child("image/" + file.name);
    //이미지 스토어에 저장할 함구를 만들고 여기다 선언할것
    saveImgFn(file, saveLocation)
      .then((url) => {
        document.getElementById("imgPreview").src = url; // 업로드된 이미지 URL을 미리보기 src에 설정
      })
      .catch((error) => {
        console.log("미리보기 업데이트 중 오류: ", error);
      });
    
  } else {
    alert("파일을 선택해주세요");
  }
}

// 이미지 스토어에 저장할 함수
const saveImgFn = (file, saveLocation) => {
  return saveLocation
    .put(file)
    .then((snapShot) => {
      console.log("업로드 성공", file.name);
      return snapShot.ref.getDownloadURL(); // 이미지의 다운로드 URL을 반환
    })
    .then((url) => {
      imgUrl = url; // 전역 변수 imgUrl에 저장
      console.log("imgUrl: ", imgUrl);
      return imgUrl; // url 반환
    })
    .catch((error) => {
      console.log("이미지 업로드 실패: ", error);
      
    });
};
// create 완성

//요소 값 가져오는 함수
const getElementVal = (id) => {
  return document.getElementById(id).value;
};
