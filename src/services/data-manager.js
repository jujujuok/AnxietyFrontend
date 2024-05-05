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
            const jsonData = localStorage.getItem('dashboardData');
            if (jsonData) {
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
        const updateData = await dashboardInfoService.getUpdates();
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
}

export default DataManager;