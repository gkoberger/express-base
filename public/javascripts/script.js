$.page('index', function() {
  // VUE-START
  Vue.createApp({
    data() {
      return {
        salutation: 'Hello',
      }
    },
    methods: {
      getName: function (v) {
        return v.toUpperCase();
      }
    },
  }).mount('#app')
  // VUE-END
});
