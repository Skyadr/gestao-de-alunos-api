import { api, comTokenAdmin } from '../helpers/index.js';
import { novoAluno, novaDisciplina } from '../factories/index.js';
import { expect } from 'chai';


describe('Matricula de Aluno em disciplina', async() => {
    it('Validar que um aluno que acaba de ser cadastrado pode ser matriculado em disciplina', async() => {
        //Arrange - Nesse caso não há necessidade de um arrange, 
        // pois o login está na função comTokenAdmin()

        //Act - Cadastrar o aluno, disciplina e matricular o aluno na disciplina cadastrada
        //cadastrar o aluno
        
        const cadastroAlunoResposta = await api()
            .post('/api/admin/alunos')
            .set('Content-Type', 'application/json')
            .set('Authorization', await comTokenAdmin())
            .send(novoAluno());

        const alunoId = cadastroAlunoResposta.body.id;


        //Cadastrar a disciplina
        const cadastroDisciplinaResposta = await api()
            .post('/api/admin/disciplinas')
            .set('Content-Type', 'application/json')
            .set('Authorization', await comTokenAdmin())
            .send(novaDisciplina());

        const disciplinaId = cadastroDisciplinaResposta.body.id;


        //Matricular o aluno na disciplina
        const cadastroMatriculaResposta = await api()
            .post(`/api/admin/disciplinas/${disciplinaId}/matriculas`)
            .set('Content-Type', 'application/json')
            .set('Authorization', await comTokenAdmin())
            .send({
                    'alunoId': alunoId
                });

        //Assert - validar que a matricula foi realizada com sucesso
        expect(cadastroMatriculaResposta.status).to.equal(201);
        expect(cadastroMatriculaResposta.body.alunoId).to.equal(alunoId);
        expect(cadastroMatriculaResposta.body.disciplinaId).to.equal(disciplinaId);
    });
});
