Vue.component('ba-stock-table', {
  template: '#tpl-stock',
  props: ['items'], // items = state.stok dari index.html

  data() {
    return {
      filterUPBJJ: '',
      filterKategori: '',
      sortKey: '',
      sortAsc: true,
      showLowStock: false,
      form: {
        kode: '',
        judul: '',
        kategori: '',
        upbjj: '',
        lokasiRak: '',
        harga: 0,
        qty: 0,
        safety: 0,
        catatanHTML: ''
      },
      editIndex: -1 // -1 = create, >=0 = edit
    };
  },


  computed: {
    // computed yang sudah ada
    filtered() {
      let data = [...this.items];

      if (this.filterUPBJJ)
        data = data.filter(i => i.upbjj === this.filterUPBJJ);

      if (this.filterKategori)
        data = data.filter(i => i.kategori === this.filterKategori);

      if (this.showLowStock)
        data = data.filter(i => i.qty < i.safety || i.qty === 0);

      if (this.sortKey) {
        data.sort((a, b) => {
          let valA = a[this.sortKey];
          let valB = b[this.sortKey];
          // case insensitive jika string
          if (typeof valA === 'string') valA = valA.toLowerCase();
          if (typeof valB === 'string') valB = valB.toLowerCase();
          if (valA > valB) return this.sortAsc ? 1 : -1;
          if (valA < valB) return this.sortAsc ? -1 : 1;
          return 0;
        });
      }

      return data;
    },

    // computed baru untuk daftar UT-daerah
    upbjjList() {
      const set = new Set(this.items.map(i => i.upbjj));
      return Array.from(set);
    },

    // computed baru untuk daftar kategori
    kategoriList() {
      const set = new Set(this.items.map(i => i.kategori));
      return Array.from(set);
    }
  },


  methods: {
    formatRupiah(value) {
      return `Rp ${Number(value).toLocaleString('id-ID')}`;
    },
    statusLabel(qty, safety) {
      if (qty === 0) return 'Kosong';
      if (qty < safety) return 'Menipis';
      return 'Aman';
    },
    tooltipContent(item) {
      return item.catatanHTML || '';
    },
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortKey = key;
        this.sortAsc = true;
      }
    },
    resetFilters() {
      this.filterUPBJJ = '';
      this.filterKategori = '';
      this.showLowStock = false;
    },
    // Validasi sederhana
    validateForm() {
      if (!this.form.kode || !this.form.judul || !this.form.kategori || !this.form.upbjj) {
        alert("Kode, Judul, Kategori, dan UPBJJ wajib diisi!");
        return false;
      }
      return true;
    },

    // Tambah atau update data
    saveItem() {
      if (!this.validateForm()) return;

      if (this.editIndex === -1) {
        // Create
        this.items.push({ ...this.form });
        alert("Data berhasil ditambahkan!");
      } else {
        // Update
        Vue.set(this.items, this.editIndex, { ...this.form });
        alert("Data berhasil diperbarui!");
      }

      this.resetForm();
    },

    // Siapkan form untuk edit
    editItem(index) {
      this.editIndex = index;
      this.form = { ...this.items[index] };
      this.$refs.kodeInput.focus();
    },

    // Hapus item
    deleteItem(index) {
      if (confirm(`Apakah yakin ingin menghapus "${this.items[index].judul}"?`)) {
        this.items.splice(index, 1);
        alert("Data berhasil dihapus!");
      }
    },

    // Reset form
    resetForm() {
      this.form = {
        kode: '',
        judul: '',
        kategori: '',
        upbjj: '',
        lokasiRak: '',
        harga: 0,
        qty: 0,
        safety: 0,
        catatanHTML: ''
      };
      this.editIndex = -1;
    }
  }
});
