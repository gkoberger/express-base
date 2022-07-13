$.page('index', function() {
  // VUE-START
  Vue.createApp({
    data() {
      return {
        salutation: 'Hello',
      }
    },
    methods: {
      getName: (v) => {
        return v.toUpperCase();
      }
    },
  }).mount('#app')
  // VUE-END
});
