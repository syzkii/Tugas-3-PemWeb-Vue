Vue.component('do-tracking', {
  template: '#tpl-tracking',
  props: ['data', 'paket'],

  data() {
    return {
      keyword: '',
      result: [],

      // Form DO Baru
      nim: '',
      nama: '',
      ekspedisi: '',
      kodePaket: '',
      tanggal: '',
    };
  },

  computed: {
    // generate nomor DO otomatis
    generatedDO() {
      const year = new Date().getFullYear();
      const yearPrefix = "DO" + year;

      const existing = this.data
        .map(obj => Object.keys(obj)[0])
        .filter(k => k.startsWith(yearPrefix));

      const nextSeq = existing.length + 1;
      return yearPrefix + "-" + String(nextSeq).padStart(3, '0');
    },

    selectedPaket() {
      return this.paket?.find(p => p.kode === this.kodePaket) || null;
    }
  },

  methods: {

    // ============================ SEARCH ===============================
    search() {
      const key = this.keyword.toLowerCase().trim();
      if (!key) return;

      this.result = this.data
        .map(x => {
          const doNumber = Object.keys(x)[0];
          const item = x[doNumber];
          return {
            do: doNumber,
            ...item,
            tempKet: ""
          };
        })
        .filter(row =>
          row.do.toLowerCase().includes(key) ||
          String(row.nim).toLowerCase().includes(key)
        );
    },

    reset() {
      this.keyword = '';
      this.result = [];
    },

    // ============================ ADD STATUS ===============================
    addStatus(row) {
      if (!row.tempKet.trim()) return;

      const waktu = this.formatDateTime(new Date());

      if (!row.status) row.status = [];
      row.status.push({
        waktu,
        keterangan: row.tempKet
      });

      row.tempKet = "";
    },

    // ============================ SIMPAN DO BARU ===============================
    simpanDO() {
      if (!this.nim.trim() || !this.nama.trim() || !this.kodePaket || !this.ekspedisi) {
        alert("Mohon isi semua field.");
        return;
      }

      const tanggalFormat = this.formatTanggal(this.tanggal || new Date());
      const totalHarga = this.selectedPaket?.harga || 0;

      const newDO = {
        [this.generatedDO]: {
          nim: this.nim,
          nama: this.nama,
          ekspedisi: this.ekspedisi,
          paket: this.selectedPaket,
          tanggal: tanggalFormat,
          total: totalHarga,
          status: []
        }
      };

      // masukkan ke array state.tracking
      this.data.push(newDO);

      alert("Delivery Order berhasil ditambahkan!");

      this.resetFormDO();
    },

    resetFormDO() {
      this.nim = "";
      this.nama = "";
      this.ekspedisi = "";
      this.kodePaket = "";
      this.tanggal = "";
    },

    // ============================ FORMATTER ===============================
    formatTanggal(dateInput) {
      const d = new Date(dateInput);
      return d.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      });
    },

    formatDateTime(date) {
      return date.toLocaleString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "long",
        year: "numeric"
      });
    },

    formatRupiah(angka) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(angka);
    }
  }
});
