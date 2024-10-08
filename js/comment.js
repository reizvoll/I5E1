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
    // const timestamp = new Date(Date.now()).toLocaleString(); //작성시간, 시간 포매팅 해놨어요 필요없음 지우세요
    const timestamp = Date.now(); //포메팅 지움.
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

        //입력 날짜 비교
        let createAtDate = new Date(commentData.createAt);
        let currentDate = new Date();
        
        // 시간 차이 계산 (밀리초 단위 -> 분 단위로 변환)
        let timeDiff= Math.floor((currentDate - createAtDate) / (1000 * 60)); // 밀리초를 분 단위로 변환
        let timeago = formatTimeAgo(timeDiff, createAtDate);


        // 이전 내역 임시 저장
        let prev_comment = document.getElementById('guestbook').innerHTML;

        // 새로 입력한 방명록 붙이기
        document.getElementById('guestbook').innerHTML = `
            <div class="guestbook-container">
                <img class="guestbook-profile" src="./images/comment-profile.png" />
                <div>
                    <div class="guestbook-user">
                        <p class="guestbook-name">방문자</p>
                        <p class="guestbook-date">${timeago}</p>
                    </div>
                    <p class="guestbook-comment">${commentData.comment}</p>
                </div>
            </div>
        `;

        // 신규 방명록 아래에 이전 내역 붙이기
        document.getElementById('guestbook').innerHTML += prev_comment;
    });
});


function formatTimeAgo(timeDiff, originalDate) {
        if (timeDiff < 60) {
            if (timeDiff < 1) return "방금 전";
            return `${timeDiff}분 전`;
        } else if (timeDiff < 60 * 5) { // Less than 5 hours
            const hoursDiff = Math.floor(timeDiff / 60);
            return `${hoursDiff}시간 전`;
        } else {
            return new Date(originalDate).toLocaleString(); // Show the original date if more than 5 hours
        }
    }