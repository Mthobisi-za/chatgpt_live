function CreateConversation(user, chatgpt) { 
  var strChats = `
    <div class="text">
        <span class="span_title">${user.name}</span>
        <span class="span_content">${user.convo}</span>
    </div> <br> 
    <div class="text">
        <span class="span_title">${chatgpt.name}</span>
        <span class="span_content"><pre>${chatgpt.res}</pre></span>
    </div> <br> <br> <br><br>
    `;

  var div = document.createElement("div");
  div.classList.add("content_wrapper");
  div.insertAdjacentHTML("beforeend", strChats);
  document.querySelector(".content").appendChild(div);

  //  document.querySelector(".scroller").scrollIntoView(true);
}

document.querySelector(".send").addEventListener("click", () => {
  var textarea = document.querySelector(".text_area");
  var query = textarea.value;
var name = localStorage.getItem('username');
var previosConvo = localStorage.getItem('convo');
  if (query) {
    document.querySelector(".loader-container").style.display = "flex";
    console.log(query);
    fetch(`https://chatgpt-test-4uea.onrender.com/savanna/${query}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        // var txt = res.data.data.replaceAll("\n", "<br> <br>");
        if(previosConvo){
          var obj = JSON.parse(previosConvo);
          var newData = [...obj,{ name: name, convo: query },{ name: "Chatgpt", res: res.data }];
          localStorage.setItem('convo', JSON.stringify(newData));
        }else{
          localStorage.setItem('convo', JSON.stringify([{ name: name, convo: query },{ name: "Chatgpt", res: res.data }]));
        }
        CreateConversation({ name: name, convo: query },{ name: "Chatgpt", res: res.data });
      }).then(()=>{
        document.querySelector(".loader-container").style.display = "none";
      });
      
      ;textarea.value = " ";
  }
  
});
// document.querySelector(".scroller").scrollIntoView(true);
{
  /* <br> */
}
