module.exports = (Thunder) => {
    const getMessages = function getMessages() {
        const notification = document.querySelector("#notificationsCountValue").innerHTML;
        const message = document.querySelector("#mercurymessagesCountValue").innerHTML;
        const friend = document.querySelector("#requestsCountValue").innerHTML;
        const data = (parseInt(notification) + parseInt(message) + parseInt(friend));

        const count = parseInt(data, 10);

        Thunder.setBadge(count);
    };

    Thunder.loop(getMessages);
};

