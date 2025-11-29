import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTask = () => {
    if (!inputValue.trim()) {
      toast.error("Please enter a task");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInputValue("");
    toast.success("Task added!");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Task deleted");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 mb-4 shadow-lg">
            <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            My Tasks
          </h1>
          <p className="text-muted-foreground text-lg">
            Stay organized and productive
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-8 duration-700 border border-border/50">
          <div className="flex gap-3 mb-6">
            <Input
              type="text"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="text-lg h-12 bg-secondary/50 border-border/60 focus:border-primary transition-colors"
            />
            <Button
              onClick={addTask}
              size="lg"
              className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 px-6"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add
            </Button>
          </div>

          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-12 animate-in fade-in duration-500">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-muted-foreground/50" />
                </div>
                <p className="text-muted-foreground text-lg">
                  No tasks yet. Add one to get started!
                </p>
              </div>
            ) : (
              tasks.map((task, index) => (
                <div
                  key={task.id}
                  className="group flex items-center gap-3 p-4 bg-secondary/30 hover:bg-secondary/50 rounded-xl border border-border/40 hover:border-primary/30 transition-all duration-300 animate-in slide-in-from-left duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Checkbox
                    id={task.id}
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="w-5 h-5 data-[state=checked]:bg-success data-[state=checked]:border-success"
                  />
                  <label
                    htmlFor={task.id}
                    className={`flex-1 text-lg cursor-pointer transition-all duration-300 ${
                      task.completed
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {task.text}
                  </label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              ))
            )}
          </div>

          {tasks.length > 0 && (
            <div className="mt-6 pt-6 border-t border-border/50 flex items-center justify-between text-sm text-muted-foreground animate-in fade-in duration-500">
              <span>
                {tasks.filter((t) => !t.completed).length} task
                {tasks.filter((t) => !t.completed).length !== 1 ? "s" : ""}{" "}
                remaining
              </span>
              <span>
                {tasks.filter((t) => t.completed).length} completed
              </span>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6 animate-in fade-in duration-700 delay-300">
          Ready for Firebase integration by Student B
        </p>
      </div>
    </div>
  );
};

export default TodoList;
