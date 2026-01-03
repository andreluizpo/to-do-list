import { CircleCheckBigIcon, CircleDashedIcon, Edit2Icon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Container } from "./components/Container";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Card, CardContent, CardHeader } from "./components/Card";

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

    function getNumberCompletedTasks() {
        let count = 0;

        tasks.forEach((task) => {
            if (task.completed) count += 1;
        });

        return count;
    }

    function getNumberPendingTasks() {
        let count = 0;

        tasks.forEach((task) => {
            if (!task.completed) count += 1;
        });

        return count;
    }

    function handleCompleteTask(id: number) {
        const updatedTask = tasks.map((task) => {
            if (task.id === id) return { ...task, completed: !task.completed };
            return task;
        });

        setTasks(updatedTask);
    }

    function handleRemoveTask(id: number) {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    function handleTaskEdit(id: number) {
        setIsEditing(true);
        const taskToEdit = tasks.find((task) => task.id === id);

        if (taskToEdit) setTask(taskToEdit);
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
                    <div className="task">
                        <div className="task-header">
                            <div className="task-title">
                                <h2>Tarefas</h2>
                            </div>
                            <div className="task-summary">
                                <span>Tarefas Concluídas: {getNumberCompletedTasks()}</span>
                                <span>Tarefas Pendentes: {getNumberPendingTasks()}</span>
                            </div>
                        </div>
                        <div className="task-content">
                            <div className="task-list">
                                {tasks.length === 0 && <p style={{ textAlign: "center" }}>Adicione algumas tarefas.</p>}
                                {tasks
                                    .sort((a, b) => {
                                        return b.id - a.id;
                                    })
                                    .map((task) => {
                                        return (
                                            <div
                                                key={task.id}
                                                className="task-item"
                                                style={task.completed === true ? { opacity: "0.5" } : {}}
                                            >
                                                <div className="task-name">
                                                    <Button
                                                        variants="icon"
                                                        aria-label={
                                                            task.completed === false
                                                                ? "Marcar tarefa como concluída"
                                                                : "Desmarcar tarefa como concluída"
                                                        }
                                                        title={
                                                            task.completed === false
                                                                ? "Marcar tarefa como concluída"
                                                                : "Desmarcar tarefa como concluída"
                                                        }
                                                        onClick={() => handleCompleteTask(task.id)}
                                                    >
                                                        {task.completed === true ? (
                                                            <CircleCheckBigIcon />
                                                        ) : (
                                                            <CircleDashedIcon />
                                                        )}
                                                    </Button>
                                                    {task.name}
                                                </div>
                                                <div className="task-controls">
                                                    <Button
                                                        variants="icon"
                                                        aria-label="Excluir tarefa"
                                                        title="Excluir tarefa"
                                                        onClick={() => handleRemoveTask(task.id)}
                                                    >
                                                        <Trash2Icon />
                                                    </Button>
                                                    <Button
                                                        variants="icon"
                                                        aria-label="Editar tarefa"
                                                        title="Editar tarefa"
                                                        onClick={() => handleTaskEdit(task.id)}
                                                    >
                                                        <Edit2Icon />
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Container>
    );
}
