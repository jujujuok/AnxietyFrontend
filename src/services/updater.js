class Updater {
    constructor() {
        if (Updater.instance) {
            return Updater.instance;
        }
        Updater.instance = this;
    }

    function setupDataSyncInterval() {
        synchronizeDashboardData();

        // Set up the interval
        setInterval(() => {
            synchronizeDashboardData();
        }, 300000); // 300000 milliseconds = 5 minutes
    }
}

export default new Updater();