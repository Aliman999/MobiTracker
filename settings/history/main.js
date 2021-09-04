var display = {
  setTimer:function(int){
    this.timer = int;
  },
  clear:function(){
    clearInterval(this.interval)
  },
  startTimer:function(...func){
    this.interval = setInterval(() => {
      func.forEach((item)=>{
        item();
      })
    }, this.timer);
  },
  interval:null,
  timer: 1000
}

var DOM = {};
var result = null;

function history(obj = { type: 'user', datatype: 'username', input: "" }) {
  if (!obj.type) {
    obj.type = "user";
  }
  if (!obj.datatype) {
    obj.datatype = "username";
  }
  if (!obj.input) {
    throw new error("Input Required");
  } else {
    return send("history", obj);
  }
}

var waitUser = setInterval(async () => {
  if (user) {
    clearInterval(waitUser);
    await socket().then(async (conn)=>{
      if(conn){
        result = await history({ input: user.sessionUser }); //user.sessionUser
      }
    })
  }
}, 1000);

display.startTimer(() => {
  if (result) {
    console.log(result);
    display.clear();
    init();
  }
});

function init(){
  var loading = document.getElementById("loadingContainer");
  loading.style.opacity = 0;
  loading.remove();

  var timeline = {
    container: function(){
      const timelineContainer = document.createElement("div");
      timelineContainer.className = "timeline";

      timelineContainer.appendChild(timeline.bar());

      return timelineContainer;
    },
    bar: function(){
      const timelineBar = document.createElement("div");
      timelineBar.className = "timeline__bar";
      return timelineBar;
    },
    elem: function(title, description, day, month, date, direction = 0, actions, extra){
      const timelineElement = document.createElement("div");
      timelineElement.className = "timeline__elem faded";
      if (direction === 0) {
        timelineElement.classList.add("timeline__elem--left");
      } else {
        timelineElement.classList.add("timeline__elem--right");
      }

      timelineElement.appendChild(timeline.date(day, month));
      timelineElement.appendChild(timeline.event(title, description, date, actions, extra));

      return timelineElement;
    },
    left: function(e){
      return e.classList.add("timeline__elem--left");
    },
    right: function (e) {
      return e.classList.add("timeline__elem--right");
    },
    date: function(day, month){
      const timelineDate = document.createElement("div");
      timelineDate.className = "timeline__date";

      var dateDay = document.createElement("span");
      dateDay.className = "timeline__date-day";
      dateDay.innerText = day;

      var dateMonth = document.createElement("span");
      dateMonth.className = "timeline__date-month";
      dateMonth.innerText = month;

      timelineDate.appendChild(dateDay);
      timelineDate.appendChild(dateMonth);

      return timelineDate;
    },
    event: function(title, description, date, actions, extra){
      const timelineEvent = document.createElement("div");
      timelineEvent.className = "timeline__event";

      const eventDateTime = document.createElement("div");
      eventDateTime.className = "timeline__event-date-time";

      const eventDate = document.createElement("div");
      eventDate.className = "timeline__event-date";
      const dateSpan = document.createElement("span");
      dateSpan.innerText = date;
      eventDate.appendChild(dateSpan);

      eventDateTime.appendChild(eventDate);
      
      timelineEvent.appendChild(eventDateTime);

      const eventTitle = document.createElement("h4");
      eventTitle.className = "timeline__event-title";
      eventTitle.innerText = title;

      const eventDesc = document.createElement("div");
      eventDesc.className = "timeline__event-descr";
      const desc = document.createElement("p");
      desc.innerText = description;

      eventDesc.appendChild(desc);

      timelineEvent.appendChild(eventTitle);
      timelineEvent.appendChild(eventDesc);

      if(actions.length > 0){
        const eventActions = document.createElement("div");
        eventActions.className = "timeline__event-actions";

        for(var x = 0; x < actions.length; x++){
          const action = document.createElement("a");
          action.className = "timeline__event-action";
          if (actions[x].href){
            action.href = actions[x].href;
          }
          action.title = actions[x].text;
          action.innerText = actions[x].text;
          var y = 0;
          action.onclick = function(){
            if(y == 0){
              eventDesc.innerHTML = extra;
              y = 1;
            }else{
              eventDesc.innerHTML = "";
              eventDesc.appendChild(desc);
              y = 0;
            }
          }

          eventActions.appendChild(action);
        }

        timelineEvent.appendChild(eventActions);
      }

      return timelineEvent;
    }
  }

  var field = document.getElementsByClassName("setting")[0];
  var line = timeline.container();
  
  result = result.data;
  var legend = false;
  var changes = document.createElement("p");
  changes.style.marginTop = "8px";
  changes.style.marginLeft = "8px";
  changes.values = {  };
  field.appendChild(changes);
  result.forEach((item, i) => {
    switch(item.title){
      case "Changed Name":
        changes.values[item.title];
        if(changes.values[item.title] == null){
          changes.values[item.title] = 1;
        }else{
          changes.values[item.title]++;
        }
        break;
      case "Org Change":
        changes.values[item.title];
        if (changes.values[item.title] == null) {
          changes.values[item.title] = 1;
        } else {
          changes.values[item.title]++;
        }
        break;
      case "Org Promotion/Demotion":
        changes.values[item.title];
        if (changes.values[item.title] == null) {
          changes.values[item.title] = 1;
        } else {
          changes.values[item.title]++;
        }
        break;
      case "Badge Changed":
        changes.values[item.title];
        if (changes.values[item.title] == null) {
          changes.values[item.title] = 1;
        } else {
          changes.values[item.title]++;
        }
        break;
      case "Avatar Changed":
        changes.values[item.title];
        if (changes.values[item.title] == null) {
          changes.values[item.title] = 1;
        } else {
          changes.values[item.title]++;
        }
        break;
      case "Bio Changed":
        changes.values[item.title];
        if (changes.values[item.title] == null) {
          changes.values[item.title] = 1;
        } else {
          changes.values[item.title]++;
        }
        break;
    }
    if(item.title.includes("Bio") && !legend){
      legend = true;
      var newDiff = document.createElement("p");
      newDiff.className = "new";
      newDiff.innerText = "ADDED: +";
      newDiff.style.marginLeft = "8px";
      newDiff.style.marginRight = "8px";
      field.appendChild(newDiff);
      var oldDiff = document.createElement("p");
      oldDiff.className = "old";
      oldDiff.innerText = "REMOVED: -";
      oldDiff.style.marginLeft = "8px";
      oldDiff.style.marginRight = "8px";
      field.appendChild(oldDiff);
      var matchDiff = document.createElement("p");
      matchDiff.className = "match";
      matchDiff.innerText = "UNCHANGED";
      matchDiff.style.marginLeft = "8px";
      matchDiff.style.marginRight = "8px";
      field.appendChild(matchDiff);
    }
    console.log(item.description);
    var elem = timeline.elem(item.title, item.description, item.day, item.month, item.date, item.direction, item.actions, item.extra);
    line.appendChild(elem);
    field.appendChild(line);
  })
  changes.innerHTML = "SUMMARY<br>";
  var sortable = [];
  for (var title in changes.values) {
    sortable.push([title, changes.values[title]]);
  }
  sortable.sort(function (a, b) {
    return a[1] - b[1];
  });
  Object.keys(changes.values).forEach((key, i)=>{
    switch (key) {
      case "Changed Name":
        changes.innerHTML += "Name Changes: "+changes.values[key]+"<br>";
        break;
      case "Org Change":
        changes.innerHTML += "Organization Changes: " + changes.values[key]+"<br>";
        break;
      case "Org Promotion/Demotion":
        changes.innerHTML += "Organization Promotions/Demotions: "+changes.values[key]+"<br>";
        break;
      case "Badge Changed":
        changes.innerHTML += "Badges Changed: "+changes.values[key]+"<br>";
        break;
      case "Avatar Changed":
        changes.innerHTML += "Avatars Changed: "+changes.values[key]+"<br>";
        break;
      case "Bio Changed":
        changes.innerHTML += "Bio Changes: "+changes.values[key]+"<br>";
        break;
    }
  })



  DOM = {
    timelineDate: document.querySelectorAll('.timeline__date'),
    timelineElem: document.querySelectorAll('.timeline__elem'),
    timelineBar: document.querySelector('.timeline__bar')
  };

  setDirEvent();
  setDateBG();

  faded = document.getElementsByClassName("faded");

  var x = 0;
  var display = setInterval(()=>{
    faded[x].style.opacity = 1;
    if(x == faded.length-1){
      clearInterval(display);
    }else{
      x++;
    }
  }, 250);
}
