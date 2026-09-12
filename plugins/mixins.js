import Vue from 'vue'

Vue.mixin({
    data() {
        return {
            searchQuery: '',
            allData: [],
            filteredList: []
        }
    },
    methods: {
        $filterData(searchKey = 'title') {
            if (!this.searchQuery) {
                this.filteredList = this.allData
                return
            }
            const q = this.searchQuery.toLowerCase()
            this.filteredList = this.allData.filter((item) => {
                const val = item[searchKey] || item.name || ''
                return val.toLowerCase().includes(q)
            })
        }
    }
})