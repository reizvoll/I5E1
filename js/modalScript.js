// teammates.js 파일이 실행되고 나서 실행되어야 하는 로직입니다.
//스크립트가 비동기 처리에 대해서 이번 프로젝트에 다루는데 한계가 있어 셋타임아웃으로 처리합니다. -강민튜터님-
// setTimeout(function(){
//   const btnOpenModal_1 = document.querySelector(".mycard");
//   btnOpenModal_1.addEventListener("click", () => {
//     modal_1.style.display = "flex";
//   });
// }, 2000)

const menuBtn1 = document.getElementById("menuBtn1");
const menu1 = document.getElementById("menu1");

const createBtn = document.getElementById("createBtn");

createBtn.addEventListener("click", () => {
  modal_2.style.display = "block";
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
  e.preventDefault(); //새로고침방지

  var name = getElementVal("name");
  var mbti = getElementVal("mbti");
  var blog = getElementVal("blog");
  var intro = getElementVal("intro");
  var description = getElementVal("description");

  //db에 값 넣는 함수
  saveMember(name, mbti, blog, intro, description, imgUrl);
}

const saveMember = (name, mbti, blog, intro, description, imgUrl) => {
  var newMember = memberFormDb.push();
  newMember.set({
    name: name,
    mbti: mbti,
    blog: blog,
    intro: intro,
    description: description,
    imgUrl: imgUrl,
  });
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
    saveImgFn(file, saveLocation);
  } else {
    console.log("파일 선택해주세요");
  }
}

//이미지 스토어에 저장할 함수
const saveImgFn = (file, saveLocation) => {
  saveLocation
    .put(file)
    .then((snapShot) => {
      console.log("업로드 성공", file.name);
      return snapShot.ref.getDownloadURL();
    })
    .then((url) => {
      imgUrl = url; //전역 변수 imgUrl에 넣는다
      console.log("URL: ", imgUrl);
    })
    .catch((error) => {
      console.log(error);
    });
};
// create 완성

//read
// memberFormDb.on("child_added", (snapshot) => {
//   //snapshot에는 새로 들어온 데이터가 들어있다.
//   const memberObj = snapshot.val();
//   const memberId = snapshot.key; //데이터의 고유 ID 가져오기

//   const readTest = document.getElementById("readTest");

//   const name = memberObj.name;
//   const mbti = memberObj.mbti;
//   const blog = memberObj.blog;
//   const intro = memberObj.intro;
//   const description = memberObj.description;
//   const imgUrl = memberObj.imgUrl;

//   const memberDiv = document.createElement("div");
//   memberDiv.classList.add("memCard");

//   const nameDiv = document.createElement("div");
//   const mbtiDiv = document.createElement("div");
//   const introDiv = document.createElement("div");
//   const imgDiv = document.createElement("img");

//   nameDiv.innerText = name;
//   mbtiDiv.innerText = mbti;
//   introDiv.innerText = intro;
//   imgDiv.src = imgUrl;

//   memberDiv.appendChild(nameDiv);
//   memberDiv.appendChild(mbtiDiv);
//   memberDiv.appendChild(introDiv);
//   memberDiv.appendChild(imgDiv);
//   readTest.appendChild(memberDiv);
//   console.log("들어왔나/");

//   memberDiv.addEventListener("click", () => {
//     console.log(memberId);
//     modal_1.style.display = "flex";

//     //새로 카드 추가할 때
//     document.getElementById("memberImg").src = imgUrl;
//     document.getElementById("nameBox").innerText = name;
//     document.getElementById("mbtiBox").innerText = mbti;
//     document.getElementById("descriptionBox").innerText = description;
//     document.getElementById("blogBtn").addEventListener("click", function () {
//       location.href = blog; // 클릭 시 URL로 이동

//       //수정 창 떴을 때 저장되어 있던 값 불러오기
//       document.getElementById("name").value = name;
//       document.getElementById("mbti").value = mbti;
//       document.getElementById("blog").value = blog;
//       document.getElementById("intro").value = intro;
//       // document.getElementById("imgInput").value=imgUrl;
//       document.getElementById("description").value = description;

//       document.getElementById("yes").addEventListener("click", () => {
//         memberFormDb
//           .child(memberId)
//           .remove()
//           .then(() => {
//             console.log("데이터 삭제 완료");
//             memberDiv.remove(); //UI 카드제거
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       });
//     });
//   });
// });

//요소 값 가져오는 함수
const getElementVal = (id) => {
  return document.getElementById(id).value;
};
