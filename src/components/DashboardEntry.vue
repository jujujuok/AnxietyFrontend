<script lang="ts">
import { defineComponent } from 'vue'

import '@material/web/list/list-item'
import '@material/web/list/list'
import '@material/web/icon/icon'

// import WeatherIcon from '@/components/icons/WeatherIcon.vue'

export default defineComponent({
    // setup() {
    //     return { mediaTypes: useRemoteConfiguration().mediaTypes }
    // },
    name: 'DashboardEntry',
    components: {
        // WeatherIcon
    },
    props: {
        color: String,
        icon: String,
        iid: Number,
        title: String,
        date: Date,
        description: String,
        location: String
    }
})
</script>

<template>
    <md-list-item class="dashboarditem">
        <!-- make this the background color that the component gets-->
        <div>
            <!-- <md-icon>{{ icon }}</md-icon> -->
            <h3>{{ title }}</h3>
            <p>{{ date }}</p>
            <p>{{ description }}</p>
            <p>{{ location }}</p>
        </div>
    </md-list-item>
</template>

<style scoped>
.dashboarditem {
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}
</style>