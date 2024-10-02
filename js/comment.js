// Realtime DB 초기화
var commentDb = firebase.database().ref('comment');

// 작성 버튼 eventListener
document.getElementById('commentForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    var content = getElementVal('commentCont');
    console.log(content);
    saveComment(content); // 댓글 저장 함수 호출
}

// 방명록 저장 함수
const saveComment = (content) => {
    var newComment = commentDb.push();
    const timestamp = new Date(Date.now()).toLocaleString(); //작성시간, 시간 포매팅 해놨어요 필요없음 지우세요
    newComment
        .set({ comment: content, createAt: timestamp }) // 방명록 저장
        .then(() => {
            console.log('방명록 저장 성공~:', content, timestamp);
            document.getElementById('commentCont').value = ''; // 입력 필드 비우기
        })
        .catch((error) => {
            console.error('방명록 저장 실패:', error);
        });
};

// DOM 요소 값 얻어오는 함수
const getElementVal = (id) => {
    return document.getElementById(id).value; // 해당 ID의 값 반환
};

document.addEventListener('DOMContentLoaded', function () {
    commentDb.on('child_added', (data) => {
        const commentData = data.val();

        document.getElementById('guestbook').innerHTML += `
            <div class="guestbook-container">
                <img class="guestbook-profile" src="./images/comment-profile.png" />
                <div>
                    <div class="guestbook-user">
                        <p class="guestbook-name">방문자</p>
                        <p class="guestbook-date">${commentData.createAt}</p>
                    </div>
                    <p class="guestbook-comment">${commentData.comment}</p>
                </div>
            </div>
        `;
    });
});
