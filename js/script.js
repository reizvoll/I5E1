// modal 열기 버튼 눌었을 때 모달창 보이기
const modal_1 = document.querySelector(".modalFirst");
const btnOpenModal_1 = document.querySelector(".btn-open-modalFirst");

btnOpenModal_1.addEventListener("click", () => {
  modal_1.style.display = "flex";
});



const menuBtn1 = document.getElementById('menuBtn1')
const menu1 = document.getElementById('menu1')

  // 메뉴 버튼 클릭 시 메뉴 보이기/숨기기
  menuBtn1.addEventListener('click', function(e) {
    console.log("clicked");
    menu1.style.display = "flex";
});

// 수정 버튼 클릭 시 처리
document.getElementById('editBtn').addEventListener('click', function() {
    menu1.style.display = menu1.style.display === 'none' || menu1.style.display === '' ? 'flex' : 'none';
});

// 삭제 버튼 클릭 시 처리
document.getElementById('deleteBtn').addEventListener('click', function() {
    alert('삭제되었습니다.');
    menu1.style.display = 'none';
});

// 메뉴 외부 클릭 시 메뉴 숨기기
document.addEventListener('click', function(e) {
    if (!menu1.contains(e.target) && e.target !== menuBtn1) {
        menu1.style.display = 'none';
    }
});




// X 버튼 눌렀을 때 모달창 숨기기
const closebtn = document.querySelector("#close");

closebtn.addEventListener("click", () => {
  modal_1.style.display = "none";
});
