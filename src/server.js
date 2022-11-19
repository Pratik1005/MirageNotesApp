import {createServer} from "miragejs";

export default function () {
  createServer({
    routes() {
      this.get("/api/todo", () => ({
        todos: [
          {id: 1, text: "Learn MirageJs"},
          {id: 2, text: "Clean floor"},
          {id: 3, text: "Workout"},
        ],
      }));
    },
  });
}
