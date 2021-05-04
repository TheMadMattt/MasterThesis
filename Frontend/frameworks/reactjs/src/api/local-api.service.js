import axios from "axios";

let http = axios.create({
    baseURL: "https://localhost:44306/",
    headers: {
        "Content-type": "application/json"
    }
});

class LocalApiService {
    connect(apiUrl, taskCount) {
        http = axios.create({
            baseURL: apiUrl,
            headers: {
                "Content-type": "application/json"
            }
        });

        return http.get("connect/" + taskCount)
    }


    createTask(task) {
        return http.post("task/", task);
    }

    updateTask(task) {
        return http.put("task/" + task.id, task);
    }

    getTask(id) {
        return http.get("task/" + id);
    }

    deleteTask(id) {
        return http.delete("task/" + id);
    }

    getTasks() {
        return http.get("task")
    }
}

export default new LocalApiService();
