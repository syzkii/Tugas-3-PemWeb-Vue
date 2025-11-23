Vue.component('do-tracking', {
  template: '#tpl-tracking',
  props: ['data'],

  data() {
    return {
      keyword: '',
      result: []
    };
  },

  methods: {
    search() {
      const key = this.keyword.toLowerCase().trim();

      this.result = this.data
        .map(x => {
          const doNumber = Object.keys(x)[0];
          const item = x[doNumber];
          return {
            do: doNumber,
            ...item,
            tempKet: ""      // untuk input status baru
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

    addStatus(row) {
      if (!row.tempKet.trim()) return;

      const now = new Date();
      const waktu = now.toLocaleString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "long",
        year: "numeric"
      });

      if (!row.status) row.status = [];
      row.status.push({
        waktu,
        keterangan: row.tempKet
      });

      row.tempKet = "";
    }
  }
});
