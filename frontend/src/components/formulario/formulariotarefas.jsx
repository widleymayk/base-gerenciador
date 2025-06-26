import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import moment from "moment";
import criarTarefa from "../../api/criarTarefa";
import { RESPONSAVEIS } from "../../constantes/constante";
import "./formulario.css";

// validação usando Yup
const validationSchema = Yup.object().shape({
  titulo: Yup.string()
    .min(5, "O título deve ter no mínimo 5 caracteres")
    .max(30, "O título deve ter no máximo 30 caracteres")
    .required("O título é obrigatório"),
  prioridade: Yup.string().required("A prioridade é obrigatória"),
  data: Yup.date()
    .required("A data é obrigatória")
    .test(
      "data-valida",
      "A data de entrega deve ser hoje ou no futuro.",
      (value) =>
        moment(value).startOf("day").isSameOrAfter(moment().startOf("day"))
    ),
  descricao: Yup.string()
    .max(150, "A descrição deve ter no máximo 150 caracteres")
    .required("A descrição é obrigatória"),
  responsaveis: Yup.array()
    .min(1, "Selecione ao menos um responsável")
    .required("Selecione ao menos um responsável"),
});

const FormularioTarefas = ({ emNovaTarefa }) => {
  const initialValues = {
    titulo: "",
    prioridade: "Alta",
    data: "",
    descricao: "",
    responsaveis: [],
  };

  const pegarFormulario = async (values, { resetForm }) => {
    const novaTarefa = {
      titulo: values.titulo,
      prioridade: values.prioridade,
      data: moment(values.data).startOf("day").toISOString(),
      descricao: values.descricao,
      responsaveis: values.responsaveis,
    };

    try {
      const tarefaCriada = await criarTarefa(novaTarefa);
      emNovaTarefa(tarefaCriada);
      resetForm();
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={pegarFormulario}
    >
      {({ values, setFieldValue }) => (
        <Form
          id="formularioTarefas"
          className="formulario-tarefas"
          aria-labelledby="formularioTarefasTitulo"
        >
          <h2
            id="formularioTarefasTitulo"
            className="formulario-tarefas__titulo"
          >
            Criar Nova Tarefa
          </h2>

          <div className="formulario-tarefas--linha-inteira">
            <div className="formulario-tarefas--linha-metade">
              <div className="formulario-tarefas--coluna">
                <label htmlFor="tituloTarefaForm">Título</label>
                <Field
                  id="tituloTarefaForm"
                  name="titulo"
                  placeholder="Ex.: Revisar código crítico"
                  className="input--borda"
                  aria-required="true"
                />
                <ErrorMessage
                  name="titulo"
                  component="div"
                  className="erro-mensagem"
                />
              </div>
            </div>
            <div className="formulario-tarefas--linha-metade">
              <div className="formulario-tarefas--coluna">
                <label htmlFor="prioridadeTarefaForm">Prioridade</label>
                <Field
                  as="select"
                  id="prioridadeTarefaForm"
                  name="prioridade"
                  className="input--borda"
                  aria-required="true"
                >
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </Field>
                <ErrorMessage
                  name="prioridade"
                  component="div"
                  className="erro-mensagem"
                />
              </div>
              <div className="formulario-tarefas--coluna">
                <label htmlFor="dataTarefaForm">Data</label>
                <Field
                  type="date"
                  id="dataTarefaForm"
                  name="data"
                  className="input--borda"
                  aria-required="true"
                />
                <ErrorMessage
                  name="data"
                  component="div"
                  className="erro-mensagem"
                />
              </div>
            </div>
          </div>
          <div className="formulario-tarefas--linha-inteira">
            <div className="formulario-tarefas--coluna">
              <label htmlFor="descricaoTarefaForm">Descrição</label>
              <Field
                as="textarea"
                id="descricaoTarefaForm"
                name="descricao"
                placeholder="Revisar bugs críticos no módulo principal."
                className="input-textarea input--borda"
                aria-required="true"
              />
              <ErrorMessage
                name="descricao"
                component="span"
                className="erro-mensagem"
              />
            </div>
            <div className="formulario-tarefas--coluna">
              <label htmlFor="responsavelTarefaForm">Responsável(is):</label>
              <div className="container__checkbox-grid">
                {RESPONSAVEIS.map((nome) => (
                  <div className="container__checkbox-grid--item" key={nome}>
                    <Field
                      type="checkbox"
                      id={nome}
                      name="responsaveis"
                      value={nome}
                      checked={values.responsaveis.includes(nome)}
                      onChange={(e) => {
                        const set = new Set(values.responsaveis);
                        if (e.target.checked) {
                          set.add(nome);
                        } else {
                          set.delete(nome);
                        }
                        setFieldValue("responsaveis", Array.from(set));
                      }}
                      aria-labelledby={`label-${nome}`} 
                    />
                    <label id={`label-${nome}`} htmlFor={nome}>
                      {nome}
                    </label>
                  </div>
                ))}
              </div>
              <ErrorMessage
                name="responsaveis"
                component="div"
                className="erro-mensagem"
              />
            </div>
          </div>
          <div className="formulario-tarefas--linha-inteira">
            <button
              type="reset"
              className="formulario-tarefas__botao"
              aria-label="Limpar formulário"
            >
              Limpar
            </button>
            <button
              type="submit"
              className="formulario-tarefas__botao"
              aria-label="Adicionar nova tarefa"
            >
              Adicionar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioTarefas;
