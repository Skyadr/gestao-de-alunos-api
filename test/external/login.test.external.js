import request from 'supertest';
import { expect } from 'chai';

describe('Login', () => {
    it('Deve retornar 200 quando o usuario e senha forem corretos', async() => {
        const loginResposta = await request('http://localhost:3000')
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@escola.com',
                senha: 'admin123'
            });
        
        expect(loginResposta.status).to.equal(200);
    });
    
    it('Deve retornar 400 quando o usuario não for informado', async() => {
        const loginResposta = await request('http://localhost:3000')
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: '',
                senha: 'admin123'
            });
        
        expect(loginResposta.status).to.equal(400);
    });

    it('Deve retornar 400 quando a senha não for informada', async() => {
        const loginResposta = await request('http://localhost:3000')
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@escola.com',
                senha: ''
            });
        
        expect(loginResposta.status).to.equal(400);
    });

    it('Deve retornar 401 quando o usuario estiver incorreto', async() => {
        const loginResposta = await request('http://localhost:3000')
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@escola.com.br',
                senha: 'admin1234'
            });
        
        expect(loginResposta.status).to.equal(401);
    });

    it('Deve retornar 401 quando a senha estiver incorreta', async() => {
        const loginResposta = await request('http://localhost:3000')
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@escola.com',
                senha: 'admin1234'
            });
        
        expect(loginResposta.status).to.equal(401);
    });
});