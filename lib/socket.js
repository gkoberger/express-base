const out = {
  load: (io) => {
    out.io = io;

    io.on("connection", (socket) => {
      console.log("a user connected");

      if (out.data.slide) io.emit("slide", out.data.slide);

      socket.on("slide", (cmd) => {
        if (cmd.dir) {
          out.data.slide += cmd.dir;
        }
        if (cmd.slide) {
          out.data.slide = cmd.slide;
        }
        io.emit("slide", out.data.slide);
      });
    });
  },

  emit: (event, value) => {
    if (event === "slide") {
      out.data.slide = value;
    }
    out.io.emit(event, value);
  },

  data: {
    slide: 0,
  },

  io: false,
};

module.exports = out;
