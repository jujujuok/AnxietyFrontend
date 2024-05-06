import dashboardInfoService from "@/services/dashboard-info-service.js";

class DataManager {
    saveDashboardData(data) {
        try {
            const jsonData = JSON.stringify(data);
            if(!localStorage.hasOwnProperty('dashboardData')) {
                localStorage.setItem('dashboardData', jsonData);
                console.log('Dashboard data saved successfully.');
            } else {
                console.log('Dashboard data already exists in localStorage.');
            }
        } catch (error) {
            console.error('Failed to save dashboard data to localStorage:', error);
        }
    }

    getDashboardData() {
        try {
            let jsonData = [];
            if (localStorage.hasOwnProperty('dashboardData')){
                jsonData = localStorage.getItem('dashboardData')
                return JSON.parse(jsonData);
            } else {
                console.log('No dashboard data found in localStorage.');
                return null;
            }
        } catch (error) {
            console.error('Failed to retrieve dashboard data from localStorage:', error);
            return null;
        }
    }

    saveMapData(data) {
        try {
            const jsonData = JSON.stringify(data);
            if(!localStorage.hasOwnProperty('mapData')) {
                localStorage.setItem('mapData', jsonData);
                console.log('Map data saved successfully.');
            } else {
                console.log('Map data already exists in localStorage.');
            }
        } catch (error) {
            console.error('Failed to save map data to localStorage:', error);
        }
    }

    getMapData() {
        try {
            let jsonData = [];
            console.log(localStorage.hasOwnProperty('mapData'));
            if(localStorage.hasOwnProperty('mapData')){
                jsonData = localStorage.getItem('mapData');
                return JSON.parse(jsonData);
            } else {
                console.log('No map data found in localStorage.');
                return null;
            }
        } catch (error) {
            console.error('Failed to retrieve map data from localStorage:', error);
            return null;
        }
    }

    appendDetails(cardId, details) {
        let dashboardData = this.getDashboardData();
        const index = dashboardData.findIndex(item => item.id === cardId);

        if (index !== -1 && !dashboardData[index].hasOwnProperty('details')) {
            dashboardData[index].details = details;
            localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
            console.log(`Details appended for card ID ${cardId}`);
        } else {
            console.log(`Details already exist for card ID ${cardId} or card not found.`);
        }
    }

    doDetailsExist(cardId) {
        const dashboardData = this.getDashboardData();
        const index = dashboardData.findIndex(item => item.id === cardId);

        if (index !== -1 && dashboardData[index].hasOwnProperty('details')) {
            return true;
        } else {
            return false;
        }
    }

    getDetails(cardId) {
        const dashboardData = this.getDashboardData();
        const index = dashboardData.findIndex(item => item.id === cardId);

        if (index !== -1 && dashboardData[index].hasOwnProperty('details')) {
            console.log('Details found for card ID:', cardId);
            return dashboardData[index].details;
        } else {
            return null;
        }
    }

    async synchronizeDashboardData() {
        const updateData = await dashboardInfoService.getDashboardUpdates();
        let dashboardData = this.getDashboardData();

        //Add new data
        updateData.add.forEach(newItem => {
            if (!dashboardData.some(item => item.id === newItem.id)) {
                dashboardData.push(newItem);
            }
        });

        //Filter out data that should be removed
        updateData.delete.forEach(deleteId => {
            dashboardData = dashboardData.filter(item => item.id !== deleteId);
        });

        localStorage.setItem('dashboardData', JSON.stringify(dashboardData));

        console.log('Dashboard data synchronized successfully.');
    }

    async synchronizeMapData() {
        try {
            const updateData = await dashboardInfoService.getMapUpdates();

            let mapData = this.getMapData();

            updateData.add.forEach(newItem => {
                if (!mapData.some(item => item.id === newItem.id)) {
                    mapData.push(newItem);
                }
            });

            updateData.delete.forEach(deleteId => {
                mapData = mapData.filter(item => item.id !== deleteId);
            });

            localStorage.setItem('mapData', JSON.stringify(mapData));

            console.log('Map data synchronized successfully.');
        } catch (error) {
            console.error('Failed to synchronize map data:', error);
        }
    }
}

export default DataManager;