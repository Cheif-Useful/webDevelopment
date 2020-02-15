console.log("everything is fine.");

showCard();

// Adding notes to local storage
let submit = document.getElementById("submit");
submit.addEventListener("click", function () {
    let title = document.getElementById("title");
    let noteText = document.getElementById("note-text");
    let alertHtml = document.getElementById('alert');
    let notes = localStorage.getItem("notes");
    let impo = document.getElementById("important");
    let mkTime = funcTime();
    let noteStored = {
        title: title.value,
        text: noteText.value,
        time: mkTime,
        isImpo: impo.checked
    }
    if (title.value.length <= 2 || noteText.value.length < 5) {
        let myHtml = "";
        myHtml += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>ERRoR!</strong>Please Enter Valid Note.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`;
        alertHtml.innerHTML = myHtml;
    } else {
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);       //Changes Array To Object
        }
        notesObj.push(noteStored);              //Pushed Array to Object
        localStorage.setItem("notes", JSON.stringify(notesObj));
    }
    title.value = "";
    noteText.value = "";
    showCard();
})

// Making Time
function funcTime() {
    let timeStamp = new Date(), Dt = timeStamp.getDate(), M = timeStamp.getMonth();
    let H = timeStamp.getHours(), min = timeStamp.getMinutes();
    let Y = timeStamp.getFullYear();
    switch (M) {
        case 0: M = "Jan";
            break;
        case 1: M = "Feb";
            break;
        case 2: M = "Mar";
            break;
        case 3: M = "Apr";
            break;
        case 4: M = "May";
            break;
        case 5: M = "Jun";
            break;
        case 6: M = "Jul";
            break;
        case 7: M = "Aug";
            break;
        case 8: M = "Sept";
            break;
        case 9: M = "Oct";
            break;
        case 10: M = "Nov";
            break;
        case 11: M = "Dec";
            break;
    }
    min = JSON.stringify(min);
    if (min.length == 1) {
        min = `0${min}`;
    }
    let tm = `${H} : ${min}`;
    return `${Dt}-${M}-${Y} | ${tm}`
}

// Showing Cards
function showCard() {
    let notes = localStorage.getItem("notes");
    let myHtml = "", bg;
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);       //Changes Array To Object
    }
    notesObj.forEach(function (element, index) {
        bg = (element.isImpo) ? ("danger") : ("light");  //Inline if-else
        myHtml += `<div class="card bg-${bg} my-2 mx-2 noteCard" style="max-width: 18rem;">
                        <div class="card-header"><strong>${element.title}</strong></div>
                        <div class="card-body">
                            <p class="card-text">${element.text}</p>
                            <button id="${index}" onclick="removeCard(this.id)" class="btn btn-secondary">Remove</button>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">${element.time}</small>
                        </div>
                    </div>`;                            //onclick = function(this.id)
    });
    let notesHtml = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesHtml.innerHTML = myHtml;
    } else {
        notesHtml.innerHTML = `<div class="alert alert-success" role="alert">
                                    <strong>Nothing Here!</strong> | Add Notes to See them.
                                </div>`;
    }
}

// Removing Cards
function removeCard(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showCard();
}

//Searcing {Yet to learn}
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTitle = element.getElementsByTagName("strong")[0].innerText;
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if ((cardTxt.includes(inputVal)) || cardTitle.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})