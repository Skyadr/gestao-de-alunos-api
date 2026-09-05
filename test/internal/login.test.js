import request from 'supertest';
import app from '../../src/app.js';
import { expect } from 'chai';
import * as sinon from 'sinon';
import authService from '../../src/services/auth.service.js';

describe('Login', () => {
    it('Deve retornar 500 quando acontecer algum problema na conexão com banco de dados', async() => {
        const authServiceMock = sinon.stub(authService, 'login');
        authServiceMock.throws(new Error('Erro catastrófico!'));
        
        
        const loginResposta = await request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@escola.com',
                senha: 'admin123'
            });
        
        expect(loginResposta.status).to.equal(500);
        expect(loginResposta.body.error).to.equal('Erro interno do servidor.');
        
        sinon.restore();
    });

    it('Deve retornar 200 quando o usuario e senha forem corretos', async() => {
        const loginResposta = await request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@escola.com',
                senha: 'admin123'
            });
        
        expect(loginResposta.status).to.equal(200);
    });

    it('Deve retornar 400 quando o usuario não for informado', async() => {
        const loginResposta = await request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: '',
                senha: 'admin123'
            });
        
        expect(loginResposta.status).to.equal(400);
    });

    it('Deve retornar 400 quando a senha não for informada', async() => {
        const loginResposta = await request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@escola.com',
                senha: ''
            });
        
        expect(loginResposta.status).to.equal(400);
    });

    it('Deve retornar 401 quando o usuario estiver incorreto', async() => {
        const loginResposta = await request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@escola.com.br',
                senha: 'admin1234'
            });
        
        expect(loginResposta.status).to.equal(401);
    });

    it('Deve retornar 401 quando a senha estiver incorreta', async() => {
        const loginResposta = await request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@escola.com',
                senha: 'admin1234'
            });
        
        expect(loginResposta.status).to.equal(401);
    });
});