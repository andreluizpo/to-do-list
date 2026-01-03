import { useEffect, useState } from "react";
import { Container } from "./components/Container";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Card, CardContent, CardHeader } from "./components/Card";
import { TaskContainer } from "./components/TaskContainer";

import "./styles/global.css";
import "./styles/theme.css";

export type TaskModel = {
    id: number;
    name: string;
    completed: boolean;
};

export function App() {
    const [task, setTask] = useState<TaskModel>({
        id: 0,
        name: "",
        completed: false,
    });
    const [tasks, setTasks] = useState<TaskModel[]>(() => {
        const savedTask = localStorage.getItem("tasks");
        return savedTask ? JSON.parse(savedTask) : [];
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!task.name) {
            alert("Digite uma tarefa");
            return;
        }

        const taskName = task.name.trim();

        if (task.id === 0) {
            const newTask = {
                id: Date.now(),
                name: taskName,
                completed: false,
            };

            setTasks((prevTask) => [...prevTask, newTask]);
        } else {
            setTasks((prevTask) => prevTask.map((item) => (item.id === task.id ? task : item)));
            setIsEditing(false);
        }

        setTask({
            id: 0,
            name: "",
            completed: false,
        });
    }

    return (
        <Container>
            <Card>
                <CardHeader>
                    <h1>Lista de Tarefas</h1>
                </CardHeader>
                <CardContent>
                    <form className="form" onSubmit={handleCreateNewTask}>
                        <Input
                            id="taskName"
                            label="Nome da Tarefa"
                            placeholder="Estudar"
                            value={task.name}
                            onChange={(e) => {
                                setTask({ ...task, name: e.target.value });
                            }}
                        />
                        <Button type="submit">{isEditing ? "Salvar" : "Adicionar"}</Button>
                    </form>
                    <TaskContainer setTask={setTask} tasks={tasks} setTasks={setTasks} setIsEditing={setIsEditing} />
                </CardContent>
            </Card>
        </Container>
    );
}
