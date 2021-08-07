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
        result = await history({ input: user.sessionUser });
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
    elem: function(title, description, day, month, date, time, direction = 0, actions, extra){
      const timelineElement = document.createElement("div");
      timelineElement.className = "timeline__elem faded";
      if (direction === 0) {
        timelineElement.classList.add("timeline__elem--left");
      } else {
        timelineElement.classList.add("timeline__elem--right");
      }

      timelineElement.appendChild(timeline.date(day, month));
      timelineElement.appendChild(timeline.event(title, description, date, time, actions, extra));

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
    event: function(title, description, date, time, actions, extra){
      const timelineEvent = document.createElement("div");
      timelineEvent.className = "timeline__event";

      const eventDateTime = document.createElement("div");
      eventDateTime.className = "timeline__event-date-time";

      const eventDate = document.createElement("div");
      eventDate.className = "timeline__event-date";
      const dateSpan = document.createElement("span");
      dateSpan.innerText = date;
      eventDate.appendChild(dateSpan);

      const eventTime = document.createElement("div");
      eventTime.className = "timeline__event-time";
      const timeSpan = document.createElement("span");
      timeSpan.innerText = time;
      eventTime.appendChild(timeSpan);

      eventDateTime.appendChild(eventDate);
      eventDateTime.appendChild(eventTime);

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
              eventDesc.innerHTML = "<p class='new'>+ = New</p><p class='old'>- = Removed</p><p class='match'>@@ = Unchanged</p><br>";
              eventDesc.innerHTML += extra;
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
  result.forEach((item, i) => {
    console.log(item.description);
    var elem = timeline.elem(item.title, item.description, item.day, item.month, item.date, item.time, item.direction, item.actions, item.extra);
    line.appendChild(elem);
    field.appendChild(line);
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
