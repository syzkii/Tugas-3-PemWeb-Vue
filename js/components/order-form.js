Vue.component('order-form', {
  template: '#tpl-order',
  props: ['paket', 'ekspedisi'], // sesuai index.html

  data() {
    return {
      nim: '',
      nama: '',
      kodePaket: '',
      eksp: '',
    };
  },

  computed: {
    selectedPaket() {
      return this.paket.find(p => p.kode === this.kodePaket);
    }
  },

  methods: {
    submit() {
      if (!this.nim || !this.nama || !this.kodePaket || !this.eksp) {
        alert("Semua field wajib diisi!");
        return;
      }

      const newDO = {
        nim: this.nim,
        nama: this.nama,
        paket: this.kodePaket,
        ekspedisi: this.eksp,
        timestamp: new Date().toISOString()
      };

      this.$emit('created', newDO);

      alert("Pesanan berhasil dibuat!");
    }
  }
});
