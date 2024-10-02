const modal = document.querySelector(".modalThird");
const btnOpenModal = document.querySelector(".btn-open-modalThird");

btnOpenModal.addEventListener("click", () => {
  modal.style.display = "flex";
});

const closebtn = document.querySelector("#close")

closebtn.addEventListener("click", ()=>{
    modal.style.display = "none";
})
