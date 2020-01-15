window.addEventListener("DOMContentLoaded", event => {
    const list_items = document.querySelectorAll(".list-item");
    const lists = document.querySelectorAll(".list");
    let draggedItem = null;

    for (let i = 0; i < list_items.length; i++) {
        const item = list_items[i];
        item.addEventListener("dragstart", function () {
            draggedItem = item;
            setTimeout(function () {
                item.style.display = "none";
            }, 0);
        });
        item.addEventListener("dragend", function () {
            setTimeout(function () {
                var xhr = new XMLHttpRequest();
                xhr.open("PUT", "/api/tasks/" + item.dataset.id);
                xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
                const tasksIDs = Array.from(item.parentNode.children).map(item => item.dataset.id).filter(item => item != null);
                xhr.send(JSON.stringify({
                    taskID: item.dataset.id,
                    status: item.parentElement.id,
                    tasksIDs: tasksIDs,
                }));
                draggedItem.style.display = "block";
                draggedItem = null;
            }, 0);
        });
        for (let j = 0; j < lists.length; j++) {
            const list = lists[j];
            list.addEventListener("dragover", function (e) {
                e.preventDefault();
            });
            list.addEventListener("dragenter", function (e) {
                e.preventDefault();
                this.style.backgroundColor = "rgba(38, 166, 154, 0.9);";
            });
            list.addEventListener("dragleave", function (e) {
                this.style.backgroundColor = "rgba(38, 166, 154, 0.1);";
            });

            list.addEventListener("drop", function (e) {
                this.append(draggedItem);
                this.style.backgroundColor = "rgba(38, 166, 154, 0.1);";
            });
        }
    }
});