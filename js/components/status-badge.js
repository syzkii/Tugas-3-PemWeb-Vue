Vue.component('status-badge', {
  template: '#tpl-badge',
  props: ['qty', 'safety'],

  computed: {
    label() {
      if (this.qty === 0) return 'Kosong';
      if (this.qty < this.safety) return 'Menipis';
      return 'Aman';
    }
  }
});
