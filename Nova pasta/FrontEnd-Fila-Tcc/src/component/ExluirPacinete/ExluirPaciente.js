import style from './ExluirPacinete.module.css';
import Botao from '../Botao/Botao';
import { excluirPaciente } from '../../service/API_function';

function ExluirPaciente({ isOpen, onClose, paciente }) {

    const onClick = async () => {
        try {
            const result = await excluirPaciente(paciente.pacientekey);
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

export default ExluirPaciente;