import { CircleDashedIcon, Edit2Icon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";

import "./styles/global.css";
import "./styles/theme.css";

type TaskModel = {
    id: number;
    name: string;
    completed: boolean;
};

export function App() {
    const [taskName, setTaskName] = useState("");
    const [tasks, setTasks] = useState<TaskModel[]>([]);

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!taskName) return;

        const task = taskName.trim();

        const newTask = {
            id: Date.now(),
            name: task,
            completed: false,
        };

        setTasks((prevTask) => [...prevTask, newTask]);
        console.log(newTask);
    }

    return (
        <div className="container">
            <div className="content">
                <div className="card">
                    <div className="card-header">
                        <h1>Lista de Tarefas</h1>
                    </div>
                    <div className="card-content">
                        <form className="form" onSubmit={handleCreateNewTask}>
                            <label htmlFor="taskName">Nome da Tarefa</label>
                            <input
                                id="taskName"
                                type="text"
                                placeholder="Estudar"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                            />
                            <button type="submit" className="form-button">
                                Adicionar
                            </button>
                        </form>
                        <div className="task">
                            <div className="task-header">
                                <div className="task-title">
                                    <h2>Tarefas</h2>
                                </div>
                                <div className="task-summary">
                                    <span>Tarefas Concluídas: 01</span>
                                    <span>Tarefas Pendentes: 01</span>
                                </div>
                            </div>
                            <div className="task-content">
                                <div className="task-list">
                                    <div className="task-item">
                                        <div className="task-name">
                                            <button>
                                                <CircleDashedIcon />
                                            </button>
                                            Estudar
                                        </div>
                                        <div className="task-controls">
                                            <button>
                                                <Trash2Icon />
                                            </button>
                                            <button>
                                                <Edit2Icon />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="task-item">
                                        <div className="task-name">
                                            <button>
                                                <CircleDashedIcon />
                                            </button>
                                            Estudar
                                        </div>
                                        <div className="task-controls">
                                            <button>
                                                <Trash2Icon />
                                            </button>
                                            <button>
                                                <Edit2Icon />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="task-item">
                                        <div className="task-name">
                                            <button>
                                                <CircleDashedIcon />
                                            </button>
                                            Estudar
                                        </div>
                                        <div className="task-controls">
                                            <button>
                                                <Trash2Icon />
                                            </button>
                                            <button>
                                                <Edit2Icon />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="task-item">
                                        <div className="task-name">
                                            <button>
                                                <CircleDashedIcon />
                                            </button>
                                            Estudar
                                        </div>
                                        <div className="task-controls">
                                            <button>
                                                <Trash2Icon />
                                            </button>
                                            <button>
                                                <Edit2Icon />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
