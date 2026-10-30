# BLOOD//TAPE 📼

Um formulário de login com alma analógica: vermelho sangue, preto, vidro fosco e estética VHS dos anos 2000. Feito com **HTML, CSS e JavaScript puro**, sem instalação de pacotes ou etapa de compilação.

## Como abrir

Baixe os arquivos e abra `index.html` no navegador. Mantenha `styles.css`, `script.js` e `icon.svg` na mesma pasta.

Para servir localmente, se você já tem Python instalado, execute na pasta do projeto:

```sh
python -m http.server 8000
```

Depois abra `http://localhost:8000`.

As fontes vêm do Google Fonts e precisam de internet. Sem conexão, o projeto usa fontes alternativas do sistema. A fita VHS, o fundo e os ícones são desenhados em CSS/SVG, sem imagens externas.

## Funcionalidades

- Login e cadastro demonstrativos na mesma tela.
- Campos com rótulos, autocomplete e erros associados para leitores de tela.
- Mostrar/ocultar senha, sem bloquear colar ou usar gerenciadores de senhas.
- Botão com três cores e texto personalizável de até 24 caracteres.
- Opção de lembrar apenas o e-mail, marcada pelo visitante.
- Scanlines, fita animada e efeito de desfoque no painel e na área de registro.
- Controle para desligar os efeitos; respeita a preferência de movimento reduzido do sistema.
- Layout centralizado e responsivo, com foco visível e navegação por teclado.

## Regras de negócio da demonstração

| Regra | Comportamento |
| --- | --- |
| E-mail | Obrigatório, até 254 caracteres; espaços nas extremidades são removidos; validação usa o campo HTML `email`. |
| Senha | Obrigatória, de 8 a 128 caracteres; não pode conter apenas espaços. A senha não é aparada ou transformada. |
| Cadastro | Exige também nome com pelo menos 2 caracteres após remover espaços nas extremidades, até 60 caracteres no campo. |
| Campos inválidos | O envio é interrompido, os erros aparecem nos campos e o foco vai para o primeiro erro. |
| Envio | Evita envios simultâneos; mostra uma espera simulada de 800 ms. |
| Resultado | Informa que os campos passaram pela validação. Não afirma que uma sessão ou conta foi criada. |
| Senha após envio | É apagada do campo e volta ao modo oculto. Não é enviada, registrada em logs ou armazenada. |
| Lembrar e-mail | Apenas o e-mail é salvo em `localStorage`, depois de uma submissão válida com a opção marcada. Desmarcar remove o valor salvo. |
| Troca de formulário | Cancela a espera em andamento, limpa a senha e os erros e ajusta foco e autocomplete. |
| Recuperação | Explica a limitação da demo; nenhum e-mail é enviado. |
| Dados inseridos | São tratados como texto; nenhum conteúdo digitado é interpretado como HTML. |

**Este projeto é uma interface educacional. Não autentica usuários, não verifica credenciais e não cria contas.** O armazenamento local pode ser bloqueado pelo navegador; nesse caso, o formulário continua funcionando sem lembrar o e-mail. Em arquivos `file://`, o comportamento de `localStorage` varia entre navegadores.

## Organização

```text
blood-tape/
├── index.html    # Estrutura semântica e formulários
├── styles.css    # Paleta, fita VHS, layout e efeitos responsivos
├── script.js     # Validação, estados e personalização
├── icon.svg      # Símbolo original: fita VHS com detalhe sangue
└── README.md
```

## Títulos H1 a H6

Todos têm estilos definidos no CSS e aparecem na página, como exercício solicitado:

- **H1:** chamada principal do projeto.
- **H2:** título do formulário, atualizado ao alternar para cadastro.
- **H3:** seção de personalização.
- **H4, H5 e H6:** legendas das três opções de personalização.

Os três últimos são uma escolha didática para demonstrar todas as tags. Em um produto real, controles irmãos normalmente usam títulos no mesmo nível. O tamanho visual é definido no CSS e não depende do tamanho padrão das tags.

## Publicar no GitHub Pages

1. Crie um repositório e envie os arquivos do projeto para a raiz.
2. No GitHub, abra **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a sua branch principal e a pasta **/(root)**; salve.
5. Aguarde a publicação e abra o endereço fornecido pelo GitHub.

Referência: [documentação oficial do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Para evoluir para autenticação real

Conecte a interface a um backend ou provedor de identidade. Validação no navegador ajuda a experiência de uso; as mesmas regras precisam ser verificadas no servidor. O serviço deverá cuidar de hash seguro de senhas, sessões, proteção contra abuso e recuperação por tokens de uso único. Nunca transforme `localStorage` em banco de senhas.

## Sobre IA, RAG e LLMs

RAG combina recuperação de informações com geração; LLM é um modelo de linguagem. Nenhum dos dois é necessário para este formulário e não há integração com IA, chamadas a modelos, chaves de API ou dependências desse tipo no projeto.

## Verificação

A sintaxe do JavaScript foi conferida com `node --check`. Os fluxos de validação, troca de modo, personalização e armazenamento foram exercitados com um teste isolado de eventos e estado, sem um navegador real. A prévia visual no navegador não pôde ser verificada neste ambiente por restrição de acesso à conexão local.

Para revisar no navegador: tente enviar campos vazios, e-mail inválido e senha curta; conclua um envio válido; alterne entre cadastro/login durante a espera; teste mostrar senha, lembrar e-mail, cores, texto, efeitos e navegação por Tab. Confira também a página no celular.
