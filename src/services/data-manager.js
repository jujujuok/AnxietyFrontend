import dashboardInfoService from "@/services/dashboard-info-service.js";
import NotificationProvider from "@/services/notification-provider.js";

class DataManager {
    saveDashboardData(data) {
        if(data !== null && data !== undefined){
            try {
                const jsonData = JSON.stringify(data);
                if(!localStorage.hasOwnProperty('dashboardData')|| localStorage.getItem('dashboardData') === "undefined" || this.getDashboardData(jsonData).length === 0) {
                    localStorage.setItem('dashboardData', jsonData);
                } else {
                    // console.log('Dashboard data already exists in localStorage.');
                }
            } catch (error) {
                console.error('Failed to save dashboard data to localStorage:', error);
            }
        }
    }

    getDashboardData() {
        try {
            let jsonData = [];
            if (localStorage.hasOwnProperty('dashboardData')){
                jsonData = localStorage.getItem('dashboardData')
                if(jsonData === "undefined"){
                    console.error("Dashboard data is undefined.");
                    return null;
                }
                return JSON.parse(jsonData);
            } else {
                return null;
            }
        } catch (error) {
            console.error('Failed to retrieve dashboard data from localStorage:', error);
            return null;
        }
    }

    saveMapData(data) {
        if(data !== null && data !== undefined){
            try {
                const jsonData = JSON.stringify(data);
                if(!localStorage.hasOwnProperty('mapData') || localStorage.getItem('mapData') === "undefined" || this.getMapData(jsonData).length === 0){
                    localStorage.setItem('mapData', jsonData);
                } else {
                    // console.log('Map data already exists in localStorage.');
                }
            } catch (error) {
                console.error('Failed to save map data to localStorage:', error);
            }
        } else {
            console.error("There is no data to save.");
        }
    }

    getMapData() {
        try {
            let jsonData = [];
            if(localStorage.hasOwnProperty('mapData')){
                jsonData = localStorage.getItem('mapData');
                if(jsonData === "undefined"){
                    console.error("Map data is undefined.");
                    return null;
                }
                return JSON.parse(jsonData);
            } else {
                return null;
            }
        } catch (error) {
            console.error('Failed to retrieve map data from localStorage:', error);
            return null;
        }
    }

    appendDashboardDetails(cardId, details) {
        let dashboardData = this.getDashboardData();
        const index = dashboardData.findIndex(item => item.id === cardId);

        if (index !== -1 && !dashboardData[index].hasOwnProperty('details')) {
            dashboardData[index].details = details;
            localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
        } else {
        }
    }

    doDashboardDetailsExist(cardId) {
        const dashboardData = this.getDashboardData();
        const index = dashboardData.findIndex(item => item.id === cardId);

        if (index !== -1 && dashboardData[index].hasOwnProperty('details')) {
            return true;
        } else {
            return false;
        }
    }

    getDashboardDetails(cardId) {
        const dashboardData = this.getDashboardData();
        const index = dashboardData.findIndex(item => item.id === cardId);

        if (index !== -1 && dashboardData[index].hasOwnProperty('details')) {
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
                NotificationProvider.showNotification(newItem.title, newItem.type);
                dashboardData.push(newItem);
            }
        });

        //Filter out data that should be removed
        updateData.delete.forEach(deleteId => {
            dashboardData = dashboardData.filter(item => item.id !== deleteId);
        });

        localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    }

    async synchronizeMapData() {
        try {
            const updateData = await dashboardInfoService.getMapUpdates();

            let mapData = this.getMapData();

            updateData.add.forEach(newItem => {
                if (!mapData.some(item => item.id === newItem.id)) {
                    NotificationProvider.showNotification(newItem.title, newItem.type);
                    mapData.push(newItem);
                }
            });

            updateData.delete.forEach(deleteId => {
                mapData = mapData.filter(item => item.id !== deleteId);
            });

            localStorage.setItem('mapData', JSON.stringify(mapData));
        } catch (error) {
            console.error('Failed to synchronize map data:', error);
        }
    }

    appendMapDetails(cardId, details) {
        let mapData = this.getMapData();
        const index = mapData.findIndex(item => item.id === cardId);

        if (index !== -1 && !mapData[index].hasOwnProperty('details')) {
            mapData[index].details = details;
            localStorage.setItem('mapData', JSON.stringify(mapData));
        } else {
            // console.log(`Details already exist for card ID ${cardId} or card not found.`);
        }
    }

    doMapDetailsExist(cardId) {
        const mapData = this.getMapData();
        const index = mapData.findIndex(item => item.id === cardId);

        if (index !== -1 && mapData[index].hasOwnProperty('details')) {
            return true;
        } else {
            return false;
        }
    }

    getMapDetails(cardId) {
        const mapData = this.getMapData();
        const index = mapData.findIndex(item => item.id === cardId);

        if (index !== -1 && mapData[index].hasOwnProperty('details')) {
            return mapData[index].details;
        } else {
            return null;
        }
    }
}

export default DataManager;