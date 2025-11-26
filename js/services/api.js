const ApiService = {
    async loadData() {
        const res = await fetch('./data/dataBahanAjar.json');
        return await res.json();
    },

    async saveData(data) {
        // Simulasi simpan data DO / stok di localStorage
        localStorage.setItem('tracking', JSON.stringify(data));
        return Promise.resolve();
    }
};
