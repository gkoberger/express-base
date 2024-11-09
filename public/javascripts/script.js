// SOCKET-START
const socket = io();
// SOCKET-END
$.page("index", function () {
  // SOCKET-START
  socket.on("slide", (slide) => {
    $(".slide").text(slide);
  });

  $(".prev").click(() => {
    socket.emit("slide", { dir: -1 });
  });
  $(".next").click(() => {
    socket.emit("slide", { dir: 1 });
  });
  // SOCKET-END
  // VUE-START
  Vue.createApp({
    data() {
      return {
        salutation: "Hello",
      };
    },
    methods: {
      getName: function (v) {
        return v.toUpperCase();
      },
    },
  }).mount("#app");
  // VUE-END
});
