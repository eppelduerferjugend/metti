
new Vue({
    el: '#app',
    data: {
        debug: true,
        domain: '',
        ajaxRequest: false,
        postResults: []
    },
    methods: {
      checkWebsite: function() {
        this.ajaxRequest = true;
        this.$http.post('http://demo8159500.mockable.io/post/check', {
              domain: this.domain
            }, function (data, status, request) {
                this.postResults = data;

                this.ajaxRequest = false;
            });
      }}
});
