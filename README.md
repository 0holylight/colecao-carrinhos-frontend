# 🏎️ Coleção de Carrinhos — Front-end

Interface web da Coleção de Carrinhos, onde colecionadores de miniaturas cadastram e organizam sua coleção, com foto de cada peça.

> ✅ **Status:** concluído e publicado · [acessar o app](https://colecao-carrinhos.vercel.app) · consome a API do [repositório do back-end](https://github.com/0holylight/colecao-carrinhos)

> ⏳ A API roda no plano gratuito do Render, que hiberna quando fica sem uso: o primeiro acesso pode levar até cerca de um minuto para responder.

<!-- TODO: GIF ou print do app funcionando -->

## Tecnologias

- **React 19** + **Vite**
- **React Router** para navegação, rotas protegidas e rotas só para visitantes
- **Redux Toolkit** para a sessão e a coleção
- **Axios** para comunicação com a API
- **lucide-react** para os ícones
- **ESLint** para padronização do código
- Deploy na **Vercel**

## Telas

| Rota | Tela | Acesso |
|---|---|---|
| `/` | Página inicial | Pública |
| `/login` | Login | Só visitantes |
| `/register` | Cadastro | Só visitantes |
| `/carros` | Minha coleção | 🔒 Protegida |

Cadastro, edição e exclusão de carrinhos acontecem em modais dentro da própria coleção, sem trocar de página. Quem já está logado e abre `/login` ou `/register` é levado direto para a coleção.

## Funcionalidades

- Coleção em grade com foto, nome, cor, ano e coleção de lançamento; carrinhos sem foto ganham uma imagem padrão
- Contador da coleção (até 25 carrinhos), com o botão de adicionar travado ao atingir o limite
- Modal de boas-vindas quando a garagem está vazia
- Um único formulário para cadastrar e editar, com envio de foto (JPEG, PNG ou GIF)
- Exclusão com modal de confirmação
- Botões de salvar e excluir travados durante o envio, evitando cliques duplicados
- Mensagens de erro vindas da API exibidas para o usuário
- Cabeçalho que muda conforme a sessão, com botão de sair, e saudação na página inicial para quem está logado
- Layout responsivo para celular

## Decisões técnicas

- **Sessão em cookie httpOnly:** o token JWT é definido pela API num cookie que o JavaScript do navegador não consegue ler. Por isso, o front-end não guarda token no `localStorage`: o Axios envia o cookie automaticamente com `withCredentials: true`
- **Sessão verificada uma vez, no `App`:** ao abrir o site, o `App` pergunta à API quem está logado (`GET /usuarios/me`) e guarda a resposta no Redux. `ProtectedRoute` e `GuestRoute` só decidem para onde levar o usuário depois dessa resposta (flag `checked`), evitando mandar alguém logado para o login por engano
- **Proxy na Vercel:** em produção, as chamadas vão para `/api` e a Vercel repassa para o Render (`vercel.json`). Front e API ficam no mesmo domínio, então o cookie funciona com `sameSite: strict`. O mesmo arquivo direciona as demais rotas para o `index.html`, para que atualizar a página em `/carros` não dê 404
- **Endereço da API por ambiente:** `VITE_API_URL` aponta para `http://localhost:3001` em desenvolvimento e para `/api` em produção (`.env.development` e `.env.production`)
- **Modais com o elemento `<dialog>` nativo** do HTML

## Como rodar localmente

> É preciso ter a [API](https://github.com/0holylight/colecao-carrinhos) rodando antes, em `http://localhost:3001`.

```bash
# clone o repositório
git clone https://github.com/0holylight/colecao-carrinhos-frontend.git
cd colecao-carrinhos-frontend

# instale as dependências
npm install

# rode em modo de desenvolvimento
npm run dev
```

A aplicação abre em `http://localhost:5173`. O `.env.development` já aponta para a API local, então não há nada para configurar.

## Pendências conhecidas

O `npm audit` aponta vulnerabilidades moderadas em dependências do **ESLint**, usado só em desenvolvimento (não vai para o build). A correção automática rebaixaria o ESLint de versão, então ela não foi forçada.

## Próximos passos

- [ ] Tela de perfil (a API já tem as rotas)
- [ ] Filtro da coleção por coleção de lançamento e ano

## Autor

**Guilherme Almeida** · [LinkedIn](https://www.linkedin.com/in/guilherme-almeida00/)

