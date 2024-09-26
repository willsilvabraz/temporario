import style from './ExluirPacineteFila.module.css';
import Botao from '../Botao/Botao';
import { excluirDaFila } from '../../service/API_function';

function ExluirPacienteFila({ isOpen, onClose, paciente }) {

    const onClick = async () => {
        try {
            const result = await excluirDaFila(paciente.pacientekey);
            onClose();
        } catch (error) {
            console.error('Erro ao excluir paciente:', error);
            alert('Erro ao excluir paciente.');
        }
    };

    return (
        <>
            {isOpen && (
                <div className={style.modalOverlay}>
                    <div className={style.conteiner}>
                        <div className={style.conteiner2}>
                            <Botao children={"Excluir Paciente"} onClick={onClick} color={'brancoButton'} />
                            <Botao children={"Cancelar"} onClick={onClose} color={'brancoButton'} />
                        </div>
                    </div>
                </div>
            )};
        </>
    );
}

export default ExluirPacienteFila;