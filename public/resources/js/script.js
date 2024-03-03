
window.onload = (event) => {

  if (window.location.pathname=='/') {
    var i = 0;
    var txt = 'job opportunities and internships.';
    var speed = 50;
    
    typeWriter();

    function typeWriter() {
      if (i < txt.length) {
        document.getElementById("typewriter").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
  
  }

};


function deleteJob(id){
  
  const result = confirm("Are you sure you want to delete this Job posting");
  if(result){

    fetch('/deletejob/'+id,{
      method: "POST",
    }).then((res) => {
      if(res.ok){
        window.location = '/jobs';
      }
    });

  }


}


function search() {

  var inputText = document.getElementById("searchJob").value;

  var text = inputText.toLowerCase();

  var joblist = document.getElementById("joblist");

  var jobs = joblist.querySelectorAll("a")

  var titles = joblist.querySelectorAll("h2");

  for (let i = 0; i < titles.length; i++) {
    var title = titles[i].outerText

    if (!title.toLowerCase().includes(text)) {
      jobs[i].style.display = "none";
    } else{
      jobs[i].style.display = "";
    }

  }



}

