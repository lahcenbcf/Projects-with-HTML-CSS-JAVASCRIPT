import data from "./data.json" assert {type:"json"};
console.log(data)
// display comments
const commentsWrapper=document.querySelector(".post-comments");
const likes=document.querySelector(".likes");
likes.innerHTML=`${data.currentUser.likes}
<i class="fa-solid fa-heart" style="color: red;"></i>`;
const comments=document.querySelector(".comments");
comments.textContent=data.comments.length
function displayComments(){
    commentsWrapper.innerHTML="";
    const comments = data.comments;
    comments.forEach(comment => {
       const {content,createdAt,score,user,replies}=comment;
       /*const commentBody=document.createElement("div");
       commentBody.className="comment-body";
       const commentContainer=document.createElement("div").className="comment-container";
       const upDownDiv=document.createElement("div").className="up-down";
       const commentInfo=document.createElement("div").className="comment-info";
                const userDiv=document.createElement("div")
                userDiv.className="user";
                const userImage=document.createElement("div");
                userImage.className="user-image";
                userImage.style.backgroundImage=`url(${user.image.png})`
                const userInfo=document.createElement("div")
                userInfo.className="user-info";
                const userName=document.createElement("h3")
                userName.className="user-name";
                userName.textContent=user.username;
                const timeAgo=document.createElement("p");
                timeAgo.className="time-ago";
                timeAgo.textContent=createdAt;
                userInfo.appendChild(userName);
                userInfo.appendChild(timeAgo)
                //append childs to user
                userDiv.appendChild(userImage);
                userDiv.appendChild(userInfo);
        const commentText=document.createElement("div");
        commentText.classList.add("comment-text");
        const p=document.createElement("p");
        p.className="text";
        p.textContent=content;
        commentText.appendChild(p)

        commentInfo.appendChild(userDiv);
        commentInfo.appendChild(commentText)
        //apend to comment-container
        commentContainer.appendChild(upDownDiv);
        commentContainer.appendChild(commentInfo);

*/

        const commentElement=document.createElement("div");
        commentElement.innerHTML=`
        <div class="comment-body">
        <div class="comment-container">
            <div class="up-down">
                <i class="fa-solid fa-plus"></i>
                <div class="likes-num">${score}</div>
                <i class="fa-solid fa-minus"></i>
            </div>
            
            <div class="comment-info">
                <!--user info-->
                <div class="user">
                    <div class="user-image" style="background-image:url(${user.image.png})"></div>
                    <div class="user-info">
                        <h3 class="user-name">${user.username}</h3>
                        <p class="time-ago">${createdAt}</p>
                    </div>
                
                </div>
                <!--comment text-->
                <div class="comment-text">
                    <p class="text">${content}</p>

                </div>
            </div>
            <div>
            <div class="replay" data-id=${comment.id}>
            <i class="fa-solid fa-reply"></i>
        </div>
        <image src="./images/icon-delete.svg" />
            </div>
            
        </div>
        <div class="replay-input" data="${comment.id}">
        <input type="text" placeholder="tap to replay">
        <i class="fa-solid fa-paper-plane 2"></i>
    </div>
        <!--replay section-->
                <div class="replys-section">
               
            
            ${ replies.map(replay=>{
                
                 return `
                 <div class="replay-container">
                 <div class="up-down">
                 <i class="fa-solid fa-plus"></i>
                 <div class="likes-num">${replay.score}</div>
                 <i class="fa-solid fa-minus"></i>
             </div>
             
             <div class="comment-info">
                 <!--user info-->
                 <div class="user">
                     <div class="user-image" style="background-image:"url(${replay.user.image.png})""></div>
                     <div class="user-info">
                         <h3 class="user-name">${replay.user.username}</h3>
                         <p class="time-ago">${replay.createdAt}</p>
                     </div>
                 
                 </div>
                 <!--comment text-->
                 <div class="comment-text">
                     <p class="text">@${comment.user.username} ${replay.content}.</p>
                 </div>
             </div>
                <div class="reply-delete" data-commentId=${comment.id} data-replyId=${replay.id}>
                <image src="./images/icon-delete.svg" /></div>
                 </div>
                
                    
            
                `
                
            }).join("")}


           
            </div>
            
                    
                </div>
                
        `
            commentsWrapper.appendChild(commentElement);
    })
}

displayComments()


//add Comment
const commentToggle=document.querySelector(".fa-comment");
const commentInput=document.querySelector(".comment-input");
const sendButton=document.querySelector(".fa-paper-plane");
const input=document.querySelector(".comment-input input")
commentToggle.addEventListener("click",(e)=>{

    commentInput.classList.toggle("active")
})

sendButton.addEventListener("click",()=>{
    if(!input.value.length){
        input.value="enter a comment!!!";
    }else{
        data.comments.push({
            id:Math.floor(Math.random()*10)+data.comments[data.comments.length-1].id,
            content:input.value,createdAt:moment(new Date()).fromNow(),
            score:0,user:{
                image:{png:"https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/99/998634552d2db0f174faf9d20df5648326e24928_full.jpg"},
                username:"lahcen bcf"
            },replies:[]
        })
    }

    input.value=""

    displayComments()
})

//fade repaly input
const replayButtons=document.querySelectorAll(".replay");
replayButtons.forEach(button=>{
    button.addEventListener("click",()=>{
console.log("hi")
        const dataAttr=button.getAttribute("data-id");
        const elementToTransform=document.querySelector(`[data="${dataAttr}"]`);
        elementToTransform.classList.toggle("active")
        //replay onchange event
        const inputText=elementToTransform.querySelector("input");
        const sendButton=elementToTransform.querySelector(".fa-paper-plane");
        sendButton.addEventListener("click",()=>{
            const valueText=inputText.value;
            if(valueText==""){
                inputText.value=""
            }else{
                data.comments[dataAttr-1].replies.push({
                    id:Math.floor(Math.random()*10)+data.comments[dataAttr-1].replies.length,
                    content:valueText,
                    createdAt:moment(new Date()).fromNow(),
                    user:{
                        image:{png:"https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/99/998634552d2db0f174faf9d20df5648326e24928_full.jpg"},
                        username:"lahcen bcf"
                    },score:0
                })
            }
            inputText.value=""
            displayComments()
        }
        )
    })
})

 

//delete-reply
const deleteReplyButtons=document.querySelectorAll(".reply-delete");
deleteReplyButtons.forEach(btn=>{
    btn.addEventListener("click",()=>{
        console.log("hhhh")
        const commentId=btn.getAttribute("data-commentId");
        const replyId=btn.getAttribute("data-replyId");
        console.log(commentId,replyId)
    if(replyId>0){
        data.comments[commentId-1].replies=data.comments[commentId-1].replies.filter(r=>r.id!=replyId)
    }
    displayComments()
    })
})
