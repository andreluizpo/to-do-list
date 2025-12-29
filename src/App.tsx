import { CircleDashedIcon, Edit2Icon, Trash2Icon } from "lucide-react";

import "./styles/global.css";
import "./styles/theme.css";

export function App() {
    return (
        <div className="card">
            <div className="card-header">
                <h1>Lista de Tarefas</h1>
            </div>
            <div className="card-content">
                <form>
                    <label htmlFor="taskName">Nome da Tarefa</label>
                    <input id="taskName" type="text" />
                    <button>Adicionar</button>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
