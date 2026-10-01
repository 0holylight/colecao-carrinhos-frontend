# 🏎️ Coleção de Carrinhos — Front-end

Interface web da aplicação Coleção de Carrinhos, onde colecionadores de miniaturas cadastram e organizam sua coleção.

> 🚧 **Status:** em construção · consome a API do [repositório do back-end](https://github.com/0holylight/colecao-carrinhos)

## Tecnologias

- **React** + **Vite**
- **React Router** para navegação e rotas protegidas
- **Redux** para o estado da aplicação
- **Axios** para comunicação com a API
- **ESLint** para padronização do código

## Telas

| Rota | Tela | Acesso |
|---|---|---|
| `/` | Página inicial | Público |
| `/login` | Login | Público |
| `/register` | Cadastro | Público |
| `/carros` | Minha coleção | 🔒 Protegida |
| `/carros/novo` | Cadastrar carrinho | 🔒 Protegida |
| `/carros/:id/editar` | Editar carrinho | 🔒 Protegida |
| `/perfil` | Meu perfil | 🔒 Protegida |

## Decisões técnicas

- **Autenticação via cookie httpOnly:** o token JWT é definido pelo back-end em um cookie que o JavaScript do navegador não consegue ler. Por isso, o front-end não guarda o token no `localStorage`: as requisições são feitas com `withCredentials: true` e a verificação de sessão é feita perguntando ao próprio back-end
- **Rotas protegidas** com um componente `ProtectedRoute`, que redireciona para o login quem não está autenticado
- **Mensagens de erro vindas do back-end** exibidas diretamente nas telas de login e cadastro
- **Rotas e nomes do código em inglês**, por padronização

## Como rodar localmente

> É preciso ter a [API](https://github.com/0holylight/colecao-carrinhos) rodando antes.

```bash
# clone o repositório
git clone https://github.com/0holylight/colecao-carrinhos-frontend.git
cd colecao-carrinhos-frontend

# instale as dependências
npm install

# rode em modo de desenvolvimento
npm run dev
```

A aplicação abre em `http://localhost:5173`.

## Progresso

- [x] Estrutura do projeto com Vite
- [x] Configuração de rotas e rotas protegidas
- [x] Telas de login e cadastro
- [x] Estado da coleção no Redux
- [ ] Tela de listagem da coleção
- [ ] Formulário de cadastro e edição de carrinho, com upload de foto
- [ ] Exclusão de carrinho
- [ ] Responsividade para celular
- [ ] Deploy

## Autor

**Guilherme Almeida** · [LinkedIn](https://www.linkedin.com/in/guilherme-almeida00/)
