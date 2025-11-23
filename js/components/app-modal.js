Vue.component('app-modal', {
  template: '#tpl-modal',
  data() {
    return { show: false };
  },
  methods: {
    open() { this.show = true },
    close() { this.show = false }
  }
});
