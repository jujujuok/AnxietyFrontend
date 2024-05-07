class NotificationProvider {
    constructor() {
        this.typeToWord = {
            'travel_warning': 'Reisewarnung',
            'food_warning': 'Lebensmittelwarnung',
            'product_warning': 'Produktwarnung',
            'country_representative': 'Landesvertretung',
            'interpol_red': 'Interpol Rot',
            'default': 'Warnung'
        };
    }
    showNotification(title, warningType) {
        const type = this.typeToWord[warningType];
        if (Notification.permission === "granted") {
            new Notification(`${type}: ${title}`);
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification(`${type}: ${title}`);
                }
            });
        }
    }
}

export default new NotificationProvider();
