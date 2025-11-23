new Vue({
    el: '#app',

    data: {
        tab: 'stok',
        state: {
            stok: [],
            tracking: [],
            paket: [],
            pengirimanList: []
        }
    },

    async created() {
        const data = await ApiService.loadData();
        this.state = data;
    },

    computed: {
        pageTitle() {
            if (this.tab === 'stok') return "📦 Data Stok";
            if (this.tab === 'tracking') return "🚚 Tracking Delivery Order";
            return "📝 Form Pemesanan";
        }
    }
    ,

    methods: {
        handleNewDO(newDO) {
            console.log("Data DO baru diterima:", newDO);
        }
    }
});
