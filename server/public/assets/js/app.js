window.onload = function() {
  let data = this.responseText;
  let nodelist = document.querySelectorAll('section.links ul li a');
  let text = document.querySelectorAll('section.links ul li a h5');
  let test = document.getElementById('test');

  function handleData () {
    parseData(this.responseText);
  }

    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", handleData);
    oReq.open("GET", "http://ec2-54-165-205-21.compute-1.amazonaws.com/alchemy/latest");
    oReq.send();


    function parseData(data){
      let content = JSON.parse(data);
      console.log(content);

      for (let j = 0; j<content.length; j++) {
        console.log(content.length);
        nodelist[j].href = content[j].url;
        text[j].innerHTML = content[j].url; 

        // if (content.length > nodelist.length) {
        //   // let parent = document.querySelectorAll('section.links.recent-additions ul');
        //   for (let i = 0; i<(content.length-nodelist.length)+nodelist.length; i++) {
        //     let newlink = document.createElement('li');
        //
        //   }
          // let parent = document.querySelectorAll('section.links ul li h5');
          // parent.appendChild(newlink);
          // parent[i].innerHTML = content[j].url;
        // }


      }
    }

}
