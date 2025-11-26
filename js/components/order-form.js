Vue.component('order-form', {
  template: '#tpl-order',
  props: ['paket', 'ekspedisiList'], // ⬅️ ganti nama

  data() {
    return {
      nim: '',
      nama: '',
      kodePaket: '',
      selectedEkspedisi: '', // ⬅️ BUKAN ambil dari prop
      tanggal: ''
    };
  },

  computed: {
    selectedPaket() {
      return this.paket.find(p => p.kode === this.kodePaket) || null;
    },

    generatedDO() {
      return this.generateDONumber();
    }
  },

  methods: {
    simpanDO() {
      this.submit();
    },

    submit() {
      if (!this.nim.trim() || !this.nama.trim() || !this.kodePaket || !this.selectedEkspedisi) {
        alert("Semua field wajib diisi!");
        return;
      }

      const paketObj = this.selectedPaket;
      const doNumber = this.generatedDO;
      const tanggalKirim = this.formatDate(this.tanggal || new Date());

      const newDO = {
        [doNumber]: {
          nim: this.nim,
          nama: this.nama,
          ekspedisi: this.selectedEkspedisi, // ⬅️ YANG DIPILIH USER
          paket: paketObj,
          tanggal: tanggalKirim,
          total: paketObj.harga,
          status: []
        }
      };

      this.$emit('created', newDO);
      alert("Pesanan berhasil dibuat!");

      this.resetForm();
    },

    resetForm() {
      this.nim = '';
      this.nama = '';
      this.kodePaket = '';
      this.selectedEkspedisi = ''; // ⬅️ reset
      this.tanggal = '';
    },

    generateDONumber() {
      const year = new Date().getFullYear();
      const prefix = "DO" + year;

      const list = this.$root.state.tracking;

      const seqArr = list
        .map(item => Object.keys(item)[0])
        .filter(k => k.startsWith(prefix))
        .map(k => parseInt(k.split("-")[1]));

      const next = seqArr.length ? Math.max(...seqArr) + 1 : 1;

      return `${prefix}-${String(next).padStart(3, "0")}`;
    },

    formatDate(dateInput) {
      const d = new Date(dateInput);
      return d.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      });
    },

    formatRupiah(n) {
      return "Rp " + n.toLocaleString("id-ID");
    }
  }
});
